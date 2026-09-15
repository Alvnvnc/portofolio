<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import Sticker from '$lib/components/ui/Sticker.svelte';
	import { cn } from '$lib/utils';

	let { class: className = '' }: { class?: string } = $props();

	const year = new Date().getFullYear();
</script>

<footer class={cn('footer', className)}>
	<div class="sheet inner">
		<div class="brand">
			<p class="name display">Alvin Vincent</p>
			<p class="mono line">© {year} {personalInfo.fullName}</p>
		</div>

		<nav class="links" aria-label="Elsewhere">
			<a class="link" href="mailto:{personalInfo.email}">email</a>
			{#if personalInfo.linkedin}
				<a class="link" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">linkedin</a>
			{/if}
			<a class="link" href="#hero">top</a>
		</nav>

		<div class="tail">
			<p class="mono line colophon">
				Hand-built with SvelteKit<span class="sep"> / </span>no template used
			</p>
			<span class="mark"><Sticker name="shield" size={46} /></span>
		</div>
	</div>
</footer>

<style>
	.footer {
		background: var(--paper-2);
		border-top: 2px solid var(--ink);
	}

	.inner {
		display: flex;
		flex-direction: column;
		gap: 20px;
		padding-top: 34px;
		padding-bottom: 38px;
	}

	.name {
		font-size: clamp(1.3rem, 2.6vw, 1.9rem);
		color: var(--ink);
	}

	.line {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.brand .line {
		margin-top: 8px;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 24px;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.tail {
		display: flex;
		align-items: center;
		gap: 18px;
	}

	.mark {
		display: none;
	}

	.sep {
		color: #c9cbd0;
	}

	@media (min-width: 900px) {
		.inner {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 40px;
		}

		.tail {
			text-align: right;
		}

		.mark {
			display: inline-flex;
		}
	}
</style>
