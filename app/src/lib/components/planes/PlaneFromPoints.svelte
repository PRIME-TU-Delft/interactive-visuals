<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';

	import { Vector3, Plane, Scene } from 'three';

	import getRandomColor from '$lib/utils/getColor';

	import AbstractPlane from '$lib/components/planes/AbstractPlane.svelte';

	export let scene: Scene;
	export let points: [Vector3, Vector3, Vector3] = [
		new Vector3(1, 0, 0),
		new Vector3(0, 1, 0),
		new Vector3(0, 0, 1)
	];
	export let color = getRandomColor();
	export let size = 10;
	export let opacity = 0.8;

	let plane: Plane;

	onMount(() => {
		plane = new Plane().setFromCoplanarPoints(points[0], points[1], points[2]);
	});

	beforeUpdate(() => {
		if (!plane) return;

		// TODO: check if this update is nessesary every time this component changes
		plane.setFromCoplanarPoints(points[0], points[1], points[2]);
	});
</script>

{#if plane}
	<AbstractPlane {scene} {plane} {color} {size} {opacity} />
{/if}
