<script lang="ts">
	import { page } from '$app/stores';
	import PixelButton from '$lib/components/ui/PixelButton.svelte';
</script>

<svelte:head>
	<title>Error {$page.status} | Alvin Vincent</title>
</svelte:head>

<div class="console-grid flex min-h-screen items-center justify-center px-4">
	<div class="px-shadow-lg max-w-md border-[3px] border-ink bg-panel p-8 text-center">
		<p class="font-pixel mb-2 text-[0.5rem] text-alert uppercase">
			<span class="led led-blink mr-2 inline-block bg-alert"></span>signal lost
		</p>
		<h1 class="font-pixel mb-4 text-4xl text-ink">{$page.status}</h1>
		<p class="font-terminal mb-2 text-xl text-fog">
			{$page.error?.message ?? 'Sector not found'}
		</p>
		<p class="mb-7 text-sm text-moss">
			The map ends here. Whatever you were looking for, it isn't deployed to this route.
		</p>
		<PixelButton variant="primary" size="md" href="/">
			Respawn at home <span aria-hidden="true">▸</span>
		</PixelButton>
	</div>
</div>
