<script lang="ts">
	import { onMount, setContext, onDestroy } from 'svelte';
	import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

	import type { RootContext } from '$lib/types/context';

	import { ROOT_KEY } from '$lib/utils/key';

	let canvasEl: HTMLCanvasElement;
	let root: RootContext;

	setContext(ROOT_KEY, {
		getRoot: () => root
	});

	function resize() {
		root.renderer.setSize(window.innerWidth, window.innerHeight);
		root.camera.aspect = window.innerWidth / window.innerHeight;
		root.camera.updateProjectionMatrix();
	}

	onMount(() => {
		root = {
			scene: new Scene(),
			camera: new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000),
			renderer: new WebGLRenderer({ antialias: true, canvas: canvasEl })
		};

		resize();
	});

	onDestroy(() => {
		// TODO: cleanup
	});
</script>

<svelte:window on:resize={resize} />
<canvas bind:this={canvasEl}>
	<slot />
</canvas>
