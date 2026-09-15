import type {
	PersonalInfo,
	Skill,
	Project,
	Experience,
	Education,
	Service,
	NavItem,
	SectionMeta,
	Faq
} from '$lib/types';

// ========================================
// Personal Information
// ========================================
export const personalInfo: PersonalInfo = {
	name: 'Alvin Vincent',
	fullName: 'Alvin Vincent Oswald Reba',
	title: 'Full-stack developer',
	tagline:
		'I build complete products end to end: the API, the data pipelines behind it, the dashboard on top, and the deploy that keeps it up.',
	location: 'Surabaya, Indonesia',
	email: 'alvnvincent30@gmail.com',
	linkedin: 'https://linkedin.com/in/alvin-reba-88a857279',
	website: 'https://alvnvnc.site'
};

// ========================================
// Navigation Items
// ========================================
export const navItems: NavItem[] = [
	{ id: 'about', label: 'About', href: '#about' },
	{ id: 'services', label: 'Services', href: '#services' },
	{ id: 'skills', label: 'Skills', href: '#skills' },
	{ id: 'projects', label: 'Systems', href: '#projects' },
	{ id: 'experience', label: 'Experience', href: '#experience' },
	{ id: 'contact', label: 'Contact', href: '#contact' }
];

// ========================================
// Section Metadata (station headings)
// ========================================
export const sectionMeta: SectionMeta[] = [
	{
		id: 'about',
		label: 'about',
		index: '01',
		title: 'Backend-deep, full-stack',
		note: 'Full-stack developer in Surabaya. I design, build, and operate complete systems.'
	},
	{
		id: 'services',
		label: 'services',
		index: '02',
		title: 'What I build',
		note: 'Six services I deliver. The last slot stays open for your project.'
	},
	{
		id: 'skills',
		label: 'skills',
		index: '03',
		title: 'Skills, calibrated',
		note: 'Levels measured against production, not confidence.'
	},
	{
		id: 'projects',
		label: 'systems',
		index: '04',
		title: 'Systems in production',
		note: 'Three platforms running in the field. Source is private — client contracts.'
	},
	{
		id: 'experience',
		label: 'experience',
		index: '05',
		title: 'The short log',
		note: 'Shipping production systems since 2022, mostly solo.'
	},
	{
		id: 'contact',
		label: 'contact',
		index: '06',
		title: 'Start a project',
		note: 'Answers within one working day. Usually faster.'
	}
];

// ========================================
// Skills — the loadout
// ========================================
export const skills: Skill[] = [
	// Core stack
	{ name: 'Golang', category: 'core', level: 'advanced', primary: true },
	{ name: 'Python', category: 'core', level: 'advanced' },
	{ name: 'SQL', category: 'core', level: 'advanced' },
	{ name: 'TypeScript', category: 'core', level: 'intermediate' },
	{ name: 'SvelteKit', category: 'core', level: 'intermediate' },
	{ name: 'JavaScript', category: 'core', level: 'intermediate' },
	{ name: 'Tailwind CSS', category: 'core', level: 'intermediate' },
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
	{ id: 'core', name: 'Core stack' },
	{ id: 'database', name: 'Data stores' },
	{ id: 'infrastructure', name: 'Infrastructure' },
	{ id: 'ai', name: 'AI & LLM' },
	{ id: 'tools', name: 'Practices' }
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
		thumbnail: '/images/project-backend-template.webp'
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
		thumbnail: '/images/project-ai-workflow.webp'
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
		thumbnail: '/images/project-lecsens.webp'
	}
];

