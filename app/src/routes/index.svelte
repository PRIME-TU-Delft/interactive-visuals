<script>
	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import PlaneFromNormal from '$lib/components/planes/PlaneFromNormal.svelte';
	import PlaneFromPoints from '$lib/components/planes/PlaneFromPoints.svelte';
	import { PrimeColor } from '$lib/utils/getColor';

	let axisLength = 12;
	let axisSpacing = 1;
</script>

<Canvas enablePan let:scene>
	<PlaneFromPoints {scene} color={PrimeColor.green} />

	<PlaneFromNormal {scene} color={PrimeColor.yellow} />

	<!-- TODO: This plane is the same as the previous plane, but previous plane is not visible -->
	<PlaneFromNormal {scene} color={PrimeColor.red} opacity={0.5} />

	<Axis {scene} {axisLength} {axisSpacing} />
</Canvas>
