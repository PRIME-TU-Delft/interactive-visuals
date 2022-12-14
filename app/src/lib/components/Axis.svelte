<script lang="ts">
	import { Vector3 } from 'three';

	import Line from '$lib/components/Line.svelte';
	import Label from '$lib/components/Label.svelte';

	import { PrimeColor } from '$lib/utils/getColor';

	export let hideNumbers = false;
	export let hideTicks = false;
	export let axisLength = 10;
	export let axisSpacing = 1;

	$: axisInterval = Math.floor(axisLength / axisSpacing);
	$: indecators = new Array(axisInterval * 2 + 1)
		.fill(0)
		.map((_, i) => (i - axisInterval) * axisSpacing); // range -axisLength to including axisLength
	$: largeIndecators = indecators.filter((x, i) => i % (axisSpacing * 2) === 0 && x !== 0); // Even minus 0 indecators
	$: smallIndecators = indecators.filter((x, i) => i % (axisSpacing * 2) === 1 && x !== 0); // Odd indecators

	const tickSizes = [0.25, 0.125]; // Ortigonal lenth of tick

	function getPoints(indecator: number, size: number, axis: number = 0): [Vector3, Vector3] {
		let from = new Vector3(indecator, 0, size);
		let to = new Vector3(indecator, 0, -size);

		if (axis == 1) {
			from.set(0, indecator, size);
			to.set(0, indecator, -size);
		}

		if (axis == 2) {
			from.set(size, 0, indecator);
			to.set(-size, 0, indecator);
		}

		return [from, to];
	}
</script>

<!-- Main axis lines -->
<Line
	color={PrimeColor.red}
	points={[new Vector3(-1 * axisLength, 0, 0), new Vector3(axisLength, 0, 0)]}
/>
<Line
	color={PrimeColor.green}
	points={[new Vector3(0, -1 * axisLength, 0), new Vector3(0, axisLength, 0)]}
/>
<Line
	color={PrimeColor.ultramarine}
	points={[new Vector3(0, 0, -1 * axisLength), new Vector3(0, 0, axisLength)]}
/>

<!-- Tick indecators -->
{#if !hideTicks}
	{#each largeIndecators as indecator}
		<Line color={PrimeColor.red} points={getPoints(indecator, tickSizes[0])} />
		<Line color={PrimeColor.green} points={getPoints(indecator, tickSizes[0], 1)} />
		<Line color={PrimeColor.ultramarine} points={getPoints(indecator, tickSizes[0], 2)} />
	{/each}

	{#each smallIndecators as indecator}
		<Line color={PrimeColor.red} points={getPoints(indecator, tickSizes[1])} />
		<Line color={PrimeColor.green} points={getPoints(indecator, tickSizes[1], 1)} />
		<Line color={PrimeColor.ultramarine} points={getPoints(indecator, tickSizes[1], 2)} />
	{/each}
{/if}

<!-- Number indecators -->
{#if !hideNumbers}
	{#each smallIndecators as indecator}
		<Label title={'' + indecator} position={new Vector3(indecator, -0.1, 0)} />
		<Label title={'' + indecator} position={new Vector3(-0.1, indecator, 0)} />
		<Label title={'' + indecator} position={new Vector3(0, -0.1, indecator)} />
	{/each}
{/if}
