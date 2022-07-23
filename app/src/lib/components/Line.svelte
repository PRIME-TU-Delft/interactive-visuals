<script lang="ts">
	import { BufferGeometry, Line, MeshBasicMaterial, Scene, Vector3 } from 'three';

	export let scene: Scene;

	export let color: string = '#ff0000';
	export let material = new MeshBasicMaterial({ color });
	export let points = [new Vector3(-10, 0, 0), new Vector3(10, 0, 0)];

	const geometry = new BufferGeometry().setFromPoints(points);

	const line = new Line(geometry, material);

	scene.add(line);
</script>
