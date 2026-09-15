<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		title,
		note,
		children,
		class: className = ''
	}: { title: string; note?: string; children?: Snippet; class?: string } = $props();
</script>

<header class={cn('max-w-3xl', className)}>
	<h2 class="text-[clamp(1.85rem,4.2vw,3.1rem)] leading-[1.06] font-semibold tracking-[-0.022em] text-ink">
		{title}
	</h2>
	{#if note}
		<p class="lead mt-4">{note}</p>
	{/if}
	{#if children}
		{@render children()}
	{/if}
</header>
