<script lang="ts">
	import { velocitySkew } from '$lib/actions/motion';

	let { text, class: className = '' }: { text: string; class?: string } = $props();

	const repeats = Array.from({ length: 6 });
</script>

<!-- Scroll velocity skews the ribbon slightly — printed tape, not a CSS loop. -->
<div class="relative flex overflow-hidden py-8 {className}" use:velocitySkew={{ max: 5 }}>
	<div class="marquee-track flex w-max animate-marquee">
		{#each [0, 1] as copy (copy)}
			<span class="flex shrink-0 items-center gap-10 pr-10" aria-hidden={copy === 1}>
				{#each repeats as _, i (i)}
					<span class="flex items-center gap-10">
						<span class="font-display text-[6vw] leading-none text-fg uppercase sm:text-4xl">
							{text}
						</span>
						<span class="h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true"></span>
					</span>
				{/each}
			</span>
		{/each}
	</div>
</div>
