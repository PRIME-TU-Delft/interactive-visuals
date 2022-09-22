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
	let x = 0;

	$: v1 = new Vector3(x, 1, 1);

	$: planeEqual = v1.equals(new Vector3(1, 1, 1));
	$: planeInterval = planeEqual ? 2 : 1;
	$: planeOffset = planeEqual ? 1 : 0;
</script>

<input type="number" min="0" bind:value={segments} />
<input type="range" min="-1" max="2" step="0.1" bind:value={x} />

<Canvas>
	is Equal: {planeEqual}

	<PlaneFromNormal
		planeSegment={new PlaneSegments(segments, 0, planeInterval)}
		normal={new Vector3(1, 1, 1)}
		color={PrimeColor.red}
	/>
	<PlaneFromNormal
		planeSegment={new PlaneSegments(segments, planeOffset, planeInterval)}
		normal={v1}
		color={PrimeColor.green}
	/>

	<Axis {axisLength} />
</Canvas>
