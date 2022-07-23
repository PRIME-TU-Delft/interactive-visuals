<script>
	import Canvas from '$lib/components/Canvas.svelte';
	import Cube from '$lib/components/Cube.svelte';
</script>

<Canvas let:scene>
	<Cube {scene} />
</Canvas>
