import type {
	PersonalInfo,
	Skill,
	Project,
	Experience,
	Education,
	Service,
	NavItem,
	SectionMeta
} from '$lib/types';

// ========================================
// Personal Information
// ========================================
export const personalInfo: PersonalInfo = {
	name: 'Alvin',
	title: 'Backend Engineer',
	tagline: 'Building robust backend systems, APIs, and scalable solutions. Available for freelance projects.',
	location: 'Surabaya, Indonesia',
	email: 'alvnvincent30@gmail.com',
	github: 'https://github.com/Alvnvnc',
	linkedin: 'https://linkedin.com/in/alvin-reba-88a857279'
};

// ========================================
// Navigation Items
// ========================================
export const navItems: NavItem[] = [
	{ id: 'hero', label: 'Home', href: '#hero' },
	{ id: 'about', label: 'About', href: '#about' },
	{ id: 'services', label: 'Services', href: '#services' },
	{ id: 'skills', label: 'Skills', href: '#skills' },
	{ id: 'projects', label: 'Projects', href: '#projects' },
	{ id: 'experience', label: 'Experience', href: '#experience' },
	{ id: 'contact', label: 'Contact', href: '#contact' }
];

// ========================================
// Section Metadata (System Metaphor)
// ========================================
export const sectionMeta: SectionMeta[] = [
	{
		id: 'hero',
		title: 'Entry Point',
		systemName: 'API Gateway',
		subtitle: 'System Status: Online'
	},
	{
		id: 'about',
		title: 'About',
		systemName: 'System Overview',
		subtitle: 'Architecture & Philosophy'
	},
	{
		id: 'services',
		title: 'Services',
		systemName: 'Microservices',
		subtitle: 'Available Endpoints'
	},
	{
		id: 'skills',
		title: 'Skills',
		systemName: 'Tech Stack',
		subtitle: 'Core Modules & Dependencies'
	},
	{
		id: 'projects',
		title: 'Projects',
		systemName: 'Services',
		subtitle: 'Production Systems'
	},
	{
		id: 'experience',
		title: 'Experience',
		systemName: 'System Evolution',
		subtitle: 'Version History'
	},
	{
		id: 'contact',
		title: 'Contact',
		systemName: 'Interface',
		subtitle: 'Open Connection'
	}
];

// ========================================
// Skills Data
// ========================================
export const skills: Skill[] = [
	// Core Languages
	{ name: 'Golang', category: 'core', level: 'advanced', icon: 'go' },
	{ name: 'Python', category: 'core', level: 'advanced', icon: 'python' },
	{ name: 'JavaScript', category: 'core', level: 'intermediate', icon: 'javascript' },
	{ name: 'Java', category: 'core', level: 'intermediate', icon: 'java' },
	{ name: 'TypeScript', category: 'core', level: 'intermediate', icon: 'typescript' },
	{ name: 'SQL', category: 'core', level: 'advanced', icon: 'database' },

	// Databases
	{ name: 'PostgreSQL', category: 'database', level: 'advanced', icon: 'postgresql' },
	{ name: 'InfluxDB', category: 'database', level: 'advanced', icon: 'influxdb' },
	{ name: 'Redis', category: 'database', level: 'intermediate', icon: 'redis' },
	{ name: 'MongoDB', category: 'database', level: 'intermediate', icon: 'mongodb' },

	// Infrastructure
	{ name: 'Docker', category: 'infrastructure', level: 'advanced', icon: 'docker' },
	{ name: 'CI/CD', category: 'infrastructure', level: 'advanced', icon: 'cicd' },
	{ name: 'Linux', category: 'infrastructure', level: 'advanced', icon: 'linux' },
	{ name: 'Nginx', category: 'infrastructure', level: 'intermediate', icon: 'nginx' },

	// AI & ML
	{ name: 'LLM APIs', category: 'ai', level: 'intermediate', icon: 'ai' },
	{ name: 'Vector Search', category: 'ai', level: 'intermediate', icon: 'search' },
	{ name: 'RAG Systems', category: 'ai', level: 'intermediate', icon: 'rag' },

	// Tools
	{ name: 'Git', category: 'tools', level: 'advanced', icon: 'git' },
	{ name: 'Clean Architecture', category: 'tools', level: 'advanced', icon: 'architecture' },
	{ name: 'REST API Design', category: 'tools', level: 'advanced', icon: 'api' }
];

