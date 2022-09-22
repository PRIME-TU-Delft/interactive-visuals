<script>
	import { Icon } from 'mdi-svelte-ts';
	import { Preview } from '/Users/abeldebruijn/Documents/GitHub/mdi-svelte-ts/src/lib/index.js';
	import { mdiFullscreen, mdiHeart, mdiHelp } from '@mdi/js';
	import { PrimeColor } from '$lib/utils/getColor';
</script>

<Icon path={mdiHeart} size={3} color={PrimeColor.yellow} />
<Icon path={mdiFullscreen} />
<Icon path={mdiHelp} />
<!-- <Icon path={mdiHeart} /> -->
<Preview />
