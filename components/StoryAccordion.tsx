'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Story {
  slug: string;
  title: string;
  person: string;
  borough: string;
  use_case: string;
  pull_quote: string;
}

export default function StoryAccordion({ stories }: { stories: Story[] }) {
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setOpenSlug(openSlug === slug ? null : slug);
  };

  return (
    <div className="bg-white rounded-[20px] border border-border p-6 md:p-10">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="font-serif text-[clamp(28px,3.5vw,42px)] leading-[1.1] tracking-[-0.02em] text-text mb-4">
          Expert advice shouldn&rsquo;t be a luxury.<br />AI makes it accessible.
        </h2>
        <p className="text-[17px] leading-relaxed text-text-light max-w-[560px] mx-auto">
          These are the people Albany&rsquo;s bill would leave behind.
        </p>
      </div>

      {/* Accordion rows */}
      <div className="border border-border rounded-[14px] overflow-hidden divide-y divide-amber/30">
        {stories.map((story) => {
          const isOpen = openSlug === story.slug;
          return (
            <div key={story.slug}>
              <button
                onClick={() => toggle(story.slug)}
                className="w-full flex items-center justify-between gap-4 px-6 md:px-8 py-5 text-left hover:bg-[rgba(26,62,255,0.02)] transition-colors"
              >
                <div className="flex items-baseline gap-3 min-w-0">
                  <span className="font-serif text-lg md:text-xl font-bold text-navy shrink-0">
                    {story.use_case}
                  </span>
                  <span className="hidden md:inline font-body text-[15px] md:text-base text-text-light leading-snug truncate">
                    {story.title}
                  </span>
                </div>
                <span className={`shrink-0 w-8 h-8 rounded-full border-2 border-navy flex items-center justify-center text-navy transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="7" y1="1" x2="7" y2="13" />
                    <line x1="1" y1="7" x2="13" y2="7" />
                  </svg>
                </span>
              </button>

              {/* Expanded content */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 md:px-8 pb-6">
                    <blockquote className="font-serif text-lg leading-relaxed text-text-light mb-4">
                      {story.pull_quote}
                    </blockquote>
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center font-bold text-xs text-white">
                          {story.person.charAt(0)}
                        </div>
                        <div>
                          <p className="font-ui text-sm font-semibold text-text">{story.person}</p>
                          <p className="text-[13px] text-text-light">{story.borough}</p>
                        </div>
                      </div>
                      <Link
                        href={`/stories/${story.slug}`}
                        className="text-navy font-ui text-sm font-semibold hover:text-navy-light transition-colors"
                      >
                        Read Full Story &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
