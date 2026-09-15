export interface PersonalInfo {
	name: string;
	fullName: string;
	title: string;
	tagline: string;
	location: string;
	email: string;
	linkedin?: string;
	website?: string;
}

export interface Skill {
	name: string;
	category: SkillCategory;
	level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
	primary?: boolean;
}

export type SkillCategory = 'core' | 'database' | 'infrastructure' | 'ai' | 'tools';

export type ProjectStatus = 'live' | 'field-test' | 'archived';

export interface Project {
	id: string;
	code: string;
	title: string;
	classification: string;
	status: ProjectStatus;
	description: string;
	problem: string;
	architecture: string;
	keyDecisions: string[];
	techStack: string[];
	links?: {
		demo?: string;
		docs?: string;
	};
	thumbnail?: string;
}

export interface Experience {
	id: string;
	company: string;
	position: string;
	period: {
		start: string;
		end: string | 'Present';
	};
	location: string;
	description: string;
	achievements: string[];
	techStack: string[];
}

export interface Education {
	institution: string;
	degree: string;
	field: string;
	period: {
		start: string;
		end: string;
	};
	gpa?: string;
	achievements?: string[];
}

export interface Service {
	id: string;
	code: string;
	title: string;
	description: string;
	techStack: string[];
	longDescription?: string;
	features?: string[];
	process?: string[];
	relatedProjects?: string[];
	seo?: {
		title: string;
		description: string;
		keywords?: string[];
	};
}

export interface NavItem {
	id: string;
	label: string;
	href: string;
}

export interface Faq {
	question: string;
	answer: string;
}

export type SectionId =
	| 'hero'
	| 'about'
	| 'services'
	| 'skills'
	| 'projects'
	| 'experience'
	| 'contact';

export interface SectionMeta {
	id: SectionId;
	label: string;
	index: string;
	title: string;
	note: string;
}
