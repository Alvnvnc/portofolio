import type {
	PersonalInfo,
	Skill,
	Project,
	Experience,
	Education,
	Service,
	NavItem,
	SectionMeta,
	FeaturedSystem,
	SystemFlowStep,
	ArchitectureNote
} from '$lib/types';

// ========================================
// Personal Information
// ========================================
export const personalInfo: PersonalInfo = {
	name: 'Alvin Vincent',
	fullName: 'Alvin Vincent Oswald Reba',
	title: 'Backend & Full Stack Engineer',
	tagline:
		'I build the layer you never see: APIs, data pipelines, and the deploy scripts that keep them honest.',
	location: 'Surabaya, Indonesia — working worldwide',
	email: 'alvnvincent30@gmail.com',
	linkedin: 'https://linkedin.com/in/alvin-reba-88a857279',
	availability: 'Available for freelance — 2026'
};

// ========================================
// Navigation Items
// ========================================
export const navItems: NavItem[] = [
	{ id: 'projects', label: 'Work', href: '#projects' },
	{ id: 'services', label: 'Services', href: '#services' },
	{ id: 'skills', label: 'Stack', href: '#skills' },
	{ id: 'about', label: 'About', href: '#about' },
	{ id: 'portofolio', label: 'Archive', href: '/portofolio' },
	{ id: 'contact', label: 'Contact', href: '#contact' }
];

// ========================================
// Section Metadata (console headers)
// ========================================
export const sectionMeta: SectionMeta[] = [
	{
		id: 'about',
		index: '01',
		title: 'Operator File',
		readout: 'cat /etc/operator — who is driving this console'
	},
	{
		id: 'services',
		index: '02',
		title: 'Service Catalog',
		readout: 'five things I can build for you. no filler.'
	},
	{
		id: 'skills',
		index: '03',
		title: 'Loadout',
		readout: 'tools ranked honestly — no 90% skill bars here'
	},
	{
		id: 'projects',
		index: '04',
		title: 'Deployed Systems',
		readout: 'real platforms, running in the field right now'
	},
	{
		id: 'experience',
		index: '05',
		title: 'Career Log',
		readout: 'changelog of the operator, oldest entry 2022'
	},
	{
		id: 'contact',
		index: '06',
		title: 'Open Channel',
		readout: 'avg response < 24h · timezone WIB (UTC+7)'
	}
];

// ========================================
// Skills — the loadout
// ========================================
export const skills: Skill[] = [
	// Core languages
	{ name: 'Golang', category: 'core', level: 'advanced', primary: true },
	{ name: 'Python', category: 'core', level: 'advanced' },
	{ name: 'SQL', category: 'core', level: 'advanced' },
	{ name: 'TypeScript', category: 'core', level: 'intermediate' },
	{ name: 'JavaScript', category: 'core', level: 'intermediate' },
	{ name: 'Java', category: 'core', level: 'intermediate' },

	// Data stores
	{ name: 'PostgreSQL', category: 'database', level: 'advanced', primary: true },
	{ name: 'InfluxDB', category: 'database', level: 'advanced' },
	{ name: 'Redis', category: 'database', level: 'intermediate' },
	{ name: 'MongoDB', category: 'database', level: 'intermediate' },

	// Infrastructure
	{ name: 'Docker', category: 'infrastructure', level: 'advanced', primary: true },
	{ name: 'CI/CD', category: 'infrastructure', level: 'advanced' },
	{ name: 'Linux', category: 'infrastructure', level: 'advanced' },
	{ name: 'Kubernetes', category: 'infrastructure', level: 'intermediate' },
	{ name: 'Nginx', category: 'infrastructure', level: 'intermediate' },

	// AI & LLM
	{ name: 'LLM APIs', category: 'ai', level: 'intermediate' },
	{ name: 'RAG Systems', category: 'ai', level: 'intermediate' },
	{ name: 'Vector Search', category: 'ai', level: 'intermediate' },

	// Practices
	{ name: 'Clean Architecture', category: 'tools', level: 'advanced', primary: true },
	{ name: 'REST API Design', category: 'tools', level: 'advanced' },
	{ name: 'Git', category: 'tools', level: 'advanced' },
	{ name: 'gRPC', category: 'tools', level: 'intermediate' }
];

export const skillCategories = [
	{ id: 'core', name: 'Core Langs', icon: 'bolt' },
	{ id: 'database', name: 'Data Stores', icon: 'drop' },
	{ id: 'infrastructure', name: 'Infra', icon: 'stack' },
	{ id: 'ai', name: 'AI / LLM', icon: 'chip' },
	{ id: 'tools', name: 'Practices', icon: 'shield' }
] as const;

