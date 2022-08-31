<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Point from '$lib/components/Point.svelte';
	// import PlaneFromPoints from '$lib/components/planes/PlaneFromPoints.svelte';

	import { PrimeColor } from '$lib/utils/getColor';
	import { PlaneSegments } from '$lib/utils/Segments';
	import { Vector3 } from 'three';

	let [x, y, z] = [1, 2, 3];
</script>

<input type="number" min="-10" bind:value={x} />
<input type="number" min="-10" bind:value={y} />
<input type="number" min="-10" bind:value={z} />

<Canvas enablePan>
	<Point />
	<Point position={new Vector3(x, y, z)} color={PrimeColor.green} label={'P'} />

	<Axis />
</Canvas>
