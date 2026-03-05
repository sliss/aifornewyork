import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getStoryBySlug, getAllStorySlugs } from '@/lib/stories';
import { formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllStorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) return { title: 'Story Not Found' };
  return {
    title: story.frontmatter.title,
    description: story.frontmatter.pull_quote,
  };
}

export default async function StoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);
  if (!story) notFound();

  const { frontmatter, content } = story;

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="mb-10">
          <span className="font-ui text-xs font-semibold text-amber uppercase tracking-wide">
            {frontmatter.use_case}
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mt-2 mb-4">
            {frontmatter.title}
          </h1>
          <div className="flex items-center gap-3 text-sm text-text-light font-ui">
            <span>{frontmatter.person}</span>
            <span>&middot;</span>
            <span>{frontmatter.borough}</span>
            {frontmatter.date && (
              <>
                <span>&middot;</span>
                <span>{formatDate(frontmatter.date)}</span>
              </>
            )}
          </div>
        </div>

        <blockquote className="border-l-3 border-amber pl-5 mb-10 italic text-lg text-text-light">
          {frontmatter.pull_quote}
        </blockquote>

        <article className="prose">
          <MDXRemote source={content} components={{
            a: (props) => <a {...props} target="_blank" rel="noopener noreferrer" />,
          }} />
        </article>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-text-light mb-4">
            Stories like this are why we fight. Add your voice.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/sign/s7263-ai-chatbot-professional-advice-ban">
              Sign the Open Letter
            </Button>
            <Button href="/stories" variant="secondary">
              Read More Stories
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
