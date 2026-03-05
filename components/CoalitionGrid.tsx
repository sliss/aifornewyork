import Link from 'next/link';

interface CoalitionOrg {
  name: string;
  logo_url?: string;
}

interface CoalitionGridProps {
  orgs: CoalitionOrg[];
  signatureCount: number;
}

export default function CoalitionGrid({ orgs, signatureCount }: CoalitionGridProps) {
  return (
    <section>
      <div className="text-center mb-8">
        <p className="font-serif text-4xl md:text-5xl font-bold text-navy">
          {signatureCount.toLocaleString()}
        </p>
        <p className="font-ui text-text-light mt-1 text-lg">New Yorkers have signed</p>
      </div>

      {orgs.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {orgs.map((org) => (
            <div
              key={org.name}
              className="bg-white border border-border rounded-lg p-4 flex items-center justify-center min-h-[80px]"
            >
              {org.logo_url ? (
                <img src={org.logo_url} alt={org.name} className="max-h-12 max-w-full" />
              ) : (
                <span className="font-ui text-sm text-text-light text-center">{org.name}</span>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="text-center">
        <Link
          href="/sign/s7263-ai-chatbot-professional-advice-ban"
          className="inline-flex items-center justify-center bg-amber text-white px-6 py-3 rounded-md font-ui font-semibold hover:bg-amber-light transition-colors"
        >
          Join the Coalition
        </Link>
      </div>
    </section>
  );
}
