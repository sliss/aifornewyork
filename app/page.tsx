import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import Signature from '@/models/Signature';
import LegislationCard from '@/components/LegislationCard';
import StoryCard from '@/components/StoryCard';
import CoalitionGrid from '@/components/CoalitionGrid';
import SignatoryList from '@/components/SignatoryList';
import Button from '@/components/ui/Button';
import { getStoryFrontmatter } from '@/lib/stories';

export const revalidate = 300;

async function getBills() {
  await dbConnect();
  const bills = await Bill.find({}).sort({ threat_level: 1 }).lean();
  return JSON.parse(JSON.stringify(bills));
}

async function getSignatureCount() {
  await dbConnect();
  const count = await Signature.countDocuments({ email_confirmed: true });
  return count;
}

async function getCoalitionOrgs() {
  await dbConnect();
  const orgs = await Signature.find({
    type: 'organization',
    email_confirmed: true,
    org_verified: true,
  }).select('org_name org_logo_url').lean();
  return JSON.parse(JSON.stringify(orgs)).map((o: { org_name: string; org_logo_url?: string }) => ({
    name: o.org_name,
    logo_url: o.org_logo_url,
  }));
}

export default async function HomePage() {
  const [bills, signatureCount, orgs, stories] = await Promise.all([
    getBills(),
    getSignatureCount(),
    getCoalitionOrgs(),
    getStoryFrontmatter(),
  ]);

  return (
    <div>
      {/* Hero */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          {/* Wordmark with Logo */}
          <div className="mb-8 flex items-center justify-center gap-4 md:gap-6">
            <img
              src="/aiforny.png"
              alt="AI for New York logo"
              className="w-24 h-24 md:w-36 md:h-36 flex-shrink-0"
            />
            <img
              src="/wordmark.svg"
              alt="AI for New York"
              className="h-auto flex-1 max-w-md md:max-w-xl"
              role="img"
            />
          </div>
          <h1 className="sr-only">AI For New York — Protecting New Yorkers&apos; Right to AI-Powered Information</h1>
          <p className="font-serif text-2xl md:text-3xl font-bold leading-tight text-navy mb-4">
            Protecting New Yorkers&apos; Right to AI-Powered Information
          </p>
          <p className="text-lg md:text-xl text-text-light leading-relaxed mb-10 max-w-2xl mx-auto">
            A nonpartisan coalition fighting legislation that would strip legal, medical, and professional information from the people who need it most.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/sign/s7263-ai-chatbot-professional-advice-ban" variant="primary" size="lg">
              Sign the Open Letter
            </Button>
            <Button href="/legislation/s7263-ai-chatbot-professional-advice-ban" variant="secondary" size="lg">
              Track Legislation
            </Button>
          </div>
        </div>
      </section>

      {/* Legislation Tracker */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy text-center mb-4">
            Legislation Tracker
          </h2>
          <p className="text-text-light text-center mb-10 max-w-2xl mx-auto">
            Active bills in the New York State Legislature that affect access to AI-powered information.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bills.map((bill: { _id: string; slug: string; bill_number: string; title: string; short_summary: string; status: string; threat_level: string }) => (
              <LegislationCard
                key={bill._id}
                slug={bill.slug}
                bill_number={bill.bill_number}
                title={bill.title}
                short_summary={bill.short_summary}
                status={bill.status}
                threat_level={bill.threat_level}
              />
            ))}
          </div>
        </div>
      </section>

      {/* AI in Action Stories */}
      <section className="py-16 md:py-20 bg-dark-surface">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-white text-center mb-4">
            AI in Action
          </h2>
          <p className="text-gray-400 text-center mb-10 max-w-2xl mx-auto">
            Real stories from New Yorkers who rely on AI tools for critical information.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stories.slice(0, 4).map((story) => (
              <StoryCard key={story.slug} {...story} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Button href="/stories" variant="secondary" className="!border-white !text-white hover:!bg-white hover:!text-navy">
              Read All Stories
            </Button>
          </div>
        </div>
      </section>

      {/* Coalition */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-navy text-center mb-10">
            Coalition of Support
          </h2>
          <CoalitionGrid orgs={orgs} signatureCount={signatureCount} />
        </div>
      </section>

      {/* Signatories */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <SignatoryList billSlug="s7263-ai-chatbot-professional-advice-ban" />
        </div>
      </section>
    </div>
  );
}
