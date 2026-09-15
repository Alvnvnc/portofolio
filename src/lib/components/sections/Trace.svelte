<script lang="ts">
	import type { Snippet } from 'svelte';

	let { children }: { children?: Snippet } = $props();
</script>

<div class="deck" aria-hidden="true">
	<svg viewBox="0 0 1200 200" preserveAspectRatio="none">
		<path
			class="wave"
			d="M0,130 H150 L162,130 L176,6 L222,6 L236,130 H360 L372,130 L403,-26 L430,130 H610 L624,130 L640,42 L694,42 L710,130 H1200"
			fill="none"
			pathLength="1"
		/>
	</svg>
	<span class="drop"></span>

	<div class="tags">
		<span class="tag t1"><i></i>pome</span>
		<span class="tag t2"><i></i>portal</span>
		<span class="tag t3"><i></i>lecsens</span>
	</div>

	{#if children}
		<div class="foot">
			{@render children()}
		</div>
	{/if}
</div>

<style>
	.deck {
		position: relative;
		z-index: 1;
		display: flex;
		flex: 1 1 auto;
		flex-direction: column;
		min-height: var(--trace-h);
		margin-top: calc(-1 * var(--name-overlap));
		margin-right: var(--rail-x);
	}

	svg {
		display: block;
		width: 100%;
		height: var(--trace-h);
		overflow: visible;
	}

	.wave {
		stroke: var(--signal);
		stroke-width: 1.5;
		vector-effect: non-scaling-stroke;
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		animation: trace-draw 1.7s cubic-bezier(0.3, 0.7, 0.2, 1) 0.35s forwards;
	}

	@keyframes trace-draw {
		to {
			stroke-dashoffset: 0;
		}
	}

	.drop {
		position: absolute;
		right: 0;
		top: calc(var(--trace-h) * 0.65);
		bottom: 0;
		width: 1.5px;
		background: var(--signal);
	}

	.tags {
		position: absolute;
		left: 0;
		right: 0;
		top: calc(var(--trace-h) * 0.65 + 16px);
	}

	.tag {
		position: absolute;
		display: flex;
		align-items: center;
		gap: 7px;
		font-family: var(--font-mono);
		font-size: 0.6875rem;
		line-height: 1;
		color: var(--ink-3);
		opacity: 0;
		animation: tag-in 0.5s ease forwards;
	}

	.tag i {
		display: block;
		width: 5px;
		height: 5px;
		background: var(--signal);
	}

	.t1 {
		left: 16.9%;
		animation-delay: 1.15s;
	}
	.t2 {
		left: 34%;
		animation-delay: 1.35s;
	}
	.t3 {
		left: 55.6%;
		animation-delay: 1.55s;
	}

	@keyframes tag-in {
		to {
			opacity: 1;
		}
	}

	.foot {
		margin-top: auto;
		padding-bottom: clamp(36px, 6vh, 64px);
	}

	@media (max-width: 767px) {
		.tag {
			font-size: 0.625rem;
		}
	}
</style>