/** Honest level names — shown in the loadout legend */
export const levelMeta: Record<Skill['level'], { dots: number; label: string; hint: string }> = {
	expert: { dots: 4, label: 'Daily driver', hint: 'reach for it without thinking' },
	advanced: { dots: 3, label: 'Production', hint: 'shipped and maintained real systems with it' },
	intermediate: { dots: 2, label: 'Working', hint: 'comfortable, still keeps the docs open' },
	beginner: { dots: 1, label: 'Learning', hint: 'actively leveling up' }
};

// ========================================
// Projects — deployed systems (the real ones)
// ========================================
export const projects: Project[] = [
	{
		id: 'pome',
		code: 'SYS-01',
		title: 'POME — IoT & ML Ops Platform',
		classification: 'Industrial IoT / ML',
		status: 'live',
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
		],
		techStack: ['Go', 'Python', 'Kong', 'gRPC', 'MQTT', 'RabbitMQ', 'PostgreSQL', 'InfluxDB', 'Kubernetes'],
		liveUrl: 'https://pome.iimlab.id',
		gated: true,
		demoUrl: 'https://rapid.alvnvnc.site',
		thumbnail: '/images/project-backend-template.png'
	},
	{
		id: 'portal',
		code: 'SYS-02',
		title: 'Portal — IoT Access Gateway',
		classification: 'Multi-Tenant SSO',
		status: 'live',
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
		],
		techStack: ['Go', 'Kong', 'Traefik', 'PostgreSQL', 'GORM', 'JWT', 'Docker'],
		liveUrl: 'https://portal-iot.iimlab.id',
		gated: true,
		shots: ['/images/portal-dashboard.jpg', '/images/portal-services.jpg', '/images/portal-wizard.jpg'],
		thumbnail: '/images/project-ai-workflow.png'
	},
	{
		id: 'lecsens',
		code: 'SYS-03',
		title: 'LecSens — Water Quality Monitor',
		classification: 'Environmental Monitoring',
		status: 'live',
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
		],
		techStack: ['Go', 'PostgreSQL', 'InfluxDB', 'Redis', 'Docker', 'Nginx', 'JWT'],
		liveUrl: 'https://lecsens.iimlab.id',
		gated: true,
		thumbnail: '/images/project-lecsens.png'
	}
];

// ========================================
// Live Systems Archive (/portofolio)
// ========================================

/** SYS-01 — the strongest live proof, embedded as a real running deployment */
export const featuredSystem: FeaturedSystem = {
	label: 'SYS-01 · LIVE SYSTEM',
	name: 'POME Guardian',
	subtitle: 'Effluent Risk Intelligence',
	description:
		'Real-time monitoring for palm-oil mill effluent data: sensor ingestion, backend processing, time-series storage, dashboard visibility, and ML-assisted treatment recommendation.',
	techStack: ['Go', 'Python', 'gRPC', 'PostgreSQL', 'InfluxDB', 'RabbitMQ', 'Kong', 'Kubernetes'],
	embedUrl: 'https://rapid.alvnvnc.site',
	embedFallback: 'Live preview is blocked by browser policy. Open POME Guardian directly.',
	projectId: 'pome'
};

/** The motion narrative: sensor signal → treatment decision */
export const systemFlow: SystemFlowStep[] = [
	{ id: 'sensor', index: '01', label: 'Sensor', readout: 'reads pH · COD · TSS', icon: 'pulse' },
	{ id: 'edge', index: '02', label: 'Edge device', readout: 'batches + buffers reads', icon: 'plug' },
	{ id: 'backend', index: '03', label: 'Backend', readout: 'validates + routes events', icon: 'stack' },
	{ id: 'store', index: '04', label: 'Storage', readout: 'postgres facts · influx stream', icon: 'drop' },
	{ id: 'dashboard', index: '05', label: 'Dashboard', readout: 'panels light up live', icon: 'bolt' },
	{ id: 'ml', index: '06', label: 'ML inference', readout: 'recommends treatment', icon: 'chip' }
];

/** Short, scannable backend decisions — dossier style */
export const architectureNotes: ArchitectureNote[] = [
	{
		tag: 'BOUNDARY',
		title: 'ML isolated behind gRPC',
		body: 'Inference lives in its own Python service. Models retrain and redeploy without ever touching the Go API surface.'
	},
	{
		tag: 'BACKPRESSURE',
		title: 'RabbitMQ absorbs sensor bursts',
		body: 'Async events keep ingestion spikes off the request path, so a noisy mill never stalls the dashboards.'
	},
	{
		tag: 'STORAGE',
		title: 'Right database per job',
		body: 'PostgreSQL holds the facts and relationships; InfluxDB swallows the high-frequency time-series firehose.'
	},
	{
		tag: 'EDGE',
		title: 'Kong fronts the cluster',
		body: 'JWT verification, rate limiting, and ACLs run at the gateway. Services stay thin and focused on domain logic.'
	},
	{
		tag: 'OPS',
		title: 'Observable before users notice',
		body: 'Prometheus + Grafana watch the platform on Kubernetes; alerts fire on drift before anyone opens a ticket.'
	}
];

