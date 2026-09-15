<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		src,
		alt,
		caption,
		class: className = ''
	}: { src: string; alt: string; caption: string; class?: string } = $props();
</script>

<figure class={cn('plate', className)}>
	<div class="mat">
		<img {src} {alt} width="760" height="760" loading="lazy" decoding="async" />
	</div>
	<figcaption class="mono">
		<span class="tick"></span>
		{caption}
	</figcaption>
</figure>

<style>
	.plate {
		margin: 0;
	}

	.mat {
		border: 1px solid var(--rule);
		padding: 10px;
		background: var(--paper);
	}

	img {
		display: block;
		width: 100%;
		height: auto;
		aspect-ratio: 1 / 1;
		object-fit: cover;
	}

	figcaption {
		display: flex;
		align-items: center;
		gap: 8px;
		margin-top: 10px;
		font-size: 0.6875rem;
		line-height: 1.5;
		color: var(--ink-3);
	}

	.tick {
		width: 14px;
		height: 1px;
		flex: none;
		background: var(--ink-3);
	}
</style>
