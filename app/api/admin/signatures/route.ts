import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Signature from '@/models/Signature';

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

  const signatures = await Signature.find({
    type: 'organization',
    email_confirmed: true,
    org_verified: false,
  }).sort({ created_at: -1 }).lean();

  return NextResponse.json({ signatures: JSON.parse(JSON.stringify(signatures)) });
}

export async function PATCH(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;

  const { id, action } = await request.json();

  if (!id || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  await dbConnect();

  if (action === 'approve') {
    await Signature.findByIdAndUpdate(id, { org_verified: true });
  } else {
    await Signature.findByIdAndDelete(id);
  }

  return NextResponse.json({ success: true });
}
