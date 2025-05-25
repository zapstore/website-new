<script>
	import { onMount } from 'svelte';
	import { User } from 'lucide-svelte';
	import { fetchProfile } from '$lib/nostr.js';

	export let pubkey;
	export let npub = '';
	export let size = 'sm'; // 'sm' or 'lg'
	export let showLabel = true; // Whether to show "Signed by:" label
	export let disableLink = false; // Whether to disable the link functionality

	let profile = null;
	let loading = true;

	onMount(async () => {
		if (pubkey) {
			try {
				profile = await fetchProfile(pubkey);
			} catch (err) {
				console.error('Error fetching profile:', err);
			}
			loading = false;
		}
	});

	$: displayName = profile?.displayName || profile?.name || '';
	$: avatarUrl = profile?.picture || '';
	$: profileUrl = npub ? `/apps/developer/${npub}` : '#';

	// Size classes
	$: sizeClasses = size === 'lg' 
		? 'h-12 w-12 text-lg' 
		: 'h-8 w-8 text-sm';
	$: iconSize = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
</script>

<div class="space-y-2">
	{#if showLabel}
		<div class="text-xs text-muted-foreground">Signed by:</div>
	{/if}
	
	{#if disableLink}
		<div class="flex items-center gap-3">
			<!-- Avatar -->
			<div class="flex-shrink-0">
				{#if loading}
					<div class="{sizeClasses} rounded-full bg-muted animate-pulse"></div>
				{:else if avatarUrl}
					<img 
						src={avatarUrl} 
						alt={displayName || 'User avatar'} 
						class="{sizeClasses} rounded-full object-cover bg-muted"
						loading="lazy"
					/>
				{:else}
					<div class="{sizeClasses} rounded-full bg-primary/10 flex items-center justify-center">
						<User class="{iconSize} text-primary" />
					</div>
				{/if}
			</div>

			<!-- Profile Name -->
			<div class="min-w-0 flex-1">
				{#if loading}
					<div class="h-4 bg-muted rounded animate-pulse"></div>
				{:else}
					<div class="font-medium text-foreground">
						{displayName || 'Unknown User'}
					</div>
				{/if}
			</div>
		</div>
	{:else}
		<a 
			href={profileUrl} 
			class="flex items-center gap-3 hover:opacity-80 transition-opacity"
		>
			<!-- Avatar -->
			<div class="flex-shrink-0">
				{#if loading}
					<div class="{sizeClasses} rounded-full bg-muted animate-pulse"></div>
				{:else if avatarUrl}
					<img 
						src={avatarUrl} 
						alt={displayName || 'User avatar'} 
						class="{sizeClasses} rounded-full object-cover bg-muted"
						loading="lazy"
					/>
				{:else}
					<div class="{sizeClasses} rounded-full bg-primary/10 flex items-center justify-center">
						<User class="{iconSize} text-primary" />
					</div>
				{/if}
			</div>

			<!-- Profile Name -->
			<div class="min-w-0 flex-1">
				{#if loading}
					<div class="h-4 bg-muted rounded animate-pulse"></div>
				{:else}
					<div class="font-medium text-foreground">
						{displayName || 'Unknown User'}
					</div>
				{/if}
			</div>
		</a>
	{/if}
</div> 