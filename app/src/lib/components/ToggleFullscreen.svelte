<script lang="ts">
	import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js';

	// import Fullscreen from 'svelte-fullscreen';
	import RoundButton from '$lib/components/RoundButton.svelte';
	import { onMount } from 'svelte';

	export let sceneEl: HTMLElement | null = null;
	export let resize: () => void;

	let isFullscreen: boolean = false; // If window is fullscreen

	let fullscreenSupport = false;

	function toggleFullscreen() {
		if (!fullscreenSupport || !sceneEl) return;

		if (isFullscreen) {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.webkitExitFullscreen) {
				isFullscreen = false;
				document.webkitExitFullscreen();
			}

			return resize();
		}

		if (sceneEl.requestFullscreen) {
			sceneEl.requestFullscreen();
		} else if (sceneEl.webkitRequestFullScreen) {
			isFullscreen = true;
			sceneEl?.webkitRequestFullScreen();
			setTimeout(() => resize(), 1000);
		}

		resize();
	}

	onMount(() => {
		fullscreenSupport = !!(
			document.fullscreenEnabled ||
			document.webkitFullscreenEnabled || // this is for cursed Safari
			false
		);

		document.onfullscreenchange = () => {
			isFullscreen = document.fullscreenElement != null;
		};
	});
</script>

{#if fullscreenSupport}
	{#if isFullscreen}
		<RoundButton icon={mdiFullscreenExit} on:click={toggleFullscreen} />
	{:else}
		<RoundButton icon={mdiFullscreen} on:click={toggleFullscreen} />
	{/if}
{/if}
