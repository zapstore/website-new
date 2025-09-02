<script>
	import { page } from '$app/stores';
	import { Menu, X } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	import { assets } from '$app/paths';
	
	let mobileMenuOpen = false;
	
	const navigation = [
		{ name: 'Home', href: '/' },
		{ name: 'Apps', href: '/apps' },
		{ name: 'Developers', href: '/developers' },
		{ name: 'Documentation', href: '/docs' },
		{ name: 'Blog', href: '/blog' }
	];
</script>

<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
	<nav class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-3">
					<img src={`${assets}/images/logo-dark.svg`} alt="Zapstore" class="h-6 w-auto" />
					<span class="font-semibold text-xl">Zapstore</span>
				</a>
			</div>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-8">
				{#each navigation as item}
					<a 
						href={item.href} 
						class={cn(
							"text-sm font-medium transition-colors hover:text-primary",
							$page.url.pathname === item.href 
								? "text-foreground" 
								: "text-muted-foreground"
						)}
					>
						{item.name}
					</a>
				{/each}
			</div>
			
			<!-- Desktop CTA -->
			<div class="hidden md:flex md:items-center md:space-x-4">
				<a 
					href="/apps" 
					class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
				>
					Get Started
				</a>
			</div>
			
			<!-- Mobile menu button -->
			<div class="flex md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
					on:click={() => mobileMenuOpen = !mobileMenuOpen}
				>
					<span class="sr-only">Open main menu</span>
					{#if mobileMenuOpen}
						<X class="h-6 w-6" />
					{:else}
						<Menu class="h-6 w-6" />
					{/if}
				</button>
			</div>
		</div>
	</nav>
	
	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="md:hidden">
			<div class="space-y-1 px-4 pb-3 pt-2">
				{#each navigation as item}
					<a
						href={item.href}
						class={cn(
							"block rounded-md px-3 py-2 text-base font-medium transition-colors",
							$page.url.pathname === item.href
								? "bg-accent text-accent-foreground"
								: "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
						)}
						on:click={() => mobileMenuOpen = false}
					>
						{item.name}
					</a>
				{/each}
				<div class="pt-4">
					<a 
						href="/apps" 
						class="block w-full rounded-md bg-primary px-3 py-2 text-center text-base font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
						on:click={() => mobileMenuOpen = false}
					>
						Get Started
					</a>
				</div>
			</div>
		</div>
	{/if}
</header> 