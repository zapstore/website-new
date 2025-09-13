import { browser } from '$app/environment';

/**
 * Generate a hierarchical navigation structure that mirrors the directory tree.
 * - Directories are groups. If they contain an `_index.md`, the group label is clickable.
 * - Files are leaves.
 */
export async function generateNavigation(contentType = 'docs') {
  if (browser) {
    return [];
  }

  try {
    const { getMarkdownFiles } = await import('./content-server.js');
    const files = await getMarkdownFiles(contentType);

    const root = { id: `/${contentType}`, title: null, href: null, children: [] };
    let hasRootIndex = false;

    function ensureChild(parent, segment, fullPath) {
      if (!parent.children) parent.children = [];
      let child = parent.children.find((c) => c.segment === segment);
      if (!child) {
        child = {
          id: fullPath,
          segment,
          title: formatTitle(segment),
          href: null,
          children: [],
          weight: null,
          expandedByDefault: null
        };
        parent.children.push(child);
      }
      return child;
    }

    for (const file of files) {
      const parts = file.slug.split('/').filter(Boolean);

      // Root _index.md
      if (parts.length === 0 && file.isIndex) {
        hasRootIndex = true;
        continue;
      }

      // Top-level file (e.g. architecture.md)
      if (parts.length === 1 && !file.isIndex) {
        root.children.push({
          id: `/${contentType}/${file.slug}`,
          segment: parts[0],
          title: file.frontmatter?.title || formatTitle(parts[0]),
          href: `/${contentType}/${file.slug}`,
          children: [],
          weight: file.frontmatter?.weight ?? null,
          expandedByDefault: null
        });
        continue;
      }

      // Directory (with optional index) or nested file
      let parent = root;
      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        const isLast = i === parts.length - 1;
        const currentPath = `/${contentType}/${parts.slice(0, i + 1).join('/')}`;

        if (isLast && !file.isIndex) {
          // Leaf file under current parent
          parent.children.push({
            id: currentPath,
            segment: part,
            title: file.frontmatter?.title || formatTitle(part),
            href: currentPath,
            children: [],
            weight: file.frontmatter?.weight ?? null,
            expandedByDefault: null
          });
        } else {
          // Folder node; attach href if this file is the _index.md for the folder
          parent = ensureChild(parent, part, currentPath);
          if (isLast && file.isIndex) {
            parent.href = currentPath;
            if (file.frontmatter?.title) parent.title = file.frontmatter.title;
            if (file.frontmatter?.weight !== null && file.frontmatter?.weight !== undefined) parent.weight = file.frontmatter.weight;
            if (typeof file.frontmatter?.sidebarOpen === 'boolean') parent.expandedByDefault = file.frontmatter.sidebarOpen;
          }
        }
      }
    }

    // Sorting: by weight (asc, nulls last) then title (asc)
    function sortTree(node) {
      if (!node.children) return;
      node.children.sort((a, b) => {
        const aw = a.weight;
        const bw = b.weight;
        if (aw == null && bw == null) return a.title.localeCompare(b.title);
        if (aw == null) return 1;
        if (bw == null) return -1;
        if (aw !== bw) return aw - bw;
        return a.title.localeCompare(b.title);
      });
      node.children.forEach(sortTree);
    }

    sortTree(root);

    const nav = [];
    if (hasRootIndex) {
      nav.push({ id: `/${contentType}`, title: 'Overview', href: `/${contentType}`, children: [] });
    }
    nav.push(...root.children);
    return nav;
  } catch (error) {
    console.error('Error generating navigation:', error);
    return [];
  }
}

function formatTitle(name) {
  return name
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get all content slugs for a content type
 */
export async function getAllSlugs(contentType = 'docs') {
  // Prevent running on client side
  if (browser) {
    console.warn('getAllSlugs should only be called on the server side');
    return [];
  }

  // Dynamically import server-only module
  const { getMarkdownFiles } = await import('./content-server.js');
  const files = await getMarkdownFiles(contentType);
  return files
    .map(file => file.slug)
    .filter(slug => slug !== null && slug !== undefined)
    .map(slug => slug.toString());
}
