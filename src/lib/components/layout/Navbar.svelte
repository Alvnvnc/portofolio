<script lang="ts">
	import { cn } from '$lib/utils';
	import { navItems } from '$lib/data/portfolio';
	import { activeSection, theme } from '$lib/stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import PixelIcon from '$lib/components/ui/PixelIcon.svelte';
	import { onMount } from 'svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	let clock = $state('--:--');

	const isHome = $derived($page.route.id === '/');

	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				isScrolled = window.scrollY > 50;
			};
			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});

	// Live operator-local time — small proof a human in UTC+7 runs this console
	onMount(() => {
		const fmt = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Asia/Jakarta'
		});
		const tick = () => {
			clock = fmt.format(new Date());
		};
		tick();
		const id = setInterval(tick, 10_000);
		return () => clearInterval(id);
	});

	function handleNavClick(e: MouseEvent, href: string) {
		e.preventDefault();
		isMenuOpen = false;
		if (isHome) {
			document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
		} else {
			goto(`/${href}`);
		}
	}
</script>

<nav
	class={cn(
		'fixed top-0 right-0 left-0 z-50 transition-colors duration-200',
		isScrolled || isMenuOpen
			? 'border-b-[3px] border-ink bg-night'
			: 'border-b-[3px] border-transparent bg-transparent',
		className
	)}
	aria-label="Main navigation"
>
	<div class="mx-auto max-w-6xl px-4 sm:px-6">
		<div class="flex h-16 items-center justify-between gap-4">
			<!-- Console ID plate -->
			<a
				href="/"
				onclick={(e) => handleNavClick(e, '#hero')}
				class="px-shadow-sm flex items-center gap-2 border-2 border-ink bg-panel px-2 py-[6px]"
				aria-label="Back to top"
			>
				<span class="led led-blink bg-phosphor"></span>
				<span class="font-pixel text-[0.55rem] leading-none text-ink">ALV-01</span>
			</a>

			<!-- Desktop nav -->
			<div class="hidden items-center gap-1 md:flex">
				{#each navItems as item (item.id)}
					<a
						href={isHome ? item.href : `/${item.href}`}
						onclick={(e) => handleNavClick(e, item.href)}
						class={cn(
							'font-pixel px-3 py-2 text-[0.5rem] uppercase transition-colors',
							isHome && $activeSection === item.id
								? 'bg-slot text-amber'
								: 'text-moss hover:bg-slot hover:text-ink'
						)}
						aria-current={isHome && $activeSection === item.id ? 'true' : undefined}
					>
						{#if isHome && $activeSection === item.id}<span aria-hidden="true">▸&nbsp;</span>{/if}{item.label}
					</a>
				{/each}
			</div>

			<div class="flex items-center gap-3">
				<!-- Operator clock -->
				<span class="font-terminal hidden text-lg text-moss lg:inline" title="Operator local time">
					[{clock} WIB]
				</span>

				<!-- Theme switch -->
				<button
					class="border-2 border-seam p-2 text-amber transition-colors hover:border-ink"
					onclick={() => theme.toggle()}
					aria-label={$theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
					title={$theme === 'dark' ? 'Paper mode' : 'Phosphor mode'}
				>
					{#if $theme === 'dark'}
						<PixelIcon name="sun" size={14} />
					{:else}
						<PixelIcon name="moon" size={14} />
					{/if}
				</button>

				<!-- Mobile menu toggle -->
				<button
					class="border-2 border-seam p-2 text-ink transition-colors hover:border-ink md:hidden"
					onclick={() => (isMenuOpen = !isMenuOpen)}
					aria-label="Toggle menu"
					aria-expanded={isMenuOpen}
				>
					<span class="font-pixel block text-[0.7rem] leading-none">{isMenuOpen ? '✕' : '☰'}</span>
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile menu: full console overlay -->
	{#if isMenuOpen}
		<div class="console-grid border-t-2 border-seam bg-night md:hidden">
			<div class="space-y-1 px-4 py-5">
				{#each navItems as item, i (item.id)}
					<a
						href={isHome ? item.href : `/${item.href}`}
						class={cn(
							'font-pixel flex items-baseline gap-3 border-b border-seam px-2 py-4 text-[0.6rem] uppercase',
							isHome && $activeSection === item.id ? 'text-amber' : 'text-fog'
						)}
						onclick={(e) => handleNavClick(e, item.href)}
					>
						<span class="text-[0.45rem] text-moss">{String(i + 1).padStart(2, '0')}</span>
						{item.label}
						{#if isHome && $activeSection === item.id}<span class="ml-auto" aria-hidden="true">▸</span>{/if}
					</a>
				{/each}
				<p class="font-terminal px-2 pt-4 text-base text-moss">[{clock} WIB] · Surabaya, ID</p>
			</div>
		</div>
	{/if}
</nav>
