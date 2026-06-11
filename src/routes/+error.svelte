<script lang="ts">
	import { page } from '$app/stores';
	import Container from '$lib/components/ui/Container.svelte';
</script>

<svelte:head>
	<title>Error {$page.status} | Alvin Vincent</title>
</svelte:head>

<div class="min-h-screen flex items-center justify-center px-4 bg-pixel-grid">
	<div class="text-center">
		<Container variant="dark" class="inline-block">
			<div class="p-8">
				<h1 class="font-pixel text-3xl text-[var(--color-accent-danger)] mb-4">
					{$page.status}
				</h1>
				<p class="font-terminal text-lg text-[var(--color-text-secondary)] mb-6">
					{$page.error?.message ?? 'Page not found'}
				</p>
				<a href="/" class="nes-btn is-primary font-pixel text-[0.6rem]">
					Return Home
				</a>
			</div>
		</Container>
	</div>
</div>
