<script>
	import { Github, Twitter, MessageSquare } from 'lucide-svelte';
	import { assets } from '$app/paths';
</script>

<footer class="border-t border-border/40 bg-background">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-4 gap-8">
			<!-- Brand -->
			<div class="col-span-1 md:col-span-2">
				<div class="flex items-center space-x-3 mb-4">
					<img src={`${assets}/images/logo-dark.svg`} alt="Zapstore" class="h-6 w-auto" />
					<span class="font-semibold text-xl">Zapstore</span>
				</div>
				<p class="text-muted-foreground text-sm max-w-md">
					The open marketplace powered by nostr. Everything you install comes from trusted sources 
					and is cryptographically verified. Choose your own curators, or mix and match!
				</p>
				<div class="flex items-center space-x-4 mt-6">
					<a href="https://github.com" class="text-muted-foreground hover:text-foreground transition-colors">
						<Github class="h-5 w-5" />
					</a>
					<a href="https://twitter.com" class="text-muted-foreground hover:text-foreground transition-colors">
						<Twitter class="h-5 w-5" />
					</a>
					<a href="https://discord.com" class="text-muted-foreground hover:text-foreground transition-colors">
						<MessageSquare class="h-5 w-5" />
					</a>
				</div>
			</div>
			
			<!-- Product -->
			<div>
				<h3 class="font-semibold text-sm mb-4">Product</h3>
				<ul class="space-y-3">
					<li>
						<a href="/apps" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							Browse Apps
						</a>
					</li>
					<li>
						<a href="/developers" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							For Developers
						</a>
					</li>
					<li>
						<a href="/docs" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							Documentation
						</a>
					</li>
					<li>
						<a href="/blog" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							Blog
						</a>
					</li>
				</ul>
			</div>
			
			<!-- Resources -->
			<div>
				<h3 class="font-semibold text-sm mb-4">Resources</h3>
				<ul class="space-y-3">
					<li>
						<a href="/docs/getting-started" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							Getting Started
						</a>
					</li>
					<li>
						<a href="/docs/api" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							API Reference
						</a>
					</li>
					<li>
						<a href="/docs/nostr" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							Nostr Protocol
						</a>
					</li>
					<li>
						<a href="/support" class="text-muted-foreground hover:text-foreground text-sm transition-colors">
							Support
						</a>
					</li>
				</ul>
			</div>
		</div>
		
		<div class="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
			© {new Date().getFullYear()} Zapstore. Built with open source technology.
		</div>
	</div>
</footer> 