import { getMarkdownContent, getAllSlugs } from '$lib/server/docs.js';
import { error } from '@sveltejs/kit';

// export const prerender = true;

export async function load({ params }) {
	const slug = params.slug || '';
	
	try {
		const content = await getMarkdownContent(slug);
		
		if (!content) {
			throw error(404, 'Page not found');
		}
		
		return {
			content
		};
	} catch (err) {
		console.error('Error loading content:', err);
		throw err;
	}
}

// export async function entries() {
// 	try {
// 		const slugs = await getAllSlugs();
		
// 		// Return all possible slug combinations for prerendering
// 		const entries = [
// 			{ slug: [] }, // for /docs (root)
// 		];
		
// 		// Add entries for each slug
// 		for (const slug of slugs) {
// 			if (slug && typeof slug === 'string') {
// 				const parts = slug.split('/').filter(part => part && typeof part === 'string' && part.length > 0);
// 				entries.push({ slug: parts });
// 			}
// 		}
		
// 		return entries;
// 	} catch (error) {
// 		console.error('Error generating entries:', error);
// 		return [{ slug: [] }]; // Fallback to just the root
// 	}
// } 