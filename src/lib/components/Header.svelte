<script>
	import { page } from "$app/stores";
	import { Menu, X } from "lucide-svelte";
	import { cn } from "$lib/utils";
	import { assets } from "$app/paths";

	let mobileMenuOpen = false;

	function isActive(href) {
		const path = $page.url.pathname;
		if (href === "/") return path === "/";
		return path === href || path.startsWith(href + "/");
	}

	const navigation = [
		{ name: "Zapstore App", href: "/app" },
		{ name: "Developers", href: "/developers" },
		{ name: "Documentation", href: "/docs" },
		{ name: "Blog", href: "/blog" },
		{ name: "Browse Apps", href: "/apps" },
	];
</script>

<header class="sticky top-0 z-50 w-full border-b border-border/40 bg-header">
	<nav class="container mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="flex items-center">
				<a href="/" class="flex items-center space-x-3">
					<img
						src={`${assets}/images/logo-dark.svg`}
						alt="Zapstore"
						class="h-6 w-auto"
					/>
					<span class="font-semibold text-xl">Zapstore</span>
				</a>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex md:items-center md:space-x-8">
				{#each navigation as item}
					<a
						href={item.href}
						class={cn(
							"text-sm font-medium transition-colors hover:text-foreground",
							isActive(item.href) ? "text-foreground" : "text-muted-foreground",
						)}
					>
						{item.name}
					</a>
				{/each}
			</div>

			<!-- Mobile menu button -->
			<div class="flex md:hidden">
				<button
					type="button"
					class="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white/10"
					on:click={() => (mobileMenuOpen = !mobileMenuOpen)}
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
							isActive(item.href)
								? "bg-muted text-foreground"
								: "text-muted-foreground hover:bg-muted hover:text-foreground",
						)}
						on:click={() => (mobileMenuOpen = false)}
					>
						{item.name}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</header>
