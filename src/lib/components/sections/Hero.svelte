<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import Action from '$lib/components/ui/Action.svelte';
	import Sticker from '$lib/components/ui/Sticker.svelte';
</script>

<section id="hero" class="hero">
	<div class="deco" aria-hidden="true">
		<span class="st s1" style="--rot:-9deg;--d:.30s;--dd:0s"><Sticker name="server" size={120} /></span>
		<span class="st s2" style="--rot:7deg;--d:.38s;--dd:1.1s"><Sticker name="database" size={128} /></span>
		<span class="st s3" style="--rot:-4deg;--d:.46s;--dd:2.2s"><Sticker name="sensor" size={104} /></span>
		<span class="st s4" style="--rot:5deg;--d:.54s;--dd:.6s"><Sticker name="cloud" size={118} /></span>
		<span class="st s5" style="--rot:6deg;--d:.62s;--dd:1.6s"><Sticker name="terminal" size={112} /></span>
		<span class="st s6" style="--rot:-7deg;--d:.70s;--dd:2.7s"><Sticker name="queue" size={116} /></span>
	</div>

	<div class="sheet inner">
		<h1 class="display name">
			<span class="sr-only">Alvin Vincent — </span>
			<span class="line"><span class="rise">Full-stack</span></span>
			<span class="line"><span class="rise">Developer</span></span>
		</h1>

		<p class="caption mono">(api / data pipelines / dashboards / deploys)</p>

		<a class="badge" href="#contact">
			<span class="badge-text kicker">open for freelance</span>
			<span class="badge-arrow" aria-hidden="true">→</span>
		</a>

		<div class="actions">
			<Action href="#contact" variant="yellow">Start a project</Action>
			<Action href="#projects" variant="ghost">See the systems</Action>
		</div>

		<ul class="stats mono">
			<li>3 systems in production</li>
			<li>shipping since 2022</li>
			<li>Go / SvelteKit / PostgreSQL / Docker</li>
		</ul>
	</div>

	<p class="corner left mono">
		{personalInfo.location}<br />working worldwide (UTC+7)
	</p>
	<p class="corner right mono">Available for freelance<br />replies within a working day</p>
	<p class="scroll mobile-hide mono">scroll ↓</p>
</section>

<style>
	.hero {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 100svh;
		padding: calc(var(--topbar-h) + 32px) 0 88px;
		overflow: hidden;
	}

	.inner {
		position: relative;
		z-index: 2;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.name {
		font-size: clamp(2.8rem, 14.6vw, 13.2rem);
	}

	.line {
		display: block;
		overflow: hidden;
	}

	.rise {
		display: block;
		white-space: nowrap;
		animation: rise 960ms cubic-bezier(0.22, 0.8, 0.2, 1) both;
	}

	.line:nth-child(2) .rise {
		animation-delay: 0.09s;
	}

	@keyframes rise {
		from {
			transform: translateY(104%);
		}
		to {
			transform: translateY(0);
		}
	}

	.caption {
		margin-top: clamp(20px, 3vh, 32px);
		font-size: 0.9375rem;
		letter-spacing: 0.01em;
		color: var(--ink-3);
		opacity: 0;
		animation: fade-up 620ms ease 0.5s both;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		margin-top: clamp(18px, 3vh, 30px);
		padding: 11px 20px;
		background: var(--yellow);
		border: 2px solid var(--ink);
		border-radius: 999px;
		box-shadow: 5px 5px 0 var(--ink);
		color: var(--ink);
		text-decoration: none;
		transform: rotate(-2deg);
		transition:
			transform 220ms cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 220ms ease;
		opacity: 0;
		animation: fade-up 620ms ease 0.56s both;
	}

	.badge:hover {
		transform: rotate(0deg) translate(-2px, -2px);
		box-shadow: 7px 7px 0 var(--ink);
	}

	.badge-arrow {
		font-size: 1rem;
		line-height: 1;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 14px;
		margin-top: clamp(22px, 3.4vh, 38px);
		opacity: 0;
		animation: fade-up 620ms ease 0.62s both;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px 24px;
		margin-top: clamp(26px, 4vh, 44px);
		font-size: 0.75rem;
		color: var(--ink-2);
		opacity: 0;
		animation: fade-up 620ms ease 0.74s both;
	}

	.stats li {
		display: flex;
		align-items: center;
		gap: 24px;
	}

	.stats li + li::before {
		content: '';
		width: 5px;
		height: 5px;
		background: var(--ink-3);
	}

	@keyframes fade-up {
		from {
			opacity: 0;
			transform: translateY(14px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.corner {
		position: absolute;
		bottom: 34px;
		font-size: 0.6875rem;
		line-height: 1.7;
		color: var(--ink-3);
		opacity: 0;
		animation: fade-up 620ms ease 0.85s both;
	}

	.corner.left {
		left: clamp(20px, 4.5vw, 64px);
	}

	.corner.right {
		right: clamp(20px, 4.5vw, 64px);
		text-align: right;
	}

	.scroll {
		position: absolute;
		bottom: 34px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.6875rem;
		color: var(--ink-3);
		animation: fade-up 620ms ease 0.95s both;
	}

	.deco {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.st {
		position: absolute;
		width: clamp(56px, 7vw, 116px);
		pointer-events: auto;
		user-select: none;
		transform: rotate(var(--rot, 0deg));
		transition: transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1);
		animation: sticker-pop 760ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
		animation-delay: var(--d, 0.3s);
	}

	.st:hover {
		animation: none;
		transform: rotate(0deg) scale(1.08);
	}

	.st :global(svg) {
		display: block;
		width: 100%;
		height: auto;
		animation: drift 7.5s ease-in-out infinite;
		animation-delay: var(--dd, 0s);
	}

	.st:hover :global(svg) {
		animation-play-state: paused;
	}

	@keyframes sticker-pop {
		from {
			opacity: 0;
			transform: rotate(var(--rot, 0deg)) scale(0.35);
		}
		to {
			opacity: 1;
			transform: rotate(var(--rot, 0deg)) scale(1);
		}
	}

	@keyframes drift {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-9px);
		}
	}

	.s1 {
		top: 11%;
		left: 3%;
	}
	.s2 {
		top: 8%;
		right: 4%;
	}
	.s3 {
		top: 43%;
		left: 1%;
	}
	.s4 {
		top: 38%;
		right: 1%;
	}
	.s5 {
		bottom: 14%;
		left: 5%;
	}
	.s6 {
		bottom: 12%;
		right: 6%;
	}

	@media (max-width: 899px) {
		.corner,
		.mobile-hide {
			display: none;
		}

		.hero {
			padding-bottom: 56px;
		}

		.st {
			width: clamp(52px, 15vw, 84px);
		}

		.s3,
		.s4 {
			display: none;
		}

		.s1 {
			top: 11%;
			left: 3%;
		}
		.s2 {
			top: 9%;
			right: 4%;
		}
		.s5 {
			bottom: 9%;
			left: 5%;
		}
		.s6 {
			bottom: 7%;
			right: 5%;
		}

		.stats {
			gap: 8px 18px;
		}
		.stats li {
			gap: 18px;
		}
	}
</style>
