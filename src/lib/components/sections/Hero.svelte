<script lang="ts">
	import { cn } from '$lib/utils';
	import { personalInfo, sectionMeta } from '$lib/data/portfolio';
	import Container from '$lib/components/ui/Container.svelte';
	import { onMount } from 'svelte';
	import { heroEntrance, typewriter, pulseGlow } from '$lib/utils/animations';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	const heroMeta = sectionMeta.find((s) => s.id === 'hero');

	let badgeEl: HTMLElement;
	let heroImgEl: HTMLElement;
	let nameEl: HTMLElement;
	let titleEl: HTMLElement;
	let taglineEl: HTMLElement;
	let ctaEl: HTMLElement;
	let scrollEl: HTMLElement;

	function scrollTo(e: MouseEvent, selector: string) {
		e.preventDefault();
		document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
	}

	onMount(() => {
		const elements = [badgeEl, heroImgEl, nameEl, titleEl, taglineEl, ctaEl, scrollEl].filter(Boolean);
		heroEntrance(elements);

		setTimeout(() => {
			typewriter(taglineEl, personalInfo.tagline, { speed: 0.03, delay: 0 });
		}, 1600);

		setTimeout(() => {
			pulseGlow(nameEl);
		}, 2000);
	});
</script>

<section
	id="hero"
	class={cn(
		'min-h-screen flex items-center justify-center',
		'bg-pixel-grid relative overflow-hidden',
		'px-4 py-20',
		className
	)}
>
	<!-- Background decoration -->
	<div class="absolute inset-0 pointer-events-none">
		<div class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--color-bg-primary)]"></div>
	</div>

	<div class="relative z-10 max-w-4xl mx-auto text-center">
		<!-- System Status Badge -->
		<div bind:this={badgeEl} style="opacity: 0;">
			<Container variant="dark" class="inline-block mb-8">
				<div class="flex items-center gap-3 px-4 py-2">
					<span class="w-2 h-2 bg-[var(--color-pixel-green)] rounded-full animate-blink"></span>
					<span class="font-pixel text-[0.6rem] text-[var(--color-pixel-green)] uppercase">
						{heroMeta?.subtitle || 'System Status: Online'}
					</span>
				</div>
			</Container>
		</div>

		<!-- Hero Pixel Art Scene -->
		<div bind:this={heroImgEl} class="mb-8 flex justify-center" style="opacity: 0;">
			<div class="hero-scene">
				<img
					src="/images/hero-pixel-scene.png"
					alt="Pixel art coding workspace"
					class="w-48 h-48 md:w-64 md:h-64 pixel-art object-cover rounded-lg"
				/>
				<!-- Scan line overlay -->
				<div class="scan-line"></div>
				<!-- Glow border -->
				<div class="glow-border"></div>
			</div>
		</div>

		<!-- Main Title -->
		<h1
			bind:this={nameEl}
			class="font-pixel text-2xl md:text-3xl lg:text-4xl text-[var(--color-accent-primary)] mb-4 leading-relaxed"
			style="opacity: 0;"
		>
			{personalInfo.name}
		</h1>

		<!-- Title / Role -->
		<h2
			bind:this={titleEl}
			class="font-terminal text-2xl md:text-3xl text-[var(--color-text-primary)] mb-6"
			style="opacity: 0;"
		>
			{personalInfo.title}
		</h2>

		<!-- Tagline (typewriter target) -->
		<p
			bind:this={taglineEl}
			class="font-terminal text-lg md:text-xl text-[var(--color-text-secondary)] mb-8 max-w-2xl mx-auto animate-cursor"
			style="opacity: 0;"
		>
			&nbsp;
		</p>

		<!-- CTA Buttons -->
		<div bind:this={ctaEl} class="flex flex-wrap items-center justify-center gap-4" style="opacity: 0;">
			<button class="nes-btn is-primary font-pixel text-[0.65rem] px-4 py-2 transition-transform active:translate-y-1" onclick={(e) => scrollTo(e, '#projects')}>
				View Projects
			</button>
			<button class="nes-btn font-pixel text-[0.65rem] px-4 py-2 transition-transform active:translate-y-1" onclick={(e) => scrollTo(e, '#contact')}>
				Get In Touch
			</button>
		</div>

		<!-- Scroll Indicator -->
		<div bind:this={scrollEl} class="mt-16 animate-float" style="opacity: 0;">
			<a
				href="#about"
				onclick={(e) => scrollTo(e, '#about')}
				class="inline-block text-[var(--color-text-muted)] hover:text-[var(--color-accent-primary)] transition-colors"
			>
				<span class="font-pixel text-xs block mb-2">Scroll</span>
				<span class="text-2xl">↓</span>
			</a>
		</div>
	</div>
</section>

<style>
	.hero-scene {
		position: relative;
		display: inline-block;
		animation: hero-float 4s ease-in-out infinite;
	}

	.hero-scene img {
		display: block;
		box-shadow:
			0 0 15px rgba(0, 255, 170, 0.3),
			0 0 30px rgba(0, 255, 170, 0.15);
	}

	/* Scan line CRT effect */
	.scan-line {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(0, 0, 0, 0.15) 2px,
			rgba(0, 0, 0, 0.15) 4px
		);
		pointer-events: none;
		border-radius: 0.5rem;
	}

	/* Animated glow border */
	.glow-border {
		position: absolute;
		inset: -3px;
		border: 2px solid transparent;
		border-radius: 0.6rem;
		pointer-events: none;
		animation: border-glow 3s ease-in-out infinite;
	}

	@keyframes hero-float {
		0%, 100% { transform: translateY(0); }
		50% { transform: translateY(-10px); }
	}

	@keyframes border-glow {
		0%, 100% {
			border-color: rgba(0, 255, 170, 0.2);
			box-shadow: 0 0 8px rgba(0, 255, 170, 0.1);
		}
		50% {
			border-color: rgba(0, 255, 170, 0.6);
			box-shadow: 0 0 20px rgba(0, 255, 170, 0.3);
		}
	}
</style>
