<script lang="ts">
	import { cn } from '$lib/utils';
	import { personalInfo } from '$lib/data/portfolio';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
	import { onMount } from 'svelte';
	import { heroEntrance } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	// Boot sequence — typed out with CSS steps(), one line at a time
	const bootLines = [
		{ prompt: true, text: './alvin --init' },
		{ prompt: false, text: 'loading modules ........ go postgres influxdb [ok]' },
		{ prompt: false, text: 'mounting systems ....... pome portal lecsens [ok]' },
		{ prompt: false, text: 'freelance daemon ....... ACCEPTING REQUESTS' },
		{ prompt: false, text: 'ready. look around, nothing here bites.' }
	];

	let statusEl: HTMLElement;
	let nameEl: HTMLElement;
	let roleEl: HTMLElement;
	let bootEl: HTMLElement;
	let ctaEl: HTMLElement;
	let crtEl: HTMLElement;

	function scrollTo(e: MouseEvent, selector: string) {
		e.preventDefault();
		document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
	}

	onMount(() => {
		heroEntrance([statusEl, nameEl, roleEl, bootEl, ctaEl, crtEl].filter(Boolean));
	});
</script>

<section
	id="hero"
	class={cn(
		'console-grid relative flex min-h-[100svh] items-center overflow-hidden',
		'px-4 pt-28 pb-20 sm:px-6',
		className
	)}
>
	<div class="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
		<!-- Left: identity + boot log -->
		<div>
			<!-- Status row -->
			<div bind:this={statusEl} class="mb-7 flex flex-wrap items-center gap-x-5 gap-y-2">
				<span class="flex items-center gap-2">
					<span class="led led-blink bg-phosphor"></span>
					<span class="font-pixel text-[0.5rem] text-phosphor uppercase">Systems nominal</span>
				</span>
				<span class="flex items-center gap-2">
					<span class="led bg-amber"></span>
					<span class="font-pixel text-[0.5rem] text-amber uppercase">Open for freelance</span>
				</span>
				<span class="font-terminal text-base text-moss">SURABAYA · UTC+7</span>
			</div>

			<!-- Name -->
			<h1
				bind:this={nameEl}
				class="font-pixel text-2xl leading-relaxed text-ink sm:text-3xl lg:text-4xl"
			>
				ALVIN<br />VINCENT
			</h1>

			<!-- Role plate -->
			<p bind:this={roleEl} class="mt-4 mb-6 flex flex-wrap items-center gap-x-3 gap-y-2">
				<span class="px-shadow-sm inline-block border-2 border-ink bg-amber px-3 py-2 font-pixel text-[0.6rem] text-night uppercase">
					Backend Engineer
				</span>
				<span class="font-terminal text-lg text-moss">{personalInfo.fullName}</span>
			</p>

			<!-- Boot log -->
			<div
				bind:this={bootEl}
				class="px-shadow mb-8 max-w-xl border-[3px] border-ink bg-void p-4"
			>
				<div class="mb-3 flex items-center justify-between border-b-2 border-seam pb-2">
					<span class="font-pixel text-[0.45rem] text-moss uppercase">boot.log</span>
					<span class="flex gap-[5px]" aria-hidden="true">
						<span class="led bg-alert"></span>
						<span class="led bg-amber"></span>
						<span class="led bg-phosphor"></span>
					</span>
				</div>
				<div class="font-terminal text-base leading-relaxed sm:text-lg" aria-label={personalInfo.tagline}>
					{#each bootLines as line, i (i)}
						<div class={cn('overflow-hidden whitespace-nowrap', i === bootLines.length - 1 && 'cursor-block text-ink')}>
							{#if line.prompt}<span class="text-phosphor">$&nbsp;</span>{/if}<span
								class="boot-type align-bottom"
								style="--len:{line.text.length}; --delay:{0.9 + i * 0.55}s"
								class:text-fog={!line.prompt}
								class:text-phosphor={line.prompt}>{line.text}</span>
						</div>
					{/each}
				</div>
			</div>

			<!-- Tagline for humans (and crawlers) -->
			<p class="sr-only">{personalInfo.tagline}</p>

			<!-- CTAs -->
			<div bind:this={ctaEl} class="flex flex-wrap items-center gap-4">
				<PixelButton variant="primary" size="md" onclick={(e) => scrollTo(e, '#projects')}>
					Inspect systems <span aria-hidden="true">▸</span>
				</PixelButton>
				<PixelButton variant="ghost" size="md" onclick={(e) => scrollTo(e, '#contact')}>
					Open channel
				</PixelButton>
			</div>
		</div>

		<!-- Right: CRT monitor -->
		<div bind:this={crtEl} class="relative mx-auto w-full max-w-md lg:max-w-none">
			<!-- Stray pixels drifting around the monitor -->
			<span class="sprite-float absolute -top-6 left-8 h-[10px] w-[10px] bg-amber" style="animation-delay:.3s" aria-hidden="true"></span>
			<span class="sprite-float absolute -top-2 right-4 h-[7px] w-[7px] bg-phosphor" style="animation-delay:1.1s" aria-hidden="true"></span>
			<span class="sprite-float absolute -bottom-5 left-1/4 h-[8px] w-[8px] bg-seam" style="animation-delay:.7s" aria-hidden="true"></span>

			<div class="px-shadow-lg border-[3px] border-ink bg-void p-3 sm:p-4">
				<div class="relative overflow-hidden border-2 border-seam">
					<img
						src="/images/hero-pixel-scene.png"
						alt="Pixel art of a CRT workstation running green terminal code"
						class="pixel-art block aspect-square w-full object-cover"
						width="512"
						height="512"
						fetchpriority="high"
					/>
					<div class="scanlines pointer-events-none absolute inset-0" aria-hidden="true"></div>
				</div>
				<div class="mt-3 flex items-center justify-between">
					<span class="font-pixel text-[0.45rem] text-moss uppercase">CH-01 · Field console</span>
					<span class="flex items-center gap-2">
						<span class="led led-blink bg-alert"></span>
						<span class="font-pixel text-[0.45rem] text-alert uppercase">rec</span>
					</span>
				</div>
			</div>
		</div>
	</div>

	<!-- Scroll hint -->
	<a
		href="#about"
		onclick={(e) => scrollTo(e, '#about')}
		class="sprite-float absolute bottom-6 left-1/2 -translate-x-1/2 font-pixel text-[0.5rem] text-moss uppercase transition-colors hover:text-ink"
	>
		▼ system overview
	</a>

	<!-- Section seam -->
	<div class="dither absolute bottom-0 left-0 h-2 w-full" aria-hidden="true"></div>
</section>

<style>
	/* CSS-only typewriter: width snaps per character via steps() */
	.boot-type {
		display: inline-block;
		overflow: hidden;
		white-space: nowrap;
		max-width: 0;
		animation: boot-type 0.7s steps(24, end) forwards;
		animation-delay: var(--delay);
	}
	@keyframes boot-type {
		to {
			max-width: calc(var(--len) * 1ch);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.boot-type {
			animation: none;
			max-width: none;
		}
	}
</style>
