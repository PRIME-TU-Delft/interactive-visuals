<script lang="ts">
	import { onMount } from 'svelte';
	import { BoxGeometry, Mesh, MeshBasicMaterial, Scene } from 'three';

	export let scene: Scene;
	export let geometry = new BoxGeometry();
	export let material = new MeshBasicMaterial({ color: 0xfff000 });

	onMount(async () => {
		const cube = new Mesh(geometry, material);
		scene.add(cube);
	});
</script>
