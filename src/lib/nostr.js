import { SimplePool } from 'nostr-tools/pool';
import * as nip19 from 'nostr-tools/nip19';
// Note: marked removed, using simple fallback for renderMarkdown

const RELAY_URL = 'wss://relay.zapstore.dev';
const PROFILE_RELAY_URL = 'wss://relay.vertexlab.io';
const SOCIAL_RELAYS = [
	'wss://relay.damus.io',
	'wss://relay.primal.net',
	'wss://relay.nostr.band',
	'wss://nos.lol'
];
const CONNECTION_TIMEOUT = 10000; // 10 seconds

// Create a global pool instance
let pool = null;

// Profile cache to avoid repeated requests
const profileCache = new Map();

/**
 * Gets or creates the global SimplePool instance
 * @returns {SimplePool} Pool instance
 */
function getPool() {
	if (!pool) {
		pool = new SimplePool();
	}
	return pool;
}

/**
 * Fetches profile information for a given pubkey
 * @param {string} pubkey - The user's public key
 * @returns {Promise<Object|null>} Profile object or null if not found
 */
export async function fetchProfile(pubkey) {
	// Check cache first
	if (profileCache.has(pubkey)) {
		return profileCache.get(pubkey);
	}

	return new Promise((resolve, reject) => {
		try {
			const pool = getPool();

			const filter = {
				kinds: [0],
				authors: [pubkey],
				limit: 1
			};

			console.log('Fetching profile for:', pubkey);

			let foundProfile = null;
			let eoseReceived = false;

			const subscription = pool.subscribe(
				[PROFILE_RELAY_URL],
				filter,
				{
					onevent(event) {
						console.log('Found profile event:', event);
						
						let content = {};
						try {
							content = JSON.parse(event.content);
						} catch (e) {
							console.warn('Failed to parse profile content for', pubkey);
						}

						foundProfile = {
							pubkey: event.pubkey,
							name: content.name || content.display_name || '',
							displayName: content.display_name || content.name || '',
							picture: content.picture || '',
							about: content.about || '',
							nip05: content.nip05 || '',
							createdAt: event.created_at
						};

						// Cache the profile
						profileCache.set(pubkey, foundProfile);
						
						eoseReceived = true;
						subscription.close();
						resolve(foundProfile);
					},
					oneose() {
						console.log('EOSE received for profile, found:', !!foundProfile);
						eoseReceived = true;
						subscription.close();
						
						// Cache null result to avoid repeated requests
						if (!foundProfile) {
							profileCache.set(pubkey, null);
						}
						
						resolve(foundProfile);
					},
					onclose() {
						if (!eoseReceived) {
							console.log('Profile subscription closed before EOSE');
							resolve(foundProfile);
						}
					}
				}
			);

			// Set a timeout
			setTimeout(() => {
				if (!eoseReceived) {
					console.log('Timeout reached for profile fetch');
					subscription.close();
					resolve(foundProfile);
				}
			}, CONNECTION_TIMEOUT);

		} catch (err) {
			console.error('Error in fetchProfile:', err);
			reject(err);
		}
	});
}

/**
 * Converts a hex pubkey to npub format
 * @param {string} pubkey - Hex public key
 * @returns {string} npub encoded public key
 */
export function pubkeyToNpub(pubkey) {
	try {
		return nip19.npubEncode(pubkey);
	} catch (err) {
		console.warn('Failed to encode pubkey to npub:', err);
		return pubkey;
	}
}

/**
 * Renders markdown content to HTML (simple fallback without marked)
 * @param {string} markdown - Markdown content
 * @returns {string} HTML content
 */
