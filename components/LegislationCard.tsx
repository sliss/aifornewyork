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
    <div className="bg-white border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="font-ui text-sm font-bold text-navy">{bill_number}</span>
          <h3 className="font-serif text-lg font-bold text-navy mt-1">{title}</h3>
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
        className="text-amber font-ui text-sm font-semibold hover:text-amber-dark transition-colors"
      >
        Read More &rarr;
      </Link>
    </div>
  );
}
