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

	export let scene: Scene;

	export let color: string = '';
	export let origin: Vector3 = new Vector3(0, 0, 0);
	export let direction: Vector3 = new Vector3(1, 0, 0);
	export let length: number = 1;
	export let radius: number = 0.1;
	export let coneHeight: number = Math.max(0.5, length / 10);

	const radiusSegments = 20; // number of segements on the tube -> higher is smoother

	const path = new CatmullRomCurve3([
		origin,
		origin.clone().add(direction.clone().multiplyScalar(length - coneHeight / 2))
	]);
	const tubeGeometry = new TubeGeometry(path, 1, radius, radiusSegments, false);
	const material = new MeshBasicMaterial();
	const tubeMesh = new Mesh(tubeGeometry, material);

	const geometry = new ConeGeometry(coneHeight == 0 ? 0 : radius * 2, coneHeight, radiusSegments);
	const coneMesh = new Mesh(geometry, material);

	onMount(() => {
		material.color.set(color || '#ff00ff');
		material.side = DoubleSide;

		const endPoint = path.getPointAt(1);
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
