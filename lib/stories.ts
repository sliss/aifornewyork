import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const storiesDirectory = path.join(process.cwd(), 'content/stories');

export interface StoryFrontmatter {
  slug: string;
  title: string;
  person: string;
  borough: string;
  use_case: string;
  pull_quote: string;
  published: boolean;
  date: string;
}

export function getStoryFrontmatter(): StoryFrontmatter[] {
  if (!fs.existsSync(storiesDirectory)) return [];

  const files = fs.readdirSync(storiesDirectory).filter(f => f.endsWith('.mdx'));

  const stories = files.map(filename => {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(storiesDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      person: data.person || '',
      borough: data.borough || '',
      use_case: data.use_case || '',
      pull_quote: data.pull_quote || '',
      published: data.published !== false,
      date: data.date ? new Date(data.date).toISOString() : '',
    };
  });

  return stories
    .filter(s => s.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getStoryBySlug(slug: string) {
  const fullPath = path.join(storiesDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontmatter: {
      slug,
      title: data.title || '',
      person: data.person || '',
      borough: data.borough || '',
      use_case: data.use_case || '',
      pull_quote: data.pull_quote || '',
      published: data.published !== false,
      date: data.date ? new Date(data.date).toISOString() : '',
    },
    content,
  };
}

export function getAllStorySlugs(): string[] {
  if (!fs.existsSync(storiesDirectory)) return [];
  return fs.readdirSync(storiesDirectory)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));
}
