<script lang="ts">
	import { reading } from '$lib/stores';

	let { id, index, label }: { id: string; index: string; label: string } = $props();

	const active = $derived($reading.active === id);
</script>

<div class="station" data-station-id={id} class:active aria-hidden="true">
	<span class="num mono">{index}</span>
	<span class="name mono">{label}</span>
	<span class="dot"></span>
</div>

<style>
	.station {
		position: absolute;
		top: clamp(84px, 11vh, 140px);
		right: calc(var(--rail-x) - 5px);
		display: flex;
		align-items: center;
		gap: 12px;
		pointer-events: none;
	}

	.num,
	.name {
		font-size: 0.6875rem;
		line-height: 1;
		color: var(--ink-3);
		transition: color 180ms ease;
	}

	.name {
		letter-spacing: 0.01em;
	}

	.dot {
		width: 10px;
		height: 10px;
		flex: none;
		background: var(--paper);
		border: 1.5px solid var(--ink-3);
		transition:
			background 180ms ease,
			border-color 180ms ease;
	}

	.active .num,
	.active .name {
		color: var(--signal);
	}

	.active .dot {
		background: var(--signal);
		border-color: var(--signal);
	}

	@media (max-width: 767px) {
		.station {
			top: clamp(72px, 10vh, 110px);
			gap: 0;
		}
		.name {
			display: none;
		}
		.num {
			margin-right: 10px;
		}
	}
</style>
