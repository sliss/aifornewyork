import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';

async function requireAuth() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function GET() {
  const authError = await requireAuth();
  if (authError) return authError;

  await dbConnect();
  const bills = await Bill.find({}).sort({ bill_number: 1 }).lean();
  return NextResponse.json({ bills: JSON.parse(JSON.stringify(bills)) });
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id, ...updates } = await request.json();

  if (!id) {
    return NextResponse.json({ error: 'Missing bill ID.' }, { status: 400 });
  }

  await dbConnect();

  const allowedFields = ['status', 'threat_level', 'last_action', 'last_action_date', 'short_summary', 'plain_english_body', 'who_gets_hurt', 'our_position', 'open_letter_body'];
  const sanitized: Record<string, unknown> = {};
  for (const key of allowedFields) {
    if (key in updates) {
      sanitized[key] = updates[key];
    }
  }

  await Bill.findByIdAndUpdate(id, sanitized);
  return NextResponse.json({ success: true });
}
