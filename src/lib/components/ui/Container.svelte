<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		variant?: 'default' | 'dark' | 'rounded' | 'centered';
		title?: string;
		class?: string;
		children?: import('svelte').Snippet;
	}

	let {
		variant = 'default',
		title,
		class: className = '',
		children
	}: Props = $props();

	const variantClasses: Record<string, string> = {
		default: 'nes-container',
		dark: 'nes-container is-dark',
		rounded: 'nes-container is-rounded',
		centered: 'nes-container is-centered'
	};

	const classes = $derived(
		cn(
			variantClasses[variant],
			title && 'with-title',
			className
		)
	);
</script>

<div class={classes}>
	{#if title}
		<p class="title font-pixel text-xs">{title}</p>
	{/if}
	{@render children?.()}
</div>