// ========================================
// Experience
// ========================================
export const experiences: Experience[] = [
	{
		id: 'exp-1',
		company: 'Independent Backend Engineer',
		position: 'Backend Engineer',
		period: {
			start: '2023',
			end: 'Present'
		},
		location: 'Remote, Indonesia',
		description:
			'Designing and operating production backend systems end-to-end — including the POME, Portal, and LecSens platforms above — from first schema to Kubernetes deploy.',
		achievements: [
			'Built three production IoT platforms solo: architecture, implementation, deployment, monitoring',
			'Delivered secure multi-tenant REST APIs handling real-time sensor ingestion and visualization',
			'Wired CI/CD with automated tests, linting, and security scanning (Trivy, gosec) into every repo',
			'Collaborated with frontend developers to land APIs in dashboards without integration drama'
		],
		techStack: ['Golang', 'PostgreSQL', 'InfluxDB', 'Redis', 'Docker', 'Kubernetes', 'CI/CD']
	}
];

// ========================================
// Education
// ========================================
export const education: Education[] = [
	{
		institution: 'Sepuluh Nopember Institute of Technology (ITS)',
		degree: 'Bachelor of Science',
		field: 'Informatics',
		period: {
			start: '2022',
			end: '2026'
		},
		achievements: [
			'Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Software Engineering, Machine Learning'
		]
	}
];

// ========================================
// Services — the catalog
// ========================================
// Structure only. All prose (long copy, features, process, FAQ, SEO strings)
// lives per-locale in `$lib/i18n/serviceCopy`, so an Indonesian visitor and
// Googlebot see the same Indonesian page — not an English one behind a toggle.
export const services: Service[] = [
	{
		id: 'backend-dev',
		code: 'SVC-01',
		title: 'Backend Development',
		description:
			'APIs and services built to be maintained, not just shipped — Clean Architecture, tests, and logs you can actually read.',
		icon: 'stack',
		techStack: ['Golang', 'Python', 'PostgreSQL', 'Redis'],
		relatedProjects: ['pome', 'lecsens']
	},
	{
		id: 'api-design',
		code: 'SVC-02',
		title: 'API Design & Integration',
		description:
			'REST endpoints with auth, rate limits, and docs — your web or mobile team plugs in and stops thinking about it.',
		icon: 'plug',
		techStack: ['REST', 'JWT', 'OAuth', 'WebSocket'],
		relatedProjects: ['portal', 'pome']
	},
	{
		id: 'full-stack-web',
		code: 'SVC-06',
		title: 'Full Stack Web Development',
		description:
			'One person from schema to screen: PostgreSQL, a Go or Python API, and a SvelteKit/Next.js front end that talks to it properly.',
		icon: 'shield',
		techStack: ['SvelteKit', 'Next.js', 'TypeScript', 'Golang'],
		relatedProjects: ['portal', 'lecsens']
	},
	{
		id: 'iot-data',
		code: 'SVC-03',
		title: 'IoT & Data Systems',
		description:
			'Sensor-to-dashboard pipelines: MQTT in, time-series storage, alerts out. Built on real industrial deployments.',
		icon: 'drop',
		techStack: ['InfluxDB', 'PostgreSQL', 'MQTT', 'Grafana'],
		relatedProjects: ['lecsens', 'pome']
	},
	{
		id: 'ai-integration',
		code: 'SVC-04',
		title: 'AI / LLM Integration',
		description:
			'LLM features wired into real backends — RAG, vector search, structured outputs, with fallbacks and a cost ceiling.',
		icon: 'chip',
		techStack: ['LLM APIs', 'Vector DB', 'RAG', 'gRPC'],
		relatedProjects: ['pome']
	},
	{
		id: 'devops',
		code: 'SVC-05',
		title: 'DevOps & Deployment',
		description:
			'Docker, CI/CD, security scans, zero-downtime deploys — the unglamorous work that keeps the pager quiet.',
		icon: 'bolt',
		techStack: ['Docker', 'Kubernetes', 'CI/CD', 'Linux'],
		relatedProjects: ['pome', 'portal']
	}
];
