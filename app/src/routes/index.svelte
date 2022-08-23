<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Vector from '$lib/components/Vector.svelte';
	import getPseudoRandomColor, { colors } from '$lib/utils/getColor';

	import { Vector3 } from 'three';
	let axisLength = 12;
	let axisSpacing = 3;

	let color = getPseudoRandomColor([Math.random()]);
</script>

<input type="number" bind:value={axisSpacing} />
<select bind:value={axisLength}>
	{#each new Array(15) as _, i}
		<option value={i}>{i}</option>
	{/each}
</select>

<Canvas let:scene>
	<!-- <Cube {scene} /> -->
	<Vector {scene} {color} points={[new Vector3(0, 5, 0), new Vector3(0, 0, -axisLength)]} />

	<Axis {scene} {axisLength} {axisSpacing} />
</Canvas>
