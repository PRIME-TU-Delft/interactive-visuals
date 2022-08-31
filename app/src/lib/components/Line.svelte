<script lang="ts">
	import { onMount, afterUpdate, onDestroy, getContext } from 'svelte';

	import { BufferGeometry, Color, Line, LineBasicMaterial, Vector3 } from 'three';

	import getRandomColor from '$lib/utils/getColor';
	import { sceneKey, type SceneContext } from '$lib/utils/sceneKey';

	export let color: string = '';
	export let points: [Vector3, Vector3] = [new Vector3(5, 0, 0), new Vector3(5, 0, 0)];

	const { scene } = getContext<SceneContext>(sceneKey); // import scene from Canvas.svelte

	const geometry = new BufferGeometry().setFromPoints(points);
	const material = new LineBasicMaterial();
	let vector: Line;

	/**
	 * Init the vector
	 */
	onMount(() => {
		// Set a randomColor if no color is set
		color = color ?? getRandomColor();

		material.color.set(color);

		vector = new Line(geometry, material);
		vector.geometry.attributes.position.needsUpdate = true;
		scene.add(vector);
	});

	/**
	 * When points are changed, update geometry & material color.
	 */
	afterUpdate(() => {
		// Reset geometry
		geometry.setFromPoints(points); // TODO: check if geometry is updated

		// Check if color is a valid css color accepts: [#fff, #f0f0f0, rgb(255, 255, 255), rgba(255, 255, 255, 1)] | rejects: [random, #rgba]
		if (!CSS.supports('color', color)) return;

		const newColor = new Color(color);

		// Check if color is updated
		if (!newColor.equals(material.color)) {
			material.color.set(newColor);
		}
	});

	onDestroy(() => {
		scene.remove(vector);
	});
</script>
