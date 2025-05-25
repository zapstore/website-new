<script>
	export let data;
</script>

<svelte:head>
	<title>{data.content.title} - Zapstore Documentation</title>
	<meta name="description" content="Zapstore documentation: {data.content.title}" />
</svelte:head>

<article class="prose">
	{@html data.content.html}
</article> 