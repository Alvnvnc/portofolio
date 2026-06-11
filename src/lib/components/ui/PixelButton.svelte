<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ButtonVariant, ButtonSize } from '$lib/types';

	interface Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		href?: string;
		external?: boolean;
		type?: 'button' | 'submit';
		disabled?: boolean;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		href,
		external = false,
		type = 'button',
		disabled = false,
		class: className = '',
		onclick,
		children
	}: Props = $props();

	const variantClasses: Record<ButtonVariant, string> = {
		primary: 'bg-amber text-night border-ink',
		secondary: 'bg-slot text-ink border-ink',
		ghost: 'bg-transparent text-fog border-seam hover:text-ink hover:border-ink',
		danger: 'bg-alert text-night border-ink'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'text-[0.5rem] px-3 py-2',
		md: 'text-[0.6rem] px-5 py-3',
		lg: 'text-[0.65rem] px-7 py-4'
	};

	const classes = $derived(
		cn(
			'px-btn inline-flex items-center justify-center gap-2',
			'font-pixel uppercase select-none whitespace-nowrap',
			variantClasses[variant],
			sizeClasses[size],
			disabled && 'is-disabled',
			className
		)
	);
</script>

{#if href}
	<a
		{href}
		class={classes}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		{onclick}
	>
		{@render children?.()}
	</a>
{:else}
	<button {type} class={classes} {disabled} {onclick}>
		{@render children?.()}
	</button>
{/if}

<style>
	/* Game-cartridge button mechanics: lift on hover, slam flat on press */
	.px-btn {
		border-style: solid;
		border-width: 3px;
		box-shadow: 4px 4px 0 0 var(--shadow);
		transition:
			transform 90ms steps(2, end),
			box-shadow 90ms steps(2, end);
	}
	.px-btn:hover:not(.is-disabled) {
		transform: translate(-2px, -2px);
		box-shadow: 6px 6px 0 0 var(--shadow);
	}
	.px-btn:active:not(.is-disabled) {
		transform: translate(3px, 3px);
		box-shadow: 0 0 0 0 var(--shadow);
	}
	.px-btn.is-disabled {
		opacity: 0.45;
		cursor: not-allowed;
		box-shadow: none;
	}
	@media (prefers-reduced-motion: reduce) {
		.px-btn,
		.px-btn:hover,
		.px-btn:active {
			transition: none;
			transform: none;
		}
	}
</style>
