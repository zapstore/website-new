import { getMarkdownContent, getAllSlugs } from '$lib/server/docs.js';
import { error } from '@sveltejs/kit';

// export const prerender = true;

export async function load({ params }) {
	// Simple test to see if the route works
	const slug = params.slug ? params.slug.join('/') : '';
	
	return {
		content: {
			title: `Test Page for: ${slug}`,
			html: `<h1>Test Page</h1><p>Slug: ${slug}</p><p>Params: ${JSON.stringify(params)}</p>`,
			slug
		}
	};
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