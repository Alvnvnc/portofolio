/**
 * English — the default locale and the canonical dictionary shape.
 * Every landing-page string a visitor reads lives here; `id.ts` mirrors
 * this object 1:1 and is type-checked against it.
 */
export const en = {
	/**
	 * Head copy. Kept in the dictionary (not in the page) so the Indonesian
	 * version of every indexable page ships a real Indonesian title and
	 * description instead of a translated body under an English head.
	 */
	seo: {
		home: {
			title: 'Alvin Vincent — Backend & Full Stack Engineer (Golang, SvelteKit)',
			description:
				'Freelance backend and full stack engineer based in Surabaya, Indonesia. Go and Python APIs, PostgreSQL and InfluxDB pipelines, IoT monitoring, LLM integration, and the deploys that keep them running.',
			keywords: [
				'backend engineer',
				'full stack engineer',
				'freelance backend developer',
				'golang developer',
				'sveltekit developer',
				'API development',
				'IoT backend',
				'Surabaya Indonesia'
			]
		},
		archive: {
			title: 'Live Systems Archive — Production Backends by Alvin Vincent',
			description:
				'Systems currently running in production: industrial IoT monitoring, a multi-tenant SSO gateway, and compliance platforms. Architecture notes, stack, and live URLs where they can be shown.',
			keywords: [
				'backend portfolio',
				'production systems',
				'golang microservices',
				'IoT monitoring platform',
				'API gateway'
			]
		}
	},

	nav: {
		work: 'Work',
		services: 'Services',
		stack: 'Stack',
		about: 'About',
		archive: 'Live',
		contact: 'Contact',
		openMenu: 'Open menu',
		closeMenu: 'Close menu',
		clockTitle: 'Operator local time',
		switchLocale: 'Ganti ke Bahasa Indonesia'
	},

	loader: {
		header: 'Portfolio — 2026'
	},

	hero: {
		role: 'Backend Engineer / Full Stack',
		/**
		 * The visible name is split into per-letter spans for the animation, which
		 * reads as noise to a crawler and to a screen reader. This is the real H1.
		 */
		headingLabel:
			'Alvin Vincent — backend engineer and full stack developer in Surabaya, Indonesia',
		availability: 'Available for freelance — 2026',
		tagline:
			'I build the layer you never see: APIs, data pipelines, and the deploy scripts that keep them honest. When a project needs the screen too, I build that as well.',
		location: 'Surabaya, Indonesia — working worldwide',
		scroll: 'Scroll',
		cursorView: 'View'
	},

	marquee: 'Backend Engineer — Full Stack Developer — Available for freelance —',

	projects: {
		index: '01',
		kicker: 'Deployed Systems',
		helixHint: 'Scroll to travel the ribbon',
		helixLine: 'A ribbon of work,\nrunning in the field.',
		count: 'systems',
		readout: 'real platforms, running in the field right now',
		status: { live: 'Live', 'field-test': 'Field test', archived: 'Archived' },
		fieldNotes: 'Field notes',
		architecture: 'Architecture',
		keyDecisions: 'Key decisions',
		stack: 'Stack',
		seeLive: 'See it live',
		entries: {
			pome: {
				description:
					'Microservices platform that watches palm-oil mill effluent sensors in real time: multi-protocol ingestion, flow automation, and ML inference — all behind a Kong gateway.',
				problem:
					'Field sensors speak five different protocols (MQTT, CoAP, Modbus, Serial, WebSocket). The platform has to ingest all of them, run ML on the stream, and stay debuggable when something misbehaves at 2 a.m.',
				architecture:
					'Go (Gin) services in Clean Architecture, plus a Python ML service spoken to over gRPC. Kong fronts the cluster, RabbitMQ carries async events, PostgreSQL keeps the facts and InfluxDB swallows the firehose. Runs on Kubernetes with Prometheus and Grafana watching.',
				keyDecisions: [
					'ML inference isolated in its own gRPC service — models redeploy without touching the API',
					'RabbitMQ for async events, so sensor bursts never block request paths',
					'PostgreSQL for metadata + InfluxDB for time-series: each database does what it is good at',
					'Multi-stage Docker builds and k8s manifests; Prometheus alerts fire before users notice'
				]
			},
			portal: {
				description:
					'The front door for a fleet of IoT apps (LecSens, POME, Dronemeq): single sign-on, multi-tenant organizations, and fine-grained RBAC behind Traefik and Kong.',
				problem:
					'Several IoT products, one login. Every request must answer "who are you, which org, what may you touch" — without each app re-implementing auth from scratch.',
				architecture:
					'Traefik terminates TLS and routes into Kong (JWT verification, rate limiting, ACL). Behind it sit Go microservices for user management, access management, service registry, and SSO — each owning its own PostgreSQL database via GORM.',
				keyDecisions: [
					'Database-per-service, so tenants and permissions evolve independently',
					'Kong enforces JWT and rate limits at the edge — services stay thin',
					'Service registry keeps app metadata dynamic; new IoT apps dock without redeploys',
					'Invitation and subscription flows built into tenant management'
				]
			},
			lecsens: {
				description:
					'Backend platform for environmental sensor compliance: asset management, violation detection, and regulator-facing reporting on live water-quality data.',
				problem:
					'High-frequency sensor data across multiple tenants, with one hard rule: when a reading crosses a regulatory threshold, the right people must know — with an audit trail.',
				architecture:
					'Go services in Clean Architecture: asset management, user management, regulator and violation modules. PostgreSQL for operational data, InfluxDB for sensor streams, Redis for sessions and hot paths.',
				keyDecisions: [
					'JWT + RBAC with per-tenant isolation designed in from day one',
					'Violation engine evaluates thresholds on ingest — not in nightly batches',
					'Redis caching cut common dashboard queries by ~40%',
					'CI/CD pipeline runs Trivy and gosec security scans on every build'
				]
			}
		} as Record<string, { description: string; problem: string; architecture: string; keyDecisions: string[] }>
	},

	services: {
		index: '02',
		kicker: 'Services',
		readout: 'six things I can build for you. no filler.',
		specSheet: 'Spec sheet',
		request: 'Request',
		cursorRead: 'Read',
		cursorAsk: 'Ask',
		prefill: (title: string) =>
			`Hi Alvin — I'm looking at your ${title} service. Here's what I'm building: `,
		customProject: 'a custom project',
		openSlot: {
			label: 'Open slot',
			body: "Reserved for your project. If it needs an API, a pipeline, or a deploy that doesn't wake anyone up at night — it docks here.",
			cta: 'Claim this slot'
		},
		entries: {
			'backend-dev': {
				title: 'Backend Development',
				description:
					'APIs and services built to be maintained, not just shipped — Clean Architecture, tests, and logs you can actually read.'
			},
			'api-design': {
				title: 'API Design & Integration',
				description:
					'REST endpoints with auth, rate limits, and docs — your web or mobile team plugs in and stops thinking about it.'
			},
			'iot-data': {
				title: 'IoT & Data Systems',
				description:
					'Sensor-to-dashboard pipelines: MQTT in, time-series storage, alerts out. Built on real industrial deployments.'
			},
			'ai-integration': {
				title: 'AI / LLM Integration',
				description:
					'LLM features wired into real backends — RAG, vector search, structured outputs, with fallbacks and a cost ceiling.'
			},
			devops: {
				title: 'DevOps & Deployment',
				description:
					'Docker, CI/CD, security scans, zero-downtime deploys — the unglamorous work that keeps the pager quiet.'
			},
			'full-stack-web': {
				title: 'Full Stack Web Development',
				description:
					'One person from schema to screen: PostgreSQL, a Go or Python API, and a SvelteKit/Next.js front end that talks to it properly.'
			}
		} as Record<string, { title: string; description: string }>
	},

	/**
	 * /portofolio, fully translated — chrome and technical readouts alike.
	 * Product names, protocols and tool names (Kong, InfluxDB, gRPC, pH/COD/TSS)
	 * stay as-is in both locales: they are proper nouns, not English words.
	 */
	archive: {
		back: 'back to home',
		kicker: 'Live systems archive',
		headingA: 'Deployed',
		headingB: 'Systems',
		intro:
			'Live systems, architecture notes, and field evidence from the backend layer I build and operate.',
		statusLabel: 'archive.status',
		status: {
			online: 'systems online',
			featured: 'featured',
			classification: 'classification',
			access: 'access',
			accessValue: 'SSO-gated',
			classificationValue: 'industrial iot / ml'
		},
		ssoGated: 'SSO-gated',
		online: 'online',
		openDemo: 'Open live demo',
		fullDossier: 'Full dossier',
		loginRequired: 'login required',
		liveConsole: 'live console',
		flowKicker: 'Signal path',
		flowHeadingA: 'From sensor signal',
		flowHeadingB: 'to treatment decision',
		fleetKicker: 'The fleet',
		fleetHeading: 'Project archive',
		fleetIntro:
			"Every system below is running in the field right now. Production consoles sit behind Portal single sign-on — links open the real login gate; screenshots show what's inside.",
		notesKicker: 'Decisions',
		notesHeading: 'Architecture notes',
		notesIntro: 'The backend decisions that keep these systems honest.',
		ctaKicker: 'Open channel',
		ctaHeading: 'Need a system like this?',
		ctaBody:
			"Tell me what you're building. I can help design the backend, data flow, deployment path, and operational guardrails.",
		ctaButton: 'Open channel',

		/** SYS-01 featured deployment. `name` is a product name and never translates. */
		featured: {
			label: 'SYS-01 · LIVE SYSTEM',
			subtitle: 'Effluent Risk Intelligence',
			description:
				'Real-time monitoring for palm-oil mill effluent data: sensor ingestion, backend processing, time-series storage, dashboard visibility, and ML-assisted treatment recommendation.',
			embedFallback: 'Live preview is blocked by browser policy. Open POME Guardian directly.',
			embedTitle: 'POME Guardian — live system preview'
		},

		/** live-embed frame chrome */
		embed: {
			online: 'online',
			linking: 'linking',
			blocked: 'blocked',
			connecting: 'Establishing live link…',
			refused: 'Embed refused',
			openSystem: 'Open POME Guardian',
			retry: 'Retry embed',
			policyNote: 'Embedding may be blocked by browser policy',
			openFull: 'Open full system'
		},

		/** sensor → decision narrative, keyed by systemFlow step id */
		flow: {
			sensor: { label: 'Sensor', readout: 'reads pH · COD · TSS' },
			edge: { label: 'Edge device', readout: 'batches + buffers reads' },
			backend: { label: 'Backend', readout: 'validates + routes events' },
			store: { label: 'Storage', readout: 'postgres facts · influx stream' },
			dashboard: { label: 'Dashboard', readout: 'panels light up live' },
			ml: { label: 'ML inference', readout: 'recommends treatment' }
		} as Record<string, { label: string; readout: string }>,

		/** one-line architecture summary per archive entry, keyed by project id */
		projectNotes: {
			pome: 'Go + Python microservices behind Kong; RabbitMQ async, Postgres + Influx split.',
			portal: 'Traefik → Kong edge auth; database-per-service so tenants evolve independently.',
			lecsens: 'Clean Architecture Go services; thresholds evaluated on ingest, not in batches.'
		} as Record<string, string>,

		/** what each system is, in two or three words — the kicker beside its title */
		classification: {
			pome: 'Industrial IoT / ML',
			portal: 'Multi-Tenant SSO',
			lecsens: 'Environmental Monitoring'
		} as Record<string, string>,

		/** dossier decisions, keyed by architectureNotes tag */
		notes: {
			BOUNDARY: {
				tag: 'BOUNDARY',
				title: 'ML isolated behind gRPC',
				body: 'Inference lives in its own Python service. Models retrain and redeploy without ever touching the Go API surface.'
			},
			BACKPRESSURE: {
				tag: 'BACKPRESSURE',
				title: 'RabbitMQ absorbs sensor bursts',
				body: 'Async events keep ingestion spikes off the request path, so a noisy mill never stalls the dashboards.'
			},
			STORAGE: {
				tag: 'STORAGE',
				title: 'Right database per job',
				body: 'PostgreSQL holds the facts and relationships; InfluxDB swallows the high-frequency time-series firehose.'
			},
			EDGE: {
				tag: 'EDGE',
				title: 'Kong fronts the cluster',
				body: 'JWT verification, rate limiting, and ACLs run at the gateway. Services stay thin and focused on domain logic.'
			},
			OPS: {
				tag: 'OPS',
				title: 'Observable before users notice',
				body: 'Prometheus + Grafana watch the platform on Kubernetes; alerts fire on drift before anyone opens a ticket.'
			}
		} as Record<string, { tag: string; title: string; body: string }>
	},

	/** UI chrome for /services/[slug] — the prose itself lives in serviceCopy.ts */
	serviceDetail: {
		back: 'back to services',
		specSheet: 'spec sheet',
		details: 'Details',
		stack: 'Stack',
		included: "What's included",
		process: 'How it runs',
		boundariesTitle: 'What I do — and what I hand off',
		boundariesMine: 'I build this myself',
		boundariesPartner: 'I bring in a specialist',
		faqTitle: 'Questions clients actually ask',
		evidence: 'Field evidence',
		evidenceReadout: 'Systems where this service is already running',
		ctaTitle: (title: string) => `Need ${title.toLowerCase()}?`,
		ctaBody:
			"Tell me what you're building. You'll get an honest answer about scope, timeline, and whether I'm the right person for it.",
		ctaButton: 'Open channel'
	},

	skills: {
		index: '03',
		kicker: 'Stack',
		readout: 'tools ranked honestly — no 90% skill bars here',
		main: 'main',
		mainTitle: 'Daily driver',
		footnote: 'Calibrated against production incidents, not confidence.',
		categories: {
			core: 'Core Langs',
			database: 'Data Stores',
			infrastructure: 'Infra',
			ai: 'AI / LLM',
			tools: 'Practices'
		} as Record<string, string>,
		levels: {
			expert: { label: 'Daily driver', hint: 'reach for it without thinking' },
			advanced: { label: 'Production', hint: 'shipped and maintained real systems with it' },
			intermediate: { label: 'Working', hint: 'comfortable, still keeps the docs open' },
			beginner: { label: 'Learning', hint: 'actively leveling up' }
		} as Record<string, { label: string; hint: string }>
	},

	about: {
		index: '04',
		kicker: 'About',
		statement:
			'I build the boring-but-critical layer — APIs, queues, schemas, and the deploy scripts that keep them honest.',
		p1: 'Most days that means Go services and the data they move: PostgreSQL for facts, InfluxDB for whatever the sensors said five seconds ago, Redis so nobody has to ask twice.',
		p2: 'I study Informatics at ITS Surabaya and ship real systems on the side — industrial IoT monitoring, multi-tenant gateways, ML inference services. Design, implement, deploy: I stay for the whole loop.',
		p3: "I work full stack, and I'd rather be precise about what that means: the weight sits on the backend, and the front end I build is the one that talks to it — SvelteKit or Next.js, typed against the same contracts, fast on a mid-range Android. Brand identity, illustration, and long-form copy I hand to people who do that better than I do.",
		traits: [
			{ title: 'System Design', line: 'Clean Architecture — services that outlive their first author.' },
			{ title: 'Security First', line: 'RBAC, JWT, tenant isolation. Locked before launch, not after.' },
			{ title: 'Data Pipelines', line: 'Time-series at sensor speed: ingest, store, alert.' },
			{ title: 'Ship & Operate', line: 'CI/CD, containers, monitoring. Deployed means watched.' }
		],
		stats: [
			{ value: 3, label: 'Systems shipped' },
			{ value: 4, label: 'Years in the craft' },
			{ value: 5, label: 'Backend services' }
		]
	},

	experience: {
		index: '05',
		kicker: 'Career Log',
		readout: 'changelog of the operator, oldest entry 2022',
		present: 'Present',
		education: 'Education',
		nextEntry: 'Next entry — could be your project',
		entries: {
			'exp-1': {
				position: 'Backend Engineer',
				company: 'Independent Backend Engineer',
				location: 'Remote, Indonesia',
				description:
					'Designing and operating production backend systems end-to-end — including the POME, Portal, and LecSens platforms above — from first schema to Kubernetes deploy.',
				achievements: [
					'Built three production IoT platforms solo: architecture, implementation, deployment, monitoring',
					'Delivered secure multi-tenant REST APIs handling real-time sensor ingestion and visualization',
					'Wired CI/CD with automated tests, linting, and security scanning (Trivy, gosec) into every repo',
					'Collaborated with frontend developers to land APIs in dashboards without integration drama'
				]
			}
		} as Record<
			string,
			{ position: string; company: string; location: string; description: string; achievements: string[] }
		>,
		edu: {
			degree: 'Bachelor of Science',
			field: 'Informatics',
			institution: 'Sepuluh Nopember Institute of Technology (ITS)',
			note: 'Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Software Engineering, Machine Learning'
		}
	},

	contact: {
		index: '06',
		kicker: 'Open channel',
		readout: 'avg response < 24h · timezone WIB (UTC+7)',
		intro:
			'Have a system that needs building — or one that needs rescuing? Pick a channel. I read everything myself.',
		responseLine: 'Avg response under 24h on working days',
		cursorOpen: 'Open',
		cursorSend: 'Send',
		linkedin: { kicker: 'LinkedIn — verified profile' },
		form: {
			name: 'Name',
			namePlaceholder: 'Ada Lovelace',
			email: 'Email',
			emailPlaceholder: 'you@company.com',
			service: 'Service',
			generalInquiry: 'General inquiry',
			message: 'Message',
			messagePlaceholder: "What are you building? Rough scope, timeline, anything weird about it...",
			submit: 'Send message',
			submitting: 'Sending…',
			success: "Received. I'll reply within a day — usually faster.",
			error: 'Send failed. Email me directly:'
		}
	},

	footer: {
		availability: 'Available for freelance — 2026',
		headline: "Let's talk",
		cursorMail: 'Mail',
		hold: 'Hold to copy email',
		held: 'Copied',
		copied: 'Email copied to clipboard',
		copyFailed: 'Copy failed — email is below',
		rights: 'Surabaya, ID'
	}
};

export type Dict = typeof en;