// ========================================
// Projects Data
// ========================================
export const projects: Project[] = [
	{
		id: 'lecsens',
		title: 'IoT Water Quality Monitoring Platform',
		description:
			'End-to-end backend platform for real-time environmental sensor monitoring and automation. Features Clean Architecture, JWT auth with RBAC, dual-database design, and CI/CD automation — similar to industrial POME monitoring systems.',
		problem:
			'Managing high-frequency sensor data at scale with secure multi-tenant access, real-time analytics, and reliable automated deployment.',
		architecture:
			'Clean Architecture separating domain, application, and infrastructure layers. PostgreSQL for operational data, InfluxDB for time-series sensor readings, Redis for caching and sessions.',
		keyDecisions: [
			'Dual database design: PostgreSQL for metadata + InfluxDB for high-frequency time-series',
			'Implemented RBAC with JWT authentication for multi-tenant security isolation',
			'Redis caching and session management, improving response times by 40%',
			'Docker deployment with CI/CD automation, Trivy and gosec security scanning'
		],
		techStack: ['Golang', 'PostgreSQL', 'InfluxDB', 'Redis', 'Docker', 'Nginx', 'JWT'],
		featured: true,
		thumbnail: '/images/project-lecsens.png'
	},
	{
		id: 'ai-workflow',
		title: 'AI Workflow Engine',
		description:
			'LLM integration platform for automating document processing and intelligent routing.',
		problem:
			'Orchestrating multiple LLM providers with fallback strategies and cost optimization.',
		architecture: 'Event-driven architecture with message queues for async processing.',
		keyDecisions: [
			'Provider-agnostic LLM abstraction layer',
			'Vector search for semantic document retrieval',
			'Rate limiting and cost tracking per tenant',
			'Structured output parsing with validation'
		],
		techStack: ['Python', 'FastAPI', 'Redis', 'PostgreSQL', 'OpenAI', 'Anthropic'],
		featured: true,
		thumbnail: '/images/project-ai-workflow.png'
	},
	{
		id: 'backend-template',
		title: 'Go Backend Template',
		description:
			'Production-ready Golang backend template with Clean Architecture patterns.',
		problem:
			'Reducing boilerplate and enforcing consistent patterns across microservices.',
		architecture:
			'Hexagonal architecture with dependency injection and interface-driven design.',
		keyDecisions: [
			'Repository pattern for database abstraction',
			'Middleware chain for cross-cutting concerns',
			'Structured logging with correlation IDs',
			'Health checks and graceful shutdown'
		],
		techStack: ['Golang', 'PostgreSQL', 'Docker', 'GitHub Actions'],
		featured: false,
		thumbnail: '/images/project-backend-template.png'
	}
];

// ========================================
// Experience Data
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
			'Designing and developing production-style backend systems independently, from architecture to deployment. Focused on IoT monitoring platforms and scalable REST APIs.',
		achievements: [
			'Designed and built multiple production backend systems independently from scratch to deployment',
			'Delivered secure, scalable RESTful APIs supporting real-time sensor data ingestion and visualization',
			'Applied CI/CD pipelines, automated testing, linting, and security scanning (Trivy, gosec)',
			'Collaborated with frontend developers to integrate APIs into dashboards and monitoring tools'
		],
		techStack: ['Golang', 'PostgreSQL', 'InfluxDB', 'Redis', 'Docker', 'CI/CD']
	}
];

// ========================================
// Education Data
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
			'Relevant Coursework: Data Structures & Algorithms, Database Systems, Operating Systems, Software Engineering, Machine Learning'
		]
	}
];

// ========================================
// Skill Categories for Display
// ========================================
export const skillCategories = [
	{ id: 'core', name: 'Core', icon: 'star' },
	{ id: 'database', name: 'Data', icon: 'database' },
	{ id: 'infrastructure', name: 'Infra', icon: 'server' },
	{ id: 'ai', name: 'AI', icon: 'brain' },
	{ id: 'tools', name: 'Tools', icon: 'wrench' }
] as const;