export function renderMarkdown(markdown) {
	if (!markdown) return '';
	
	try {
		// Simple markdown-to-HTML conversion for basic formatting
		// This is a minimal fallback - for complex markdown, use mdsvex
		return markdown
			.replace(/\n\n/g, '</p><p>') // Paragraphs
			.replace(/\n/g, '<br>') // Line breaks
			.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
			.replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
			.replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
			.replace(/^(.*)$/, '<p>$1</p>'); // Wrap in paragraph
	} catch (err) {
		console.warn('Failed to parse markdown:', err);
		return markdown.replace(/\n/g, '<br>');
	}
}

/**
 * Fetches apps from the relay with optional filters
 * @param {Object} options - Query options
 * @param {number} options.limit - Maximum number of apps to fetch
 * @param {string[]} options.authors - Filter by specific authors
 * @param {string[]} options.dTags - Filter by specific d-tags
 * @param {number} options.until - Fetch events created before this timestamp
 * @param {string} options.search - Free-text search (NIP-50) against app metadata/content
 * @returns {Promise<Array>} Array of app objects
 */
export async function fetchApps({ limit = 12, authors, dTags, until, search } = {}) {
	return new Promise((resolve, reject) => {
		try {
			const pool = getPool();

            const filter = {
				kinds: [32267],
				limit
			};

			if (authors) {
				filter.authors = authors;
			}

			if (dTags) {
				filter['#d'] = dTags;
			}

            if (until) {
				filter.until = until;
			}

            // NIP-50 free-text search support (relay must support it)
            if (search && typeof search === 'string' && search.trim().length > 0) {
                filter.search = search.trim();
            }

			console.log('Fetching apps with filter:', filter);

			const events = [];
			let eoseReceived = false;
			
			// Use subscribe method with callback approach
			const subscription = pool.subscribe(
				[RELAY_URL],
				filter,
				{
					onevent(event) {
						console.log('Received event:', event.id);
						events.push(parseAppEvent(event));
					},
					oneose() {
						console.log('End of stored events, got', events.length, 'apps');
						eoseReceived = true;
						
						// Sort by creation date (newest first)
						const sortedApps = events.sort((a, b) => b.createdAt - a.createdAt);
						
						subscription.close();
						resolve(sortedApps);
					},
					onclose() {
						if (!eoseReceived) {
							console.log('Subscription closed before EOSE');
							const sortedApps = events.sort((a, b) => b.createdAt - a.createdAt);
							resolve(sortedApps);
						}
					}
				}
			);

			// Set a timeout to close connection
			setTimeout(() => {
				if (!eoseReceived) {
					console.log('Timeout reached, closing subscription');
					subscription.close();
					const sortedApps = events.sort((a, b) => b.createdAt - a.createdAt);
					resolve(sortedApps);
				}
			}, CONNECTION_TIMEOUT);

		} catch (err) {
			console.error('Error in fetchApps:', err);
			reject(err);
		}
	});
}

/**
 * Fetches a specific app by pubkey and d-tag
 * @param {string} pubkey - The author's public key
 * @param {string} dTag - The app's d-tag identifier
 * @returns {Promise<Object|null>} App object or null if not found
 */
export async function fetchApp(pubkey, dTag) {
	return new Promise((resolve, reject) => {
		try {
			const pool = getPool();

			const filter = {
				kinds: [32267],
				authors: [pubkey],
				'#d': [dTag]
			};

			console.log('Fetching app with filter:', filter);

			let foundApp = null;
			let eoseReceived = false;

			// Use subscribe method with callback approach
			const subscription = pool.subscribe(
				[RELAY_URL],
				filter,
				{
					onevent(event) {
						console.log('Found app event:', event);
						foundApp = parseAppEvent(event);
						eoseReceived = true;
						subscription.close();
						resolve(foundApp);
					},
					oneose() {
						console.log('EOSE received, app found:', !!foundApp);
						eoseReceived = true;
						subscription.close();
						resolve(foundApp);
					},
					onclose() {
						if (!eoseReceived) {
							console.log('Subscription closed before EOSE');
							resolve(foundApp);
						}
					}
				}
			);

			// Set a timeout to close connection
			setTimeout(() => {
				if (!eoseReceived) {
					console.log('Timeout reached for app fetch');
					subscription.close();
					resolve(foundApp);
				}
			}, CONNECTION_TIMEOUT);

		} catch (err) {
			console.error('Error in fetchApp:', err);
			reject(err);
		}
	});
}

