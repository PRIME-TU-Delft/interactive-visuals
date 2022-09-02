<script lang="ts">
	import { onMount, setContext } from 'svelte';

	import { Color, OrthographicCamera, Scene, Vector3, WebGLRenderer } from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
	import { sceneKey } from '$lib/utils/sceneKey';

	export let enablePan = false;

	let el: HTMLCanvasElement;
	let width: number; // Width of scene
	let height: number; // Height of scene

	const scene = new Scene(); // Global THREE scene
	let camera: OrthographicCamera; // Camera as perspective camera
	let renderer: WebGLRenderer; // Renderer as WebGL renderer
	let controls: OrbitControls; // Orbit controls - to pan arround the scene
	let camPos: Vector3 = new Vector3(3.5, 2.8, 3.5);

	let frustumSize = 10; // Size of the frustum

	// Set context for all children to use the same scene
	setContext(sceneKey, {
		scene
	});

	/**
	 * Resize canvas if window size changes.
	 */
	function resize() {
		const aspect = width / height / 2;

		camera.left = (-frustumSize * aspect) / 2;
		camera.right = (frustumSize * aspect) / 2;
		camera.top = frustumSize / 2;
		camera.bottom = -frustumSize / 2;

		camera.updateProjectionMatrix();

		renderer.setSize(width / 2, height);
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
		const aspect = width / height / 2;
		camera = new OrthographicCamera(
			(frustumSize * aspect) / -2,
			(frustumSize * aspect) / 2,
			frustumSize / 2,
			frustumSize / -2,
			-10, // black magic fuckery,
			100
		);

		// const createScene = (el: HTMLCanvasElement) => {
		scene.background = new Color('#fff');
		renderer = new WebGLRenderer({ antialias: true, canvas: el });
		controls = new OrbitControls(camera, renderer.domElement);
		controls.enablePan = enablePan;
		controls.maxZoom = 20;
		controls.minZoom = 1;

		resetControls();
		resize();
		animate();
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} on:resize={resize} />
<canvas bind:this={el} />
<button class="resetButton" on:click={resetControls}> reset camera </button>
<slot {camera} />

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
