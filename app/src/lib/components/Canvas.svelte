<script lang="ts">
	import { onMount } from 'svelte';

	import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	let el: HTMLCanvasElement;
	let width: number; // Width of scene
	let height: number; // Height of scene

	const scene = new Scene(); // Global THREE scene
	let camera: PerspectiveCamera; // Camera as perspective camera
	let renderer: WebGLRenderer; // Renderer as WebGL renderer
	let controls: OrbitControls; // Orbit controls - to pan arround the scene

	/**
	 * Resize canvas if window size changes.
	 */
	function resize() {
		if (!camera || !renderer) return;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}

	/**
	 * Ubdate canvas with new information
	 */
	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
	}

	/**
	 * Reset camera position and rotation.
	 */
	function resetControls() {
		camera.position.set(3.5, 2.8, 3.5);
		controls.update();
	}

	onMount(() => {
		camera = new PerspectiveCamera(75, 1, 0.1, 1000);

		const createScene = (el: HTMLCanvasElement) => {
			scene.background = new Color('#334155');
			renderer = new WebGLRenderer({ antialias: true, canvas: el });
			controls = new OrbitControls(camera, renderer.domElement);

			resetControls();
			resize();
			animate();
		};

		createScene(el);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} on:resize={resize} />
<canvas bind:this={el} />
<slot {scene} {camera} />

<button style="position: absolute; z-index: 10; top: 1rem; left: 1rem" on:click={resetControls}>
	reset
</button>
