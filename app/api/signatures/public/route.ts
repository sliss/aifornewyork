import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import Signature from '@/models/Signature';

export async function GET(request: NextRequest) {
  const billSlug = request.nextUrl.searchParams.get('bill');

  if (!billSlug) {
    return NextResponse.json({ error: 'Missing bill parameter.' }, { status: 400 });
  }

  await dbConnect();

  const bill = await Bill.findOne({ slug: billSlug }).lean();
  if (!bill) {
    return NextResponse.json({ error: 'Bill not found.' }, { status: 404 });
  }

  const signatures = await Signature.find({
    bill_id: bill._id,
    email_confirmed: true,
    display_publicly: true,
  })
    .select('full_name borough_or_city description type org_name org_title org_verified confirmed_at')
    .sort({ confirmed_at: -1 })
    .lean();

  return NextResponse.json({
    signatures: signatures.map((sig) => ({
      name: sig.type === 'organization' && sig.org_verified ? sig.org_name : sig.full_name,
      location: sig.borough_or_city || undefined,
      description: sig.type === 'organization'
        ? (sig.org_verified ? `${sig.full_name}, ${sig.org_title}` : undefined)
        : (sig.description || undefined),
      type: sig.type,
      org_verified: sig.org_verified || false,
    })),
  });
}
