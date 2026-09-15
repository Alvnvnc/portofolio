<script lang="ts">
	import Action from '$lib/components/ui/Action.svelte';
	import Sticker from '$lib/components/ui/Sticker.svelte';
	import ProjectDiagram from '$lib/components/sections/ProjectDiagram.svelte';
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
	<link rel="canonical" href={url} />

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
		<p class="kicker code">
			<span class="mono num">{service.code.toLowerCase()}</span>
			<span class="sq"></span>
			spec sheet
		</p>
		<h1 class="display title">{service.title}</h1>
		<p class="lead">{service.description}</p>
		<p class="tech mono">{service.techStack.join(' / ')}</p>
	</div>
</section>

<section class="section">
	<div class="sheet">
		<div class="panel">
			<span class="panel-sticker" aria-hidden="true">
				<Sticker name={service.sticker} size={86} />
			</span>
			<h2 class="h2 kicker">Details</h2>
			<p class="body-copy mt-5">{service.longDescription ?? service.description}</p>
		</div>
	</div>
</section>

{#if service.features?.length}
	<section class="section">
		<div class="sheet">
			<h2 class="h2 kicker">What's included</h2>
			<ul class="features mt-7">
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
			<h2 class="h2 kicker">How it runs</h2>
			<ol class="steps mt-7">
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
			<h2 class="h2 kicker">Where it already runs</h2>
			<div class="evidence mt-7">
				{#each relatedProjects as project (project.id)}
					<a class="evidence-card" href="/#projects">
						<span class="frame">
							<ProjectDiagram kind={project.id as 'pome' | 'portal' | 'lecsens'} />
						</span>
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
			<h2 class="h2 kicker">Other services</h2>
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
	<div class="sheet cta-inner">
		<div>
			<h2 class="display cta-title">Need {service.title.toLowerCase()}?</h2>
			<p class="lead mt-4">
				Tell me what you're building. You'll get an honest answer about scope, timeline, and whether
				I'm the right engineer for it.
			</p>
		</div>
		<Action href="/#contact">Start a project</Action>
	</div>
</section>

<style>
	.head {
		padding-block: calc(var(--topbar-h) + 44px) clamp(36px, 6vh, 64px);
	}

	.back {
		font-size: 0.75rem;
		color: var(--ink-3);
		text-decoration: none;
	}

	.back:hover {
		color: var(--blue);
	}

	.code {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-top: 30px;
		color: var(--ink-2);
	}

	.num {
		font-size: 0.6875rem;
		letter-spacing: 0;
		color: var(--blue);
	}

	.sq {
		width: 6px;
		height: 6px;
		background: var(--ink-3);
	}

	.title {
		margin-top: 16px;
		font-size: clamp(2.4rem, 8vw, 6rem);
		color: var(--ink);
		max-width: 22ch;
	}

	.lead {
		margin-top: 18px;
	}

	.tech {
		margin-top: 20px;
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.panel {
		position: relative;
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 22px;
		box-shadow: var(--shadow);
		padding: clamp(22px, 3vw, 34px);
	}

	.panel-sticker {
		position: absolute;
		top: -30px;
		right: 28px;
		transform: rotate(8deg);
	}

	.h2 {
		color: var(--ink-2);
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
		width: 10px;
		height: 10px;
		margin-top: 6px;
		flex: none;
		border-radius: 2px;
		background: var(--yellow);
		border: 1.5px solid var(--ink);
	}

	.steps {
		display: flex;
		flex-direction: column;
		gap: 12px;
		max-width: 72ch;
	}

	.steps li {
		display: grid;
		grid-template-columns: 52px minmax(0, 1fr);
		gap: 18px;
		align-items: center;
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 14px;
		padding: 14px 18px;
		box-shadow: 3px 3px 0 var(--ink);
	}

	.step-index {
		font-size: 0.75rem;
		color: var(--blue);
	}

	.step-text {
		font-size: 0.9375rem;
		line-height: 1.55;
		color: var(--ink-2);
	}

	.evidence {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 30px;
	}

	.evidence-card {
		display: block;
		color: inherit;
		text-decoration: none;
	}

	.frame {
		display: block;
		background: var(--surface);
		border: 2px solid var(--ink);
		border-radius: 16px;
		padding: 12px;
		box-shadow: var(--shadow);
		transition:
			transform 180ms cubic-bezier(0.2, 0.7, 0.2, 1),
			box-shadow 180ms ease;
	}

	.evidence-card:hover .frame {
		transform: translate(-3px, -3px);
		box-shadow: var(--shadow-lg);
	}

	.evidence-card h3 {
		margin-top: 16px;
		font-size: 1.0625rem;
		font-weight: 620;
		letter-spacing: -0.012em;
		color: var(--ink);
	}

	.evidence-card p {
		margin-top: 8px;
		font-size: 0.875rem;
		line-height: 1.6;
		color: var(--ink-2);
		max-width: 46ch;
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
		padding: 14px 4px;
		border-bottom: 1px dashed #d4d4d8;
	}

	.others a {
		font-size: 1rem;
		font-weight: 520;
		color: var(--ink);
		text-decoration: none;
		transition: color 140ms ease;
	}

	.others a:hover {
		color: var(--blue);
	}

	.others .mono {
		font-size: 0.6875rem;
		color: var(--ink-3);
	}

	.cta {
		background: var(--surface);
		border-top: 2px solid var(--ink);
		padding-block: clamp(48px, 8vh, 88px);
	}

	.cta-inner {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 28px;
	}

	.cta-title {
		font-size: clamp(1.7rem, 4.6vw, 3rem);
		color: var(--ink);
		max-width: 24ch;
	}
</style>
