<script lang="ts">
	import Vector from '$lib/components/Vector.svelte';

	import PerspectiveCanvas from './PerspectiveCanvas.svelte';

	import { PrimeColor } from '$lib/utils/getColor';
	import Axis from '$lib/components/Axis.svelte';
	import Point from '$lib/components/Point.svelte';
	import OrthoCanvas from './OrthoCanvas.svelte';
	import { Vector3 } from 'three';
	import { Label } from '$lib/utils/label';

	let points = new Array(20)
		.fill(0)
		.map(
			(x) => new Vector3(Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 10 - 5)
		);

	function vectorToString(v: Vector3) {
		return '(' + v.x.toFixed(2) + ', ' + v.y.toFixed(2) + ', ' + v.z.toFixed(2) + ')';
	}
</script>

<div class="flex">
	<PerspectiveCanvas>
		<Vector direction={new Vector3(1, 1, 1)} length={3} color={PrimeColor.green} let:endPosition>
			<Vector
				origin={endPosition}
				direction={new Vector3(-1, 1, -1)}
				length={3}
				color={PrimeColor.red}
			/>
		</Vector>

		{#each points as point}
			<Point
				position={point}
				color={PrimeColor.red}
				label={new Label(vectorToString(point)).setStroke()}
			/>
		{/each}

		<Axis />
	</PerspectiveCanvas>

	<OrthoCanvas>
		<Vector direction={new Vector3(1, 1, 1)} length={3} color={PrimeColor.green} let:endPosition>
			<Vector
				origin={endPosition}
				direction={new Vector3(-1, 1, -1)}
				length={3}
				color={PrimeColor.red}
			/>
		</Vector>

		{#each points as point}
			<Point
				position={point}
				color={PrimeColor.red}
				label={new Label(vectorToString(point)).setStroke()}
			/>
		{/each}

		<Axis />
	</OrthoCanvas>
</div>

<style>
	.flex {
		display: flex;
		gap: 1rem;
	}
</style>
