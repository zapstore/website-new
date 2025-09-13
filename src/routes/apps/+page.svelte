<script>
	import { onMount } from "svelte";
	import {
		Package,
		Download,
		ExternalLink,
		User,
		Calendar,
		Tag,
	} from "lucide-svelte";
	import { fetchApps, formatDate, getAppSlug } from "$lib/nostr.js";
	import ProfileInfo from "$lib/components/ProfileInfo.svelte";

	let apps = [];
	let loading = true;
	let error = null;
	let loadingMore = false;
	let hasMore = true;

	async function loadApps(reset = true) {
		try {
			if (reset) {
				loading = true;
				error = null;
				apps = [];
				hasMore = true;
			} else {
				loadingMore = true;
			}

			// For pagination, use the oldest loaded app's created_at as 'until' filter
			const until =
				!reset && apps.length > 0
					? Math.min(...apps.map((app) => app.createdAt))
					: undefined;
			const options = { limit: 12 };
			if (until) {
				options.until = until;
			}

			const newApps = await fetchApps(options);

			if (reset) {
				apps = newApps;
				loading = false;
			} else {
				// Filter out any duplicates and add new apps
				const existingIds = new Set(apps.map((app) => app.id));
				const uniqueNewApps = newApps.filter((app) => !existingIds.has(app.id));
				apps = [...apps, ...uniqueNewApps];
				loadingMore = false;

				// If we got fewer than the requested limit, we've reached the end
				if (newApps.length < options.limit) {
					hasMore = false;
				}
			}
		} catch (err) {
			console.error("Error fetching apps:", err);
			error = err.message;
			loading = false;
			loadingMore = false;
		}
	}

	async function loadMoreApps() {
		if (!loadingMore && hasMore) {
			await loadApps(false);
		}
	}

	onMount(() => {
		loadApps();
	});

	function getAppUrl(app) {
		return `/apps/${getAppSlug(app.pubkey, app.dTag)}`;
	}
</script>

<svelte:head>
	<title>Apps - Zapstore</title>
	<meta
		name="description"
		content="Discover trusted applications in the open marketplace. Browse the latest apps verified through the nostr protocol."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="relative overflow-hidden border-b border-border/40 bg-brand-gradient-v">
	<div class="absolute inset-0 bg-brand-overlay-soft"></div>
	<div class="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
		<div class="relative z-10 max-w-4xl mx-auto text-center">
			<h1
				class="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-6"
			>
				Discover <span class="gradient-text">Apps</span>
			</h1>
			<p
				class="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
			>
				Browse the latest releases from our relay. Every app is
				cryptographically signed and comes from trusted sources.
			</p>
		</div>
	</div>
</section>

<!-- Apps Grid -->
<section class="py-4">
	<div class="container mx-auto px-4 sm:px-6 lg:px-8">
		{#if loading}
			<div class="flex items-center justify-center py-24">
				<div class="text-center">
					<div
						class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4"
					></div>
					<p class="text-muted-foreground">
						Loading apps from the nostr network...
					</p>
				</div>
			</div>
		{:else if error}
			<div class="flex items-center justify-center py-24">
				<div class="text-center">
					<div
						class="rounded-lg bg-destructive/10 border border-destructive/20 p-6 max-w-md"
					>
						<h3 class="text-lg font-semibold text-destructive mb-2">
							Error Loading Apps
						</h3>
						<p class="text-muted-foreground mb-4">{error}</p>
						<button
							on:click={loadApps}
							class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
						>
							Try Again
						</button>
					</div>
				</div>
			</div>
		{:else}
			<div
				class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
			>
				{#each apps as app}
					<div
						class="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/5"
					>
						<a href={getAppUrl(app)} class="block p-6">
							<!-- App Icon and Name -->
							<div class="flex items-center gap-4 mb-4">
								{#if app.icon}
									<img
										src={app.icon}
										alt={app.name}
										class="w-12 h-12 rounded-lg object-cover bg-muted flex-shrink-0"
										loading="lazy"
									/>
								{:else}
									<div
										class="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0"
									>
										<Package class="h-6 w-6 text-primary" />
									</div>
								{/if}
								<div class="min-w-0 flex-1">
									<h3
										class="text-2xl font-extra-bold text-foreground group-hover:text-primary transition-colors line-clamp-2 leading-tight"
									>
										{app.name}
									</h3>
									{#if app.version}
										<div
											class="flex items-center gap-1 text-sm text-muted-foreground mt-1"
										>
											<Tag class="h-3 w-3" />
											<span>v{app.version}</span>
										</div>
									{/if}
								</div>
							</div>

							<!-- Description -->
							<div class="text-sm text-muted-foreground mb-4 line-clamp-3">
								{@html app.descriptionHtml}
							</div>

							<!-- App Images Preview -->
							<!-- Publisher and Date -->
							<div class="space-y-3">
								<!-- Publisher Profile -->
								<ProfileInfo
									pubkey={app.pubkey}
									npub={app.npub}
									size="xs"
									showLabel={true}
									disableLink={true}
								/>

								<!-- Date -->
								<div
									class="flex items-center gap-1 text-xs text-muted-foreground"
								>
									<Calendar class="h-3 w-3" />
									<span>{formatDate(app.createdAt, { month: "short" })}</span>
								</div>
							</div>
						</a>
					</div>
				{/each}
			</div>

			<!-- See More Button -->
			{#if hasMore}
				<div class="text-center mt-12">
					<button
						on:click={loadMoreApps}
						disabled={loadingMore}
						class="inline-flex items-center justify-center rounded-md border border-input bg-background px-8 py-3 text-sm font-medium shadow-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{#if loadingMore}
							<div
								class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-primary mr-2"
							></div>
							Loading more...
						{:else}
							See More Apps
						{/if}
					</button>
				</div>
			{/if}
		{/if}
	</div>
</section>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
