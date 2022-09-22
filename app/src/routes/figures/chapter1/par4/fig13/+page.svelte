<script lang="ts">
	import { Vector3 } from 'three';

	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import PlaneFromNormal from '$lib/components/planes/PlaneFromNormal.svelte';

	import { PrimeColor } from '$lib/utils/getColor';
	import Slider from '$lib/utils/slider';
	import { PlaneSegments } from '$lib/utils/Segments';

	const normal = new Vector3(1, 3, 1).normalize();

	let sliders = [new Slider(0, -5, 5, 1).red(), new Slider(0, -5, 5, 1).yellow()] as const;
</script>

<Canvas {sliders} let:sliderValues={[x, y]}>
	<div>Fig 13: Two planes that coincide.</div>

	{#if y !== x}
		<!-- Planes are not striped -->
		<PlaneFromNormal point={new Vector3(0, x, 0)} {normal} color={PrimeColor.red} />

		<PlaneFromNormal point={new Vector3(0, y, 0)} {normal} color={PrimeColor.yellow} />
	{:else}
		<!-- Planes are striped to show collision -->
		<PlaneFromNormal
			planeSegment={new PlaneSegments(32, 0, 2)}
			point={new Vector3(0, x, 0)}
			{normal}
			color={PrimeColor.red}
		/>

		<PlaneFromNormal
			planeSegment={new PlaneSegments(32, 1, 2)}
			point={new Vector3(0, y, 0)}
			{normal}
			color={PrimeColor.yellow}
		/>
	{/if}

	<Axis />
</Canvas>
