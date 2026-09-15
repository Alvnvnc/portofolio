<script lang="ts">
	import { page } from '$app/stores';
	import Action from '$lib/components/ui/Action.svelte';
	import Sticker from '$lib/components/ui/Sticker.svelte';
</script>

<svelte:head>
	<title>Error {$page.status} | Alvin Vincent</title>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<section class="error">
	<div class="sheet inner">
		<span class="mark"><Sticker name="bolt" size={92} /></span>
		<p class="kicker code mono">{String($page.status).padStart(3, '0')}</p>
		<h1 class="display title">This route was never deployed</h1>
		<p class="lead message">
			{$page.error?.message ?? 'The page you asked for does not exist on this server.'}
		</p>
		<Action href="/" class="action">Back to the portfolio</Action>
	</div>
</section>

<style>
	.error {
		display: flex;
		align-items: center;
		min-height: 78svh;
		padding-block: calc(var(--topbar-h) + 40px) 80px;
	}

	.inner {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}

	.mark {
		margin-bottom: 26px;
		transform: rotate(-8deg);
	}

	.code {
		color: var(--blue);
	}

	.title {
		margin-top: 14px;
		font-size: clamp(2rem, 6vw, 4.4rem);
		color: var(--ink);
		max-width: 20ch;
	}

	.message {
		margin-top: 16px;
	}

	.error :global(.action) {
		margin-top: 32px;
	}
</style>
