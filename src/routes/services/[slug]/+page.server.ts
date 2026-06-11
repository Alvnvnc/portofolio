import { error } from '@sveltejs/kit';
import { services, projects } from '$lib/data/portfolio';
import type { PageServerLoad } from './$types';
import type { Project } from '$lib/types';

export const load: PageServerLoad = async ({ params }) => {
	const service = services.find((s) => s.id === params.slug);

	if (!service) {
		throw error(404, {
			message: `Service not found`
		});
	}

	const relatedProjects = (service.relatedProjects ?? [])
		.map((pid) => projects.find((p) => p.id === pid))
		.filter((project): project is Project => Boolean(project));

	return {
		service,
		relatedProjects
	};
};
