<script lang="ts">
	import { onMount } from 'svelte';

	import {
		BoxGeometry,
		Mesh,
		MeshBasicMaterial,
		PerspectiveCamera,
		Scene,
		WebGLRenderer
	} from 'three';
	import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

	let el: HTMLCanvasElement;
	let width: number;
	let height: number;

	const scene = new Scene();
	let camera: PerspectiveCamera;
	let renderer: WebGLRenderer;
	let controls: OrbitControls;

	function resize() {
		if (!camera || !renderer) return;
		renderer.setSize(width, height);
		camera.aspect = width / height;
		camera.updateProjectionMatrix();
	}

	function addCube() {
		const geometry = new BoxGeometry();
		const material = new MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new Mesh(geometry, material);

		scene.add(cube);
	}

	function animate() {
		requestAnimationFrame(animate);
		// cube.rotation.x += 0.01;
		// cube.rotation.y += 0.01;
		renderer.render(scene, camera);
		// controls.update();
	}

	function resetControls() {
		camera.position.set(-0.041, 1.9, -1.21);
		controls.update();
	}

	onMount(() => {
		camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
		camera.position.z = 5;

		const createScene = (el: HTMLCanvasElement) => {
			renderer = new WebGLRenderer({ antialias: true, canvas: el });
			controls = new OrbitControls(camera, renderer.domElement);

			// controls.update();
			addCube();
			resize();
			animate();
		};

		createScene(el);
	});
</script>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} on:resize={resize} />
<canvas bind:this={el} />

<button style="position: absolute; z-index: 10; top: 1rem; left: 1rem" on:click={resetControls}>
	reset
</button>
