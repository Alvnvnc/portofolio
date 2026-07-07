<script lang="ts">
	import { T, useTask } from '@threlte/core';
	import { Float } from '@threlte/extras';
	import { onMount, untrack } from 'svelte';
	import type { Group } from 'three';
	import { createDistortMaterial } from './distortMaterial';

	let { reducedMotion = false }: { reducedMotion?: boolean } = $props();

	let group = $state<Group | undefined>(undefined);
	const pointer = { x: 0, y: 0 };
	let scroll = 0;

	// Built once from the mount-time value; runtime changes are handled in useTask.
	const material = untrack(() =>
		createDistortMaterial({
			color: '#c9734a',
			roughness: 0.38,
			metalness: 0.08,
			distort: reducedMotion ? 0.2 : 0.36,
			speed: reducedMotion ? 0 : 1.5
		})
	);

	const damp = (current: number, target: number, lambda: number, dt: number) =>
		current + (target - current) * (1 - Math.exp(-lambda * dt));

	onMount(() => {
		const onMove = (e: PointerEvent) => {
			pointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
			pointer.y = (e.clientY / window.innerHeight - 0.5) * 2;
		};
		const onScroll = () => {
			scroll = Math.min(1.4, window.scrollY / window.innerHeight);
		};
		onScroll();
		window.addEventListener('pointermove', onMove, { passive: true });
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.removeEventListener('pointermove', onMove);
			window.removeEventListener('scroll', onScroll);
		};
	});

	useTask((delta) => {
		const g = group;
		if (!g) return;
		const dt = Math.min(delta, 0.05);

		// Advance the distortion noise clock.
		const shader = material.userData.shader;
		if (shader && !reducedMotion) shader.uniforms.uTime.value += dt * 1.5;

		if (reducedMotion) {
			g.rotation.y = -0.4;
			g.rotation.x = 0.1;
			g.position.y = 0.2;
			g.scale.setScalar(1.15);
			return;
		}

		const s = scroll;
		// Scroll drives a slow turn + gentle dolly so the object feels physically
		// connected to the page as it scrolls beneath the content.
		const targetRotY = -0.4 + s * Math.PI * 1.1 + pointer.x * 0.35;
		const targetRotX = 0.1 + pointer.y * 0.25 + s * 0.3;
		const targetPosY = 0.2 + s * 1.6;
		const targetPosX = pointer.x * 0.25 - s * 0.4;
		const targetScale = 1.15 - s * 0.25;

		g.rotation.y = damp(g.rotation.y, targetRotY, 4, dt);
		g.rotation.x = damp(g.rotation.x, targetRotX, 4, dt);
		g.position.y = damp(g.position.y, targetPosY, 3, dt);
		g.position.x = damp(g.position.x, targetPosX, 3, dt);
		g.scale.setScalar(damp(g.scale.x, targetScale, 3, dt));
	});
</script>

<T.Group bind:ref={group}>
	<Float
		speed={reducedMotion ? 0 : 1.4}
		rotationIntensity={reducedMotion ? 0 : 0.4}
		floatIntensity={reducedMotion ? 0 : 0.6}
	>
		<T.Mesh castShadow receiveShadow>
			<T.IcosahedronGeometry args={[1.15, 12]} />
			<T is={material} attach="material" />
		</T.Mesh>
	</Float>
</T.Group>
