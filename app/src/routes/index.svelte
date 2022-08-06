<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Cube from '$lib/components/Cube.svelte';
	import Vector from '$lib/components/Vector.svelte';
	import { Vector3 } from 'three';
	let a = 5;
</script>

<input type="number" bind:value={a} />

<Canvas let:scene>
	<Cube {scene} />
	<Vector {scene} points={[new Vector3(0, 0, 0), new Vector3(0, 5, a)]} />

	<Axis {scene} />
</Canvas>
