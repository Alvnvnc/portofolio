<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { personalInfo } from '$lib/data/portfolio';
	import { t } from '$lib/i18n';

	let { ready = false }: { ready?: boolean } = $props();

	let heroEl: HTMLElement;
	let headingEl: HTMLHeadingElement;
	let meltEl: HTMLDivElement;

	// "Alvin Vincent Oswald Reba" → two big lines: given + family cluster.
	const parts = personalInfo.name.split(' ');
	const line1 = parts[0] ?? personalInfo.name;
	const line2 = parts.slice(1).join(' ');

	onMount(() => {
		const fine = window.matchMedia('(pointer: fine)').matches;
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		// Pointer parallax: each letter drifts by its depth.
		let removeMove: (() => void) | undefined;
		if (fine && !reduced) {
			const onMove = (e: MouseEvent) => {
				const rect = heroEl.getBoundingClientRect();
				const mx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
				const my = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
				heroEl.style.setProperty('--mx', mx.toFixed(3));
				heroEl.style.setProperty('--my', my.toFixed(3));
			};
			heroEl.addEventListener('mousemove', onMove);
			removeMove = () => heroEl.removeEventListener('mousemove', onMove);
		}

		// Scroll parallax: the giant name lifts + fades slower than the page,
		// and the espresso base melts up over the sculpture toward the archive.
		let ctx: gsap.Context | undefined;
		if (!reduced) {
			gsap.registerPlugin(ScrollTrigger);
			ctx = gsap.context(() => {
				gsap.to(headingEl, {
					yPercent: -18,
					opacity: 0.15,
					ease: 'none',
					scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: 0.6 }
				});
				gsap.fromTo(
					meltEl,
					{ opacity: 0 },
					{
						opacity: 1,
						ease: 'none',
						scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom 55%', scrub: 0.6 }
					}
				);
			}, heroEl);
		}

		return () => {
			removeMove?.();
			ctx?.revert();
		};
	});
</script>

<section
	bind:this={heroEl}
	id="hero"
	class="grain relative flex min-h-dvh flex-col justify-between overflow-hidden px-6 pt-28 pb-10 sm:px-10"
>
	<!-- Melt scrim: sculpture dissolves into the base at the bottom edge. -->
	<div
		bind:this={meltEl}
		aria-hidden="true"
		style="opacity: 0"
		class="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[60vh] bg-gradient-to-b from-transparent via-bg/70 to-bg"
	></div>

	<div
		class="relative z-10 flex flex-wrap items-start justify-between gap-4 font-mono text-[11px] tracking-[0.25em] text-fg-muted uppercase"
	>
		<span>{$t.hero.role}</span>
		<span class="text-right">{$t.hero.availability}</span>
	</div>

	<div class="relative z-10 flex flex-1 flex-col justify-center py-10">
		<h1
			bind:this={headingEl}
			class="flex flex-col font-display text-[16vw] leading-[0.85] font-extrabold text-fg uppercase [text-shadow:0_2px_40px_rgba(11,9,7,0.55)] sm:text-[11vw] lg:text-[9vw]"
		>
			<!--
				The name is rendered one <span> per letter for the reveal animation.
				Read straight, that is "A l v i n" — useless to a screen reader and to
				a crawler weighing the page's single strongest heading. So the letters
				are hidden from the a11y tree and the real heading text lives here.
			-->
			<span class="sr-only">{$t.hero.headingLabel}</span>
			<span class="contents" aria-hidden="true">
			{#each [line1, line2] as word, wi (wi)}
				{#if word}
					<span class="flex overflow-hidden">
						{#each word.split('') as char, i (i)}
							<span class="overflow-hidden">
								<span
									class="hero-letter inline-block"
									style="animation-delay: {(wi === 0 ? 0.1 : 0.4) + i * 0.045}s;"
								>
									<span
										class="inline-block transition-transform duration-300 ease-out will-change-transform"
										style="--depth: {(i % 2) + 1}; transform: translate3d(calc(var(--mx, 0) * var(--depth) * 6px), calc(var(--my, 0) * var(--depth) * 6px), 0);"
									>
										{char}
									</span>
								</span>
							</span>
						{/each}
					</span>
				{/if}
			{/each}
			</span>
		</h1>

		<p
			class="mt-8 max-w-md font-body text-lg text-fg-muted [text-shadow:0_1px_20px_rgba(11,9,7,0.85)] transition-all duration-700 sm:text-xl"
			style="opacity: {ready ? 1 : 0}; transform: translateY({ready ? 0 : 16}px); transition-delay: 0.9s;"
		>
			{$t.hero.tagline}
		</p>
	</div>

	<div class="relative z-10 flex items-end justify-between">
		<p
			class="max-w-[220px] font-mono text-[11px] tracking-[0.2em] text-fg-muted uppercase transition-opacity duration-700"
			style="opacity: {ready ? 1 : 0}; transition-delay: 1.1s;"
		>
			{$t.hero.location}
		</p>

		<a
			href="#projects"
			data-cursor={$t.hero.cursorView}
			class="group flex items-center gap-3 font-mono text-[11px] tracking-[0.2em] text-fg uppercase transition-opacity duration-700"
			style="opacity: {ready ? 1 : 0}; transition-delay: 1.2s;"
		>
			<span
				class="relative flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors group-hover:border-accent group-hover:text-accent"
			>
				<svg
					class="scroll-arrow"
					width="14"
					height="14"
					viewBox="0 0 14 14"
					fill="none"
					aria-hidden="true"
				>
					<path
						d="M7 1v11M2 8l5 5 5-5"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</span>
			{$t.hero.scroll}
		</a>
	</div>
</section>

<style>
	.hero-letter {
		animation: hero-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	@keyframes hero-rise {
		from {
			transform: translateY(110%);
		}
		to {
			transform: translateY(0);
		}
	}

	.scroll-arrow {
		animation: scroll-bob 1.6s ease-in-out infinite;
	}

	@keyframes scroll-bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(4px);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-letter,
		.scroll-arrow {
			animation: none;
		}
	}
</style>
