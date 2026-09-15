<script lang="ts">
	import { personalInfo } from '$lib/data/portfolio';
	import { cn } from '$lib/utils';

	let { class: className = '' }: { class?: string } = $props();

	const year = new Date().getFullYear();
</script>

<footer class={cn('footer', className)}>
	<div class="sheet inner">
		<div>
			<p class="brand">Alvin Vincent</p>
			<p class="mono line">© {year} {personalInfo.fullName}</p>
		</div>

		<nav class="links" aria-label="Elsewhere">
			<a class="link" href="mailto:{personalInfo.email}">email</a>
			{#if personalInfo.linkedin}
				<a class="link" href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
					>linkedin</a
				>
			{/if}
			<a class="link" href="#hero">top</a>
		</nav>

		<p class="mono line colophon">
			Hand-built with SvelteKit<span class="sep"> / </span>no template used
		</p>
	</div>
</footer>

<style>
	.footer {
		background: var(--paper-2);
		border-top: 1px solid var(--rule);
	}

	.inner {
		display: flex;
		flex-direction: column;
		gap: 18px;
		padding-top: 34px;
		padding-bottom: 40px;
	}

	.brand {
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--ink);
	}

	.line {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.line:first-child {
		margin-top: 0;
	}

	.brand + .line {
		margin-top: 6px;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 10px 26px;
		font-size: 0.875rem;
	}

	.colophon {
		color: var(--ink-3);
	}

	.sep {
		color: var(--rule-2);
	}

	@media (min-width: 900px) {
		.inner {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			gap: 40px;
		}

		.colophon {
			text-align: right;
		}
	}
</style>
