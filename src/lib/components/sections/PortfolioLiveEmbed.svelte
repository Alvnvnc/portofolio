<script lang="ts">
	import { cn } from '$lib/utils';
	import { onDestroy } from 'svelte';

	interface Props {
		url: string;
		title: string;
		/** Copy shown when the browser blocks the frame */
		fallback: string;
		class?: string;
	}

	let { url, title, fallback, class: className = '' }: Props = $props();

	// Cross-origin embedding can be refused by the upstream server
	// (X-Frame-Options / frame-ancestors). We can't read a blocked frame, so we
	// race a load event against a timeout and always keep an external escape hatch.
	type State = 'loading' | 'ready' | 'blocked';
	let linkState = $state<State>('loading');
	let attempt = $state(0);
	let timer: ReturnType<typeof setTimeout> | undefined;

	function arm() {
		clearTimeout(timer);
		linkState = 'loading';
		timer = setTimeout(() => {
			if (linkState === 'loading') linkState = 'blocked';
		}, 8000);
	}

	function onLoad() {
		clearTimeout(timer);
		if (linkState === 'loading') linkState = 'ready';
	}

	function onError() {
		clearTimeout(timer);
		linkState = 'blocked';
	}

	function retry() {
		attempt += 1;
		arm();
	}

	$effect(() => {
		attempt;
		arm();
	});

	onDestroy(() => clearTimeout(timer));
</script>

<div class={cn('rounded-2xl border border-border bg-bg-elevated/40 p-3 sm:p-4', className)}>
	<!-- Frame chrome -->
	<div class="mb-3 flex items-center justify-between border-b border-border pb-2">
		<span class="font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
			live · rapid.alvnvnc.site
		</span>
		<span class="flex items-center gap-2">
			<span
				class={cn(
					'h-1.5 w-1.5 rounded-full',
					linkState === 'ready' && 'bg-accent-2',
					linkState === 'loading' && 'bg-accent',
					linkState === 'blocked' && 'bg-accent'
				)}
			></span>
			<span class="font-mono text-[10px] tracking-[0.15em] text-fg-muted uppercase">
				{linkState === 'ready' ? 'online' : linkState === 'loading' ? 'linking' : 'blocked'}
			</span>
		</span>
	</div>

	<!-- Screen -->
	<div class="relative aspect-[16/10] overflow-hidden rounded-lg border border-border bg-bg">
		{#key attempt}
			<iframe
				src={url}
				{title}
				class="absolute inset-0 h-full w-full border-0"
				loading="lazy"
				referrerpolicy="no-referrer"
				sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
				onload={onLoad}
				onerror={onError}
			></iframe>
		{/key}

		{#if linkState === 'loading'}
			<div class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-bg/80 text-center">
				<span class="h-2 w-2 animate-pulse rounded-full bg-accent"></span>
				<p class="font-mono text-[11px] tracking-[0.15em] text-fg-muted uppercase">
					Establishing live link…
				</p>
			</div>
		{/if}

		{#if linkState === 'blocked'}
			<div class="absolute inset-0 z-20 flex flex-col items-center justify-center gap-5 bg-bg/95 px-6 text-center">
				<span class="rounded-full border border-accent px-3 py-1 font-mono text-[10px] tracking-[0.15em] text-accent uppercase">
					Embed refused
				</span>
				<p class="max-w-sm font-body text-sm leading-relaxed text-fg-muted">{fallback}</p>
				<div class="flex flex-wrap items-center justify-center gap-4">
					<a
						href={url}
						target="_blank"
						rel="noopener noreferrer"
						class="rounded-full bg-accent px-5 py-2 font-mono text-[11px] tracking-[0.2em] text-bg uppercase transition-opacity hover:opacity-90"
					>
						Open POME Guardian →
					</a>
					<button
						type="button"
						onclick={retry}
						class="font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-colors hover:text-fg"
					>
						Retry embed
					</button>
				</div>
			</div>
		{/if}
	</div>

	<!-- Persistent escape hatch -->
	<div class="mt-3 flex flex-wrap items-center justify-between gap-3">
		<p class="font-mono text-[10px] tracking-[0.1em] text-fg-muted uppercase">
			Embedding may be blocked by browser policy
		</p>
		<a
			href={url}
			target="_blank"
			rel="noopener noreferrer"
			data-cursor="Open"
			class="font-mono text-[11px] tracking-[0.2em] text-accent uppercase transition-colors hover:text-fg"
		>
			Open full system →
		</a>
	</div>
</div>
