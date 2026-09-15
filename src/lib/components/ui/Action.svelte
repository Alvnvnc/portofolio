<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';

	let {
		href,
		variant = 'primary',
		type = 'button',
		disabled = false,
		external = false,
		onclick,
		children,
		class: className = ''
	}: {
		href?: string;
		variant?: 'primary' | 'ghost';
		type?: 'button' | 'submit';
		disabled?: boolean;
		external?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
		class?: string;
	} = $props();
</script>

{#if href}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		class={cn('action', variant, className)}
		{onclick}
	>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} class={cn('action', variant, className)} {onclick}>
		{@render children()}
	</button>
{/if}

<style>
	.action {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.8rem 1.35rem;
		border: 1px solid transparent;
		font-size: 0.9375rem;
		font-weight: 500;
		line-height: 1.2;
		letter-spacing: 0.004em;
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color 140ms ease,
			border-color 140ms ease,
			color 140ms ease;
	}

	.action:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.primary {
		background: var(--signal);
		color: var(--paper);
	}

	.primary:hover:not(:disabled) {
		background: var(--signal-deep);
	}

	.ghost {
		border-color: var(--rule-2);
		color: var(--ink);
		background: transparent;
	}

	.ghost:hover:not(:disabled) {
		border-color: var(--ink);
		background: var(--paper-2);
	}
</style>
