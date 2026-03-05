'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface DistrictInfo {
  senate_district: string;
  assembly_district: string;
  senator_name: string;
  senator_party: string;
  assembly_member_name: string;
  assembly_member_party: string;
  matched_address?: string;
}

export default function RepLookup({ billNumber }: { billNumber?: string }) {
  const [address, setAddress] = useState('');
  const [district, setDistrict] = useState<DistrictInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState('');

  const billRef = billNumber || 'S7263';

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    setDistrict(null);

    try {
      const res = await fetch(`/api/rep-lookup?address=${encodeURIComponent(address)}`);
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not find your district.');
        return;
      }

      setDistrict(data);
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const phoneScript = `Hi, my name is [YOUR NAME] and I'm a constituent. I'm calling to urge the Senator to vote NO on ${billRef}, the AI Chatbot Professional Advice Ban. This bill would cut off access to AI-powered legal, medical, and financial information for millions of New Yorkers who can't afford professional consultations. I urge the Senator to oppose this bill. Thank you for your time.`;

  const emailTemplate = `Dear [REPRESENTATIVE],

I am writing as your constituent to express my strong opposition to ${billRef}, the AI Chatbot Professional Advice Ban.

This bill would prohibit AI tools from providing information about legal rights, medical conditions, financial planning, and other topics covered by licensed professions. For millions of New Yorkers — tenants facing eviction, immigrants navigating paperwork, small business owners understanding regulations — these AI tools are often the only accessible source of crucial information.

I urge you to vote NO on ${billRef} and instead support legislation that promotes transparency and accountability in AI without eliminating access to information.

Thank you for your consideration.

Sincerely,
[YOUR NAME]`;

  const handleCopy = async (text: string, label: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(''), 2000);

    try {
      await fetch('/api/rep-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          action_type: label === 'phone' ? 'phone_script_copied' : 'email_copied',
          district_type: 'senate',
          district_number: district?.senate_district || '',
        }),
      });
    } catch {
      // Silently fail on tracking
    }
  };

  return (
    <div className="bg-white border border-border rounded-lg p-6 md:p-8">
      <h3 className="font-serif text-2xl font-bold text-navy mb-2">Contact Your Representatives</h3>
      <p className="text-text-light text-sm mb-6">
        Enter your New York address to find your State Senator and Assembly Member.
      </p>

      <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your address (e.g., 280 Madison Ave, New York, NY)"
          required
          className="flex-1 border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Looking up...' : 'Find My Reps'}
        </Button>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800 mb-4">
          {error}
        </div>
      )}

      {district && (
        <div className="space-y-6">
          {district.matched_address && (
            <p className="text-xs text-text-light">
              Matched address: {district.matched_address}
            </p>
          )}

          {/* Representatives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-offwhite rounded-lg p-4">
              <p className="font-ui text-xs text-text-light uppercase tracking-wide mb-1">State Senator — District {district.senate_district}</p>
              <p className="font-serif text-lg font-bold text-navy">{district.senator_name}</p>
              <p className="font-ui text-sm text-text-light">{district.senator_party === 'D' ? 'Democrat' : 'Republican'}</p>
            </div>
            <div className="bg-offwhite rounded-lg p-4">
              <p className="font-ui text-xs text-text-light uppercase tracking-wide mb-1">Assembly Member — District {district.assembly_district}</p>
              <p className="font-serif text-lg font-bold text-navy">{district.assembly_member_name}</p>
              <p className="font-ui text-sm text-text-light">{district.assembly_member_party === 'D' ? 'Democrat' : 'Republican'}</p>
            </div>
          </div>

          {/* Phone Script */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-ui text-sm font-semibold text-navy">Phone Script (30 seconds)</h4>
              <button
                type="button"
                onClick={() => handleCopy(phoneScript, 'phone')}
                className="text-xs font-ui text-amber hover:text-amber-dark"
              >
                {copied === 'phone' ? 'Copied!' : 'Copy to clipboard'}
              </button>
            </div>
            <div className="bg-offwhite rounded-lg p-4 text-sm text-text leading-relaxed">
              {phoneScript}
            </div>
          </div>

          {/* Email Template */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-ui text-sm font-semibold text-navy">Email Template</h4>
              <button
                type="button"
                onClick={() => handleCopy(emailTemplate, 'email')}
                className="text-xs font-ui text-amber hover:text-amber-dark"
              >
                {copied === 'email' ? 'Copied!' : 'Copy to clipboard'}
              </button>
            </div>
            <div className="bg-offwhite rounded-lg p-4 text-sm text-text leading-relaxed whitespace-pre-line">
              {emailTemplate}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
