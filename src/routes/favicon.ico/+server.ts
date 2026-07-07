import { redirect } from '@sveltejs/kit';

export function GET() {
	redirect(308, '/images/favicon-pixel.png');
}
