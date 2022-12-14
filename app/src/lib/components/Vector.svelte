<script lang="ts">
	import { onMount, onDestroy, afterUpdate, getContext } from 'svelte';

	import {
		Color,
		ConeGeometry,
		DoubleSide,
		LineCurve3,
		Mesh,
		MeshBasicMaterial,
		Quaternion,
		TubeGeometry,
		Vector3
	} from 'three';
	import Deconstruction from '$lib/components/Deconstruction.svelte';
	import SvelteLabel from '$lib/components/Label.svelte';
	import getRandomColor from '$lib/utils/getColor';
	import { sceneKey, type SceneContext } from '$lib/utils/sceneKey';
	import { Label } from '$lib/utils/label';

	export let color: string = getRandomColor(); //Color of both cone and stem
	export let origin: Vector3 = new Vector3(0, 0, 0); // origin of vector
	export let direction: Vector3 = new Vector3(1, 0, 0); // direction of vector
	export let length: number = 1; // length of the vector + cone
	export let radius: number = 0.05; // radius of the cone
	export let coneHeight: number = Math.min(0.5, length / 10); // height of the cone
	export let showDeconstruction: boolean = false; // show deconstruction of vector
	export let label: Label = Label.default(); // label of vector

	// Import scene from root Canvas.svelte. Context is used because store is too global.
	// More info: https://svelte.dev/docs#run-time-svelte-setcontext
	const { scene } = getContext<SceneContext>(sceneKey);

	const RADIUS_SEGMENTS = 15; // number of segements on the tube -> higher is smoother
	$: endPosition = origin.clone().add(direction.clone().normalize().multiplyScalar(length)); // very end of the vector

	let tubeMesh: Mesh;
	let coneMesh: Mesh;
	const material = new MeshBasicMaterial();

	function setup() {
		if (length <= 0) return; // Do not draw this vector if its length is 0

		const path = new LineCurve3(
			origin,
			origin.clone().add(
				direction
					.clone()
					.normalize()
					.multiplyScalar(length - coneHeight)
			)
		);

		const tubeGeometry = new TubeGeometry(path, 1, radius, RADIUS_SEGMENTS, false);
		const coneGeometry = new ConeGeometry(
			coneHeight == 0 ? 0 : radius * 2,
			coneHeight,
			RADIUS_SEGMENTS
		);

		material.color.set(color || getRandomColor());
		material.side = DoubleSide;

		tubeMesh = new Mesh(tubeGeometry, material);
		coneMesh = new Mesh(coneGeometry, material);

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
	}

	onMount(() => {
		setup();
	});

	/**
	 * When points are changed, update geometry & material color.
	 */
	afterUpdate(() => {
		scene.remove(tubeMesh);
		scene.remove(coneMesh);
		setup();

		// 	// Check if color is a valid css color accepts: [#fff, #f0f0f0, rgb(255, 255, 255), rgba(255, 255, 255, 1)] | rejects: [random, #rgba]
		if (!CSS.supports('color', color)) return;
		const newColor = new Color(color);

		// Check if color is updated
		if (material && !newColor.equals(material.color)) {
			material.color.set(newColor);
		}
	});

	onDestroy(() => {
		scene.remove(tubeMesh);
		scene.remove(coneMesh);
	});
</script>

{#if showDeconstruction}
	{#key endPosition}
		<Deconstruction end={endPosition} />
	{/key}
{/if}

{#if label.title}
	<SvelteLabel
		title={label.title}
		size={label.size}
		strokeColor={label.strokeColor}
		strokeWidth={label.strokeWidth}
		position={endPosition.clone().add(new Vector3(radius, radius, 0))}
	/>
{/if}

<slot {endPosition} />
