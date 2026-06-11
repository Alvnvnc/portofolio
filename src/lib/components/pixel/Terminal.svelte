<script lang="ts">
	import { cn } from '$lib/utils';
	import { terminal } from '$lib/stores';

	interface Props {
		title?: string;
		class?: string;
	}

	let { title = 'terminal', class: className = '' }: Props = $props();

	// Get messages from store
	const messages = $derived($terminal);

	// Auto-scroll effect
	let terminalBody: HTMLDivElement;

	$effect(() => {
		if (terminalBody && messages.length > 0) {
			terminalBody.scrollTop = terminalBody.scrollHeight;
		}
	});
</script>

<div class={cn('terminal-window rounded-none', className)}>
	<!-- Terminal Header -->
	<div class="terminal-header flex items-center gap-2 px-3 py-2 bg-[var(--color-bg-tertiary)] border-b-2 border-[var(--color-text-muted)]">
		<!-- Window buttons (decorative) -->
		<div class="flex gap-1">
			<span class="w-3 h-3 rounded-full bg-[#f85149]"></span>
			<span class="w-3 h-3 rounded-full bg-[#d29922]"></span>
			<span class="w-3 h-3 rounded-full bg-[#3fb950]"></span>
		</div>
		<span class="font-terminal text-sm text-[var(--color-text-secondary)] ml-2">
			{title}
		</span>
	</div>

	<!-- Terminal Body -->
	<div
		bind:this={terminalBody}
		class="terminal-body bg-[var(--color-bg-primary)] p-4 min-h-[200px] max-h-[400px] overflow-y-auto font-terminal text-sm"
	>
		{#each messages as message (message.id)}
			<div
				class={cn(
					'terminal-line mb-1',
					message.type === 'input' && 'text-[var(--color-pixel-cyan)]',
					message.type === 'output' && 'text-[var(--color-text-primary)]',
					message.type === 'error' && 'text-[var(--color-accent-danger)]',
					message.type === 'success' && 'text-[var(--color-pixel-green)]'
				)}
			>
				{#if message.type === 'input'}
					<span class="text-[var(--color-pixel-green)]">$</span>
				{/if}
				{message.text}
			</div>
		{/each}

		<!-- Cursor -->
		<div class="terminal-cursor inline-block w-2 h-4 bg-[var(--color-pixel-green)] animate-blink"></div>
	</div>
</div>

<style>
	.terminal-window {
		border: 2px solid var(--color-text-muted);
		box-shadow: var(--shadow-pixel);
	}
</style>
