<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';

	import {
		CatmullRomCurve3,
		Color,
		DoubleSide,
		Mesh,
		MeshBasicMaterial,
		Scene,
		TubeGeometry,
		Vector3
	} from 'three';

	export let scene: Scene;

	export let color: string = '';
	export let origin: Vector3 = new Vector3(0, 0, 0);
	export let direction: Vector3 = new Vector3(1, 0, 0);
	export let length: number = 1;
	export let radius: number = 0.1;

	const path = new CatmullRomCurve3([
		origin,
		origin.clone().add(direction.clone().multiplyScalar(length))
	]);
	const geometry = new TubeGeometry(path, 1, radius, 10, false);
	const material = new MeshBasicMaterial();
	const mesh = new Mesh(geometry, material);

	console.log(color);

	onMount(() => {
		material.color.set(color || '#ffffff');
		material.side = DoubleSide;

		scene.add(mesh);
	});

	/**
	 * When points are changed, update geometry & material color.
	 */
	afterUpdate(() => {
		// 	// Check if color is a valid css color accepts: [#fff, #f0f0f0, rgb(255, 255, 255), rgba(255, 255, 255, 1)] | rejects: [random, #rgba]
		if (!CSS.supports('color', color)) return;

		const newColor = new Color(color);

		// Check if color is updated
		if (!newColor.equals(material.color)) {
			material.color.set(newColor);
		}
	});

	onDestroy(() => {
		scene.remove(mesh);
	});
</script>
