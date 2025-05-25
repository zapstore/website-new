<script>
	import { Calendar, Clock, ArrowRight } from 'lucide-svelte';
	
	export let data;
	$: posts = data.posts;
</script>

<svelte:head>
	<title>Blog - Zapstore</title>
	<meta name="description" content="Latest news, updates, and insights from the Zapstore team. Learn about open source, decentralized technology, and the future of app distribution." />
</svelte:head>

<div class="max-w-4xl mx-auto">
	<div class="mb-12">
		<h1 class="text-4xl sm:text-5xl font-black mb-4">Blog</h1>
		<p class="text-lg text-muted-foreground max-w-2xl mx-auto">
			Latest news, updates, and insights from the Zapstore team
		</p>
	</div>
	
	<div class="space-y-12">
		{#each posts as post}
			<article class="group">
				<a href="/blog/{post.slug}" class="block">
					<div class="space-y-4">
						<div class="flex items-center space-x-4 text-sm text-muted-foreground">
							<span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
								{post.category}
							</span>
							<span class="flex items-center">
								<Calendar class="h-4 w-4 mr-1" />
								{new Date(post.date).toLocaleDateString('en-US', { 
									month: 'long', 
									day: 'numeric', 
									year: 'numeric' 
								})}
							</span>
							<span class="flex items-center">
								<Clock class="h-4 w-4 mr-1" />
								{post.readTime}
							</span>
						</div>
						
						<h2 class="text-2xl sm:text-3xl font-bold group-hover:text-primary transition-colors">
							{post.title}
						</h2>
						
						<p class="text-muted-foreground">
							{post.description || post.content?.substring(0, 200) + '...'}
						</p>
						
						<div class="flex items-center justify-between">
							<span class="text-sm text-muted-foreground">
								By {post.author}
							</span>
							<span class="inline-flex items-center text-primary group-hover:translate-x-1 transition-transform">
								Read more
								<ArrowRight class="ml-2 h-4 w-4" />
							</span>
						</div>
					</div>
				</a>
			</article>
			
			{#if posts.indexOf(post) < posts.length - 1}
				<hr class="border-border/40" />
			{/if}
		{/each}
	</div>
</div> 