<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		/** 1–4 filled squares */
		level: number;
		label: string;
		class?: string;
	}

	let { level, label, class: className = '' }: Props = $props();

	const filled = $derived(Math.max(0, Math.min(4, level)));
</script>

<span
	class={cn('inline-flex items-center gap-[3px]', className)}
	role="img"
	aria-label="{label}: level {filled} of 4"
	title="{label} — {filled}/4"
>
	{#each Array(4) as _, i (i)}
		<span
			class={cn(
				'h-[7px] w-[7px]',
				i < filled
					? filled === 4
						? 'bg-amber'
						: 'bg-phosphor'
					: 'border border-seam bg-transparent'
			)}
		></span>
	{/each}
</span>
