<script lang="ts">
	import getRandomColor from '$lib/utils/getColor';

	import { sceneKey, type SceneContext } from '$lib/utils/sceneKey';
	import { PlaneSegments } from '$lib/utils/Segments';

	import { onDestroy, onMount, beforeUpdate, getContext } from 'svelte';

	import { type Plane, Mesh, PlaneGeometry, MeshBasicMaterial, Vector3, DoubleSide } from 'three';

	export let plane: Plane;
	export let color = getRandomColor();
	export let size = 10;
	export let opacity = 0.8;
	export let planeSegment = PlaneSegments.default();

	const { scene } = getContext<SceneContext>(sceneKey);

	let planeMesh: Mesh;

	function setStripes() {
		if (!planeMesh) return;

		for (let i = 0; i < planeSegment.segments; i++) {
			if (i % planeSegment.interval == planeSegment.offset) {
				// A rectangle consists of two triangles --> 6 vertices
				planeMesh.geometry.addGroup(i * 6, 6, 0);
			}
		}
	}

	function setup() {
		let geometry: PlaneGeometry = new PlaneGeometry(size, size, planeSegment.segments, 1);

		if (planeSegment.direction == 'vertical') {
			new PlaneGeometry(size, size, 1, planeSegment.segments);
		}

		const materials = [
			new MeshBasicMaterial({ color, transparent: true, opacity, side: DoubleSide })
		];
		planeMesh = new Mesh(geometry, materials);

		// Set stripes | if segements is larger than 1
		if (planeSegment.segments > 1) setStripes();

		// Set position and rotation of plane
		const coplanairPoint = new Vector3(0, 0, 0);
		plane.coplanarPoint(coplanairPoint);
		planeMesh.position.set(coplanairPoint.x, coplanairPoint.y, coplanairPoint.z);
		planeMesh.quaternion.setFromUnitVectors(new Vector3(0, 0, 1), plane.normal);

		// Add to scene
		scene.add(planeMesh);
	}

	onMount(() => setup());

	beforeUpdate(() => {
		if (!planeMesh) return; // check if a plane exists

		scene.remove(planeMesh);
		setup();
	});

	onDestroy(() => {
		scene.remove(planeMesh);
	});
</script>
