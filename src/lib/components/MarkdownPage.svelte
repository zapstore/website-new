<script>
	import { marked } from 'marked';
	import { onMount } from 'svelte';
	import Prism from 'prismjs';
	
	// Import Prism languages
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-jsx';
	import 'prismjs/components/prism-tsx';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-bash';
	import 'prismjs/components/prism-yaml';
	import 'prismjs/components/prism-markdown';
	
	// Import Prism theme (we'll use a custom dark theme)
	import 'prismjs/themes/prism-tomorrow.css';
	
	export let content = '';
	export let title = '';
	export let description = '';
	
	let htmlContent = '';
	
	// Configure marked options
	marked.setOptions({
		gfm: true, // GitHub Flavored Markdown
		breaks: true, // Convert \n to <br>
		headerIds: true, // Add IDs to headers
		mangle: false, // Don't escape autolinks
		sanitize: false, // We trust our content
	});
	
	// Custom renderer to add Tailwind classes
	const renderer = new marked.Renderer();
	
	// Headers
	renderer.heading = (text, level) => {
		const sizes = {
			1: 'text-4xl font-bold mb-8 mt-2',
			2: 'text-3xl font-semibold mt-12 mb-6',
			3: 'text-2xl font-semibold mt-10 mb-4',
			4: 'text-xl font-semibold mt-8 mb-3',
			5: 'text-lg font-semibold mt-6 mb-2',
			6: 'text-base font-semibold mt-4 mb-2'
		};
		return `<h${level} class="${sizes[level] || sizes[6]}">${text}</h${level}>`;
	};
	
	// Links
	renderer.link = (href, title, text) => {
		const titleAttr = title ? ` title="${title}"` : '';
		return `<a href="${href}"${titleAttr} class="text-primary hover:text-primary/80 transition-colors">${text}</a>`;
	};
	
	// Code blocks
	renderer.code = (code, language) => {
		const lang = language || 'text';
		let highlightedCode = code;
		
		// Try to highlight with Prism
		if (Prism.languages[lang]) {
			highlightedCode = Prism.highlight(code, Prism.languages[lang], lang);
		}
		
		return `<pre class="code-block overflow-x-auto rounded-lg bg-zinc-900/90 p-4 my-4 border border-zinc-800"><code class="language-${lang}">${highlightedCode}</code></pre>`;
	};
	
	// Inline code
	renderer.codespan = (code) => {
		return `<code class="px-1.5 py-0.5 rounded bg-muted text-sm font-mono">${code}</code>`;
	};
	
	// Lists
	renderer.list = (body, ordered) => {
		const type = ordered ? 'ol' : 'ul';
		const listClass = ordered ? 'list-decimal' : 'list-disc';
		return `<${type} class="${listClass} ml-6 space-y-2 my-4">${body}</${type}>`;
	};
	
	// List items
	renderer.listitem = (text) => {
		return `<li>${text}</li>`;
	};
	
	// Paragraphs
	renderer.paragraph = (text) => {
		return `<p class="mb-4 leading-relaxed">${text}</p>`;
	};
	
	// Blockquotes
	renderer.blockquote = (quote) => {
		return `<blockquote class="border-l-4 border-primary/50 pl-4 italic my-6 text-muted-foreground">${quote}</blockquote>`;
	};
	
	// Tables
	renderer.table = (header, body) => {
		return `<div class="overflow-x-auto my-6">
			<table class="min-w-full divide-y divide-border">
				<thead>${header}</thead>
				<tbody class="divide-y divide-border">${body}</tbody>
			</table>
		</div>`;
	};
	
	renderer.tablerow = (content) => {
		return `<tr>${content}</tr>`;
	};
	
	renderer.tablecell = (content, flags) => {
		const type = flags.header ? 'th' : 'td';
		const align = flags.align ? ` style="text-align: ${flags.align}"` : '';
		const classes = flags.header 
			? 'px-4 py-2 text-left text-sm font-semibold' 
			: 'px-4 py-2 text-sm';
		return `<${type} class="${classes}"${align}>${content}</${type}>`;
	};
	
	// Strong
	renderer.strong = (text) => {
		return `<strong class="font-semibold">${text}</strong>`;
	};
	
	// Em
	renderer.em = (text) => {
		return `<em class="italic">${text}</em>`;
	};
	
	// Images
	renderer.image = (href, title, text) => {
		const titleAttr = title ? ` title="${title}"` : '';
		return `<img src="${href}" alt="${text}"${titleAttr} class="rounded-lg my-6 max-w-full h-auto" />`;
	};
	
	// Horizontal rule
	renderer.hr = () => {
		return '<hr class="my-8 border-border" />';
	};
	
	// Set the custom renderer
	marked.use({ renderer });
	
	// Parse markdown when content changes
	$: if (content) {
		htmlContent = marked(content);
	}
	
	// Highlight code blocks after content is rendered
	onMount(() => {
		// Small delay to ensure DOM is ready
		setTimeout(() => {
			Prism.highlightAll();
		}, 10);
	});
	
	// Re-highlight when content changes
	$: if (htmlContent && typeof window !== 'undefined') {
		setTimeout(() => {
			Prism.highlightAll();
		}, 10);
	}
</script>

<svelte:head>
	<title>{title} - Zapstore Documentation</title>
	<meta name="description" content={description} />
</svelte:head>

<article class="prose prose-invert prose-lg max-w-none">
	{@html htmlContent}
</article>

<style>
	/* Additional styling for code blocks */
	:global(.code-block) {
		background-color: hsl(var(--muted) / 0.5);
		border: 1px solid hsl(var(--border));
	}
	
	:global(.code-block code) {
		color: hsl(var(--foreground));
		font-size: 0.875rem;
		line-height: 1.5;
	}
	
	/* Override Prism theme colors for better dark mode integration */
	:global(.token.comment),
	:global(.token.prolog),
	:global(.token.doctype),
	:global(.token.cdata) {
		color: hsl(var(--muted-foreground));
	}
	
	:global(.token.punctuation) {
		color: hsl(var(--foreground));
	}
	
	:global(.token.property),
	:global(.token.tag),
	:global(.token.boolean),
	:global(.token.number),
	:global(.token.constant),
	:global(.token.symbol),
	:global(.token.deleted) {
		color: hsl(var(--primary));
	}
	
	:global(.token.selector),
	:global(.token.attr-name),
	:global(.token.string),
	:global(.token.char),
	:global(.token.builtin),
	:global(.token.inserted) {
		color: #10b981;
	}
	
	:global(.token.operator),
	:global(.token.entity),
	:global(.token.url),
	:global(.language-css .token.string),
	:global(.style .token.string) {
		color: #f59e0b;
	}
	
	:global(.token.atrule),
	:global(.token.attr-value),
	:global(.token.keyword) {
		color: #8b5cf6;
	}
	
	:global(.token.function),
	:global(.token.class-name) {
		color: #ec4899;
	}
	
	:global(.token.regex),
	:global(.token.important),
	:global(.token.variable) {
		color: #f59e0b;
	}
	
	:global(.token.important),
	:global(.token.bold) {
		font-weight: bold;
	}
	
	:global(.token.italic) {
		font-style: italic;
	}
	
	:global(.token.entity) {
		cursor: help;
	}
	
	/* Ensure inline code doesn't get syntax highlighting */
	:global(p code),
	:global(li code),
	:global(td code),
	:global(h1 code),
	:global(h2 code),
	:global(h3 code),
	:global(h4 code),
	:global(h5 code),
	:global(h6 code) {
		color: hsl(var(--foreground)) !important;
		background-color: hsl(var(--muted)) !important;
	}
</style> 