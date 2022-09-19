<script lang="ts">
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Vector from '$lib/components/Vector.svelte';
	import getRandomColor from '$lib/utils/getColor';
	import { Label } from '$lib/utils/label';
	import Slider from '$lib/utils/slider';

	import { Vector3 } from 'three';
	let axisLength = 12;
	let axisSpacing = 1;

	let sliders = [
		new Slider(1, -10, 10, 1),
		new Slider(1, -10, 10, 1),
		new Slider(1, -10, 10, 0.1)
	] as const;

	let l = 1;

	let color = getRandomColor();

	function toggleDirection() {
		const negatedVector = new Vector3(
			sliders[0].value,
			sliders[1].value,
			sliders[2].value
		).negate();

		sliders[0].value = negatedVector.x;
		sliders[1].value = negatedVector.y;
		sliders[2].value = negatedVector.z;
	}
</script>

<Canvas {sliders} let:sliderValues={[x, y, z]}>
	<input type="number" min="0" name="l" bind:value={l} />
	<button on:click={toggleDirection}>toggle direction</button>
	<p class="text-white">Direction (x, y, z): {x}, {y}, {z}</p>

	<Vector
		{color}
		origin={new Vector3(0, 1, 0)}
		direction={new Vector3(x, y, z)}
		length={l}
		label={new Label('x').setVector().setStroke(color, 1)}
	/>

	<Axis {axisLength} {axisSpacing} />
</Canvas>
