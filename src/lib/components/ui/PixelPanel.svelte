<script lang="ts">
	import { cn } from '$lib/utils';

	type Accent = 'ink' | 'amber' | 'phosphor' | 'alert';

	interface Props {
		title?: string;
		accent?: Accent;
		variant?: 'panel' | 'slot' | 'night';
		shadow?: boolean;
		/** Decorative corner rivets, like a bolted-on faceplate */
		rivets?: boolean;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		title,
		accent = 'ink',
		variant = 'panel',
		shadow = true,
		rivets = false,
		class: className = '',
		children
	}: Props = $props();

	const bgClasses: Record<string, string> = {
		panel: 'bg-panel',
		slot: 'bg-slot',
		night: 'bg-night'
	};

	const accentClasses: Record<Accent, string> = {
		ink: 'bg-panel text-ink',
		amber: 'bg-amber text-night',
		phosphor: 'bg-phosphor text-night',
		alert: 'bg-alert text-night'
	};
</script>

<div
	class={cn(
		'relative border-[3px] border-ink p-5',
		bgClasses[variant],
		shadow && 'px-shadow',
		title && 'mt-3',
		className
	)}
>
	{#if title}
		<span
			class={cn(
				'absolute -top-[14px] left-3 border-[3px] border-ink px-2 py-[4px]',
				'font-pixel text-[0.45rem] uppercase leading-none tracking-wider',
				accentClasses[accent]
			)}
		>
			{title}
		</span>
	{/if}

	{#if rivets}
		<i class="rivet" style="top:5px;left:5px" aria-hidden="true"></i>
		<i class="rivet" style="top:5px;right:5px" aria-hidden="true"></i>
		<i class="rivet" style="bottom:5px;left:5px" aria-hidden="true"></i>
		<i class="rivet" style="bottom:5px;right:5px" aria-hidden="true"></i>
	{/if}

	{@render children?.()}
</div>

<style>
	.rivet {
		position: absolute;
		width: 5px;
		height: 5px;
		background: var(--seam);
		pointer-events: none;
	}
</style>
