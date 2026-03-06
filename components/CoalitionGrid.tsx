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
        <p className="font-ui text-text-light mt-1 text-lg">Signatures</p>
      </div>

      {orgs.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {orgs.map((org) => (
            <div
              key={org.name}
              className="bg-white border border-border rounded-2xl p-4 flex items-center justify-center min-h-[80px] hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] transition-all duration-300"
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
          className="inline-flex items-center justify-center bg-amber text-white px-8 py-3.5 rounded-full font-ui font-semibold hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,74,0.35)] transition-all"
        >
          Join the Coalition
        </Link>
      </div>
    </section>
  );
}
