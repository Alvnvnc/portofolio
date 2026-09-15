<script lang="ts">
	import Sticker from '$lib/components/ui/Sticker.svelte';

	import type { StickerName } from '$lib/types';

	let {
		items,
		tone = 'yellow',
		duration = 38,
		reverse = false,
		deco
	}: {
		items: string[];
		tone?: 'yellow' | 'blue';
		duration?: number;
		reverse?: boolean;
		deco?: StickerName;
	} = $props();
</script>

<div class="band {tone}" aria-hidden="true">
	{#if deco}
		<span class="deco" class:left={reverse}>
			<Sticker name={deco} size={104} />
		</span>
	{/if}
	<div class="track" class:reverse style="--dur:{duration}s">
		{#each [0, 1] as set (set)}
			<div class="set">
				{#each items as item, i (i)}
					<span class="item display">{item}</span>
					<span class="mark"><Sticker name="bolt" size={22} /></span>
				{/each}
			</div>
		{/each}
	</div>
</div>

<style>
	.band {
		overflow: hidden;
		border-top: var(--border);
		border-bottom: var(--border);
	}

	.yellow {
		background: var(--yellow);
		color: var(--ink);
	}

	.blue {
		background: var(--blue);
		color: var(--surface);
	}

	.track {
		display: flex;
		width: max-content;
		animation: marquee var(--dur, 38s) linear infinite;
	}

	.track.reverse {
		animation-direction: reverse;
	}

	.set {
		display: flex;
		align-items: center;
		gap: clamp(1rem, 2.2vw, 2.2rem);
		padding-right: clamp(1rem, 2.2vw, 2.2rem);
	}

	.item {
		font-size: clamp(1.3rem, 3.1vw, 2.4rem);
		line-height: 1;
		padding-block: 0.85rem;
		white-space: nowrap;
	}

	.mark {
		display: inline-flex;
	}

	.deco {
		position: absolute;
		top: -34px;
		right: 7%;
		transform: rotate(7deg);
		pointer-events: none;
	}

	.deco.left {
		right: auto;
		left: 6%;
		transform: rotate(-8deg);
	}

	.band {
		position: relative;
	}

	@keyframes marquee {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			animation: none;
		}
	}
</style>
