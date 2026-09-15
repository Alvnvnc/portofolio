<script lang="ts">
	import { cn } from '$lib/utils';
	import Sticker from '$lib/components/ui/Sticker.svelte';

	let { class: className = '' }: { class?: string } = $props();
</script>

<figure class={cn('poster', className)}>
	<span class="tape" aria-hidden="true"></span>

	<div class="top">
		<span class="name kicker">Alvin Vincent</span>
		<span class="state mono"><i></i>available</span>
	</div>

	<p class="lockup display">AV</p>
	<p class="role kicker">full-stack / backend-deep</p>

	<dl class="spec">
		<div><dt class="mono">base</dt><dd>Surabaya, ID</dd></div>
		<div><dt class="mono">since</dt><dd>2022</dd></div>
		<div><dt class="mono">stack</dt><dd>Go · SvelteKit · PostgreSQL</dd></div>
	</dl>

	<div class="tools" aria-hidden="true">
		<span style="--rot:-6deg"><Sticker name="server" size={36} /></span>
		<span style="--rot:4deg"><Sticker name="database" size={36} /></span>
		<span style="--rot:-3deg"><Sticker name="terminal" size={36} /></span>
	</div>

	<div class="foot">
		<span class="bars" aria-hidden="true"></span>
		<span class="stamp mono">since 2022 · surabaya</span>
	</div>
</figure>

<style>
	.poster {
		position: relative;
		margin: 0;
		width: clamp(208px, 17.5vw, 248px);
		background: var(--surface);
		border: 3px solid var(--ink);
		border-radius: 20px;
		box-shadow: 8px 8px 0 var(--ink);
		padding: 18px 16px 15px;
		transform: rotate(-2deg);
		text-align: left;
	}

	.tape {
		position: absolute;
		top: -15px;
		left: 50%;
		translate: -50%;
		width: 106px;
		height: 28px;
		background: var(--yellow);
		border: 2px solid var(--ink);
		transform: rotate(-4deg);
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	.name {
		color: var(--ink);
		font-size: 0.6875rem;
	}

	.state {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.625rem;
		color: var(--ink-2);
	}

	.state i {
		width: 7px;
		height: 7px;
		border-radius: 999px;
		background: var(--yellow);
		border: 1.5px solid var(--ink);
	}

	.lockup {
		margin-top: 12px;
		font-size: clamp(2.1rem, 3.4vw, 2.7rem);
		letter-spacing: -0.02em;
		color: var(--ink);
	}

	.role {
		margin-top: 6px;
		font-size: 0.625rem;
		color: var(--ink-2);
	}

	.spec {
		margin-top: 12px;
		display: flex;
		flex-direction: column;
	}

	.spec > div {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		padding: 5.5px 0;
		border-top: 1px dashed #d4d4d8;
	}

	.spec dt {
		font-size: 0.625rem;
		color: var(--ink-3);
	}

	.spec dd {
		font-size: 0.75rem;
		font-weight: 520;
		color: var(--ink);
		text-align: right;
	}

	.tools {
		display: flex;
		align-items: center;
		gap: 9px;
		margin-top: 12px;
	}

	.tools span {
		display: inline-flex;
		transform: rotate(var(--rot, 0deg));
	}

	.foot {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		margin-top: 12px;
	}

	.bars {
		width: 62px;
		height: 15px;
		background-image: repeating-linear-gradient(
			90deg,
			var(--ink) 0 2px,
			transparent 2px 4px,
			var(--ink) 4px 7px,
			transparent 7px 9px
		);
	}

	.stamp {
		border: 2px solid var(--ink);
		border-radius: 999px;
		padding: 2px 8px;
		font-size: 0.5rem;
		letter-spacing: 0.04em;
		color: var(--ink-2);
		transform: rotate(-5deg);
	}
</style>
