import dbConnect from '@/lib/mongodb';
import Signature from '@/models/Signature';
import Button from '@/components/ui/Button';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confirm Your Signature',
};

interface PageProps {
  params: Promise<{ token: string }>;
}

export default async function ConfirmPage({ params }: PageProps) {
  const { token } = await params;
  await dbConnect();

  const signature = await Signature.findOne({ confirmation_token: token });

  if (!signature) {
    return (
      <div className="pt-[120px] pb-20">
        <div className="max-w-md mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-text mb-4">Invalid Link</h1>
          <p className="text-text-light mb-6">
            This confirmation link is invalid or has expired. Please try signing the letter again.
          </p>
          <Button href="/sign/s7263-ai-chatbot-professional-advice-ban">Sign Again</Button>
        </div>
      </div>
    );
  }

  if (signature.email_confirmed) {
    return (
      <div className="pt-[120px] pb-20">
        <div className="max-w-md mx-auto px-6 text-center">
          <h1 className="font-serif text-3xl font-bold text-text mb-4">Already Confirmed</h1>
          <p className="text-text-light mb-6">
            Your signature has already been confirmed. Thank you for your support!
          </p>
          <Button href="/take-action">Contact Your Rep</Button>
        </div>
      </div>
    );
  }

  // Confirm the signature
  signature.email_confirmed = true;
  signature.confirmed_at = new Date();
  await signature.save();

  const totalCount = await Signature.countDocuments({ email_confirmed: true });

  return (
    <div className="pt-[120px] pb-20">
      <div className="max-w-md mx-auto px-6 text-center">
        <div className="text-5xl mb-4 text-navy">&#10003;</div>
        <h1 className="font-serif text-3xl font-bold text-text mb-4">Signature Confirmed!</h1>
        <p className="text-text-light mb-2">
          Thank you, <strong className="text-text">{signature.full_name}</strong>. Your signature has been confirmed.
        </p>
        <p className="font-serif text-2xl font-bold text-navy mt-6 mb-1">
          {totalCount.toLocaleString()}
        </p>
        <p className="font-ui text-sm text-text-light mb-8">
          Signatures — including you.
        </p>

        <div className="space-y-3">
          <Button href="/take-action" className="w-full">
            Contact Your Representative
          </Button>
          <div className="flex gap-3 justify-center">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just signed the open letter opposing NY's AI Chatbot Ban (S7263). Join me: https://aifornewyork.org/sign/s7263-ai-chatbot-professional-advice-ban")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-ui text-navy hover:text-blue-dark transition-colors"
            >
              Share on Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://aifornewyork.org/sign/s7263-ai-chatbot-professional-advice-ban")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-ui text-navy hover:text-blue-dark transition-colors"
            >
              Share on Facebook
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
