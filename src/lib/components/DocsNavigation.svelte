<script>
	import { page } from '$app/stores';
	import { Menu, X, ChevronDown, ChevronRight, Book, Rocket, Code, Shield } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { onMount } from 'svelte';

	export let navigation = [];
	export let mobileMenuOpen = false;
	export let toggleMobileMenu = () => {};
	
	let expandedSections = {};

	// Icon mapping
	const iconMap = {
		Book,
		Rocket,
		Code,
		Shield
	};

	// Auto-expand sections that contain the current page
	$: {
		if ($page.url.pathname && navigation.length > 0) {
			const newExpanded = { ...expandedSections };
			
			navigation.forEach(section => {
				const hasActivePage = section.items.some(item => 
					isActiveLink(item.href) || 
					(item.items && hasActiveChild(item.items))
				);
				
				if (hasActivePage) {
					newExpanded[section.title] = true;
				}
			});
			
			expandedSections = newExpanded;
		}
	}

	// Handle escape key to close mobile menu
	onMount(() => {
		const handleKeydown = (e) => {
			if (e.key === 'Escape' && mobileMenuOpen) {
				toggleMobileMenu();
			}
		};
		
		document.addEventListener('keydown', handleKeydown);
		return () => document.removeEventListener('keydown', handleKeydown);
	});

	function toggleSection(sectionTitle) {
		expandedSections[sectionTitle] = !expandedSections[sectionTitle];
		expandedSections = { ...expandedSections };
	}

	function isActiveLink(href) {
		return $page.url.pathname === href;
	}

	function hasActiveChild(items) {
		return items.some(item => 
			isActiveLink(item.href) || 
			(item.items && hasActiveChild(item.items))
		);
	}
</script>

<!-- Mobile menu overlay -->
{#if mobileMenuOpen}
	<div 
		class="lg:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
		on:click={toggleMobileMenu}
		role="button"
		tabindex="0"
		on:keydown={(e) => e.key === 'Enter' && toggleMobileMenu()}
	></div>
{/if}

<!-- Navigation sidebar -->
<aside class={cn(
	"fixed lg:sticky top-16 left-0 z-40 h-screen lg:h-auto w-80 lg:w-auto bg-background lg:bg-transparent border-r lg:border-r-0 border-border transform transition-transform duration-300 ease-in-out lg:transform-none overflow-y-auto custom-scrollbar",
	mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
)}>
	<nav class="p-6 lg:p-0 lg:sticky lg:top-24 space-y-6">
		{#each navigation as section}
			<div>
				<!-- Section header with icon -->
				<h3 class="flex items-center space-x-2 font-semibold text-sm mb-3">
					{#if section.icon && iconMap[section.icon]}
						<svelte:component this={iconMap[section.icon]} class="h-4 w-4" />
					{:else}
						<Book class="h-4 w-4" />
					{/if}
					<span>{section.title}</span>
				</h3>
				
				<!-- Section items -->
				<ul class="space-y-2">
					{#each section.items as item}
						<li>
							<a 
								href={item.href}
								class={cn(
									"block text-sm px-3 py-1.5 rounded-md transition-colors",
									isActiveLink(item.href)
										? "bg-primary/10 text-primary font-medium"
										: "text-muted-foreground hover:text-foreground hover:bg-accent"
								)}
							>
								{item.title}
							</a>
						</li>
					{/each}
				</ul>
			</div>
		{/each}
	</nav>
</aside>

<style>
	/* Ensure mobile menu appears above other content */
	aside {
		-webkit-overflow-scrolling: touch;
	}
</style> 