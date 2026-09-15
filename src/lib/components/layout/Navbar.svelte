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
		const onScroll = () => (scrolled = window.scrollY > 24);
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
		<a class="brand" href="/" onclick={(event) => go(event, '#hero')} aria-label="Alvin Vincent — home">
			<span class="mark"></span>
			Alvin Vincent
			<span class="role mono">full-stack developer</span>
		</a>

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

		<div class="meta mono">
			<span class="clock-wrap"><Clock /></span>
			<button
				class="menu"
				onclick={() => (open = !open)}
				aria-expanded={open}
				aria-label={open ? 'Close menu' : 'Open menu'}
			>
				{open ? 'close' : 'menu'}
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
					<span class="dot"></span>Available for work <Clock />
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
		background: transparent;
		transition:
			background-color 200ms ease,
			border-color 200ms ease;
		border-bottom: 1px solid transparent;
	}

	.topbar.solid {
		background: rgba(255, 255, 255, 0.92);
		backdrop-filter: blur(10px);
		border-bottom-color: var(--rule);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 24px;
		height: var(--topbar-h);
	}

	.brand {
		display: inline-flex;
		align-items: baseline;
		gap: 10px;
		font-size: 0.9375rem;
		font-weight: 600;
		letter-spacing: -0.01em;
		color: var(--ink);
		text-decoration: none;
		white-space: nowrap;
	}

	.mark {
		align-self: center;
		width: 7px;
		height: 7px;
		background: var(--signal);
	}

	.role {
		font-size: 0.6875rem;
		font-weight: 400;
		color: var(--ink-3);
	}

	nav {
		display: none;
		align-items: center;
		gap: 4px;
	}

	.nav-link {
		padding: 6px 10px 5px;
		font-size: 0.875rem;
		color: var(--ink-2);
		text-decoration: none;
		border-bottom: 1px solid transparent;
		transition:
			color 140ms ease,
			border-color 140ms ease;
	}

	.nav-link:hover {
		color: var(--ink);
	}

	.nav-link[aria-current='true'] {
		color: var(--ink);
		border-bottom-color: var(--signal);
	}

	.meta {
		display: flex;
		align-items: center;
		gap: 16px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.menu {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		color: var(--ink);
		text-decoration: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 3px;
		cursor: pointer;
	}

	.panel {
		background: var(--paper);
		border-bottom: 1px solid var(--rule);
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
		border-bottom: 1px solid var(--rule);
		font-size: 1.25rem;
		font-weight: 500;
		letter-spacing: -0.012em;
		color: var(--ink);
		text-decoration: none;
	}

	.panel-link[aria-current='true'] {
		color: var(--signal);
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
		width: 7px;
		height: 7px;
		background: var(--live);
	}

	@media (min-width: 900px) {
		nav {
			display: flex;
		}

		.menu,
		.panel {
			display: none;
		}
	}

	@media (max-width: 899px) {
		.clock-wrap {
			display: none;
		}
	}
</style>
