<script lang="ts">
	import '../app.css';
	import { Navbar, Footer } from '$lib/components';
	import { initSmoothScroll } from '$lib/utils/smoothScroll';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		const cleanup = initSmoothScroll();
		return cleanup;
	});
</script>

<svelte:head>
	<!--
		Site-wide only. Per-page title/description/canonical/hreflang are owned by
		<Seo>, so nothing here can override a localized head.
	-->
	<link rel="icon" type="image/png" href="/images/favicon-pixel.png" />
	<meta name="author" content="Alvin Vincent Oswald Reba" />
</svelte:head>

<div class="flex min-h-screen flex-col bg-bg">
	<Navbar />

	<main class="flex-1">
		{@render children()}
	</main>

	<Footer />
</div>
