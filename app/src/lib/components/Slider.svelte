<script lang="ts">
	import type Slider from '$lib/utils/slider';

	export let slider: Slider; // Enfore with typescript 0 - 3 sliders
</script>

<input
	type="range"
	min={slider.min}
	max={slider.max}
	step={slider.step}
	bind:value={slider.value}
/>
