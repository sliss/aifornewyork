import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy policy for AI For New York.',
};

export default function PrivacyPage() {
  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-8">Privacy Policy</h1>

        <div className="prose">
          <p><em>Last updated: March 2026</em></p>

          <h2>What We Collect</h2>
          <p>
            When you sign our open letter, we collect the following information:
          </p>
          <ul>
            <li><strong>Full name</strong> — to attribute your signature</li>
            <li><strong>Email address</strong> — to confirm your signature and send campaign updates (if opted in)</li>
            <li><strong>ZIP code</strong> — to demonstrate geographic breadth of support to legislators</li>
            <li><strong>Borough or city</strong> (optional) — for the same purpose</li>
            <li><strong>One-line description</strong> (optional) — to provide context for your signature</li>
          </ul>
          <p>
            For organizational signatures, we additionally collect organization name, website, type, and your title at the organization.
          </p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To confirm your signature via email</li>
            <li>To display your name as a signatory (if you opted in)</li>
            <li>To compile aggregate signature counts by ZIP code for legislative advocacy</li>
            <li>To send campaign updates (only if you checked &ldquo;Email me updates&rdquo;)</li>
            <li>To submit confirmed signatures to legislators as part of our advocacy efforts</li>
          </ul>

          <h2>What We Don&apos;t Do</h2>
          <ul>
            <li>We <strong>never sell</strong> your personal information</li>
            <li>We <strong>never share</strong> your email address with third parties</li>
            <li>We <strong>never use</strong> your information for commercial purposes</li>
            <li>We do not use tracking cookies or invasive analytics</li>
          </ul>

          <h2>Public Display</h2>
          <p>
            If you check &ldquo;Display my name publicly as a signatory,&rdquo; your name, borough/city, and description may be displayed on our website. Your email address is <strong>never</strong> displayed publicly.
          </p>
          <p>
            When we submit signatures to legislators, we include names and ZIP codes. Email addresses are only included when required by official legislative submission processes.
          </p>

          <h2>Analytics</h2>
          <p>
            We use Plausible Analytics, a privacy-respecting analytics tool that does not use cookies and does not collect personal data. No cookie banner is needed because no cookies are set.
          </p>

          <h2>Data Retention</h2>
          <p>
            Your signature data is retained for the duration of our advocacy campaign. You may request deletion of your data at any time by emailing{' '}
            <a href="mailto:aifornewyork@gmail.com" className="text-amber hover:text-amber-dark">aifornewyork@gmail.com</a>.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this privacy policy? Email us at{' '}
            <a href="mailto:aifornewyork@gmail.com" className="text-amber hover:text-amber-dark">aifornewyork@gmail.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
