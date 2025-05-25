import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname, basename, resolve } from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Use process.cwd() to get the project root, then navigate to content
const DOCS_DIR = resolve(process.cwd(), 'src/content/docs');

// Configure marked for better rendering
marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false
});

/**
 * Get all markdown files in the docs directory recursively
 */
async function getMarkdownFiles(dir = DOCS_DIR, basePath = '') {
  const files = [];
  
  try {
    const entries = await readdir(dir);
    
    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory()) {
        const subFiles = await getMarkdownFiles(fullPath, join(basePath, entry));
        files.push(...subFiles);
      } else if (entry.endsWith('.md')) {
        const relativePath = join(basePath, entry.replace('.md', ''));
        files.push({
          path: relativePath,
          fullPath,
          name: entry.replace('.md', ''),
          directory: basePath
        });
      }
    }
  } catch (error) {
    console.error('Error reading docs directory:', error);
  }
  
  return files;
}

/**
 * Generate navigation structure from markdown files
 */
export async function generateNavigation() {
  const files = await getMarkdownFiles();
  const sections = {};
  
  // Define icons for different sections
  const sectionIcons = {
    'Getting Started': 'Rocket',
    'Core': 'Book', 
    'Developers': 'Code',
    'Security': 'Shield',
    'API': 'Code',
    'CLI': 'Code',
    'SDK': 'Code'
  };
  
  for (const file of files) {
    const parts = file.path.split('/').filter(Boolean);
    
    if (parts.length === 1) {
      // Root level file
      if (!sections['Getting Started']) {
        sections['Getting Started'] = [];
      }
      
      // Special case for index file - link to /docs instead of /docs/index
      const href = file.name === 'index' ? '/docs' : `/docs/${file.path}`;
      
      sections['Getting Started'].push({
        title: formatTitle(file.name),
        href
      });
    } else {
      // Nested file
      const sectionName = formatTitle(parts[0]);
      if (!sections[sectionName]) {
        sections[sectionName] = [];
      }
      
      const fileName = parts[parts.length - 1];
      sections[sectionName].push({
        title: formatTitle(fileName),
        href: `/docs/${file.path}`
      });
    }
  }
  
  // Convert to array format and sort
  const navigation = [];
  
  // Add Getting Started first if it exists
  if (sections['Getting Started']) {
    navigation.push({
      title: 'Getting Started',
      icon: sectionIcons['Getting Started'] || 'Book',
      items: sections['Getting Started']
    });
    delete sections['Getting Started'];
  }
  
  // Add other sections in alphabetical order
  for (const [title, items] of Object.entries(sections).sort()) {
    navigation.push({
      title,
      icon: sectionIcons[title] || 'Book',
      items
    });
  }
  
  return navigation;
}

/**
 * Format title from filename/directory name
 */
function formatTitle(name) {
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Get markdown content by slug
 */
export async function getMarkdownContent(slug) {
  if (!slug || slug === '') {
    // Try to find an index file
    const indexPath = join(DOCS_DIR, 'index.md');
    try {
      await stat(indexPath);
      slug = 'index';
    } catch {
      return null;
    }
  }
  
  // Try to find the file
  let filePath = join(DOCS_DIR, `${slug}.md`);
  
  try {
    await stat(filePath);
  } catch {
    // If direct file doesn't exist, try in subdirectory
    const parts = slug.split('/');
    if (parts.length > 1) {
      filePath = join(DOCS_DIR, ...parts.slice(0, -1), `${parts[parts.length - 1]}.md`);
      try {
        await stat(filePath);
      } catch {
        return null;
      }
    } else {
      return null;
    }
  }
  
  try {
    const content = await readFile(filePath, 'utf-8');
    const html = await marked(content);
    
    // Extract title from first h1 or use filename
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : formatTitle(basename(slug));
    
    return {
      html,
      title,
      slug
    };
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

/**
 * Get all available slugs for static generation
 */
export async function getAllSlugs() {
  const files = await getMarkdownFiles();
  return files
    .map(file => file.path)
    .filter(path => path && typeof path === 'string')
    .map(path => path.toString()); // Ensure it's a string
} 