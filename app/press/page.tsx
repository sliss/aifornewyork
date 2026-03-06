import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Press & Media',
  description: 'Press resources, media kit, and contact information for AI For New York.',
};

export default function PressPage() {
  return (
    <div className="pt-[100px] pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text mb-4">Press & Media</h1>
        <p className="text-text-light mb-10">
          Resources for journalists covering AI policy in New York State.
        </p>

        {/* Key Facts */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Key Facts</h2>
          <div className="bg-white border border-border rounded-2xl p-6 space-y-4">
            <div className="border-b border-border pb-4">
              <p className="font-ui text-sm font-semibold text-text">The Bill</p>
              <p className="text-text-light text-sm">Senate Bill S7263 would ban AI chatbots from providing information across 14 licensed professions in New York State.</p>
            </div>
            <div className="border-b border-border pb-4">
              <p className="font-ui text-sm font-semibold text-text">The Impact</p>
              <p className="text-text-light text-sm">Millions of New Yorkers rely on AI tools for legal, medical, and financial information. This bill would eliminate that access for those who can&apos;t afford professional consultations.</p>
            </div>
            <div className="border-b border-border pb-4">
              <p className="font-ui text-sm font-semibold text-text">Who Gets Hurt</p>
              <p className="text-text-light text-sm">Low-income tenants, immigrants, small business owners, first-generation students — the people least able to afford the professional services this bill would force them to use.</p>
            </div>
            <div>
              <p className="font-ui text-sm font-semibold text-text">Our Position</p>
              <p className="text-text-light text-sm">We support smart AI regulation (disclosure, transparency, accountability) but oppose blanket bans that eliminate information access.</p>
            </div>
          </div>
        </section>

        {/* Quotable */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Quotable</h2>
          <div className="space-y-4">
            <blockquote className="border-l-3 border-amber pl-5 italic text-text-light">
              &ldquo;S7263 doesn&apos;t protect New Yorkers — it protects professional gatekeepers at the expense of the people who can least afford to hire them.&rdquo;
            </blockquote>
            <blockquote className="border-l-3 border-amber pl-5 italic text-text-light">
              &ldquo;Banning AI from explaining what a law says is like banning libraries from shelving legal textbooks. The information is public — the medium shouldn&apos;t be illegal.&rdquo;
            </blockquote>
            <blockquote className="border-l-3 border-amber pl-5 italic text-text-light">
              &ldquo;We&apos;re not asking for no regulation. We&apos;re asking for smart regulation — rules that promote transparency without eliminating access.&rdquo;
            </blockquote>
          </div>
        </section>

        {/* Press Contact */}
        <section className="mb-10">
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Press Contact</h2>
          <div className="bg-white border border-border rounded-2xl p-6">
            <p className="text-text-body mb-2">For press inquiries, interviews, or comment requests:</p>
            <p className="font-ui font-semibold">
              <a href="mailto:aifornewyork@gmail.com" className="text-navy hover:text-blue-dark transition-colors">
                aifornewyork@gmail.com
              </a>
            </p>
          </div>
        </section>

        {/* Coverage */}
        <section>
          <h2 className="font-serif text-2xl font-bold text-text mb-4">Press Coverage</h2>
          <p className="text-text-light text-sm italic">
            Press coverage links will be added as they become available.
          </p>
        </section>
      </div>
    </div>
  );
}
