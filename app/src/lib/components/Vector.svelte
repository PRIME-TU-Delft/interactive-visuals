<script lang="ts">
	import { onMount, afterUpdate } from 'svelte';

	import { BufferGeometry, Line, MeshBasicMaterial, Scene, Vector3 } from 'three';

	export let scene: Scene;

	export let color: string = '#ff0000';
	export let material = new MeshBasicMaterial({ color });
	export let points = [new Vector3(5, 0, 0), new Vector3(5, 0, 0)];

	let geometry = new BufferGeometry().setFromPoints(points);
	let line = new Line(geometry, material);

	onMount(() => {
		scene.add(line);
		line.geometry.attributes.position.needsUpdate = true;
	});

	afterUpdate(() => {
		geometry = new BufferGeometry().setFromPoints(points);
		line = new Line(geometry, material);
		console.log(points);
		// line.updateMatrix();
	});
</script>
