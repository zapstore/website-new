<script>
	import { Calendar, Clock, ArrowLeft } from 'lucide-svelte';
	
	export let data;
	$: post = data.post;
</script>

<svelte:head>
	<title>{post.title} - Zapstore Blog</title>
	<meta name="description" content={post.description || post.content?.substring(0, 160) + '...'} />
</svelte:head>

<article class="max-w-4xl mx-auto">
	<div class="mb-8">
		<a href="/blog" class="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-8">
			<ArrowLeft class="h-4 w-4 mr-2" />
			Back to Blog
		</a>
		
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
			
			<h1 class="text-4xl sm:text-5xl font-black">
				{post.title}
			</h1>
			
			<p class="text-muted-foreground">
				By {post.author}
			</p>
		</div>
	</div>
	
	<div class="prose">
		{@html post.html}
	</div>
</article> 