'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface OrgSignature {
  _id: string;
  full_name: string;
  email: string;
  org_name: string;
  org_website: string;
  org_type: string;
  org_title: string;
  org_statement: string;
  org_verified: boolean;
  created_at: string;
}

export default function SignatureReviewPage() {
  const [signatures, setSignatures] = useState<OrgSignature[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSignatures();
  }, []);

  const fetchSignatures = async () => {
    const res = await fetch('/api/admin/signatures');
    const data = await res.json();
    setSignatures(data.signatures || []);
    setLoading(false);
  };

  const handleAction = async (id: string, action: 'approve' | 'reject') => {
    await fetch('/api/admin/signatures', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action }),
    });
    fetchSignatures();
  };

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Organization Review Queue</h2>

      {signatures.length === 0 ? (
        <div className="bg-white border border-border rounded-lg p-8 text-center">
          <p className="text-text-light">No organizations pending review.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {signatures.map((sig) => (
            <div key={sig._id} className="bg-white border border-border rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-ui font-semibold text-navy text-lg">{sig.org_name}</h3>
                  <p className="text-sm text-text-light">
                    {sig.full_name}, {sig.org_title}
                  </p>
                  <p className="text-sm text-text-light">{sig.email}</p>
                  <p className="text-sm mt-1">
                    <a href={sig.org_website} target="_blank" rel="noopener noreferrer" className="text-amber hover:text-amber-dark">
                      {sig.org_website}
                    </a>
                  </p>
                  <p className="text-sm text-text-light mt-1">Type: {sig.org_type}</p>
                  {sig.org_statement && (
                    <p className="text-sm text-text italic mt-2">&ldquo;{sig.org_statement}&rdquo;</p>
                  )}
                  <p className="text-xs text-text-light mt-2">
                    Signed: {new Date(sig.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button size="sm" onClick={() => handleAction(sig._id, 'approve')}>
                    Approve
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleAction(sig._id, 'reject')}>
                    Reject
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
