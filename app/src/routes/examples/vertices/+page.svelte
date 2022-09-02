<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Vector from '$lib/components/Vector.svelte';
	import getRandomColor, { PrimeColor } from '$lib/utils/getColor';
	import { Label } from '$lib/utils/label';

	import { Vector3 } from 'three';
	let axisLength = 12;
	let axisSpacing = 1;

	let color = getRandomColor();

	let [x, y, z, l] = [-3, -1, -3, 2];

	function toggleDirection() {
		const negatedVector = new Vector3(x, y, z).negate();
		x = negatedVector.x;
		y = negatedVector.y;
		z = negatedVector.z;
	}
</script>

<input type="number" name="x" bind:value={x} />
<input type="number" name="y" bind:value={y} />
<input type="number" name="z" bind:value={z} />
<input type="number" min="0" name="l" bind:value={l} />

<button on:click={toggleDirection}>toggle direction</button>

<Canvas>
	<Vector
		{color}
		origin={new Vector3(0, 1, 0)}
		direction={new Vector3(x, y, z)}
		length={l}
		label={new Label('x').setVector().setStroke(color, 1)}
	/>

	<Vector
		origin={new Vector3(0, 0, 0)}
		direction={new Vector3(1, 1, -1)}
		length={2}
		showDeconstruction
		let:endPosition
	>
		<Vector
			color={PrimeColor.green}
			origin={endPosition}
			direction={new Vector3(1, 2, 4)}
			length={2}
			showDeconstruction
		/>
	</Vector>

	<Axis {axisLength} {axisSpacing} />
</Canvas>
