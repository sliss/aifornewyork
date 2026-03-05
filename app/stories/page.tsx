import type { Metadata } from 'next';
import StoryCard from '@/components/StoryCard';
import { getStoryFrontmatter } from '@/lib/stories';

export const metadata: Metadata = {
  title: 'AI in Action — Real Stories from New Yorkers',
  description: 'Real stories from New Yorkers who rely on AI tools for critical legal, medical, and professional information.',
};

export default function StoriesPage() {
  const stories = getStoryFrontmatter();

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
            AI in Action
          </h1>
          <p className="text-text-light max-w-2xl mx-auto">
            Real stories from New Yorkers who rely on AI tools for critical information.
            Under proposed legislation, the tools they depend on would be banned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story) => (
            <StoryCard key={story.slug} {...story} />
          ))}
        </div>

        {stories.length === 0 && (
          <p className="text-center text-text-light">Stories coming soon.</p>
        )}
      </div>
    </div>
  );
}
