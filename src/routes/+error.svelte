<script lang="ts">
	import { page } from '$app/stores';
	import Action from '$lib/components/ui/Action.svelte';
</script>

<svelte:head>
	<title>Error {$page.status} | Alvin Vincent</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="error">
	<div class="sheet inner">
		<p class="mono code">{String($page.status).padStart(3, '0')}</p>
		<h1>Signal lost at this address</h1>
		<p class="lead message">
			{$page.error?.message ?? 'The route you asked for is not deployed here.'}
		</p>
		<Action href="/">Back to the portfolio</Action>
	</div>
</section>

<style>
	.error {
		display: flex;
		align-items: center;
		min-height: 72svh;
		padding-block: calc(var(--topbar-h) + 40px) 80px;
	}

	.code {
		font-size: 0.75rem;
		color: var(--signal);
	}

	h1 {
		margin-top: 14px;
		font-size: clamp(1.8rem, 4.6vw, 3.2rem);
		font-weight: 600;
		letter-spacing: -0.022em;
		line-height: 1.08;
		color: var(--ink);
	}

	.message {
		margin-top: 16px;
	}

	.error :global(.action) {
		margin-top: 32px;
	}
</style>
