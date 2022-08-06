<script lang="ts">
	import Line from '$lib/components/Line.svelte';
	import { Scene, Vector3 } from 'three';

	export let scene: Scene;

	const largeIndecators = [-10, -8, -6, -4, -2, 2, 4, 6, 8, 10];
	const smallIndecators = [-9, -7, -5, -3, -1, 1, 3, 5, 7, 9];

	const indecatorSizes = [0.25, 0.125];

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

<!-- Axis lines -->
<Line {scene} color="#EF4444" />
<Line {scene} color="#15803D" points={[new Vector3(0, -10, 0), new Vector3(0, 10, 0)]} />
<Line {scene} color="#0EA5E9" points={[new Vector3(0, 0, -10), new Vector3(0, 0, 10)]} />

<!-- Distance indecators -->
{#each largeIndecators as indecator}
	<Line {scene} color="#EF4444" points={getPoints(indecator, indecatorSizes[0])} />
	<Line {scene} color="#15803D" points={getPoints(indecator, indecatorSizes[0], 1)} />
	<Line {scene} color="#0EA5E9" points={getPoints(indecator, indecatorSizes[0], 2)} />
{/each}

{#each smallIndecators as indecator}
	<Line {scene} color="#EF4444" points={getPoints(indecator, indecatorSizes[1])} />
	<Line {scene} color="#15803D" points={getPoints(indecator, indecatorSizes[1], 1)} />
	<Line {scene} color="#0EA5E9" points={getPoints(indecator, indecatorSizes[1], 2)} />
{/each}
