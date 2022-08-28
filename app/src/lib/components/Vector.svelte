<script lang="ts">
	import { onMount, onDestroy, afterUpdate } from 'svelte';

	import {
		CatmullRomCurve3,
		Color,
		ConeGeometry,
		DoubleSide,
		Mesh,
		MeshBasicMaterial,
		Quaternion,
		Scene,
		TubeGeometry,
		Vector3
	} from 'three';
	import Deconstruction from '$lib/components/Deconstruction.svelte';

	export let scene: Scene;

	export let color: string = ''; //Color of both cone and stem
	export let origin: Vector3 = new Vector3(0, 0, 0); // origin of vector
	export let direction: Vector3 = new Vector3(1, 0, 0); // direction of vector
	export let length: number = 1; // length of the vector + cone
	export let radius: number = 0.05; // radius of the cone
	export let coneHeight: number = Math.max(0.5, length / 10); // height of the cone
	export let showDeconstruction: boolean = false; // show deconstruction of vector

	const RADIUS_SEGMENTS = 15; // number of segements on the tube -> higher is smoother

	const path = new CatmullRomCurve3([
		origin,
		origin.clone().add(
			direction
				.clone()
				.normalize()
				.multiplyScalar(length - coneHeight)
		)
	]);
	const endPosition = origin.clone().add(direction.clone().normalize().multiplyScalar(length)); // very end of the vector
	const tubeGeometry = new TubeGeometry(path, 1, radius, RADIUS_SEGMENTS, false);
	const material = new MeshBasicMaterial();
	const tubeMesh = new Mesh(tubeGeometry, material);

	const geometry = new ConeGeometry(coneHeight == 0 ? 0 : radius * 2, coneHeight, RADIUS_SEGMENTS);
	const coneMesh = new Mesh(geometry, material);

	onMount(() => {
		material.color.set(color || '#ff00ff');
		material.side = DoubleSide;

		const endPoint = origin.clone().add(
			direction
				.clone()
				.normalize()
				.multiplyScalar(length - coneHeight / 2)
		);
		const quatRotation = new Quaternion().setFromUnitVectors(
			new Vector3(0, 1, 0),
			endPoint.clone().sub(origin).normalize()
		);
		coneMesh.position.set(endPoint.x, endPoint.y, endPoint.z);
		coneMesh.setRotationFromQuaternion(quatRotation);

		scene.add(tubeMesh);
		scene.add(coneMesh);
	});

	/**
	 * When points are changed, update geometry & material color.
	 */
	afterUpdate(() => {
		// TODO: update: [origin, direction, length, radius, coneHeight]

		// 	// Check if color is a valid css color accepts: [#fff, #f0f0f0, rgb(255, 255, 255), rgba(255, 255, 255, 1)] | rejects: [random, #rgba]
		if (!CSS.supports('color', color)) return;

		const newColor = new Color(color);

		// Check if color is updated
		if (!newColor.equals(material.color)) {
			material.color.set(newColor);
		}
	});

	onDestroy(() => {
		scene.remove(tubeMesh);
		scene.remove(coneMesh);
	});
</script>

{#if showDeconstruction}
	<Deconstruction {scene} end={endPosition} />
{/if}

<slot {endPosition} />
