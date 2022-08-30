<script lang="ts">
	import { beforeUpdate, onMount } from 'svelte';

	import { Vector3, Plane, Scene } from 'three';

	import getRandomColor from '$lib/utils/getColor';

	import AbstractPlane from '$lib/components/planes/AbstractPlane.svelte';

	export let scene: Scene;
	export let point: Vector3 = new Vector3(0, 1, 0);
	export let normal: Vector3 = new Vector3(1, 1, 1);
	export let color = getRandomColor();
	export let size = 10;
	export let opacity = 0.8;

	let plane: Plane;

	onMount(() => {
		plane = new Plane().setFromNormalAndCoplanarPoint(normal, point);
	});

	beforeUpdate(() => {
		if (!plane) return;

		// TODO: check if this update is nessesary every time this component changes
		plane.setFromNormalAndCoplanarPoint(normal, point);
	});
</script>

{#if plane}
	<AbstractPlane {scene} {plane} {color} {size} {opacity} />
{/if}
