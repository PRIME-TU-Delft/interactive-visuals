<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Point from '$lib/components/Point.svelte';
	import Vector from '$lib/components/Vector.svelte';

	import { PrimeColor } from '$lib/utils/getColor';
	import { Label } from '$lib/utils/label';
	import { Vector3 } from 'three';

	let [x, y, z] = [1, 2, 3];
</script>

<input type="number" min="-10" bind:value={x} />
<input type="number" min="-10" bind:value={y} />
<input type="number" min="-10" bind:value={z} />

<Canvas enablePan>
	<Vector color={PrimeColor.red} direction={new Vector3(x, y, z)} length={2} let:endPosition>
		<Point
			position={endPosition.clone().multiplyScalar(0.5)}
			size={0.5}
			label={new Label('hoi')}
			color={PrimeColor.green}
		/>
		<Point position={endPosition} color={PrimeColor.green} label={new Label('P').setStroke()} />
	</Vector>

	<Axis />
</Canvas>
