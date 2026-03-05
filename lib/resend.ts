const RESEND_API_KEY = process.env.RESEND_API_KEY;

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export async function sendEmail({ to, subject, html, from }: EmailOptions) {
  const sender = from || 'AI For New York <noreply@aifornewyork.org>';

  // In development or when no real API key, log to console
  if (!RESEND_API_KEY || RESEND_API_KEY.startsWith('re_placeholder')) {
    console.log('--- DEV EMAIL ---');
    console.log('From:', sender);
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', html.substring(0, 500));
    console.log('--- END EMAIL ---');
    return { id: 'dev-' + Date.now(), success: true };
  }

  const { Resend } = await import('resend');
  const resend = new Resend(RESEND_API_KEY);

  const { data, error } = await resend.emails.send({
    from: sender,
    to,
    subject,
    html,
  });

  if (error) {
    console.error('Resend error:', error);
    throw new Error('Failed to send email');
  }

  return { id: data?.id, success: true };
}

export function buildConfirmationEmail(name: string, billNumber: string, token: string) {
  const confirmUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/confirm/${token}`;

  return {
    subject: `Confirm your signature — Open Letter Against ${billNumber}`,
    html: `
      <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #0A1628;">Thank you, ${name}.</h2>
        <p style="color: #1a1a2e; line-height: 1.6;">
          You've signed the open letter opposing ${billNumber}. Please confirm your signature by clicking the link below:
        </p>
        <p style="margin: 30px 0;">
          <a href="${confirmUrl}" style="background: #D4920B; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
            Confirm My Signature
          </a>
        </p>
        <p style="color: #4a4a5a; font-size: 14px;">
          This link expires in 72 hours. If you didn't sign this letter, you can safely ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #E5E5E0; margin: 30px 0;" />
        <p style="color: #4a4a5a; font-size: 12px;">
          AI For New York — Protecting New Yorkers' Right to AI-Powered Information
        </p>
      </div>
    `,
  };
}