/**
 * Parses a nostr event into an app object
 * @param {Object} event - Raw nostr event
 * @returns {Object} Parsed app object
 */
export function parseAppEvent(event) {
	// Convert tags array to a more usable format for lookups
	const tagMap = {};
	const imageTags = [];
	
	// Process tags to extract specific information
	event.tags.forEach(tag => {
		if (tag.length >= 2) {
			const [key, value] = tag;
			
			if (key === 'image') {
				// Collect all image tags
				imageTags.push(value);
			} else if (!tagMap[key]) {
				// Store first occurrence of other tags
				tagMap[key] = value;
			}
		}
	});
	
	let content = {};
	try {
		content = JSON.parse(event.content);
	} catch (e) {
		console.warn('Failed to parse content for event', event.id);
		// If JSON parsing fails, treat the content as plain text description
		content = { description: event.content };
	}

	// Extract icon from tags first, then fallback to content
	const icon = tagMap.icon || content.icon || content.picture || '';
	
	// Use images from tags, fallback to content if no tag images
	const images = imageTags.length > 0 ? imageTags : (content.images || []);
	
	// Get description from content (this is the primary source)
	const description = content.description || content.about || content.summary || event.content || 'No description available';

	return {
		id: event.id,
		pubkey: event.pubkey,
		npub: pubkeyToNpub(event.pubkey),
		dTag: tagMap.d || '',
		name: content.name || tagMap.name || 'Unknown App',
		description: description,
		descriptionHtml: renderMarkdown(description),
		icon: icon,
		images: images,
		version: content.version || tagMap.version || '',
		url: content.url || content.website || tagMap.url || '',
		downloadUrl: content.downloadUrl || content.download || tagMap.download || '',
		repository: content.repository || content.repo || content.source || tagMap.repository || '',
		createdAt: event.created_at,
		tags: event.tags,
		content: content,
		fullContent: event.content,
		fullEvent: event, // Add the complete nostr event for Raw Event Data
		// Additional fields that might be in the content
		category: content.category || tagMap.category || '',
		size: content.size || tagMap.size || '',
		license: content.license || tagMap.license || '',
		developer: content.developer || content.publisher || content.author || tagMap.developer || '',
		requirements: content.requirements || content.systemRequirements || '',
		changelog: content.changelog || content.releaseNotes || '',
		// Platform information
		platform: content.platform || tagMap.platform || '',
		// Additional metadata
		price: content.price || tagMap.price || '',
		rating: content.rating || tagMap.rating || '',
		downloads: content.downloads || tagMap.downloads || ''
	};
}

/**
 * Formats a timestamp into a readable date string
 * @param {number} timestamp - Unix timestamp
 * @param {Object} options - Intl.DateTimeFormat options
 * @returns {string} Formatted date string
 */
export function formatDate(timestamp, options = {}) {
	const defaultOptions = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	};
	
	return new Date(timestamp * 1000).toLocaleDateString('en-US', {
		...defaultOptions,
		...options
	});
}

/**
 * Formats a file size into a human-readable string
 * @param {number|string} size - File size in bytes or string
 * @returns {string} Formatted size string
 */
export function formatSize(size) {
	if (!size) return '';
	if (typeof size === 'number') {
		if (size > 1024 * 1024 * 1024) {
			return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
		} else if (size > 1024 * 1024) {
			return `${(size / (1024 * 1024)).toFixed(1)} MB`;
		} else if (size > 1024) {
			return `${(size / 1024).toFixed(1)} KB`;
		}
		return `${size} B`;
	}
	return size;
}

