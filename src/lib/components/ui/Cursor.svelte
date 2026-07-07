<script lang="ts">
	import { onMount } from 'svelte';
	import { Spring } from 'svelte/motion';

	// Springy custom cursor that grows into a labelled disc over any element
	// carrying a `data-cursor` attribute. Hidden on coarse pointers / reduced
	// motion via the `.custom-cursor` rule in app.css.
	const pos = new Spring({ x: -100, y: -100 }, { stiffness: 0.12, damping: 0.4 });

	let label = $state('');
	let active = $state(false);

	onMount(() => {
		const move = (e: MouseEvent) => {
			pos.target = { x: e.clientX, y: e.clientY };
			const target = (e.target as HTMLElement)?.closest<HTMLElement>('[data-cursor]');
			if (target) {
				active = true;
				label = target.dataset.cursor ?? '';
			} else {
				active = false;
				label = '';
			}
		};
		window.addEventListener('mousemove', move);
		return () => window.removeEventListener('mousemove', move);
	});
</script>

<div
	class="custom-cursor pointer-events-none fixed top-0 left-0 z-[200] items-center justify-center rounded-full bg-fg/90 backdrop-blur-sm transition-[width,height] duration-200 ease-out"
	style="transform: translate({pos.current.x}px, {pos.current.y}px) translate(-50%, -50%); width: {active
		? 88
		: 10}px; height: {active ? 88 : 10}px;"
	aria-hidden="true"
>
	{#if active}
		<span class="px-1 font-mono text-[10px] tracking-[0.1em] whitespace-nowrap text-bg uppercase">
			{label}
		</span>
	{/if}
</div>
