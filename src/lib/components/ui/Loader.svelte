<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/i18n';

	let { onComplete, name = 'Alvin' }: { onComplete: () => void; name?: string } = $props();

	let progress = $state(0);
	let exiting = $state(false);
	let gone = $state(false);

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (reduced) {
			progress = 100;
			startExit(0);
			return;
		}

		let raf = 0;
		const duration = 1600;
		const start = performance.now();
		const tick = (now: number) => {
			const pct = Math.min(100, Math.round(((now - start) / duration) * 100));
			progress = pct;
			if (pct < 100) {
				raf = requestAnimationFrame(tick);
			} else {
				window.setTimeout(() => startExit(750), 300);
			}
		};
		raf = requestAnimationFrame(tick);
		return () => cancelAnimationFrame(raf);
	});

	function startExit(afterMs: number) {
		exiting = true;
		window.setTimeout(() => {
			gone = true;
			onComplete();
		}, afterMs);
	}
</script>

{#if !gone}
	<div
		class="fixed inset-0 z-[100] bg-bg transition-[clip-path] duration-[750ms] [transition-timing-function:cubic-bezier(0.76,0,0.24,1)]"
		style="clip-path: inset(0 0 {exiting ? 100 : 0}% 0);"
	>
		<div class="grain relative flex h-full w-full flex-col justify-between px-6 py-8 sm:px-10 sm:py-10">
			<div
				class="flex items-center justify-between font-mono text-[11px] tracking-[0.3em] text-fg-muted uppercase"
			>
				<span>{$t.loader.header}</span>
				<span class="tabular-nums">{progress.toString().padStart(3, '0')}</span>
			</div>

			<div class="flex flex-1 items-center justify-center overflow-hidden">
				<span
					class="loader-name font-display text-[15vw] leading-[0.9] tracking-tight text-fg sm:text-[9vw]"
				>
					{name}
				</span>
			</div>

			<div class="relative h-px w-full bg-border">
				<div class="absolute inset-y-0 left-0 bg-accent" style="width: {progress}%"></div>
			</div>
		</div>
	</div>
{/if}

<style>
	.loader-name {
		display: inline-block;
		animation: loader-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes loader-rise {
		from {
			transform: translateY(110%);
		}
		to {
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.loader-name {
			animation: none;
		}
	}
</style>
