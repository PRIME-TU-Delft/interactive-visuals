<script lang="ts">
	import getRandomColor from '$lib/utils/getColor';

	import { onDestroy, onMount, beforeUpdate } from 'svelte';

	import {
		type Plane,
		type Scene,
		Mesh,
		PlaneGeometry,
		MeshBasicMaterial,
		Vector3,
		Color,
		DoubleSide
	} from 'three';

	export let scene: Scene;
	export let plane: Plane;
	export let color = getRandomColor();
	export let size = 10;
	export let opacity = 0.8;

	let planeMesh: Mesh;
	const geometry = new PlaneGeometry(size, size);
	const material = new MeshBasicMaterial({ color });

	onMount(() => {
		planeMesh = new Mesh(geometry, material);

		material.side = DoubleSide;
		material.transparent = true;
		material.opacity = opacity;

		const coplanairPoint = new Vector3(0, 0, 0);
		plane.coplanarPoint(coplanairPoint);
		planeMesh.position.set(coplanairPoint.x, coplanairPoint.y, coplanairPoint.z);
		planeMesh.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), plane.normal);

		scene.add(planeMesh);
	});

	beforeUpdate(() => {
		if (!planeMesh) return;

		const coplanairPoint = new Vector3(0, 0, 0);
		plane.coplanarPoint(coplanairPoint);

		if (!planeMesh.position.equals(coplanairPoint)) {
			planeMesh.position.set(coplanairPoint.x, coplanairPoint.y, coplanairPoint.z);
		}

		// TODO: check if rotation must be changed
		planeMesh.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), plane.normal);

		// Check if color is a valid css color accepts: [#fff, #f0f0f0, rgb(255, 255, 255), rgba(255, 255, 255, 1)] | rejects: [random, #rgba]
		if (!CSS.supports('color', color)) return;

		const newColor = new Color(color);

		// Check if color is updated
		if (!newColor.equals(material.color)) {
			material.color.set(newColor);
		}

		material.opacity = opacity;
	});

	onDestroy(() => {
		scene.remove(planeMesh);
	});
</script>
