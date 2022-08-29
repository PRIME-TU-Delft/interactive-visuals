<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import PlaneFromPoints from '$lib/components/planes/PlaneFromPoints.svelte';
	import { PrimeColor } from '$lib/utils/getColor';

	let axisLength = 12;
	let axisSpacing = 1;
</script>

<Canvas enablePan let:scene>
	<PlaneFromPoints {scene} color={PrimeColor.green} />

	<Axis {scene} {axisLength} {axisSpacing} />
</Canvas>
