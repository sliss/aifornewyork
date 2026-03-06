import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'AI For New York is a nonpartisan coalition fighting legislation that would restrict access to AI-powered information.',
};

export default function AboutPage() {
  return (
    <div className="pt-[100px] pb-16 md:pb-20">
      <div className="max-w-3xl mx-auto px-6">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text mb-8">About AI For New York</h1>

        <div className="prose">
          <h2>Our Mission</h2>
          <p>
            AI For New York is a nonpartisan coalition of concerned New Yorkers, consumers, and businesses fighting legislation that would restrict access to AI-powered information tools. We believe that access to information is a fundamental right — and that poorly crafted regulation threatens to take that access away from the people who need it most.
          </p>
          <p>
            Our flagship campaign opposes Senate Bill S7263, which would ban AI chatbots from providing information across 14 licensed professions. If passed, this bill would prevent millions of New Yorkers from using AI tools to understand their legal rights, navigate medical questions, decode tax obligations, and more.
          </p>
          <p>
            We don&apos;t oppose all AI regulation. We support smart, targeted rules that promote transparency and accountability. But we draw the line at blanket bans that treat information access as a privilege reserved for those who can afford professional fees.
          </p>

          <h2>Contact</h2>
          <p>
            For press inquiries, partnership proposals, or general questions:
          </p>
          <p>
            <a href="mailto:aifornewyork@gmail.com">
              aifornewyork@gmail.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
