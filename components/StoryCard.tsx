import Link from 'next/link';

interface StoryCardProps {
  slug: string;
  title: string;
  person: string;
  borough: string;
  use_case: string;
  pull_quote: string;
}

export default function StoryCard({ slug, title, person, borough, use_case, pull_quote }: StoryCardProps) {
  return (
    <div className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow flex flex-col">
      <span className="font-ui text-xs font-semibold text-amber uppercase tracking-wide mb-2">{use_case}</span>
      <blockquote className="font-serif text-lg text-navy italic leading-relaxed mb-4 flex-1">
        {pull_quote}
      </blockquote>
      <div className="mb-4">
        <p className="font-ui text-sm font-semibold text-text">{person}</p>
        <p className="font-ui text-xs text-text-light">{borough}</p>
      </div>
      <Link
        href={`/stories/${slug}`}
        className="text-amber font-ui text-sm font-semibold hover:text-amber-dark transition-colors"
      >
        Read Story &rarr;
      </Link>
    </div>
  );
}
