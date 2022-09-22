<script lang="ts">
	import { Vector3 } from 'three';

	import Axis from '$lib/components/Axis.svelte';
	import Canvas from '$lib/components/Canvas.svelte';
	import Vector from '$lib/components/Vector.svelte';
	import PlaneFromNormal from '$lib/components/planes/PlaneFromNormal.svelte';

	import { PrimeColor } from '$lib/utils/getColor';
	import Slider from '$lib/utils/slider';
	import { PlaneSegments } from '$lib/utils/Segments';

	let sliders = [new Slider(0, -1, 1, 0.2).red(), new Slider(1, -1, 1, 0.2).yellow()] as const;
</script>

<Canvas {sliders} let:sliderValues={[x, y]}>
	<!-- TODO: pass fig-number via url -->
	<div>Figure 12: Two planes with a line of intersection.</div>

	<Vector
		color={PrimeColor.ultramarine}
		length={10}
		origin={new Vector3(0, -3.5, 3.5)}
		direction={new Vector3(0, 1, -1)}
		coneHeight={0}
	/>

	{#if y !== x}
		<!-- Planes are not striped -->
		<PlaneFromNormal normal={new Vector3(x, 1, 1)} color={PrimeColor.red} />
		<PlaneFromNormal normal={new Vector3(y, 1, 1)} color={PrimeColor.yellow} />
	{:else}
		<!-- Planes are striped to show collision -->
		<PlaneFromNormal
			planeSegment={new PlaneSegments(32, 0, 2)}
			normal={new Vector3(x, 1, 1)}
			color={PrimeColor.red}
		/>

		<PlaneFromNormal
			planeSegment={new PlaneSegments(32, 1, 2)}
			normal={new Vector3(y, 1, 1)}
			color={PrimeColor.yellow}
		/>
	{/if}

	<Axis />
</Canvas>
