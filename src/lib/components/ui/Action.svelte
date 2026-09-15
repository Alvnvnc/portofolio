<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utils';
	import { goToSection } from '$lib/utils/scroll';

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
		variant?: 'primary' | 'yellow' | 'ghost';
		type?: 'button' | 'submit';
		disabled?: boolean;
		external?: boolean;
		onclick?: (event: MouseEvent) => void;
		children: Snippet;
		class?: string;
	} = $props();

	function handleClick(event: MouseEvent) {
		if (onclick) {
			onclick(event);
			return;
		}
		if (href?.startsWith('#')) goToSection(event, href);
	}
</script>

{#if href}
	<a
		{href}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
		class={cn('pill', variant, className)}
		onclick={handleClick}
	>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} class={cn('pill', variant, className)} {onclick}>
		{@render children()}
	</button>
{/if}

<style>
	.pill {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.85rem 1.5rem;
		border: var(--border);
		border-radius: 999px;
		box-shadow: var(--shadow);
		font-family: 'Roboto Flex', sans-serif;
		font-weight: 560;
		font-size: 0.95rem;
		line-height: 1.1;
		text-decoration: none;
		cursor: pointer;
		transition:
			transform 160ms cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 160ms ease,
			background-color 160ms ease;
	}

	.pill:hover:not(:disabled) {
		transform: translate(-2px, -2px);
		box-shadow: var(--shadow-lg);
	}

	.pill:active:not(:disabled) {
		transform: translate(1px, 1px);
		box-shadow: 2px 2px 0 var(--ink);
	}

	.pill:disabled {
		opacity: 0.55;
		cursor: not-allowed;
	}

	.primary {
		background: var(--blue);
		color: var(--surface);
	}

	.yellow {
		background: var(--yellow);
		color: var(--ink);
	}

	.ghost {
		background: var(--surface);
		color: var(--ink);
	}
</style>
