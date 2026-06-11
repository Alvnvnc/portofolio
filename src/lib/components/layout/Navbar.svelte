<script lang="ts">
	import { cn } from '$lib/utils';
	import { navItems } from '$lib/data/portfolio';
	import { activeSection, theme } from '$lib/stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();

	let isMenuOpen = $state(false);
	let isScrolled = $state(false);

	const isHome = $derived($page.route.id === '/');

	// Handle scroll for navbar background
	$effect(() => {
		if (typeof window !== 'undefined') {
			const handleScroll = () => {
				isScrolled = window.scrollY > 50;
			};

			window.addEventListener('scroll', handleScroll);
			return () => window.removeEventListener('scroll', handleScroll);
		}
	});

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}

	function closeMenu() {
		isMenuOpen = false;
	}

	function handleNavClick(e: MouseEvent, href: string) {
		e.preventDefault();
		if (isHome) {
			const target = document.querySelector(href);
			if (target) {
				target.scrollIntoView({ behavior: 'smooth' });
			}
		} else {
			goto(`/${href}`);
		}
	}
</script>

<nav
	class={cn(
		'fixed top-0 left-0 right-0 z-50',
		'transition-all duration-300',
		isScrolled
			? 'bg-[var(--color-bg-primary)]/95 backdrop-blur-sm border-b-2 border-[var(--color-bg-tertiary)]'
			: 'bg-transparent',
		className
	)}
>
	<div class="max-w-6xl mx-auto px-4">
		<div class="flex items-center justify-between h-16">
			<!-- Logo -->
			<a
				href="/"
				onclick={(e) => handleNavClick(e, '#hero')}
				class="font-pixel text-sm text-[var(--color-accent-primary)] hover:text-[var(--color-pixel-green)] transition-colors"
			>
				{'<ALV/>'}
			</a>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-1">
				{#each navItems as item (item.id)}
					<a
						href={isHome ? item.href : `/${item.href}`}
						onclick={(e) => handleNavClick(e, item.href)}
						class={cn(
							'px-3 py-2 font-pixel text-[0.6rem] uppercase transition-all',
							'hover:text-[var(--color-accent-primary)] hover:bg-[var(--color-bg-tertiary)]',
							isHome && $activeSection === item.id
								? 'text-[var(--color-pixel-green)] bg-[var(--color-bg-tertiary)]'
								: 'text-[var(--color-text-secondary)]'
						)}
					>
						{item.label}
					</a>
				{/each}

				<!-- Theme Toggle -->
				<button
					class="ml-4 p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-accent-primary)] transition-colors"
					onclick={() => theme.toggle()}
					aria-label="Toggle theme"
				>
					{#if $theme === 'dark'}
						<span class="text-lg">🌙</span>
					{:else}
						<span class="text-lg">☀️</span>
					{/if}
				</button>
			</div>

			<!-- Mobile Menu Button -->
			<button
				class="md:hidden p-2 text-[var(--color-text-primary)]"
				onclick={toggleMenu}
				aria-label="Toggle menu"
			>
				<span class="font-pixel text-xl">{isMenuOpen ? '✕' : '☰'}</span>
			</button>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMenuOpen}
		<div class="md:hidden bg-[var(--color-bg-secondary)] border-t-2 border-[var(--color-bg-tertiary)]">
			<div class="px-4 py-4 space-y-2">
				{#each navItems as item (item.id)}
					<a
						href={isHome ? item.href : `/${item.href}`}
						class={cn(
							'block px-4 py-3 font-pixel text-[0.6rem] uppercase transition-all',
							'hover:bg-[var(--color-bg-tertiary)]',
							isHome && $activeSection === item.id
								? 'text-[var(--color-pixel-green)] bg-[var(--color-bg-tertiary)]'
								: 'text-[var(--color-text-secondary)]'
						)}
						onclick={(e) => { handleNavClick(e, item.href); closeMenu(); }}
					>
						{item.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
