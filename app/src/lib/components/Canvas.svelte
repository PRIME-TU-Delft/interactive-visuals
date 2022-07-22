<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/env';

	import {
		BoxGeometry,
		Mesh,
		MeshBasicMaterial,
		PerspectiveCamera,
		Scene,
		WebGLRenderer
	} from 'three';

	let el: HTMLCanvasElement;

	onMount(() => {
		if (browser) {
			const scene = new Scene();
			const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
			const geometry = new BoxGeometry();
			const material = new MeshBasicMaterial({ color: 0x00ff00 });
			const cube = new Mesh(geometry, material);
			let renderer: WebGLRenderer;
			scene.add(cube);
			camera.position.z = 5;

			const animate = () => {
				requestAnimationFrame(animate);
				cube.rotation.x += 0.01;
				cube.rotation.y += 0.01;
				renderer.render(scene, camera);
			};

			const resize = () => {
				renderer.setSize(window.innerWidth, window.innerHeight);
				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();
			};

			const createScene = (el: HTMLCanvasElement) => {
				renderer = new WebGLRenderer({ antialias: true, canvas: el });
				resize();
				animate();
			};

			createScene(el);
		}
	});
</script>

<canvas bind:this={el} />
