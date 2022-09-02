<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import PlaneFromNormal from '$lib/components/planes/PlaneFromNormal.svelte';
	// import PlaneFromPoints from '$lib/components/planes/PlaneFromPoints.svelte';

	import { PrimeColor } from '$lib/utils/getColor';
	import { PlaneSegments } from '$lib/utils/Segments';
	import { Vector3 } from 'three';

	let axisLength = 12;

	let segments = 32;
	let x = 1;
</script>

<input type="number" min="0" bind:value={segments} />
<input type="number" min="-10" bind:value={x} />

<Canvas enablePan>
	<PlaneFromNormal
		planeSegment={new PlaneSegments(segments, 0, 2)}
		normal={new Vector3(1, 1, 1)}
		color={PrimeColor.red}
	/>
	<PlaneFromNormal
		planeSegment={new PlaneSegments(segments, 1, 2)}
		normal={new Vector3(x, 1, 1)}
		color={PrimeColor.green}
	/>

	<Axis {axisLength} />
</Canvas>
