<script lang="ts">
	import { onMount, onDestroy, beforeUpdate } from 'svelte';
	import { Vector3, type Scene } from 'three';

	import SpriteText from 'three-spritetext';

	export let scene: Scene;
	export let title: string;
	export let size: number = 0.1;
	export let position: Vector3 = new Vector3(0, 0, 0);

	let text: SpriteText;

	onMount(() => {
		text = new SpriteText(title, size);

		text.position.set(position.x, position.y, position.z);
		text.geometry.attributes.position.needsUpdate = true;

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

		if (!text.position.equals(position)) {
			text.position.set(position.x, position.y, position.z);
		}
	});

	onDestroy(() => {
		scene.remove(text);
	});
</script>