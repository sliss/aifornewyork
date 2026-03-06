import type { Metadata } from 'next';
import StoryCard from '@/components/StoryCard';
import { getStoryFrontmatter } from '@/lib/stories';

export const metadata: Metadata = {
  title: 'AI for New Yorkers',
  description: 'Real stories from New Yorkers who rely on AI tools for critical legal, medical, and professional information.',
};

export default function StoriesPage() {
  const stories = getStoryFrontmatter();

  return (
    <div className="pt-[100px] pb-16 md:pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="mb-14">
          <div className="section-label mb-4">Real stories</div>
          <h1 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-text mb-5">
            AI in Action
          </h1>
          <p className="text-[17px] leading-relaxed text-text-light max-w-[560px]">
            Real stories from New Yorkers who rely on AI tools for critical information.
            Under proposed legislation, the tools they depend on would be banned.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {stories.map((story) => (
            <StoryCard key={story.slug} {...story} variant="light" />
          ))}
        </div>

        {stories.length === 0 && (
          <p className="text-center text-text-light">Stories coming soon.</p>
        )}
      </div>
    </div>
  );
}
