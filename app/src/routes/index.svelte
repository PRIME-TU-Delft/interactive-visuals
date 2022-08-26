<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Vector from '$lib/components/Vector.svelte';
	import getPseudoRandomColor from '$lib/utils/getColor';

	import { Vector3 } from 'three';
	let axisLength = 12;
	let axisSpacing = 1;

	let color = getPseudoRandomColor([Math.random()]);
</script>

<!-- select axis length from 1-15 -->
<select bind:value={axisLength}>
	{#each new Array(15) as _, i}
		<option value={i + 1}>{i + 1}</option>
	{/each}
</select>

<Canvas let:scene>
	<!-- <Cube {scene} /> -->
	<Vector
		{scene}
		{color}
		origin={new Vector3(0, 0, 0)}
		direction={new Vector3(1, 1, 0)}
		length={3}
	/>

	<Axis {scene} {axisLength} {axisSpacing} />
</Canvas>
