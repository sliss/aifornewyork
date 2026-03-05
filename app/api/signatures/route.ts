import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Bill from '@/models/Bill';
import Signature from '@/models/Signature';
import { isValidNYZip, generateToken } from '@/lib/utils';
import { sendEmail, buildConfirmationEmail } from '@/lib/resend';

// In-memory rate limiting (good enough for MVP)
const rateLimit = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimit.get(ip);

  if (!record || now > record.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + 3600000 }); // 1 hour
    return true;
  }

  if (record.count >= 5) {
    return false;
  }

  record.count++;
  return true;
}

const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com'];

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again later.' },
        { status: 429 }
      );
    }

    const body = await request.json();

    // Honeypot check
    if (body.website) {
      // Silently reject bot submissions
      return NextResponse.json({ success: true, message: 'Signature recorded.' });
    }

    const { type, full_name, email, zip_code, borough_or_city, description,
            display_publicly, email_updates, bill_slug,
            org_name, org_website, org_type, org_title, org_statement } = body;

    // Validation
    if (!full_name || !email || !zip_code || !bill_slug) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    if (!isValidNYZip(zip_code)) {
      return NextResponse.json(
        { error: 'This campaign is focused on New York State legislation. If you\'re outside NY, you can still support us by sharing.' },
        { status: 400 }
      );
    }

    // Org email domain check
    if (type === 'organization') {
      if (!org_name || !org_website || !org_type || !org_title) {
        return NextResponse.json(
          { error: 'Please fill in all required organization fields.' },
          { status: 400 }
        );
      }

      const emailDomain = email.split('@')[1]?.toLowerCase();
      if (FREE_EMAIL_DOMAINS.includes(emailDomain)) {
        return NextResponse.json(
          { error: 'Please use your organization email address (not a personal email like Gmail).' },
          { status: 400 }
        );
      }
    }

    await dbConnect();

    // Find bill
    const bill = await Bill.findOne({ slug: bill_slug });
    if (!bill) {
      return NextResponse.json({ error: 'Bill not found.' }, { status: 404 });
    }

    // Check for existing signature
    const existing = await Signature.findOne({ bill_id: bill._id, email });
    if (existing) {
      if (existing.email_confirmed) {
        return NextResponse.json(
          { error: 'This email has already signed this letter.' },
          { status: 400 }
        );
      }
      // Resend confirmation for unconfirmed signatures
      const emailContent = buildConfirmationEmail(full_name, bill.bill_number, existing.confirmation_token);
      await sendEmail({ to: email, ...emailContent });
      return NextResponse.json({ success: true, message: 'Confirmation email resent.' });
    }

    const token = generateToken();

    await Signature.create({
      bill_id: bill._id,
      type: type || 'individual',
      full_name,
      email,
      zip_code,
      borough_or_city: borough_or_city || undefined,
      description: description || undefined,
      display_publicly: display_publicly !== false,
      email_updates: email_updates === true,
      confirmation_token: token,
      org_name: org_name || undefined,
      org_website: org_website || undefined,
      org_type: org_type || undefined,
      org_title: org_title || undefined,
      org_statement: org_statement || undefined,
      org_verified: false,
    });

    // Send confirmation email
    const emailContent = buildConfirmationEmail(full_name, bill.bill_number, token);
    await sendEmail({ to: email, ...emailContent });

    return NextResponse.json({ success: true, message: 'Please check your email to confirm your signature.' });
  } catch (error) {
    console.error('Signature error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}
