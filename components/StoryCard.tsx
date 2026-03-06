import Link from 'next/link';

interface StoryCardProps {
  slug: string;
  title: string;
  person: string;
  borough: string;
  use_case: string;
  pull_quote: string;
  variant?: 'dark' | 'light';
}

export default function StoryCard({ slug, title, person, borough, use_case, pull_quote, variant = 'dark' }: StoryCardProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`rounded-[20px] p-8 hover:-translate-y-1 transition-all duration-300 flex flex-col ${
      isDark
        ? 'bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] hover:bg-[rgba(255,255,255,0.07)] hover:border-[rgba(255,255,255,0.15)] backdrop-blur-sm'
        : 'bg-white border border-border hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] hover:border-[rgba(26,62,255,0.15)]'
    }`}>
      <span className={`font-mono text-xs font-medium uppercase tracking-[0.08em] mb-3 ${
        isDark ? 'text-amber' : 'text-navy'
      }`}>{use_case}</span>
      <blockquote className={`font-serif text-xl leading-relaxed mb-6 flex-1 ${
        isDark ? 'text-[rgba(255,255,255,0.9)]' : 'text-text'
      }`}>
        {pull_quote}
      </blockquote>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-navy flex items-center justify-center font-bold text-sm text-white">
          {person.charAt(0)}
        </div>
        <div>
          <p className={`font-ui text-sm font-semibold ${isDark ? 'text-[rgba(255,255,255,0.9)]' : 'text-text'}`}>{person}</p>
          <p className={`text-[13px] ${isDark ? 'text-[rgba(255,255,255,0.4)]' : 'text-text-light'}`}>{borough}</p>
        </div>
      </div>
      <Link
        href={`/stories/${slug}`}
        className={`mt-4 font-ui text-sm font-semibold transition-colors ${
          isDark ? 'text-amber hover:text-amber-light' : 'text-navy hover:text-navy-light'
        }`}
      >
        Read Story &rarr;
      </Link>
    </div>
  );
}
