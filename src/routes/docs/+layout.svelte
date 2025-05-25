<script>
	import { Menu, X } from 'lucide-svelte';
	import DocsNavigation from '$lib/components/DocsNavigation.svelte';
	import { page } from '$app/stores';
	
	export let data;
	
	let mobileMenuOpen = false;
	
	// Close mobile menu when route changes
	$: if ($page.url.pathname) {
		mobileMenuOpen = false;
	}
	
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<!-- Add top spacing to account for fixed header -->
<div class="pt-16">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
		<!-- Mobile menu toggle button -->
		<div class="lg:hidden mb-6">
			<button
				class="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
				on:click={toggleMobileMenu}
				aria-label="Toggle navigation menu"
			>
				{#if mobileMenuOpen}
					<X class="h-4 w-4" />
					Hide Menu
				{:else}
					<Menu class="h-4 w-4" />
					Show Menu
				{/if}
			</button>
		</div>
		
		<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
			<!-- Navigation -->
			<div class="lg:col-span-1">
				<DocsNavigation 
					navigation={data.navigation} 
					{mobileMenuOpen}
					{toggleMobileMenu}
				/>
			</div>
			
			<!-- Content -->
			<main class="lg:col-span-3 lg:pl-8">
				<slot />
			</main>
		</div>
	</div>
</div> 