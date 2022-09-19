<script lang="ts">
	import { Icon } from 'mdi-svelte-ts';

	import { mdiAbTesting } from '@mdi/js';

	let color = '#ff0000';
	let size = 1;

	let flipH = false;
	let flipV = false;

	let spin = 0;
	let rotate = 0;
</script>

<h1 class="text-3xl font-bold underline">Hello world!</h1>

<h1>Welcome to your library project</h1>
<p>Create your package using @sveltejs/package and preview/showcase your work with SvelteKit</p>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

<input type="color" bind:value={color} />
<input type="range" min="0" max="10" bind:value={size} />
<input type="checkbox" bind:checked={flipH} />
<input type="checkbox" bind:checked={flipV} />
<input type="number" bind:value={spin} />
<input type="number" bind:value={rotate} />

<Icon path={mdiAbTesting} {color} {size} {flipH} {flipV} {spin} {rotate} />
