<script lang="ts">
	import { onMount, onDestroy, beforeUpdate } from 'svelte';
	import { Vector3, type Scene } from 'three';

	import SpriteText from 'three-spritetext';

	export let scene: Scene;
	export let title: string;
	export let size: number = 0.1;
	export let position: Vector3 = new Vector3(2, 0, 0);

	let text: SpriteText;

	onMount(() => {
		text = new SpriteText(title, size);

		text.position.add(position);

		scene.add(text);
	});

	beforeUpdate(() => {
		if (!text) return;

		if (text.text !== title) {
			text.text = title;
		}

		if (text.textHeight !== size) {
			text.textHeight = size;
		}
	});

	onDestroy(() => {
		scene.remove(text);
	});
</script>
