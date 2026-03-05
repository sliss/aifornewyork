import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Signature from '@/models/Signature';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: 'Missing token.' }, { status: 400 });
  }

  await dbConnect();

  const signature = await Signature.findOne({ confirmation_token: token });

  if (!signature) {
    return NextResponse.json({ error: 'Invalid or expired token.' }, { status: 404 });
  }

  if (signature.email_confirmed) {
    return NextResponse.json({ message: 'Already confirmed.', confirmed: true });
  }

  // Check token age (72 hours)
  const tokenAge = Date.now() - new Date(signature.created_at).getTime();
  if (tokenAge > 72 * 60 * 60 * 1000) {
    return NextResponse.json({ error: 'This confirmation link has expired. Please sign again.' }, { status: 410 });
  }

  signature.email_confirmed = true;
  signature.confirmed_at = new Date();
  await signature.save();

  return NextResponse.json({ message: 'Signature confirmed!', confirmed: true });
}
