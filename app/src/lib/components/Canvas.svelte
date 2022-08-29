<script lang="ts">
	import { onMount } from 'svelte';

	import { Color, PerspectiveCamera, Scene, Vector3, WebGLRenderer } from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	export let enablePan = false;

	let el: HTMLCanvasElement;
	let width: number; // Width of scene
	let height: number; // Height of scene

	const scene = new Scene(); // Global THREE scene
	let camera: PerspectiveCamera; // Camera as perspective camera
	let renderer: WebGLRenderer; // Renderer as WebGL renderer
	let controls: OrbitControls; // Orbit controls - to pan arround the scene
	let camPos: Vector3 = new Vector3(3.5, 2.8, 3.5);

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

		if (camera && camera.position.x != camPos.x) {
			camPos.copy(camera.position);
		}
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
			controls.enablePan = enablePan;
			controls.maxDistance = 10;
			controls.minDistance = 1;

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

<button class="resetButton" on:click={resetControls}> reset camera </button>

<style>
	.resetButton {
		position: absolute;
		bottom: 1rem;
		right: 1rem;
		z-index: 1;
		background: #fff;
		border: 1px solid #000;
		border-radius: 0.25rem;
		padding: 0.5rem;
		font-size: 1rem;
		cursor: pointer;
	}
</style>
