import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Signature from '@/models/Signature';

export async function GET(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const mode = request.nextUrl.searchParams.get('mode') || 'public';

  await dbConnect();

  const query: Record<string, unknown> = { email_confirmed: true };
  if (mode === 'public') {
    query.display_publicly = true;
  }

  const signatures = await Signature.find(query)
    .sort({ created_at: 1 })
    .lean();

  // Build CSV
  const headers = mode === 'full'
    ? ['Name', 'Email', 'ZIP Code', 'Borough/City', 'Description', 'Type', 'Organization', 'Date Signed']
    : ['Name', 'ZIP Code', 'Borough/City', 'Description', 'Date Signed'];

  const rows = signatures.map((sig) => {
    const base = [
      escapeCSV(sig.full_name),
      ...(mode === 'full' ? [escapeCSV(sig.email)] : []),
      escapeCSV(sig.zip_code),
      escapeCSV(sig.borough_or_city || ''),
      escapeCSV(sig.description || ''),
      ...(mode === 'full' ? [sig.type, escapeCSV(sig.org_name || '')] : []),
      sig.confirmed_at ? new Date(sig.confirmed_at).toISOString().split('T')[0] : '',
    ];
    return base.join(',');
  });

  const csv = [headers.join(','), ...rows].join('\n');

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv',
      'Content-Disposition': `attachment; filename="signatures-${mode}-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  });
}

function escapeCSV(value: string): string {
  if (value.includes(',') || value.includes('"') || value.includes('\n')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}
