<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { onMount } from 'svelte';
	import { WebGLRenderer } from 'three';
	import SceneObject from './SceneObject.svelte';

	let mounted = $state(false);
	let reducedMotion = $state(false);
	let cameraZ = $state(5);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		// On narrow screens the object sits further back so it reads as a
		// background accent behind the text rather than covering it.
		cameraZ = window.innerWidth < 640 ? 7.5 : 5;
		mounted = true;
		const onChange = () => (reducedMotion = mq.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});

	// Transparent canvas so the espresso page background shows through.
	const createRenderer = (canvas: HTMLCanvasElement) =>
		new WebGLRenderer({
			canvas,
			alpha: true,
			antialias: true,
			powerPreference: 'high-performance'
		});
</script>

<div class="pointer-events-none fixed inset-0 z-0" aria-hidden="true" style="contain: strict">
	{#if mounted}
		<Canvas {createRenderer} dpr={[1, 1.75]} renderMode={reducedMotion ? 'on-demand' : 'always'}>
			<T.PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={40} />

			<!-- Warm humanist lighting rig — key = warm clay, rim = cool sage. -->
			<T.AmbientLight intensity={0.55} color="#f0e2d0" />
			<T.DirectionalLight position={[4, 6, 4]} intensity={2.4} color="#ffd9a8" />
			<T.PointLight position={[-6, -2, -4]} intensity={30} color="#8a9a78" />
			<T.PointLight position={[3, -4, 2]} intensity={12} color="#d6835a" />

			<SceneObject {reducedMotion} />
		</Canvas>
	{/if}
</div>
