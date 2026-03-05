import type { Metadata } from 'next';
import RepLookup from '@/components/RepLookup';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Take Action',
  description: 'Contact your New York State representatives and urge them to oppose S7263.',
};

export default function TakeActionPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-4">
            Take Action
          </h1>
          <p className="text-text-light max-w-2xl mx-auto">
            Your voice matters. Contact your state representatives and tell them to oppose bills that would restrict access to AI-powered information.
          </p>
        </div>

        {/* Step 1: Sign */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-amber text-white rounded-full flex items-center justify-center font-ui font-bold text-sm">1</span>
            <h2 className="font-serif text-xl font-bold text-navy">Sign the Open Letter</h2>
          </div>
          <p className="text-text-light mb-4 ml-11">
            Add your name to the growing list of New Yorkers opposing S7263.
          </p>
          <div className="ml-11">
            <Button href="/sign/s7263-ai-chatbot-professional-advice-ban">
              Sign Now
            </Button>
          </div>
        </div>

        {/* Step 2: Contact */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-amber text-white rounded-full flex items-center justify-center font-ui font-bold text-sm">2</span>
            <h2 className="font-serif text-xl font-bold text-navy">Contact Your Representatives</h2>
          </div>
          <p className="text-text-light mb-4 ml-11">
            A personal call or email from a constituent is one of the most effective ways to influence your legislator&apos;s vote.
          </p>
          <div className="ml-11">
            <RepLookup billNumber="S7263" />
          </div>
        </div>

        {/* Step 3: Share */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 bg-amber text-white rounded-full flex items-center justify-center font-ui font-bold text-sm">3</span>
            <h2 className="font-serif text-xl font-bold text-navy">Spread the Word</h2>
          </div>
          <p className="text-text-light mb-4 ml-11">
            Share this campaign with friends, family, and colleagues. The more New Yorkers who speak up, the stronger our message.
          </p>
          <div className="ml-11 flex flex-wrap gap-3">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("NY's proposed AI ban (S7263) would cut off access to legal, medical & financial information for millions. This affects tenants, immigrants, small business owners. Learn more & take action: https://aifornewyork.org")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-md font-ui text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://aifornewyork.org")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-md font-ui text-sm font-semibold hover:bg-navy-light transition-colors"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
