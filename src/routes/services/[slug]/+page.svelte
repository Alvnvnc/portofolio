<script lang="ts">
	import Action from '$lib/components/ui/Action.svelte';
	import Plate from '$lib/components/ui/Plate.svelte';
	import { services } from '$lib/data/portfolio';

	let { data } = $props();
	const service = $derived(data.service);
	const relatedProjects = $derived(data.relatedProjects);
	const otherServices = $derived(services.filter((s) => s.id !== service.id));

	const SITE = 'https://alvnvnc.site';
	const url = $derived(`${SITE}/services/${service.id}`);

	const graph = $derived({
		'@context': 'https://schema.org',
		'@graph': [
			{
				'@type': 'Service',
				'@id': `${url}#service`,
				name: service.title,
				description: service.seo?.description ?? service.description,
				url,
				serviceType: service.title,
				provider: {
					'@type': 'Person',
					'@id': `${SITE}/#person`,
					name: 'Alvin Vincent Oswald Reba',
					jobTitle: 'Full-stack developer',
					url: SITE
				},
				areaServed: { '@type': 'Place', name: 'Worldwide' },
				availableChannel: {
					'@type': 'ServiceChannel',
					serviceUrl: `${SITE}/#contact`
				},
				hasOfferCatalog: {
					'@type': 'OfferCatalog',
					name: `${service.title} — deliverables`,
					itemListElement: (service.features ?? []).map((feature) => ({
						'@type': 'Offer',
						itemOffered: { '@type': 'Service', name: feature }
					}))
				}
			},
			{
				'@type': 'BreadcrumbList',
				'@id': `${url}#breadcrumbs`,
				itemListElement: [
					{ '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE}/` },
					{ '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE}/#services` },
					{ '@type': 'ListItem', position: 3, name: service.title, item: url }
				]
			}
		]
	});
</script>

<svelte:head>
	<title>{service.seo?.title ?? `${service.title} | Alvin Vincent`}</title>
	<meta name="description" content={service.seo?.description ?? service.description} />
	{#if service.seo?.keywords}
		<meta name="keywords" content={service.seo.keywords.join(', ')} />
	{/if}
	<link rel="canonical" href={`https://alvnvnc.site/services/${service.id}`} />

	<meta property="og:title" content={service.seo?.title ?? service.title} />
	<meta property="og:description" content={service.seo?.description ?? service.description} />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={`${SITE}/images/og-card.png`} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content="{service.title} — Alvin Vincent, freelance full-stack developer" />
	<meta property="og:site_name" content="Alvin Vincent - Full-Stack Developer" />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={service.seo?.title ?? service.title} />
	<meta name="twitter:description" content={service.seo?.description ?? service.description} />
	<meta name="twitter:image" content={`${SITE}/images/og-card.png`} />

	{@html `<script type="application/ld+json">${JSON.stringify(graph)}</script>`}
</svelte:head>

<section class="head">
	<div class="sheet">
		<a class="back mono" href="/#services">← all services</a>
		<p class="code mono">{service.code.toLowerCase()} / spec sheet</p>
		<h1>{service.title}</h1>
		<p class="lead">{service.description}</p>
		<p class="tech mono">{service.techStack.join(' / ')}</p>
	</div>
</section>

<section class="section">
	<div class="sheet">
		<h2 class="h2">Details</h2>
		<p class="body-copy mt-6">{service.longDescription ?? service.description}</p>
	</div>
</section>

{#if service.features?.length}
	<section class="section">
		<div class="sheet">
			<h2 class="h2">What's included</h2>
			<ul class="features mt-8">
				{#each service.features as feature (feature)}
					<li><span class="tick"></span>{feature}</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

{#if service.process?.length}
	<section class="section">
		<div class="sheet">
			<h2 class="h2">How it runs</h2>
			<ol class="steps mt-8">
				{#each service.process as step, i (step)}
					<li>
						<span class="step-index mono">{String(i + 1).padStart(2, '0')}</span>
						<span class="step-text">{step}</span>
					</li>
				{/each}
			</ol>
		</div>
	</section>
{/if}

{#if relatedProjects.length > 0}
	<section class="section">
		<div class="sheet">
			<h2 class="h2">Where it already runs</h2>
			<div class="evidence mt-8">
				{#each relatedProjects as project (project.id)}
					<a class="evidence-card" href="/#projects">
						{#if project.thumbnail}
							<Plate
								src={project.thumbnail}
								alt="Pixel-art illustration for {project.title}"
								caption="{project.code.toLowerCase()} — {project.id}"
							/>
						{/if}
						<h3>{project.title}</h3>
						<p>{project.description}</p>
					</a>
				{/each}
			</div>
		</div>
	</section>
{/if}

{#if otherServices.length > 0}
	<section class="section">
		<div class="sheet">
			<h2 class="h2">Other services</h2>
			<ul class="others mt-6">
				{#each otherServices as other (other.id)}
					<li>
						<a href="/services/{other.id}">{other.title}</a>
						<span class="mono">{other.code.toLowerCase()}</span>
					</li>
				{/each}
			</ul>
		</div>
	</section>
{/if}

<section class="cta">
	<div class="sheet">
		<h2>Need {service.title.toLowerCase()}?</h2>
		<p class="lead">
			Tell me what you're building. You'll get an honest answer about scope, timeline, and whether
			I'm the right engineer for it.
		</p>
		<Action href="/#contact" class="cta-action">Start a project</Action>
	</div>
</section>

<style>
	.head {
		padding-block: calc(var(--topbar-h) + 48px) clamp(48px, 8vh, 88px);
	}

	.back {
		font-size: 0.75rem;
		color: var(--ink-3);
		text-decoration: none;
	}

	.back:hover {
		color: var(--signal);
	}

	.code {
		margin-top: 34px;
		font-size: 0.6875rem;
		color: var(--signal);
	}

	h1 {
		margin-top: 12px;
		font-size: clamp(2rem, 5.4vw, 3.8rem);
		font-weight: 600;
		letter-spacing: -0.024em;
		line-height: 1.04;
		color: var(--ink);
		max-width: 22ch;
	}

	.lead {
		margin-top: 20px;
	}

	.tech {
		margin-top: 22px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.h2 {
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--ink-3);
		border-top: 1px solid var(--rule);
		padding-top: 14px;
	}

	.features {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 14px;
		max-width: 72ch;
	}

	.features li {
		display: flex;
		gap: 14px;
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--ink-2);
	}

	.tick {
		width: 14px;
		height: 1px;
		margin-top: 12px;
		flex: none;
		background: var(--rule-2);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 0;
		max-width: 72ch;
	}

	.steps li {
		display: grid;
		grid-template-columns: 48px minmax(0, 1fr);
		gap: 20px;
		padding: 18px 0;
		border-bottom: 1px solid var(--rule);
	}

	.step-index {
		font-size: 0.75rem;
		color: var(--signal);
		padding-top: 2px;
	}

	.step-text {
		font-size: 0.9375rem;
		line-height: 1.6;
		color: var(--ink-2);
	}

	.evidence {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
		gap: 40px;
	}

	.evidence-card {
		display: block;
		color: inherit;
		text-decoration: none;
	}

	.evidence-card h3 {
		margin-top: 16px;
		font-size: 1.0625rem;
		font-weight: 600;
		letter-spacing: -0.012em;
		color: var(--ink);
		transition: color 140ms ease;
	}

	.evidence-card:hover h3 {
		color: var(--signal);
	}

	.evidence-card p {
		margin-top: 8px;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--ink-2);
		max-width: 46ch;
	}

	.cta {
		background: var(--paper-2);
		border-top: 1px solid var(--rule);
		padding-block: clamp(56px, 9vh, 96px);
	}

	.others {
		display: flex;
		flex-direction: column;
		max-width: 560px;
	}

	.others li {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 20px;
		padding: 14px 0;
		border-bottom: 1px solid var(--rule);
	}

	.others a {
		font-size: 1rem;
		color: var(--ink);
		text-decoration: none;
		transition: color 140ms ease;
	}

	.others a:hover {
		color: var(--signal);
	}

	.others .mono {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.cta h2 {
		font-size: clamp(1.6rem, 3.6vw, 2.6rem);
		font-weight: 600;
		letter-spacing: -0.02em;
		color: var(--ink);
		max-width: 26ch;
	}

	.cta .lead {
		margin-top: 16px;
	}

	.cta :global(.cta-action) {
		margin-top: 30px;
	}
</style>
