<script lang="ts">
	import { cn } from '$lib/utils';
	import type { ButtonVariant, ButtonSize } from '$lib/types';

	interface Props {
		variant?: ButtonVariant;
		size?: ButtonSize;
		disabled?: boolean;
		class?: string;
		href?: string;
		onclick?: () => void;
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		class: className = '',
		href,
		onclick,
		children
	}: Props = $props();

	const variantClasses: Record<ButtonVariant, string> = {
		primary: 'nes-btn is-primary',
		secondary: 'nes-btn',
		success: 'nes-btn is-success',
		warning: 'nes-btn is-warning',
		error: 'nes-btn is-error',
		ghost: 'nes-btn bg-transparent border-2 hover:bg-white/10'
	};

	const sizeClasses: Record<ButtonSize, string> = {
		sm: 'text-[0.5rem] px-2 py-1',
		md: 'text-[0.65rem] px-4 py-2',
		lg: 'text-[0.75rem] px-6 py-3'
	};

	const classes = $derived(
		cn(
			variantClasses[variant],
			sizeClasses[size],
			'font-pixel transition-transform active:translate-y-1',
			disabled && 'is-disabled opacity-50 cursor-not-allowed',
			className
		)
	);
</script>

{#if href}
	<a {href} class={classes}>
		{@render children?.()}
	</a>
{:else}
	<button class={classes} {disabled} {onclick}>
		{@render children?.()}
	</button>
{/if}