/**
 * Generates an app URL slug using naddr encoding
 * @param {string} pubkey - Hex public key
 * @param {string} dTag - App d-tag identifier
 * @returns {string} URL slug as naddr
 */
export function getAppSlug(pubkey, dTag) {
	try {
		return nip19.naddrEncode({
			kind: 32267,
			pubkey: pubkey,
			identifier: dTag
		});
	} catch (err) {
		console.warn('Failed to encode naddr:', err);
		// Fallback to old format if encoding fails
		const npub = pubkeyToNpub(pubkey);
		return `${npub}-${dTag}`;
	}
}

/**
 * Parses an app URL slug to extract pubkey and d-tag
 * @param {string} slug - URL slug (naddr format or legacy npub-appid format)
 * @returns {Object} Object with pubkey and dTag properties
 */
export function parseAppSlug(slug) {
	// Try to decode as naddr first
	if (slug.startsWith('naddr1')) {
		try {
			const decoded = nip19.decode(slug);
			if (decoded.type === 'naddr' && decoded.data.kind === 32267) {
				return {
					pubkey: decoded.data.pubkey,
					dTag: decoded.data.identifier
				};
			}
		} catch (err) {
			console.warn('Failed to decode naddr, trying legacy format:', err);
		}
	}
	
	// Fallback to legacy npub-appid format for backward compatibility
	const npubLength = 63;
	
	if (slug.length < npubLength + 2) { // +2 for dash and at least 1 char for appid
		throw new Error('Invalid app URL format: too short');
	}
	
	if (!slug.startsWith('npub1')) {
		throw new Error('Invalid app URL format: must start with npub or naddr');
	}

	const npub = slug.substring(0, npubLength);
	const dTag = slug.substring(npubLength + 1); // +1 to skip the dash

	// Convert npub back to hex pubkey
	let pubkey;
	try {
		const decoded = nip19.decode(npub);
		if (decoded.type !== 'npub') {
			throw new Error('Invalid npub format');
		}
		pubkey = decoded.data;
	} catch (err) {
		throw new Error('Failed to decode npub: ' + err.message);
	}

	return { pubkey, dTag };
}

/**
 * Fetches zap events for a specific app
 * @param {string} pubkey - The app publisher's public key
 * @param {string} appId - The app's d-tag identifier
 * @returns {Promise<Array>} Array of zap events
 */
export async function fetchAppZaps(pubkey, appId) {
	return new Promise((resolve, reject) => {
		try {
			const pool = getPool();
			
			// Create the 'a' tag value for the app: 32267:pubkey:appId
			const aTagValue = `32267:${pubkey}:${appId}`;
			
			const filter = {
				kinds: [9735],
				'#a': [aTagValue],
				limit: 100
			};

			console.log('Fetching zaps with filter:', filter);

			const zapEvents = [];
			let eoseCount = 0;
			const totalRelays = SOCIAL_RELAYS.length;
			
			// Use subscribe method with callback approach
			const subscription = pool.subscribe(
				SOCIAL_RELAYS,
				filter,
				{
					onevent(event) {
						console.log('Received zap event:', event.id);
						zapEvents.push(parseZapEvent(event));
					},
					oneose() {
						eoseCount++;
						console.log(`EOSE received from ${eoseCount}/${totalRelays} relays`);
						
						// Wait for all relays to finish
						if (eoseCount >= totalRelays) {
							console.log('All relays finished, got', zapEvents.length, 'zaps');
							
							// Sort by creation date (newest first) and remove duplicates
							const uniqueZaps = removeDuplicateZaps(zapEvents);
							const sortedZaps = uniqueZaps.sort((a, b) => b.createdAt - a.createdAt);
							
							subscription.close();
							resolve(sortedZaps);
						}
					},
					onclose() {
						if (eoseCount < totalRelays) {
							console.log('Subscription closed before all relays finished');
							const uniqueZaps = removeDuplicateZaps(zapEvents);
							const sortedZaps = uniqueZaps.sort((a, b) => b.createdAt - a.createdAt);
							resolve(sortedZaps);
						}
					}
				}
			);

			// Set a timeout to close connection
			setTimeout(() => {
				if (eoseCount < totalRelays) {
					console.log('Timeout reached for zap fetch');
					subscription.close();
					const uniqueZaps = removeDuplicateZaps(zapEvents);
					const sortedZaps = uniqueZaps.sort((a, b) => b.createdAt - a.createdAt);
					resolve(sortedZaps);
				}
			}, CONNECTION_TIMEOUT);

		} catch (err) {
			console.error('Error in fetchAppZaps:', err);
			reject(err);
		}
	});
}

