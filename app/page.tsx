import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import Signature from '@/models/Signature';
import LegislationCard from '@/components/LegislationCard';
import StoryAccordion from '@/components/StoryAccordion';
import CoalitionGrid from '@/components/CoalitionGrid';
import SignatoryList from '@/components/SignatoryList';
import Button from '@/components/ui/Button';
import { getStoryFrontmatter } from '@/lib/stories';
import ScrollReveal from '@/components/ScrollReveal';

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
      <section className="min-h-screen flex items-center pt-[120px] pb-20 px-6 md:px-12 relative overflow-hidden">
        {/* Background gradient orb */}
        <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] max-w-[900px] max-h-[900px] rounded-full bg-[radial-gradient(circle,rgba(26,62,255,0.06)_0%,transparent_70%)] pointer-events-none animate-[pulse_8s_ease-in-out_infinite]" />

        <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center relative z-10">
          {/* Left column */}
          <div className="animate-[slideUp_0.8s_ease-out_both]">
            <div className="inline-flex items-center gap-2 bg-navy text-white px-4 py-1.5 rounded-full text-xs font-semibold tracking-[0.06em] uppercase mb-7">
              <span className="w-1.5 h-1.5 bg-amber rounded-full animate-[blink_2s_ease_infinite]" />
              Active legislation — S.B. 7263
            </div>
            <h1 className="font-serif text-[clamp(42px,5vw,64px)] leading-[1.08] tracking-[-0.02em] text-text mb-6">
              Keep AI Affordable<br />for <em className="text-navy italic">New York</em>
            </h1>
            <p className="text-lg leading-relaxed text-text-light max-w-[480px] mb-10">
              Albany wants to restrict the AI tools millions of New Yorkers use every day for legal help, medical questions, and building their businesses. We&apos;re a coalition fighting to keep that access open.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/sign/s7263-ai-chatbot-professional-advice-ban" variant="primary" size="lg">
                Sign the open letter <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </Button>
              <Button href="/legislation/s7263-ai-chatbot-professional-advice-ban" variant="secondary" size="lg">
                Track the bill
              </Button>
            </div>
          </div>

          {/* Right column - logo */}
          <div className="flex items-center justify-center animate-[slideUp_0.8s_ease-out_0.2s_both]">
            <img src="/logo.png" alt="AI for New York" className="w-full max-w-[480px]" />
          </div>
        </div>
      </section>

      {/* Ticker */}
      <div className="bg-navy py-3.5 overflow-hidden whitespace-nowrap relative">
        <div className="ticker-track flex">
          {['Small Business Owners', 'Healthcare Workers', 'Students', 'Legal Aid Organizations', 'Startup Founders', 'Freelancers', 'Teachers', 'Parents', 'Researchers', 'Immigrants',
            'Small Business Owners', 'Healthcare Workers', 'Students', 'Legal Aid Organizations', 'Startup Founders', 'Freelancers', 'Teachers', 'Parents', 'Researchers', 'Immigrants',
          ].map((item, i) => (
            <span key={i} className="text-[rgba(255,255,255,0.9)] text-[13px] font-semibold tracking-[0.04em] uppercase px-12 flex items-center gap-4 shrink-0">
              {item} <span className="text-amber text-[8px]">&#9670;</span>
            </span>
          ))}
        </div>
      </div>

      {/* What's at Stake */}
      <ScrollReveal>
        <section className="py-[100px] px-6 md:px-12 max-w-[1200px] mx-auto">
          <div className="mb-14">
            <div className="section-label mb-4">01 — What&apos;s at stake</div>
            <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-text mb-5">
              This bill hurts the<br />people it claims to protect
            </h2>
            <p className="text-[17px] leading-relaxed text-text-light max-w-[560px]">
              AI makes expert information and advice affordable for everyone. The proposed legislation would make AI tools that millions depend on illegal to provide in New York.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="impact-card bg-white rounded-[20px] p-9 border border-border hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] transition-all duration-300 relative overflow-hidden">
              <span className="text-[32px] block mb-5">&#9878;&#65039;</span>
              <h3 className="font-body text-lg font-bold text-text tracking-[-0.01em] mb-2.5">Legal access disappears</h3>
              <p className="text-sm leading-relaxed text-text-light">Millions of New Yorkers who can&apos;t afford lawyers use AI to understand leases, immigration forms, and small claims processes. This bill would cut them off.</p>
            </div>
            <div className="impact-card bg-white rounded-[20px] p-9 border border-border hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] transition-all duration-300 relative overflow-hidden">
              <span className="text-[32px] block mb-5">&#128138;</span>
              <h3 className="font-body text-lg font-bold text-text tracking-[-0.01em] mb-2.5">Health info goes dark</h3>
              <p className="text-sm leading-relaxed text-text-light">AI helps people understand symptoms, navigate insurance, and find affordable care. Under this bill, those tools would be forced to stop providing medical information in NY.</p>
            </div>
            <div className="impact-card bg-white rounded-[20px] p-9 border border-border hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] transition-all duration-300 relative overflow-hidden">
              <span className="text-[32px] block mb-5">&#128200;</span>
              <h3 className="font-body text-lg font-bold text-text tracking-[-0.01em] mb-2.5">Startups leave the state</h3>
              <p className="text-sm leading-relaxed text-text-light">New York&apos;s AI ecosystem — 14,000 startups and growing — would face crippling compliance costs. Many will relocate to states that welcome innovation.</p>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Stories */}
      <ScrollReveal>
        <section className="py-[100px] px-6 md:px-12">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-10">
              <div className="section-label mb-4">02 — Real stories</div>
            </div>
            <StoryAccordion stories={stories} />
            <div className="text-center mt-10">
              <Button href="/stories" variant="secondary">
                Read All Stories
              </Button>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Legislation Tracker */}
      <ScrollReveal>
        <section className="py-[100px] px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <div className="section-label mb-4">03 — Legislation</div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-text mb-5">
                Legislation Tracker
              </h2>
              <p className="text-text-light text-[17px] max-w-2xl mx-auto">
                Active bills in the New York State Legislature that affect access to AI-powered information.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
      </ScrollReveal>

      {/* Coalition */}
      <ScrollReveal>
        <section className="py-[100px] px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-14">
              <div className="section-label mb-4">04 — Coalition</div>
              <h2 className="font-serif text-[clamp(32px,4vw,48px)] leading-[1.1] tracking-[-0.02em] text-text mb-5">
                Coalition of Support
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <CoalitionGrid orgs={orgs} signatureCount={signatureCount} />
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* Signatories */}
      <section className="pb-[60px] px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <SignatoryList billSlug="s7263-ai-chatbot-professional-advice-ban" />
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-[100px] px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto bg-navy rounded-[28px] py-20 px-8 md:px-16 relative overflow-hidden text-center">
          {/* Radial gradient accents */}
          <div className="absolute -top-1/2 -right-[20%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(255,107,74,0.2)_0%,transparent_60%)] pointer-events-none" />
          <div className="absolute -bottom-[40%] -left-[10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.05)_0%,transparent_60%)] pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-serif text-[clamp(36px,4vw,52px)] !text-white leading-[1.1] tracking-[-0.02em] mb-5">
              Don&apos;t let Albany<br />disconnect New York
            </h2>
            <p className="text-[17px] text-[rgba(255,255,255,0.7)] max-w-[480px] mx-auto mb-10 leading-relaxed">
              Join thousands of New Yorkers, business owners, and community organizations fighting to keep AI tools accessible for everyone.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/sign/s7263-ai-chatbot-professional-advice-ban" className="bg-amber text-white px-9 py-4 rounded-full text-base font-semibold hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(255,107,74,0.4)] transition-all inline-flex items-center justify-center">
                Sign the open letter
              </a>
              <a href="/take-action" className="bg-[rgba(255,255,255,0.1)] text-white px-9 py-4 rounded-full text-base font-semibold border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.15)] hover:border-[rgba(255,255,255,0.35)] hover:-translate-y-0.5 transition-all inline-flex items-center justify-center">
                Contact your rep
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
