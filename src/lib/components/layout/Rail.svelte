<script lang="ts">
	import { reading } from '$lib/stores';
	import { sectionMeta } from '$lib/data/portfolio';

	const current = $derived(sectionMeta.find((s) => s.id === $reading.active));
</script>

<div class="rail" style="--p:{$reading.progress}" aria-hidden="true">
	<span class="line"></span>
	<span class="ticks"></span>
	<span class="fill"></span>
	<span class="head"></span>
</div>

<p class="readout mono" aria-hidden="true">
	<span class="count">{current?.index ?? '00'}</span>
	<span class="sep">/</span>
	<span class="total">06</span>
	<span class="name">{current?.label ?? 'intro'}</span>
</p>

<style>
	.rail {
		position: fixed;
		top: calc(var(--topbar-h) + 14px);
		bottom: 26px;
		right: var(--rail-x);
		width: 1px;
		z-index: 30;
		pointer-events: none;
	}

	.line {
		position: absolute;
		inset: 0;
		background: var(--rule);
	}

	.ticks {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: 10px;
		background-image:
			repeating-linear-gradient(to bottom, var(--rule-2) 0 1px, transparent 1px 60px),
			repeating-linear-gradient(to bottom, var(--rule) 0 1px, transparent 1px 12px);
		background-size:
			10px 60px,
			5px 12px;
		background-repeat: repeat-y;
		background-position: right top;
	}

	.fill {
		position: absolute;
		top: 0;
		left: -0.5px;
		width: 2px;
		height: calc(var(--p) * 100%);
		background: var(--signal);
	}

	.head {
		position: absolute;
		left: -3px;
		top: clamp(0px, calc(var(--p) * 100% - 3.5px), calc(100% - 7px));
		width: 7px;
		height: 7px;
		background: var(--signal);
	}

	.readout {
		position: fixed;
		right: calc(var(--rail-x) + 14px);
		bottom: 20px;
		z-index: 30;
		display: flex;
		align-items: baseline;
		gap: 4px;
		font-size: 0.6875rem;
		line-height: 1;
		color: var(--ink-3);
		pointer-events: none;
	}

	.count {
		color: var(--signal);
		font-weight: 600;
	}

	.sep,
	.total {
		color: var(--ink-3);
	}

	.name {
		margin-left: 6px;
		color: var(--ink-2);
	}

	@media (max-width: 767px) {
		.ticks {
			display: none;
		}
		.readout {
			display: none;
		}
	}
</style>
