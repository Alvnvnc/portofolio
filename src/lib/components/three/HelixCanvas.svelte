<script lang="ts">
	import { Canvas, T } from '@threlte/core';
	import { onMount } from 'svelte';
	import HelixCards from './HelixCards.svelte';
	import Effects from './Effects.svelte';

	let { progress }: { progress: { current: number } } = $props();

	let mounted = $state(false);
	let reducedMotion = $state(false);
	let cameraZ = $state(7);

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mq.matches;
		// Narrow screens sit further back so more of the ribbon fits in frame.
		cameraZ = window.innerWidth < 640 ? 10 : 7;
		mounted = true;
		const onChange = () => (reducedMotion = mq.matches);
		mq.addEventListener('change', onChange);
		return () => mq.removeEventListener('change', onChange);
	});
</script>

{#if mounted}
	<Canvas dpr={[1, 1.75]}>
		<T.PerspectiveCamera makeDefault position={[0, 0, cameraZ]} fov={45} />
		<HelixCards {progress} {reducedMotion} />
		<Effects />
	</Canvas>
{/if}
