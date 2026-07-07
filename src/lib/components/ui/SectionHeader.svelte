<script lang="ts">
	import { splitReveal, lineDraw, rise } from '$lib/actions/motion';

	// Editorial section header: mono index kicker, oversized display title
	// with the split blur-reveal, and a hairline that draws itself in.
	let {
		index,
		title,
		readout = ''
	}: { index: string; title: string; readout?: string } = $props();
</script>

<header class="mb-14 sm:mb-20">
	<p class="kicker" use:rise>
		<span class="text-accent">{index}</span>
		<span aria-hidden="true">/</span>
		{readout}
	</p>
	{#key title}
		<h2
			class="mt-5 font-display text-4xl leading-[0.95] text-fg uppercase sm:text-6xl"
			use:splitReveal={{ stagger: 0.07 }}
		>
			{title}
		</h2>
	{/key}
	<div class="hairline mt-8" use:lineDraw></div>
</header>
