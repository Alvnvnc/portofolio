<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		index,
		label,
		title,
		note,
		accent,
		class: className = ''
	}: {
		index: string;
		label: string;
		title: string;
		note?: string;
		accent?: string;
		class?: string;
	} = $props();

	const markup = $derived(
		accent && title.includes(accent)
			? title.replace(accent, `<span class="hl">${accent}</span>`)
			: title
	);
</script>

<header class={cn('max-w-4xl', className)}>
	<p class="kicker head">
		<span class="num mono">{index}</span>
		<span class="sq"></span>
		{label}
	</p>
	<h2
		class="mt-4 text-[clamp(1.9rem,4vw,3.1rem)] leading-[1.04] font-[650] tracking-[-0.02em] text-ink"
	>
		{@html markup}
	</h2>
	{#if note}
		<p class="lead mt-4">{note}</p>
	{/if}
</header>

<style>
	.head {
		display: flex;
		align-items: center;
		gap: 10px;
		font-stretch: 118%;
		letter-spacing: 0.1em;
		color: var(--ink-2);
	}

	.num {
		font-size: 0.6875rem;
		letter-spacing: 0;
		color: var(--blue);
	}

	.sq {
		width: 6px;
		height: 6px;
		background: var(--ink-3);
	}
</style>
