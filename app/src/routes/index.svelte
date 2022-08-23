<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Vector from '$lib/components/Vector.svelte';
	import getPseudoRandomColor, { colors } from '$lib/utils/getColor';

	import { Vector3 } from 'three';
	let axisLength = 11;

	let color = getPseudoRandomColor([Math.random()]);
</script>

<input type="number" bind:value={axisLength} />
<select bind:value={color}>
	{#each [...colors, '#frd'] as clr}
		<option value={clr}>
			{clr}
		</option>
	{/each}
</select>

<Canvas let:scene>
	<!-- <Cube {scene} /> -->
	<Vector {scene} {color} points={[new Vector3(0, 5, 0), new Vector3(0, 0, axisLength)]} />

	<Axis {scene} {axisLength} />
</Canvas>
