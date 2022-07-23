<script>
	import Canvas from '$lib/components/Canvas.svelte';
	import Cube from '$lib/components/Cube.svelte';
	import Line from '$lib/components/Line.svelte';
	import { Vector3 } from 'three';
</script>

<Canvas let:scene>
	<Cube {scene} />

	<Line {scene} color="#EF4444" />
	<Line {scene} color="#15803D" points={[new Vector3(0, -10, 0), new Vector3(0, 10, 0)]} />
	<Line {scene} color="#0EA5E9" points={[new Vector3(0, 0, -10), new Vector3(0, 0, 10)]} />
</Canvas>
