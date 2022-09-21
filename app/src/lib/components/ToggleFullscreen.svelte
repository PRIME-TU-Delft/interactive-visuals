<script lang="ts">
	import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js';

	// import Fullscreen from 'svelte-fullscreen';
	import RoundButton from '$lib/components/RoundButton.svelte';
	import { onMount } from 'svelte';

	export let sceneEl: HTMLElement | null = null;

	let isFullscreen: boolean = false; // If window is fullscreen

	let fullscreenSupport = false;

	function toggleFullscreen(event: Event) {
		if (!fullscreenSupport || !sceneEl) return;

		if (isFullscreen) {
			document.exitFullscreen();
		} else if (event.target) {
			console.log('Put whole document in fullscreen');
			sceneEl.requestFullscreen();
			// TODO: add moz, IE and safari support
		}
	}

	onMount(() => {
		if (sceneEl == null) return;

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
