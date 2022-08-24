<script lang="ts">
	import Line from '$lib/components/Line.svelte';
	import Label from '$lib/components/Label.svelte';
	import { Scene, Vector3 } from 'three';

	export let scene: Scene;
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
	{scene}
	color="#EF4444"
	points={[new Vector3(-1 * axisLength, 0, 0), new Vector3(axisLength, 0, 0)]}
/>
<Line
	{scene}
	color="#15803D"
	points={[new Vector3(0, -1 * axisLength, 0), new Vector3(0, axisLength, 0)]}
/>
<Line
	{scene}
	color="#0EA5E9"
	points={[new Vector3(0, 0, -1 * axisLength), new Vector3(0, 0, axisLength)]}
/>

<!-- Tick indecators -->
{#if !hideTicks}
	{#each largeIndecators as indecator}
		<Line {scene} color="#EF4444" points={getPoints(indecator, tickSizes[0])} />
		<Line {scene} color="#15803D" points={getPoints(indecator, tickSizes[0], 1)} />
		<Line {scene} color="#0EA5E9" points={getPoints(indecator, tickSizes[0], 2)} />
	{/each}

	{#each smallIndecators as indecator}
		<Line {scene} color="#EF4444" points={getPoints(indecator, tickSizes[1])} />
		<Line {scene} color="#15803D" points={getPoints(indecator, tickSizes[1], 1)} />
		<Line {scene} color="#0EA5E9" points={getPoints(indecator, tickSizes[1], 2)} />
	{/each}
{/if}

<!-- Number indecators -->
{#if !hideNumbers}
	{#each smallIndecators as indecator}
		<Label {scene} title={'' + indecator} position={new Vector3(indecator, -0.1, 0)} />
		<Label {scene} title={'' + indecator} position={new Vector3(-0.1, indecator, 0)} />
		<Label {scene} title={'' + indecator} position={new Vector3(0, -0.1, indecator)} />
	{/each}
{/if}
