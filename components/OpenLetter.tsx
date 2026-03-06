import { renderMarkdown } from '@/lib/markdown';

interface OpenLetterProps {
  body: string;
  signatureCount: number;
}

export default function OpenLetter({ body, signatureCount }: OpenLetterProps) {
  return (
    <div className="bg-white border border-border rounded-2xl p-6 md:p-8">
      <div className="prose" dangerouslySetInnerHTML={{ __html: renderMarkdown(body) }} />
      <div className="mt-6 text-center">
        <p className="font-serif text-2xl font-bold text-navy mb-1">
          {signatureCount.toLocaleString()}
        </p>
        <p className="font-ui text-sm text-text-light">Signatures</p>
      </div>
    </div>
  );
}
