<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';

	import { BufferGeometry, Line, LineBasicMaterial, Scene, Vector3 } from 'three';

	import getColor from '$lib/utils/getColor';

	export let scene: Scene;

	export let color: string = '';
	export let material = new LineBasicMaterial({ color });
	export let points = [new Vector3(5, 0, 0), new Vector3(5, 0, 0)];

	let geometry = new BufferGeometry().setFromPoints(points);

	/**
	 * Init the vector
	 */
	onMount(() => {
		if (!color) {
			const params = points.map((p) => [p.x, p.y, p.z, p.length()]).flat();

			color = getColor(params);
			material = new LineBasicMaterial({ color });
			console.log(color);
		}

		let vec = new Line(geometry, material);
		scene.add(vec);
		vec.geometry.attributes.position.needsUpdate = true;
	});

	/**
	 * When points are changed, update geometry.
	 */
	afterUpdate(() => {
		geometry.setFromPoints(points);
		//TODO: update color
		//TODO: update material
	});
</script>
