<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import Action from '$lib/components/ui/Action.svelte';
	import Clock from '$lib/components/ui/Clock.svelte';
	import Trace from '$lib/components/sections/Trace.svelte';
</script>

<section id="hero" class="hero">
	<div class="sheet copy">
		<p class="meta mono">
			<span class="status"><span class="dot"></span>Available for work</span>
			<span>{personalInfo.location}</span>
			<Clock />
		</p>

		<h1 class="monument">
			Alvin Vincent<span class="sr-only">
				— freelance full-stack developer in Surabaya, Indonesia. Go APIs, data pipelines,
				dashboards, and production deploys.</span
			>
		</h1>
	</div>

	<Trace>
		<div class="sheet bottom">
			<p class="lead tagline">{personalInfo.tagline}</p>
			<div class="actions">
				<Action href="#contact">Start a project</Action>
				<Action href="#projects" variant="ghost">See the systems</Action>
			</div>
		</div>
	</Trace>
</section>

<style>
	.hero {
		--trace-h: 150px;
		--name-overlap: -25px;
		position: relative;
		display: flex;
		flex-direction: column;
		min-height: 100svh;
	}

	.copy {
		position: relative;
		z-index: 2;
		padding-top: calc(var(--topbar-h) + clamp(28px, 8vh, 96px));
		flex: none;
	}

	.meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 8px 26px;
		margin-bottom: clamp(18px, 3.6vh, 36px);
		font-size: 0.6875rem;
		color: var(--ink-2);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 9px;
		color: var(--ink);
	}

	.dot {
		width: 7px;
		height: 7px;
		background: var(--live);
		animation: live-pulse 2.6s ease-in-out infinite;
	}

	@keyframes live-pulse {
		0%,
		100% {
			opacity: 1;
		}
		50% {
			opacity: 0.3;
		}
	}

	h1 {
		font-size: clamp(2.8rem, 16vw, 7.5rem);
		color: var(--ink);
	}

	.tagline {
		max-width: 46ch;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		gap: 12px;
		margin-top: clamp(20px, 3.6vh, 38px);
	}

	@media (min-width: 768px) {
		.hero {
			--trace-h: 200px;
			--name-overlap: -30px;
		}
	}

	@media (min-width: 1024px) {
		.hero {
			--name-overlap: 64px;
		}

		h1 {
			font-size: clamp(3rem, 9.4vw, 8rem);
			white-space: nowrap;
		}
	}
</style>
