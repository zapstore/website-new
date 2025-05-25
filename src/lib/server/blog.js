import { readdir, readFile, stat } from 'fs/promises';
import { join, dirname, basename, resolve } from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Use process.cwd() to get the project root, then navigate to content
const BLOG_DIR = resolve(process.cwd(), 'src/content/blog');

// Configure marked for better rendering
marked.setOptions({
  gfm: true,
  breaks: false,
  headerIds: true,
  mangle: false
});

/**
 * Get all blog post files
 */
async function getBlogFiles() {
  const files = [];
  
  try {
    const entries = await readdir(BLOG_DIR);
    
    for (const entry of entries) {
      const fullPath = join(BLOG_DIR, entry);
      const stats = await stat(fullPath);
      
      if (stats.isFile() && entry.endsWith('.md')) {
        const slug = entry.replace('.md', '');
        files.push({
          slug,
          fullPath,
          name: entry.replace('.md', '')
        });
      }
    }
  } catch (error) {
    console.error('Error reading blog directory:', error);
  }
  
  return files;
}

/**
 * Get blog post content by slug
 */
export async function getBlogPost(slug) {
  const filePath = join(BLOG_DIR, `${slug}.md`);
  
  try {
    await stat(filePath);
    const content = await readFile(filePath, 'utf-8');
    
    // Parse frontmatter and content
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
    
    let frontmatter = {};
    let markdownContent = content;
    
    if (frontmatterMatch) {
      const frontmatterText = frontmatterMatch[1];
      markdownContent = frontmatterMatch[2];
      
      // Simple frontmatter parser
      frontmatterText.split('\n').forEach(line => {
        const [key, ...valueParts] = line.split(':');
        if (key && valueParts.length > 0) {
          const value = valueParts.join(':').trim().replace(/^["']|["']$/g, '');
          frontmatter[key.trim()] = value;
        }
      });
    }
    
    const html = await marked(markdownContent);
    
    // Extract title from frontmatter or first h1
    let title = frontmatter.title;
    if (!title) {
      const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
      title = titleMatch ? titleMatch[1] : formatTitle(slug);
    }
    
    return {
      slug,
      title,
      author: frontmatter.author || 'Zapstore Team',
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      readTime: frontmatter.readTime || '5 min read',
      category: frontmatter.category || 'General',
      description: frontmatter.description || '',
      html,
      content: markdownContent,
      frontmatter
    };
  } catch (error) {
    console.error('Error reading blog post:', error);
    return null;
  }
}

/**
 * Get all blog posts with metadata
 */
export async function getAllBlogPosts() {
  const files = await getBlogFiles();
  const posts = [];
  
  for (const file of files) {
    const post = await getBlogPost(file.slug);
    if (post) {
      posts.push(post);
    }
  }
  
  // Sort by date (newest first)
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

/**
 * Get all blog slugs for static generation
 */
export async function getAllBlogSlugs() {
  const files = await getBlogFiles();
  return files
    .map(file => file.slug)
    .filter(slug => slug && typeof slug === 'string')
    .map(slug => slug.toString()); // Ensure it's a string
}

/**
 * Format title from filename
 */
function formatTitle(slug) {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
} 