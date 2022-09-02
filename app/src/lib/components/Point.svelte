<script lang="ts">
	import { getContext, onMount, beforeUpdate, onDestroy } from 'svelte';
	import {
		BufferGeometry,
		Mesh,
		MeshBasicMaterial,
		Points,
		PointsMaterial,
		SphereGeometry,
		TextureLoader,
		Vector3
	} from 'three';

	import { sceneKey, type SceneContext } from '$lib/utils/sceneKey';
	import getRandomColor from '$lib/utils/getColor';
	import { Label } from '$lib/utils/label';

	import SvelteLabel from '$lib/components/Label.svelte';
	import { changeColor } from '$lib/utils/changeAttributes';

	export let label = Label.default(); // label text
	export let color: string = getRandomColor(); // color of point and label
	export let position: Vector3 = new Vector3(0, 0, 0); // position of the point and label
	export let size: number = 0.125; // Size of dot and label

	// Import scene from root Canvas.svelte. Context is used because store is too global.
	// More info: https://svelte.dev/docs#run-time-svelte-setcontext
	const { scene } = getContext<SceneContext>(sceneKey);

	const geometry = new SphereGeometry(size, 32, 16);
	const material = new MeshBasicMaterial({ color, transparent: true, opacity: 0.8 });
	let point: Mesh;

	onMount(() => {
		point = new Mesh(geometry, material);
		point.position.copy(position);

		scene.add(point);
	});

	beforeUpdate(() => {
		if (!point) return;

		// Change the position of the point.
		point.position.set(position.x, position.y, position.z);

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
