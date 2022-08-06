<script lang="ts">
	import { onMount } from 'svelte';

	import {
		BufferGeometry,
		Color,
		Line,
		MeshBasicMaterial,
		PerspectiveCamera,
		Scene,
		Vector3,
		WebGLRenderer
	} from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	let el: HTMLCanvasElement;
	let width: number; // Width of scene
	let height: number; // Height of scene

	const scene = new Scene(); // Global THREE scene
	let camera: PerspectiveCamera; // Camera as perspective camera
	let renderer: WebGLRenderer; // Renderer as WebGL renderer
	let controls: OrbitControls; // Orbit controls - to pan arround the scene
	let camPos: Vector3 = new Vector3(3.5, 2.8, 3.5);

	let a = 5;
	var geometry = new BufferGeometry().setFromPoints([new Vector3(0, a, 0), new Vector3(1, 2, 3)]);
	let line = new Line(geometry, new MeshBasicMaterial({ color: '#ff0000' }));

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

		// Cehck if geometry has been changed
		geometry.setFromPoints([new Vector3(0, a, 0), new Vector3(1, 2, 3)]);

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

			scene.add(line);

			console.log(line.geometry);

			line.geometry.attributes.position.needsUpdate = true;

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

<input
	style="position: absolute; z-index: 10; top: 4rem; left: 1rem"
	type="number"
	bind:value={a}
/>
