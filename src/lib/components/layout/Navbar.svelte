<script lang="ts">
	import { navItems } from '$lib/data/portfolio';
	import { activeSection } from '$lib/stores';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { cn } from '$lib/utils';
	import Clock from '$lib/components/ui/Clock.svelte';

	let { class: className = '' }: { class?: string } = $props();

	let open = $state(false);
	let scrolled = $state(false);

	const isHome = $derived($page.route.id === '/');

	$effect(() => {
		const onScroll = () => (scrolled = window.scrollY > 20);
		onScroll();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	function go(event: MouseEvent, href: string) {
		event.preventDefault();
		open = false;
		if (isHome) {
			document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
		} else {
			goto(`/${href}`);
		}
	}
</script>

<header class={cn('topbar', (scrolled || open) && 'solid', className)}>
	<div class="sheet bar">
		<a class="brand display" href="/" onclick={(event) => go(event, '#hero')} aria-label="Alvin Vincent — home">
			Alvin Vincent
		</a>

		<p class="role mono">full-stack developer / backend-deep</p>

		<nav aria-label="Main">
			{#each navItems as item (item.id)}
				<a
					class="nav-link"
					href={isHome ? item.href : `/${item.href}`}
					onclick={(event) => go(event, item.href)}
					aria-current={isHome && $activeSection === item.id ? 'true' : undefined}
				>
					{item.label}
				</a>
			{/each}
		</nav>

		<div class="meta">
			<span class="clock mono"><Clock /></span>
			<a class="cta mono" href={isHome ? '#contact' : '/#contact'} onclick={(event) => go(event, '#contact')}>
				Hire me
			</a>
			<button
				class="cta menu mono"
				onclick={() => (open = !open)}
				aria-expanded={open}
				aria-label={open ? 'Close menu' : 'Open menu'}
			>
				{open ? 'Close' : 'Menu'}
			</button>
		</div>
	</div>

	{#if open}
		<div class="panel">
			<div class="sheet">
				<nav aria-label="Mobile">
					{#each navItems as item, i (item.id)}
						<a
							class="panel-link"
							href={isHome ? item.href : `/${item.href}`}
							onclick={(event) => go(event, item.href)}
							aria-current={isHome && $activeSection === item.id ? 'true' : undefined}
						>
							<span class="panel-index mono">{String(i + 1).padStart(2, '0')}</span>
							{item.label}
						</a>
					{/each}
				</nav>
				<p class="panel-meta mono">
					<span class="dot"></span>Available for freelance <Clock />
				</p>
			</div>
		</div>
	{/if}
</header>

<style>
	.topbar {
		position: fixed;
		inset: 0 0 auto 0;
		z-index: 50;
		height: var(--topbar-h);
		border-bottom: 2px solid transparent;
		transition:
			background-color 200ms ease,
			border-color 200ms ease;
	}

	.topbar.solid {
		background: color-mix(in srgb, var(--paper) 92%, transparent);
		backdrop-filter: blur(10px);
		border-bottom-color: var(--ink);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 20px;
		height: var(--topbar-h);
	}

	.brand {
		font-size: 1.0625rem;
		font-weight: 760;
		color: var(--ink);
		text-decoration: none;
		white-space: nowrap;
		transition: color 140ms ease;
	}

	.brand:hover {
		color: var(--blue);
	}

	.role {
		display: none;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	nav {
		display: none;
		align-items: center;
		gap: 4px;
	}

	.nav-link {
		padding: 6px 12px;
		border: 2px solid transparent;
		border-radius: 999px;
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--ink-2);
		text-decoration: none;
		transition:
			color 140ms ease,
			background-color 140ms ease,
			border-color 140ms ease;
	}

	.nav-link:hover {
		color: var(--ink);
		background: var(--surface);
		border-color: var(--ink);
	}

	.nav-link[aria-current='true'] {
		background: var(--yellow);
		border-color: var(--ink);
		color: var(--ink);
		box-shadow: 2px 2px 0 var(--ink);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 12px;
	}

	.clock {
		display: none;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.cta {
		display: inline-flex;
		align-items: center;
		border: 2px solid var(--ink);
		border-radius: 999px;
		background: var(--yellow);
		box-shadow: 2px 2px 0 var(--ink);
		padding: 7px 14px;
		font-size: 0.75rem;
		color: var(--ink);
		text-decoration: none;
		cursor: pointer;
		transition:
			transform 160ms cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 160ms ease;
	}

	.cta:hover {
		transform: translate(-2px, -2px);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.panel {
		background: var(--paper);
		border-bottom: 2px solid var(--ink);
	}

	.panel nav {
		display: flex;
		flex-direction: column;
		align-items: stretch;
		padding: 8px 0 4px;
	}

	.panel-link {
		display: flex;
		align-items: baseline;
		gap: 16px;
		padding: 14px 0;
		border-bottom: 1px solid #d4d4d8;
		font-size: 1.375rem;
		font-weight: 600;
		letter-spacing: -0.012em;
		color: var(--ink);
		text-decoration: none;
	}

	.panel-link[aria-current='true'] {
		color: var(--blue);
	}

	.panel-index {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.panel-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px 20px;
		padding: 18px 0 22px;
		font-size: 0.6875rem;
		color: var(--ink-2);
	}

	.panel-meta .dot {
		width: 8px;
		height: 8px;
		background: var(--yellow);
		border: 2px solid var(--ink);
	}

	@media (min-width: 900px) {
		nav {
			display: flex;
		}

		.menu {
			display: none;
		}

		.panel {
			display: none;
		}
	}

	@media (min-width: 1180px) {
		.role {
			display: block;
		}

		.clock {
			display: block;
		}
	}
</style>
