<script>
	import { Icon, Preview } from 'mdi-svelte-ts';
	import { mdiFullscreen, mdiHeart, mdiHelp } from '@mdi/js';
	import { PrimeColor } from '$lib/utils/getColor';
</script>

<Icon path={mdiHeart} size={3} color={PrimeColor.yellow} />
<Icon path={mdiFullscreen} />
<Icon path={mdiHelp} />
<!-- <Icon path={mdiHeart} /> -->
<Preview />
