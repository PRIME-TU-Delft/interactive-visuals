<script lang="ts">
	import { getContext, onMount, beforeUpdate, onDestroy } from 'svelte';
	import { BufferGeometry, Points, PointsMaterial, TextureLoader, Vector3 } from 'three';

	import { sceneKey, type SceneContext } from '$lib/utils/sceneKey';
	import getRandomColor from '$lib/utils/getColor';
	import { Label } from '$lib/utils/label';

	import SvelteLabel from '$lib/components/Label.svelte';
	import { changeBufferPosition, changeColor } from '$lib/utils/changeAttributes';

	export let label = Label.default(); // label text
	export let color: string = getRandomColor(); // color of point and label
	export let position: Vector3 = new Vector3(0, 0, 0); // position of the point and label
	export let size: number = 0.25; // Size of dot and label

	// Import scene from root Canvas.svelte. Context is used because store is too global.
	// More info: https://svelte.dev/docs#run-time-svelte-setcontext
	const { scene } = getContext<SceneContext>(sceneKey);

	const geometry = new BufferGeometry().setFromPoints([position]);
	const material = new PointsMaterial({ color, size, alphaTest: 0.5, transparent: true });
	let point: Points;

	onMount(() => {
		const sprite = new TextureLoader().load('/sprites/disc.png'); // Make material round
		material.map = sprite;

		point = new Points(geometry, material);

		scene.add(point);
	});

	beforeUpdate(() => {
		if (!point) return;

		// Change the position of the point.
		changeBufferPosition(geometry, [position]);

		// Change the color of the point.
		changeColor(material, color);
	});

	onDestroy(() => {
		scene.remove(point);
	});
</script>

{#if label.title}
	<SvelteLabel
		title={label.title}
		size={label.size}
		strokeColor={label.strokeColor}
		position={position.clone().add(new Vector3(size / 2, size / 2, 0))}
	/>
{/if}