// ========================================
// Experience
// ========================================
export const experiences: Experience[] = [
	{
		id: 'exp-1',
		company: 'Independent · freelance',
		position: 'Full-stack developer',
		period: {
			start: '2023',
			end: 'Present'
		},
		location: 'Remote, Indonesia',
		description:
			'Designing and operating production systems end-to-end — data model, Go services, and the interfaces and deploys around them — including the POME, Portal, and LecSens platforms above and this site.',
		achievements: [
			'Built three production IoT platforms: architecture, backend services, deployment, and monitoring',
			'Shipped complete products solo — schema, API, dashboard, and the pipeline that releases them',
			'Delivered secure multi-tenant REST APIs handling real-time sensor ingestion and visualization',
			'Wired CI/CD with automated tests, linting, and security scanning (Trivy, gosec) into every repo',
			'Collaborated with frontend developers to land APIs in dashboards without integration drama'
		],
		techStack: ['Golang', 'PostgreSQL', 'InfluxDB', 'Redis', 'Docker', 'Kubernetes', 'SvelteKit', 'CI/CD']
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
export const services: Service[] = [
	{
		id: 'backend-dev',
		code: 'SVC-01',
		title: 'Backend Development',
		description:
			'APIs and services built to be maintained, not just shipped — Clean Architecture, tests, and logs you can actually read.',
		techStack: ['Golang', 'Python', 'PostgreSQL', 'Redis'],
		longDescription:
			'I build production-grade backend systems from scratch using Clean Architecture principles. Every system is designed for maintainability, testability, and scalability — from database schema design to deployment automation. Whether you need a monolith or microservices, I deliver secure, well-structured backends that your team can confidently maintain and extend.',
		features: [
			'Clean Architecture with domain-driven design',
			'Secure REST API endpoints with JWT/OAuth authentication',
			'Database schema design and query optimization',
			'Comprehensive error handling and structured logging',
			'Unit and integration testing with CI/CD pipeline'
		],
		process: [
			'Requirements analysis and system architecture planning',
			'Database schema and API contract design',
			'Implementation with Clean Architecture patterns',
			'Testing, security review, and production deployment'
		],
		relatedProjects: ['pome', 'lecsens'],
		seo: {
			title: 'Backend Development Services | Golang & Python | Alvin Vincent',
			description:
				'Freelance backend developer specializing in Golang, Python, PostgreSQL. Clean Architecture, REST APIs, and scalable systems. Available for projects worldwide.',
			keywords: [
				'backend developer',
				'golang developer',
				'freelance backend engineer',
				'REST API development',
				'clean architecture'
			]
		}
	},
	{
		id: 'api-design',
		code: 'SVC-02',
		title: 'API Design & Integration',
		description:
			'REST endpoints with auth, rate limits, and docs — your web or mobile team plugs in and stops thinking about it.',
		techStack: ['REST', 'JWT', 'OAuth', 'WebSocket'],
		longDescription:
			'I design and build RESTful APIs that are secure, well-documented, and easy to integrate. From authentication systems with JWT and OAuth to real-time WebSocket connections, I create APIs that serve as reliable foundations for web and mobile applications. I also handle third-party API integrations, payment gateways, and webhook systems.',
		features: [
			'RESTful API design following best practices',
			'JWT and OAuth2 authentication systems',
			'Rate limiting and request throttling',
			'Third-party API and payment gateway integration',
			'WebSocket real-time communication'
		],
		process: [
			'API requirements and endpoint specification',
			'Authentication and authorization strategy',
			'Implementation with comprehensive documentation',
			'Integration testing and performance optimization'
		],
		relatedProjects: ['portal', 'pome'],
		seo: {
			title: 'API Design & Integration Services | REST API Developer | Alvin Vincent',
			description:
				'Professional REST API design and integration services. JWT authentication, OAuth, WebSocket, third-party integrations. Freelance API developer in Indonesia.',
			keywords: [
				'API design',
				'REST API developer',
				'API integration',
				'JWT authentication',
				'freelance API engineer'
			]
		}
	},
	{
		id: 'iot-data',
		code: 'SVC-03',
		title: 'IoT & Data Systems',
		description:
			'Sensor-to-dashboard pipelines: MQTT in, time-series storage, alerts out. Built on real industrial deployments.',
		techStack: ['InfluxDB', 'PostgreSQL', 'MQTT', 'Grafana'],
		longDescription:
			'I build backend systems for IoT and sensor monitoring — from data ingestion pipelines to real-time analytics dashboards. With production experience on industrial monitoring platforms (palm-oil mill effluent, water quality compliance), I handle high-frequency sensor data at scale using time-series databases, automated alerting, and visualization tools.',
		features: [
			'High-frequency sensor data ingestion pipelines',
			'Time-series database design (InfluxDB, TimescaleDB)',
			'Real-time monitoring dashboards and alerting',
			'MQTT broker integration for IoT devices',
			'Data analytics and automated reporting'
		],
		process: [
			'Sensor data requirements and protocol analysis',
			'Database architecture for time-series + metadata',
			'Pipeline implementation with real-time processing',
			'Dashboard setup, alerting, and deployment'
		],
		relatedProjects: ['lecsens', 'pome'],
		seo: {
			title: 'IoT Backend & Data Systems | Sensor Monitoring Developer | Alvin Vincent',
			description:
				'IoT backend developer building sensor monitoring platforms, time-series data pipelines, and real-time dashboards. InfluxDB, MQTT, Grafana. Freelance in Indonesia.',
			keywords: [
				'IoT developer',
				'sensor monitoring backend',
				'time-series database',
				'InfluxDB developer',
				'real-time monitoring'
			]
		}
	},
	{
		id: 'ai-integration',
		code: 'SVC-04',
		title: 'AI / LLM Integration',
		description:
			'LLM features wired into real backends — RAG, vector search, structured outputs, with fallbacks and a cost ceiling.',
		techStack: ['LLM APIs', 'Vector DB', 'RAG', 'gRPC'],
		longDescription:
			'I integrate large language models into your backend workflows — from RAG (Retrieval-Augmented Generation) systems for intelligent document search to automated content processing pipelines. I build provider-agnostic LLM abstraction layers with fallback strategies, cost optimization, and structured output parsing.',
		features: [
			'RAG systems with vector search for document retrieval',
			'Provider-agnostic LLM integration with fallback strategies',
			'Automated document processing and classification',
			'Cost tracking and optimization per tenant',
			'Structured output parsing and validation'
		],
		process: [
			'Use case analysis and LLM provider selection',
			'Vector database and embedding pipeline setup',
			'Integration implementation with error handling',
			'Testing, cost monitoring, and production deployment'
		],
		relatedProjects: ['pome'],
		seo: {
			title: 'AI/LLM Integration Services | RAG Systems Developer | Alvin Vincent',
			description:
				'AI and LLM integration developer building RAG systems, vector search, and automated document processing. Provider-agnostic LLM integration. Freelance AI engineer.',
			keywords: [
				'LLM integration',
				'RAG system developer',
				'AI backend developer',
				'vector search',
				'LLM API integration'
			]
		}
	},
	{
		id: 'devops',
		code: 'SVC-05',
		title: 'DevOps & Deployment',
		description:
			'Docker, CI/CD, security scans, zero-downtime deploys — the unglamorous work that keeps the pager quiet.',
		techStack: ['Docker', 'Kubernetes', 'CI/CD', 'Linux'],
		longDescription:
			'I set up production deployment infrastructure — from Docker containerization and CI/CD pipelines to Linux server management and Cloudflare tunnels. I automate the entire build-test-deploy cycle with security scanning, health checks, and zero-downtime deployments so your applications run reliably in production.',
		features: [
			'Docker multi-stage builds and compose orchestration',
			'CI/CD pipelines with automated testing and security scanning',
			'Linux server provisioning and management',
			'Cloudflare tunnels and DNS configuration',
			'Zero-downtime deployment strategies'
		],
		process: [
			'Infrastructure requirements and architecture planning',
			'Docker containerization and compose setup',
			'CI/CD pipeline configuration with security scanning',
			'Deployment, monitoring, and documentation'
		],
		relatedProjects: ['pome', 'portal'],
		seo: {
			title: 'DevOps & Deployment Services | Docker & CI/CD | Alvin Vincent',
			description:
				'DevOps services including Docker containerization, CI/CD pipelines, Linux server management, and Cloudflare setup. Freelance DevOps engineer in Indonesia.',
			keywords: [
				'DevOps services',
				'Docker deployment',
				'CI/CD pipeline',
				'Linux server management',
				'freelance DevOps'
			]
		}
	},
	{
		id: 'full-stack',
		code: 'SVC-06',
		title: 'Full-stack delivery',
		description:
			'One engineer for the whole build: schema, API, dashboard, and deploy. You get a running product, not a pile of handoffs.',
		techStack: ['SvelteKit', 'TypeScript', 'Go', 'PostgreSQL', 'Docker'],
		longDescription:
			'I take a product from an empty repository to a running system: the data model, the backend services, the interface your users actually touch, and the pipeline that ships it. Backend is my depth — Go services in Clean Architecture, PostgreSQL and InfluxDB, Docker and CI/CD. The front end I deliver in SvelteKit and TypeScript, the same stack this site runs on. One engineer, one thread of responsibility, and no integration gap between the people who write the API and the people who call it.',
		features: [
			'Database schema and API contracts derived from the product requirements',
			'Backend services in Go with Clean Architecture and tests',
			'User-facing dashboard in SvelteKit and TypeScript',
			'Deploy pipeline: containers, CI/CD, monitoring, zero-downtime releases',
			'Handover: documentation and a codebase your next hire can read'
		],
		process: [
			'Scope: what the product must do on day one, written down',
			'Architecture: data model, API contracts, interface skeleton',
			'Build in weekly increments you can click and test',
			'Ship to production with monitoring, then iterate on real usage'
		],
		relatedProjects: ['pome', 'lecsens', 'portal'],
		seo: {
			title: 'Freelance Full-Stack Developer | End-to-End Product Builds | Alvin Vincent',
			description:
				'Freelance full-stack developer building complete products end to end: Go APIs, PostgreSQL, SvelteKit dashboards, and Docker deploys. One engineer from schema to launch.',
			keywords: [
				'freelance full stack developer',
				'full stack developer Indonesia',
				'MVP development',
				'end to end product development',
				'SvelteKit developer',
				'Go developer'
			]
		}
	}
];

// ========================================
// FAQ — mirrored in FAQPage structured data
// (src/routes/+layout.svelte) so answers stay in one place
// ========================================
export const faqs: Faq[] = [
	{
		question: 'Can you build the whole product, not just the backend?',
		answer:
			'Yes. This site is one example: schema, API, interface, and deploy. On client platforms I own the backend and the release pipeline, and I ship the interface wherever the scope needs it.'
	},
	{
		question: 'How long does a project take?',
		answer:
			'It depends on scope, but a focused first version is usually weeks, not months. After a short call you get a written scope with a real date.'
	},
	{
		question: 'Do you work with clients outside Indonesia?',
		answer:
			'Yes — I work remotely from Surabaya (UTC+7) and keep daily overlap with Europe and North America. Calls in English or Indonesian.'
	},
	{
		question: 'What does it cost?',
		answer:
			'Send the problem and you get a straight answer about scope, timeline, and the number before any work starts.'
	},
	{
		question: 'What stack will you use?',
		answer:
			'Go and PostgreSQL behind the API, InfluxDB for time-series, SvelteKit and TypeScript for the interface, Docker and CI/CD to ship it. Boring tools your next hire can pick up.'
	}
];
