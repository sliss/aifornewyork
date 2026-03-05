import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import Signature from '@/models/Signature';
import StatusPipeline from '@/components/StatusPipeline';
import SignatureForm from '@/components/SignatureForm';
import OpenLetter from '@/components/OpenLetter';
import RepLookup from '@/components/RepLookup';
import SignatoryList from '@/components/SignatoryList';
import { renderMarkdown } from '@/lib/markdown';
import { THREAT_COLORS, formatDate } from '@/lib/utils';

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ slug: string }>;
}

async function getBill(slug: string) {
  await dbConnect();
  const bill = await Bill.findOne({ slug }).lean();
  return bill ? JSON.parse(JSON.stringify(bill)) : null;
}

async function getSignatureCount(billId: string) {
  await dbConnect();
  return Signature.countDocuments({ bill_id: billId, email_confirmed: true });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const bill = await getBill(slug);
  if (!bill) return { title: 'Bill Not Found' };
  return {
    title: `${bill.bill_number} — ${bill.title}`,
    description: bill.short_summary,
  };
}

export default async function LegislationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const bill = await getBill(slug);
  if (!bill) notFound();

  const signatureCount = await getSignatureCount(bill._id);
  const threat = THREAT_COLORS[bill.threat_level] || THREAT_COLORS.watch;

  return (
    <div className="py-12 md:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="font-ui text-sm font-bold text-navy">{bill.bill_number}</span>
            <span className={`${threat.bg} ${threat.text} px-2.5 py-0.5 rounded-full text-xs font-ui font-semibold`}>
              {threat.label}
            </span>
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-navy mb-3">{bill.title}</h1>
          <div className="flex flex-wrap gap-4 text-sm text-text-light font-ui">
            <span>Sponsor: {bill.sponsor}</span>
            <span>Last Action: {formatDate(bill.last_action_date)}</span>
          </div>
          <p className="text-text-light text-sm mt-2">{bill.last_action}</p>
        </div>

        {/* Status Pipeline */}
        <div className="bg-white border border-border rounded-lg p-6 mb-10">
          <h2 className="font-ui text-sm font-semibold text-navy uppercase tracking-wide mb-4">Bill Status</h2>
          <StatusPipeline currentStatus={bill.status} />
        </div>

        {/* Plain English */}
        {bill.plain_english_body && (
          <div className="prose mb-10" dangerouslySetInnerHTML={{ __html: renderMarkdown(bill.plain_english_body) }} />
        )}

        {/* Who Gets Hurt */}
        {bill.who_gets_hurt && (
          <div className="prose mb-10" dangerouslySetInnerHTML={{ __html: renderMarkdown(bill.who_gets_hurt) }} />
        )}

        {/* Our Position */}
        {bill.our_position && (
          <div className="prose mb-10" dangerouslySetInnerHTML={{ __html: renderMarkdown(bill.our_position) }} />
        )}

        {/* Open Letter */}
        {bill.open_letter_body && (
          <div className="mb-10">
            <OpenLetter body={bill.open_letter_body} signatureCount={signatureCount} />
          </div>
        )}

        {/* Signatories */}
        <div className="mb-10">
          <SignatoryList billSlug={bill.slug} />
        </div>

        {/* Signature Form */}
        <div className="mb-10">
          <SignatureForm billSlug={bill.slug} billNumber={bill.bill_number} />
        </div>

        {/* Contact Your Rep */}
        <RepLookup billNumber={bill.bill_number} />
      </div>
    </div>
  );
}

