import Link from 'next/link';
import StatusPipeline from './StatusPipeline';
import { THREAT_COLORS } from '@/lib/utils';

interface LegislationCardProps {
  slug: string;
  bill_number: string;
  title: string;
  short_summary: string;
  status: string;
  threat_level: string;
}

export default function LegislationCard({
  slug,
  bill_number,
  title,
  short_summary,
  status,
  threat_level,
}: LegislationCardProps) {
  const threat = THREAT_COLORS[threat_level] || THREAT_COLORS.watch;

  return (
    <div className="impact-card bg-white border border-border rounded-[20px] p-8 hover:-translate-y-1.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.07)] transition-all duration-300 relative overflow-hidden">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="font-mono text-xs font-medium text-amber tracking-[0.05em]">{bill_number}</span>
          <h3 className="font-serif text-lg font-bold text-text mt-1">{title}</h3>
        </div>
        <span className={`${threat.bg} ${threat.text} px-2.5 py-0.5 rounded-full text-xs font-ui font-semibold shrink-0 ml-3`}>
          {threat.label}
        </span>
      </div>

      <p className="text-sm text-text-light mb-4 leading-relaxed">{short_summary}</p>

      <div className="mb-4">
        <StatusPipeline currentStatus={status} compact />
      </div>

      <Link
        href={`/legislation/${slug}`}
        className="text-navy font-ui text-sm font-semibold hover:text-blue-dark transition-colors"
      >
        Read More &rarr;
      </Link>
    </div>
  );
}
