<script lang="ts">
	import type { RootContext } from '$lib/types/context';
	import { onMount, getContext } from 'svelte';
	import { BoxGeometry, Mesh, MeshBasicMaterial } from 'three';

	import { ROOT_KEY } from '$lib/utils/key';

	export let material = new MeshBasicMaterial({ color: 0x00ff00 });

	const { getRoot } = getContext<{ getRoot: () => RootContext }>(ROOT_KEY);

	let root = getRoot();
	let geometry = new BoxGeometry();

	const cube = new Mesh(geometry, material);

	onMount(() => {
		if (root) {
			root.scene.add(cube);
		}
		console.log(root);
		// const ROOT = getContext<RootContext>(ROOT_KEY);
		// ROOT.scene.add(cube);
	});
</script>
