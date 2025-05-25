<script>
	import { page } from '$app/stores';
	import { Book, Rocket, Code, Shield, Zap, HelpCircle } from 'lucide-svelte';
	import { cn } from '$lib/utils';
	
	const navigation = [
		{
			title: 'Getting Started',
			icon: Rocket,
			items: [
				{ title: 'Introduction', href: '/docs' },
				{ title: 'Quick Start', href: '/docs/quickstart' },
				{ title: 'Installation', href: '/docs/installation' }
			]
		},
		{
			title: 'Core Concepts',
			icon: Book,
			items: [
				{ title: 'Architecture', href: '/docs/architecture' },
				{ title: 'Nostr Protocol', href: '/docs/nostr' },
				{ title: 'Cryptographic Verification', href: '/docs/verification' }
			]
		},
		{
			title: 'Developers',
			icon: Code,
			items: [
				{ title: 'SDK Reference', href: '/docs/sdk' },
				{ title: 'CLI Tools', href: '/docs/cli' },
				{ title: 'API Reference', href: '/docs/api' }
			]
		},
		{
			title: 'Security',
			icon: Shield,
			items: [
				{ title: 'Best Practices', href: '/docs/security' },
				{ title: 'Key Management', href: '/docs/keys' }
			]
		}
	];
</script>

<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Sidebar -->
		<aside class="lg:col-span-1">
			<nav class="sticky top-24 space-y-6">
				{#each navigation as section}
					<div>
						<h3 class="flex items-center space-x-2 font-semibold text-sm mb-3">
							<svelte:component this={section.icon} class="h-4 w-4" />
							<span>{section.title}</span>
						</h3>
						<ul class="space-y-2">
							{#each section.items as item}
								<li>
									<a 
										href={item.href}
										class={cn(
											"block text-sm px-3 py-1.5 rounded-md transition-colors",
											$page.url.pathname === item.href
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
		
		<!-- Content -->
		<main class="lg:col-span-3">
			<slot />
		</main>
	</div>
</div> 