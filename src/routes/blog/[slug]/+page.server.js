import { getBlogPost, getAllBlogSlugs } from '$lib/server/blog.js';
import { error } from '@sveltejs/kit';

// export const prerender = true;

export async function load({ params }) {
	const post = await getBlogPost(params.slug);

	if (!post) {
		throw error(404, 'Blog post not found');
	}

	return {
		post
	};
}