/**
 * Parses a zap event into a usable object
 * @param {Object} event - Raw zap event
 * @returns {Object} Parsed zap object
 */
export function parseZapEvent(event) {
	// Convert tags array to a more usable format
	const tagMap = {};
	event.tags.forEach(tag => {
		if (tag.length >= 2) {
			const [key, value] = tag;
			if (!tagMap[key]) {
				tagMap[key] = value;
			}
		}
	});

	// Extract amount from bolt11 invoice if available
	let amount = 0;
	const bolt11 = tagMap.bolt11;
	if (bolt11) {
		try {
			// Simple regex to extract amount from bolt11 (this is a basic implementation)
			const amountMatch = bolt11.match(/lnbc(\d+)([munp]?)/);
			if (amountMatch) {
				let value = parseInt(amountMatch[1]);
				const unit = amountMatch[2];
				
				// Convert to millisats
				switch (unit) {
					case 'm': value *= 100000; break; // milli-bitcoin
					case 'u': value *= 100; break;     // micro-bitcoin  
					case 'n': value *= 0.1; break;    // nano-bitcoin
					case 'p': value *= 0.0001; break; // pico-bitcoin
					default: value *= 100000000; break; // bitcoin
				}
				amount = Math.floor(value);
			}
		} catch (e) {
			console.warn('Failed to parse bolt11 amount:', e);
		}
	}

	// Extract description (zap note content)
	let description = '';
	try {
		const descriptionTag = event.tags.find(tag => tag[0] === 'description');
		if (descriptionTag && descriptionTag[1]) {
			const descEvent = JSON.parse(descriptionTag[1]);
			description = descEvent.content || '';
		}
	} catch (e) {
		console.warn('Failed to parse zap description:', e);
	}

	return {
		id: event.id,
		pubkey: event.pubkey,
		npub: pubkeyToNpub(event.pubkey),
		createdAt: event.created_at,
		amount: amount, // in millisats
		amountSats: Math.floor(amount / 1000), // in sats
		description: description,
		preimage: tagMap.preimage || '',
		bolt11: bolt11 || '',
		fullEvent: event
	};
}

/**
 * Removes duplicate zap events based on event ID
 * @param {Array} zapEvents - Array of zap events
 * @returns {Array} Array of unique zap events
 */
function removeDuplicateZaps(zapEvents) {
	const seen = new Set();
	return zapEvents.filter(zap => {
		if (seen.has(zap.id)) {
			return false;
		}
		seen.add(zap.id);
		return true;
	});
}

/**
 * Formats satoshi amount to a human-readable string
 * @param {number} sats - Amount in satoshis
 * @returns {string} Formatted amount string
 */
export function formatSats(sats) {
	if (sats >= 100000000) {
		return `${(sats / 100000000).toFixed(2)} BTC`;
	} else if (sats >= 1000000) {
		return `${(sats / 1000000).toFixed(1)}M sats`;
	} else if (sats >= 1000) {
		return `${(sats / 1000).toFixed(1)}K sats`;
	}
	return `${sats} sats`;
}

/**
 * Closes the global pool and cleans up connections
 */
export function closePool() {
	if (pool) {
		pool.close([RELAY_URL, PROFILE_RELAY_URL, ...SOCIAL_RELAYS]);
		pool = null;
	}
} 