// ========================================
// Services Data
// ========================================
export const services: Service[] = [
	{
		id: 'backend-dev',
		title: 'Backend Development',
		description:
			'Production-grade backend systems with Clean Architecture, secure REST APIs, and scalable database design.',
		icon: '⚙️',
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
		relatedProjects: ['lecsens', 'backend-template'],
		seo: {
			title: 'Backend Development Services | Golang & Python | Alvin Vincent',
			description:
				'Freelance backend developer specializing in Golang, Python, PostgreSQL. Clean Architecture, REST APIs, and scalable systems. Available for projects worldwide.',
			keywords: ['backend developer', 'golang developer', 'freelance backend engineer', 'REST API development', 'clean architecture']
		}
	},
	{
		id: 'api-design',
		title: 'API Design & Integration',
		description:
			'RESTful API design with authentication, rate limiting, and third-party service integration.',
		icon: '🔌',
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
		relatedProjects: ['lecsens', 'ai-workflow'],
		seo: {
			title: 'API Design & Integration Services | REST API Developer | Alvin Vincent',
			description:
				'Professional REST API design and integration services. JWT authentication, OAuth, WebSocket, third-party integrations. Freelance API developer in Indonesia.',
			keywords: ['API design', 'REST API developer', 'API integration', 'JWT authentication', 'freelance API engineer']
		}
	},
	{
		id: 'iot-data',
		title: 'IoT & Data Systems',
		description:
			'Sensor data ingestion, time-series databases, real-time monitoring dashboards, and analytics pipelines.',
		icon: '📡',
		techStack: ['InfluxDB', 'PostgreSQL', 'MQTT', 'Grafana'],
		longDescription:
			'I build backend systems for IoT and sensor monitoring — from data ingestion pipelines to real-time analytics dashboards. With experience in industrial monitoring platforms similar to POME water quality systems, I handle high-frequency sensor data at scale using time-series databases, automated alerting, and visualization tools.',
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
		relatedProjects: ['lecsens'],
		seo: {
			title: 'IoT Backend & Data Systems | Sensor Monitoring Developer | Alvin Vincent',
			description:
				'IoT backend developer building sensor monitoring platforms, time-series data pipelines, and real-time dashboards. InfluxDB, MQTT, Grafana. Freelance in Indonesia.',
			keywords: ['IoT developer', 'sensor monitoring backend', 'time-series database', 'InfluxDB developer', 'real-time monitoring']
		}
	},
	{
		id: 'ai-integration',
		title: 'AI/LLM Integration',
		description:
			'LLM-powered automation, RAG systems, vector search, and intelligent document processing workflows.',
		icon: '🤖',
		techStack: ['OpenAI', 'Anthropic', 'Vector DB', 'RAG'],
		longDescription:
			'I integrate large language models into your backend workflows — from RAG (Retrieval-Augmented Generation) systems for intelligent document search to automated content processing pipelines. I build provider-agnostic LLM abstraction layers with fallback strategies, cost optimization, and structured output parsing.',
		features: [
			'RAG systems with vector search for document retrieval',
			'Provider-agnostic LLM integration (OpenAI, Anthropic, etc.)',
			'Automated document processing and classification',
			'Cost optimization with fallback strategies',
			'Structured output parsing and validation'
		],
		process: [
			'Use case analysis and LLM provider selection',
			'Vector database and embedding pipeline setup',
			'Integration implementation with error handling',
			'Testing, cost monitoring, and production deployment'
		],
		relatedProjects: ['ai-workflow'],
		seo: {
			title: 'AI/LLM Integration Services | RAG Systems Developer | Alvin Vincent',
			description:
				'AI and LLM integration developer building RAG systems, vector search, and automated document processing. OpenAI, Anthropic API integration. Freelance AI engineer.',
			keywords: ['LLM integration', 'RAG system developer', 'AI backend developer', 'vector search', 'OpenAI integration']
		}
	},
	{
		id: 'devops',
		title: 'DevOps & Deployment',
		description:
			'Docker containerization, CI/CD pipelines, Linux server management, and cloud infrastructure setup.',
		icon: '🚀',
		techStack: ['Docker', 'CI/CD', 'Linux', 'Cloudflare'],
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
		relatedProjects: ['lecsens', 'backend-template'],
		seo: {
			title: 'DevOps & Deployment Services | Docker & CI/CD | Alvin Vincent',
			description:
				'DevOps services including Docker containerization, CI/CD pipelines, Linux server management, and Cloudflare setup. Freelance DevOps engineer in Indonesia.',
			keywords: ['DevOps services', 'Docker deployment', 'CI/CD pipeline', 'Linux server management', 'freelance DevOps']
		}
	}
];
