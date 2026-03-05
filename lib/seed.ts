import 'dotenv/config';
import dbConnect from './mongodb';
import Bill from '../models/Bill';

const bills = [
  {
    slug: 's7263-ai-chatbot-professional-advice-ban',
    bill_number: 'S7263',
    title: 'AI Chatbot Professional Advice Ban',
    short_summary: 'Would prohibit AI chatbots from providing information across 14 licensed professions, cutting off access for millions of New Yorkers who rely on AI for legal, medical, and financial guidance.',
    status: 'committee',
    threat_level: 'dangerous',
    sponsor: 'Sen. Brad Hoylman-Sigal',
    last_action: 'Referred to Internet and Technology Committee',
    last_action_date: new Date('2025-05-15'),
    plain_english_body: `## What This Bill Does

Senate Bill S7263 would make it **illegal for AI chatbots to provide information** in any area covered by New York's 14 licensed professions. This includes law, medicine, accounting, engineering, architecture, nursing, pharmacy, social work, and more.

If passed, AI tools like ChatGPT, Claude, and Google Gemini would be **prohibited from answering questions** about tenant rights, immigration paperwork, medical symptoms, tax preparation, and dozens of other topics that millions of New Yorkers rely on daily.

## How It Would Work

The bill requires AI providers to either:
- **Block all responses** that touch on licensed professional topics for New York users, or
- **Face penalties** of up to $5,000 per violation

This means a Bronx tenant asking an AI chatbot "what are my rights if my landlord won't fix the heat?" would get no answer. A small business owner asking about tax obligations would be told the AI can't help. An immigrant trying to understand visa paperwork would be turned away.

## The Scope Is Unprecedented

No other state has attempted a ban this broad. While some states are considering AI disclosure requirements (which we support), S7263 goes far beyond transparency — it would **eliminate access to information** for the people who need it most.

The bill makes no distinction between AI giving "advice" and AI providing publicly available information. Under its language, an AI explaining what a law says — something anyone can read on the NY Legislature's own website — would be a violation.`,
    who_gets_hurt: `## Who Gets Hurt

### Tenants Fighting Back Against Landlords
Svetlana, a Russian-speaking New Yorker, used ChatGPT to draft a letter citing rent stabilization law after her landlord tried to raise her rent while her building's washers had been broken for over two years. The laundry machines were fixed the same month. In Amherst, NY, 23-year-old Chris Maloney fed his lease into ChatGPT, which identified that his landlord had violated a 2019 New York law on security deposits — a judge ruled in his favor and awarded him $1,180. Amanda Yen in Manhattan used AI tools to investigate her apartment's rent stabilization history and filed a rent overcharge complaint. Under S7263, none of them could have asked an AI chatbot for help.

### Immigrants and Non-English Speakers
A Yale School of Management study found that AI-edited consumer complaints were successful 50% of the time, compared to 40% without AI — and a disproportionate share came from areas with high limited-English-proficiency populations. 74% of legal aid organizations are already using AI, double the rate of the wider legal profession. Thomson Reuters' AI for Justice program reported partner organizations serving 50% more clients daily, with urgent case materials prepared up to 75% faster. S7263 would ban the tools these organizations depend on.

### Small Business Owners
Holly Diamond's parents run a Korean BBQ restaurant in Manhattan's Flatiron district. They speak limited English. Diamond used AI to proofread and correct the restaurant's English-language menu, built an AI-powered phone system for customer inquiries, and used AI to manage staff turnover. The Manhattan Chamber of Commerce launched a free AI-powered "Business Help Desk" at bizhelp.nyc — recognizing that small business owners need 24/7 accessible guidance. Under S7263, these AI tools could be prohibited from providing information about licensed professional topics like accounting or legal compliance.

### Patients Navigating the Healthcare System
Bethany Crystal, a New York consultant, went to the ER after ChatGPT insisted her symptoms required immediate evaluation. She was diagnosed with ITP, a rare autoimmune disorder with dangerous bleeding risk — she told NPR she may not have gone in time without the AI's warning. A family facing a $195,000 hospital bill used Claude to analyze the billing codes and identified duplicative charges, improper coding, and supply costs inflated 500–2,300% above Medicare rates — the bill was reduced to $33,000. Stephanie Nixdorf used AI to write a 23-page appeal after her insurer denied coverage for a drug needed to treat arthritis caused by cancer immunotherapy — coverage was approved. S7263 would prohibit AI from helping with any of this.

**The pattern is clear:** S7263 doesn't protect New Yorkers — it protects professional gatekeepers at the expense of the people who can least afford to hire them.`,
    our_position: `## What We're Asking For

We don't oppose all AI regulation. We support **smart, targeted rules** that protect consumers without eliminating access to information. Specifically:

1. **Require clear disclosure** when users are interacting with AI, not a human professional
2. **Mandate prominent disclaimers** that AI-generated information is not a substitute for professional advice
3. **Hold AI companies accountable** for harmful misinformation through existing consumer protection laws
4. **Invest in AI literacy programs** so New Yorkers can use these tools effectively and safely
5. **Create an AI advisory board** with diverse representation — including community organizations, not just industry lobbyists

What we oppose is a blanket ban that treats information access as a privilege reserved for those who can afford professional fees.`,
    open_letter_body: `## Open Letter to the New York State Legislature

**RE: Opposition to Senate Bill S7263 — AI Chatbot Professional Advice Ban**

Dear Members of the New York State Senate and Assembly,

We write to express our strong opposition to Senate Bill S7263, which would prohibit AI chatbots from providing information in areas covered by licensed professions.

**Access to information is a fundamental right.** New Yorkers have always had the right to read law books, medical references, and tax guides. AI tools are the 21st century's version of the public library — they make complex information accessible to everyone, not just those who can afford professional consultations.

**This bill would disproportionately harm vulnerable New Yorkers.** Low-income tenants, immigrants, small business owners, and first-generation students are the people who benefit most from affordable, instant access to AI-powered information. They are also the people least able to afford the professional services this bill would force them to use.

**We support smart AI regulation.** We believe AI tools should clearly disclose that they are not human professionals. We believe disclaimers should be prominent. We believe AI companies should be held accountable for harmful misinformation. But we do not believe the solution is to ban information access entirely.

**We urge you to vote NO on S7263** and instead pursue legislation that promotes transparency, accountability, and access — not prohibition.

Respectfully,
The Undersigned`,
  },
  {
    slug: 's934a-chatbot-disclosure',
    bill_number: 'S934A',
    title: 'AI Chatbot Disclosure Requirements',
    short_summary: 'Would require AI chatbots to clearly disclose their non-human nature to users. A reasonable transparency measure that we generally support with minor amendments.',
    status: 'committee',
    threat_level: 'watch',
    sponsor: 'Sen. Kristen Gonzalez',
    last_action: 'Referred to Consumer Protection Committee',
    last_action_date: new Date('2025-03-10'),
    plain_english_body: `## What This Bill Does

Senate Bill S934A would require any AI chatbot operating in New York to **clearly and prominently disclose** to users that they are interacting with an artificial intelligence system, not a human being.

## Our Position

This is the kind of **common-sense AI regulation** we can get behind. Users deserve to know when they're talking to an AI. Our concerns are limited to ensuring the requirements are technically feasible and don't create undue burden on small developers.

We recommend amendments to clarify the specific format of disclosures and to ensure the bill doesn't inadvertently capture simple automated tools like email autoresponders.`,
    who_gets_hurt: `## Impact Assessment

This bill is generally well-crafted and unlikely to cause significant harm. Our watchlist status reflects minor concerns about implementation details, not opposition to the bill's core purpose.

We are monitoring to ensure the disclosure requirements don't become so burdensome that they discourage AI tool development in New York while remaining robust enough to meaningfully inform consumers.`,
    our_position: `## Our Position

We **support the intent** of S934A with recommended amendments:

1. Clarify that disclosure must be "clear and conspicuous" with specific formatting guidance
2. Exempt simple automated systems (autoresponders, chatbots with scripted responses) from the requirements
3. Allow flexibility in disclosure format to accommodate different interfaces (voice, text, visual)`,
    open_letter_body: '',
  },
  {
    slug: 's5668-chatbot-penalties',
    bill_number: 'S5668',
    title: 'AI Chatbot Penalty Enhancement Act',
    short_summary: 'Would impose severe criminal penalties on AI companies whose chatbots provide information that leads to harm, with vague definitions that could chill all AI development in New York.',
    status: 'introduced',
    threat_level: 'dangerous',
    sponsor: 'Sen. James Sanders Jr.',
    last_action: 'Introduced and referred to Codes Committee',
    last_action_date: new Date('2025-04-01'),
    plain_english_body: `## What This Bill Does

Senate Bill S5668 would create **new criminal penalties** for AI companies whose chatbots provide information that "results in harm" to a user. Penalties include fines up to $50,000 per incident and potential criminal liability for company officers.

## Why It's Dangerous

The bill's definition of "harm" is extraordinarily vague. It could encompass any situation where someone followed AI-generated information and experienced a negative outcome — even if the information was accurate and the person made their own decisions.

This vagueness would create a **chilling effect** on all AI development and deployment in New York. Companies would either withdraw from the market entirely or severely restrict what their AI tools can discuss, effectively creating the same information blackout as S7263 through a different mechanism.`,
    who_gets_hurt: `## Who Gets Hurt

### New York's Tech Economy
Companies would relocate AI development out of New York rather than risk criminal liability for their executives. This would cost the state thousands of high-paying jobs.

### Consumers
Fewer AI tools available in New York means less competition, worse products, and higher prices for the professional services people would be forced to use instead.

### Innovation
Researchers and startups would avoid New York, stunting the state's ability to lead in one of the most important technology sectors of the century.`,
    our_position: `## What We're Asking For

1. **Replace criminal penalties** with civil enforcement through the Attorney General's office
2. **Define "harm" precisely** to cover actual damages from demonstrably false information, not negative outcomes from accurate information
3. **Create a safe harbor** for companies that implement reasonable safeguards, disclosures, and correction mechanisms
4. **Establish proportional penalties** based on company size and severity of actual harm`,
    open_letter_body: '',
  },
];

async function seed() {
  await dbConnect();

  for (const bill of bills) {
    await Bill.findOneAndUpdate(
      { slug: bill.slug },
      bill,
      { upsert: true, returnDocument: 'after' }
    );
  }

  console.log('Seeded', bills.length, 'bills');
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
