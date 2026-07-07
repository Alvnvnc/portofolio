<script lang="ts">
	import { cn } from '$lib/utils';
	import { navItems, personalInfo } from '$lib/data/portfolio';
	import { activeSection } from '$lib/stores';
	import { t, locale, toggleLocale } from '$lib/i18n';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	let clock = $state('--:--');

	const isHome = $derived($page.route.id === '/');
	const isHashLink = (href: string) => href.startsWith('#');

	// nav item id → dictionary label
	const labelFor = (id: string) =>
		(
			({
				projects: $t.nav.work,
				services: $t.nav.services,
				skills: $t.nav.stack,
				about: $t.nav.about,
				portofolio: $t.nav.archive,
				contact: $t.nav.contact
			}) as Record<string, string>
		)[id] ?? id;

	function resolveHref(href: string): string {
		if (!isHashLink(href)) return href;
		return isHome ? href : `/${href}`;
	}

	function isActive(item: { id: string; href: string }): boolean {
		if (isHashLink(item.href)) return isHome && $activeSection === item.id;
		return $page.url.pathname === item.href;
	}

	$effect(() => {
		const handleScroll = () => (isScrolled = window.scrollY > 40);
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});

	$effect(() => {
		document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';
		return () => {
			document.documentElement.style.overflow = '';
		};
	});

	onMount(() => {
		const fmt = new Intl.DateTimeFormat('en-GB', {
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Asia/Jakarta'
		});
		const tick = () => (clock = fmt.format(new Date()));
		tick();
		const id = setInterval(tick, 10_000);
		return () => clearInterval(id);
	});

	function handleNavClick(e: MouseEvent, href: string) {
		isMenuOpen = false;
		if (!isHashLink(href)) return;
		e.preventDefault();
		if (isHome) {
			document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
		} else {
			goto(`/${href}`);
		}
	}
</script>

{#snippet localeToggle()}
	<button
		type="button"
		onclick={toggleLocale}
		title={$t.nav.switchLocale}
		aria-label={$t.nav.switchLocale}
		class="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.2em] uppercase"
	>
		<span class={$locale === 'en' ? 'text-fg' : 'text-fg-muted/60'}>EN</span>
		<span class="text-fg-muted/40" aria-hidden="true">/</span>
		<span class={$locale === 'id' ? 'text-fg' : 'text-fg-muted/60'}>ID</span>
	</button>
{/snippet}

<header
	class={cn(
		'fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-300 sm:px-10',
		isScrolled || isMenuOpen ? 'bg-bg/80 backdrop-blur-md' : 'bg-transparent'
	)}
>
	<a
		href="/"
		onclick={(e) => handleNavClick(e, '#hero')}
		class="font-display text-sm font-medium tracking-[0.15em] text-fg uppercase"
		aria-label="Back to top"
	>
		{personalInfo.name}
	</a>

	<nav class="hidden items-center gap-7 sm:flex">
		{#each navItems as item (item.id)}
			{@const active = isActive(item)}
			<a
				href={resolveHref(item.href)}
				onclick={(e) => handleNavClick(e, item.href)}
				aria-current={active ? 'true' : undefined}
				class={cn(
					'draw-link font-mono text-[11px] tracking-[0.2em] uppercase transition-colors',
					active ? 'text-fg' : 'text-fg-muted hover:text-fg'
				)}
			>
				{labelFor(item.id)}
			</a>
		{/each}
		{@render localeToggle()}
		<span
			class="flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-fg-muted uppercase"
			title={$t.nav.clockTitle}
		>
			<span class="live-dot h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true"></span>
			{clock} WIB
		</span>
	</nav>

	<div class="flex items-center gap-5 sm:hidden">
		{@render localeToggle()}
		<button
			type="button"
			onclick={() => (isMenuOpen = !isMenuOpen)}
			aria-label={isMenuOpen ? $t.nav.closeMenu : $t.nav.openMenu}
			aria-expanded={isMenuOpen}
			class="relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[6px]"
		>
			<span class={cn('h-px w-6 bg-fg transition-transform duration-300', isMenuOpen && 'translate-y-[3.5px] rotate-45')}></span>
			<span class={cn('h-px w-6 bg-fg transition-transform duration-300', isMenuOpen && '-translate-y-[3.5px] -rotate-45')}></span>
		</button>
	</div>
</header>

{#if isMenuOpen}
	<div class="mobile-menu fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-bg px-8 sm:hidden">
		{#each navItems as item, i (item.id)}
			<a
				href={resolveHref(item.href)}
				onclick={(e) => handleNavClick(e, item.href)}
				class="mobile-link flex items-baseline gap-4 font-display text-4xl text-fg"
				style="animation-delay: {0.15 + i * 0.06}s"
			>
				<span class="font-mono text-[11px] tracking-[0.2em] text-fg-muted" aria-hidden="true">
					{String(i + 1).padStart(2, '0')}
				</span>
				{labelFor(item.id)}
			</a>
		{/each}
		<p class="mt-6 font-mono text-[11px] tracking-[0.15em] text-fg-muted uppercase">
			{clock} WIB · Surabaya, ID
		</p>
	</div>
{/if}

<style>
	.mobile-menu {
		animation: menu-wipe 0.5s cubic-bezier(0.76, 0, 0.24, 1) both;
	}
	@keyframes menu-wipe {
		from {
			clip-path: inset(0 0 100% 0);
		}
		to {
			clip-path: inset(0 0 0% 0);
		}
	}
	.mobile-link {
		animation: link-rise 0.5s ease both;
	}
	@keyframes link-rise {
		from {
			opacity: 0;
			transform: translateY(24px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
	.live-dot {
		animation: live-blink 2.4s steps(1) infinite;
	}
	@keyframes live-blink {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.25;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.mobile-menu,
		.mobile-link,
		.live-dot {
			animation: none;
		}
	}
</style>
