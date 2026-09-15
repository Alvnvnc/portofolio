<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import Action from '$lib/components/ui/Action.svelte';
	import Sticker from '$lib/components/ui/Sticker.svelte';
	import HeroPoster from '$lib/components/sections/HeroPoster.svelte';
	import { parallax } from '$lib/utils/motion';
</script>

<section id="hero" class="hero">
	<div class="deco" aria-hidden="true">
		<span class="st st--m s1" use:parallax={-0.05} style="--rot:-9deg;--d:.30s;--dd:0s"
			><Sticker name="server" size={112} /></span
		>
		<span class="st st--m s2" use:parallax={0.07} style="--rot:7deg;--d:.38s;--dd:1.1s"
			><Sticker name="database" size={112} /></span
		>
		<span class="st st--s s3" use:parallax={-0.11} style="--rot:-12deg;--d:.46s;--dd:2.2s"
			><Sticker name="star" size={70} /></span
		>
		<span class="st st--l s4" use:parallax={0.05} style="--rot:6deg;--d:.52s;--dd:.6s"
			><Sticker name="cloud" size={150} /></span
		>
		<span class="st st--m s5" use:parallax={0.09} style="--rot:4deg;--d:.60s;--dd:1.6s"
			><Sticker name="squiggle" size={108} /></span
		>
		<span class="st st--s s6" use:parallax={-0.07} style="--rot:-8deg;--d:.68s;--dd:2.7s"
			><Sticker name="dots" size={66} /></span
		>
		<span class="st st--m s7" use:parallax={0.06} style="--rot:6deg;--d:.76s;--dd:1.9s"
			><Sticker name="queue" size={106} /></span
		>
	</div>

	<div class="sheet inner">
		<h1 class="display name">
			<span class="sr-only">Alvin Vincent — </span>
			<span class="line"><span class="rise">Full-stack</span></span>
			<span class="line"><span class="rise">Developer</span></span>
		</h1>

		<p class="caption mono">(api / data pipelines / dashboards / deploys)</p>

		<div class="poster-wrap">
			<HeroPoster />
			<a class="badge" href="#contact">
				<span class="kicker">open for freelance</span>
				<span aria-hidden="true">→</span>
			</a>
		</div>

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

	<p class="corner left mono">{personalInfo.location}<br />working worldwide (UTC+7)</p>
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
		padding: calc(var(--topbar-h) + 18px) 0 clamp(38px, 7vh, 68px);
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
		font-size: clamp(2.3rem, min(10.4vw, 14.4vh), 9.6rem);
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
		margin-top: clamp(12px, 2vh, 22px);
		font-size: 0.875rem;
		letter-spacing: 0.01em;
		color: var(--ink-3);
		opacity: 0;
		animation: fade-up 620ms ease 0.5s both;
	}

	.poster-wrap {
		position: relative;
		margin-top: clamp(14px, 2.4vh, 28px);
		opacity: 0;
		animation: fade-up 720ms ease 0.55s both;
	}

	.poster-wrap :global(.st--peek) {
		position: absolute;
	}

	.badge {
		position: absolute;
		right: -104px;
		bottom: -28px;
		display: inline-flex;
		align-items: center;
		gap: 9px;
		padding: 9px 16px;
		background: var(--yellow);
		border: 2px solid var(--ink);
		border-radius: 999px;
		box-shadow: 4px 4px 0 var(--ink);
		color: var(--ink);
		text-decoration: none;
		transform: rotate(4deg);
		transition:
			transform 200ms cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 200ms ease;
	}

	.badge:hover {
		transform: rotate(0deg) translate(-2px, -2px);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.badge span:first-child {
		font-size: 0.6875rem;
	}

	.actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 14px;
		margin-top: clamp(24px, 3.4vh, 38px);
		opacity: 0;
		animation: fade-up 620ms ease 0.68s both;
	}

	.stats {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 10px 24px;
		margin-top: clamp(18px, 2.6vh, 30px);
		font-size: 0.75rem;
		color: var(--ink-2);
		opacity: 0;
		animation: fade-up 620ms ease 0.78s both;
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
		bottom: 28px;
		font-size: 0.6875rem;
		line-height: 1.7;
		color: var(--ink-3);
		opacity: 0;
		animation: fade-up 620ms ease 0.9s both;
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
		bottom: 28px;
		left: 50%;
		transform: translateX(-50%);
		font-size: 0.6875rem;
		color: var(--ink-3);
		opacity: 0;
		animation: fade-up 620ms ease 1s both;
	}

	.deco {
		position: absolute;
		inset: 0;
		z-index: 1;
		pointer-events: none;
	}

	.st {
		position: absolute;
		pointer-events: auto;
		user-select: none;
		transform: rotate(var(--rot, 0deg)) translateY(var(--par, 0px));
		transition: transform 260ms cubic-bezier(0.2, 0.7, 0.2, 1);
		animation: sticker-pop 760ms cubic-bezier(0.34, 1.56, 0.64, 1) backwards;
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
		top: 12%;
		left: 4%;
	}
	.s2 {
		top: 9%;
		right: 6%;
	}
	.s3 {
		top: 34%;
		left: 1.5%;
	}
	.s4 {
		top: 20%;
		right: 1%;
		z-index: 0;
	}
	.s5 {
		top: 56%;
		left: 4%;
	}
	.s6 {
		top: 70%;
		right: 3%;
	}
	.s7 {
		bottom: 22%;
		right: 7%;
	}

	@media (max-width: 899px) {
		.corner,
		.mobile-hide {
			display: none;
		}

		.hero {
			padding-bottom: 48px;
		}

		.s3,
		.s4,
		.s6,
		.s7 {
			display: none;
		}

		.s1 {
			top: 10%;
			left: 3%;
		}
		.s2 {
			top: 8%;
			right: 4%;
		}
		.s5 {
			top: 38%;
			left: 2%;
		}

		.badge {
			right: -10px;
			bottom: -18px;
		}

		.stats {
			gap: 8px 18px;
		}
		.stats li {
			gap: 18px;
		}
	}
</style>
