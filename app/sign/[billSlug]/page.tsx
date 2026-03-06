import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import Signature from '@/models/Signature';
import SignatureForm from '@/components/SignatureForm';
import OpenLetter from '@/components/OpenLetter';

interface PageProps {
  params: Promise<{ billSlug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { billSlug } = await params;
  await dbConnect();
  const bill = await Bill.findOne({ slug: billSlug }).lean();
  if (!bill) return { title: 'Sign the Letter' };
  return {
    title: `Sign the Letter — ${bill.bill_number}`,
    description: `Add your name to the open letter opposing ${bill.bill_number}. Your signature matters.`,
  };
}

export default async function SignPage({ params }: PageProps) {
  const { billSlug } = await params;
  await dbConnect();
  const bill = await Bill.findOne({ slug: billSlug }).lean();
  if (!bill) notFound();

  const billData = JSON.parse(JSON.stringify(bill));

  const signatureCount = await Signature.countDocuments({
    bill_id: billData._id,
    email_confirmed: true,
  });

  return (
    <div className="pt-[100px] pb-16 md:pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-text mb-3">
            Sign the Open Letter
          </h1>
          <p className="text-text-light">
            Opposing {billData.bill_number} — {billData.title}
          </p>
        </div>

        {billData.open_letter_body && (
          <div className="mb-10">
            <OpenLetter body={billData.open_letter_body} signatureCount={signatureCount} />
          </div>
        )}

        <SignatureForm billSlug={billData.slug} billNumber={billData.bill_number} />
      </div>
    </div>
  );
}
