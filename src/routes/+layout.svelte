<script>
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	
	// Import Geist fonts - simplified imports
	import '@fontsource/geist-sans';
	import '@fontsource/geist-mono';
</script>

<div class="min-h-screen relative">
	<div class="absolute inset-0 bg-svg-gradient"></div>
	<div class="absolute inset-0 bg-dither pointer-events-none mix-blend-overlay opacity-60"></div>
	<div class="relative z-10 flex flex-col min-h-screen">
		<Header />
		<main class="flex-1">
			<slot />
		</main>
		<Footer />
	</div>
</div> 