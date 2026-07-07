<script lang="ts">
	import { useThrelte, useTask } from '@threlte/core';
	import { onMount } from 'svelte';
	import {
		BloomEffect,
		EffectComposer,
		EffectPass,
		RenderPass,
		VignetteEffect
	} from 'postprocessing';

	// Threlte has no built-in composer, so we drive the `postprocessing`
	// EffectComposer manually: disable Threlte's auto-render and run the
	// composer on the render stage instead. Reproduces the source's Bloom
	// glow + Vignette on the helix ribbon.
	const { renderer, scene, camera, size, autoRender, renderStage } = useThrelte();

	let composer: EffectComposer | undefined;

	onMount(() => {
		composer = new EffectComposer(renderer);
		composer.addPass(new RenderPass(scene, camera.current));
		const bloom = new BloomEffect({
			intensity: 0.9,
			luminanceThreshold: 0.2,
			luminanceSmoothing: 0.9,
			mipmapBlur: true
		});
		const vignette = new VignetteEffect({ offset: 0.2, darkness: 0.75 });
		composer.addPass(new EffectPass(camera.current, bloom, vignette));

		const previous = autoRender.current;
		autoRender.set(false);
		return () => {
			autoRender.set(previous);
			composer?.dispose();
			composer = undefined;
		};
	});

	$effect(() => {
		composer?.setSize(size.current.width, size.current.height);
	});

	useTask(
		(delta) => {
			composer?.render(delta);
		},
		{ stage: renderStage, autoInvalidate: false }
	);
</script>
