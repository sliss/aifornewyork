'use client';

import { useEffect, useState } from 'react';

interface Signatory {
  name: string;
  location?: string;
  description?: string;
  type: 'individual' | 'organization';
  org_verified: boolean;
}

export default function SignatoryList({ billSlug }: { billSlug: string }) {
  const [signatories, setSignatories] = useState<Signatory[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetch(`/api/signatures/public?bill=${encodeURIComponent(billSlug)}`)
      .then((res) => res.json())
      .then((data) => setSignatories(data.signatures || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [billSlug]);

  if (loading) {
    return null;
  }

  if (signatories.length === 0) {
    return null;
  }

  const INITIAL_COUNT = 20;
  const visible = expanded ? signatories : signatories.slice(0, INITIAL_COUNT);
  const hasMore = signatories.length > INITIAL_COUNT;

  return (
    <div className="bg-white border border-border rounded-lg p-6 md:p-8">
      <h3 className="font-serif text-xl font-bold text-navy mb-1">
        Signatories
      </h3>
      <p className="text-sm text-text-light mb-6">
        {signatories.length.toLocaleString()} {signatories.length === 1 ? 'person has' : 'people have'} signed publicly
      </p>

      <ul className="divide-y divide-border">
        {visible.map((sig, i) => (
          <li key={i} className="py-3 first:pt-0 last:pb-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="font-ui text-sm font-semibold text-navy">
                {sig.name}
              </span>
              {sig.type === 'organization' && sig.org_verified && (
                <span className="text-xs font-ui text-amber font-semibold">Organization</span>
              )}
              {sig.location && (
                <span className="text-xs text-text-light">{sig.location}</span>
              )}
            </div>
            {sig.description && (
              <p className="text-xs text-text-light mt-0.5">{sig.description}</p>
            )}
          </li>
        ))}
      </ul>

      {hasMore && !expanded && (
        <button
          type="button"
          onClick={() => setExpanded(true)}
          className="mt-4 text-sm font-ui font-semibold text-amber hover:text-amber-dark transition-colors"
        >
          Show all {signatories.length.toLocaleString()} signatories
        </button>
      )}
    </div>
  );
}
