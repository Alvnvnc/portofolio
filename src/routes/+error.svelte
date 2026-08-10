<script lang="ts">
	import { page } from '$app/stores';
	import { localizedPath } from '$lib/seo';
	import { isLocale, defaultLocale } from '$lib/i18n';

	// $t is unavailable here: the error page renders above the [[lang]] layout,
	// so page data may not exist at all. Fall back to the default locale.
	const loc = $derived(isLocale($page.data?.locale) ? $page.data.locale : defaultLocale);
</script>

<svelte:head>
	<title>Error {$page.status} | Alvin Vincent</title>
	<!-- Error pages must never enter the index. -->
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<div class="grain flex min-h-screen items-center justify-center px-6">
	<div class="max-w-md text-center">
		<p class="font-mono text-[11px] tracking-[0.2em] text-accent uppercase">Signal lost</p>
		<h1 class="mt-4 font-display text-7xl text-fg">{$page.status}</h1>
		<p class="mt-4 font-body text-lg text-fg-muted">
			{$page.error?.message ?? 'Page not found'}
		</p>
		<p class="mt-2 font-body text-sm text-fg-muted">
			Whatever you were looking for, it isn't deployed to this route.
		</p>
		<a
			href={localizedPath('/', loc)}
			data-cursor="Home"
			class="mt-8 inline-block rounded-full bg-accent px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-bg uppercase transition-opacity hover:opacity-90"
		>
			Back to home →
		</a>
	</div>
</div>
