<script lang="ts">
	let {
		label,
		completedLabel,
		onComplete
	}: { label: string; completedLabel: string; onComplete: () => void } = $props();

	const HOLD_MS = 900;
	const RADIUS = 34;
	const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

	let state = $state<'idle' | 'holding' | 'done'>('idle');
	let holdTimer: ReturnType<typeof setTimeout> | null = null;
	let resetTimer: ReturnType<typeof setTimeout> | null = null;

	const holding = $derived(state === 'holding');
	const done = $derived(state === 'done');

	function start() {
		if (state === 'done') return;
		state = 'holding';
		if (holdTimer) clearTimeout(holdTimer);
		holdTimer = setTimeout(() => {
			state = 'done';
			onComplete();
			if (resetTimer) clearTimeout(resetTimer);
			resetTimer = setTimeout(() => (state = 'idle'), 2200);
		}, HOLD_MS);
	}

	function cancel() {
		if (holdTimer) clearTimeout(holdTimer);
		if (state !== 'done') state = 'idle';
	}
</script>

<button
	type="button"
	onmousedown={start}
	onmouseup={cancel}
	onmouseleave={cancel}
	ontouchstart={(e) => {
		e.preventDefault();
		start();
	}}
	ontouchend={cancel}
	ontouchcancel={cancel}
	onkeydown={(e) => {
		if ((e.key === 'Enter' || e.key === ' ') && !e.repeat) {
			e.preventDefault();
			start();
		}
	}}
	onkeyup={(e) => {
		if (e.key === 'Enter' || e.key === ' ') cancel();
	}}
	aria-live="polite"
	data-cursor="Hold"
	class="group relative flex h-24 w-24 shrink-0 touch-none items-center justify-center rounded-full select-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:h-28 sm:w-28"
>
	<svg viewBox="0 0 80 80" class="absolute inset-0 -rotate-90">
		<circle cx="40" cy="40" r={RADIUS} fill="none" stroke="var(--color-border)" stroke-width="2" />
		<circle
			cx="40"
			cy="40"
			r={RADIUS}
			fill="none"
			stroke="var(--color-accent)"
			stroke-width="2"
			stroke-linecap="round"
			stroke-dasharray={CIRCUMFERENCE}
			stroke-dashoffset={holding || done ? 0 : CIRCUMFERENCE}
			style="transition: {holding
				? `stroke-dashoffset ${HOLD_MS}ms linear`
				: 'stroke-dashoffset 250ms ease-out'}"
		/>
	</svg>

	{#if done}
		<span class="absolute inset-0 animate-blast rounded-full border border-accent" aria-hidden="true"
		></span>
	{/if}

	<span
		class="flex h-[72%] w-[72%] items-center justify-center rounded-full text-center font-mono text-[10px] leading-tight tracking-[0.1em] uppercase transition-all duration-300 {holding
			? 'scale-95'
			: 'scale-100'} {done ? 'bg-accent text-bg' : 'bg-bg-elevated text-fg'}"
	>
		{done ? completedLabel : label}
	</span>
</button>
