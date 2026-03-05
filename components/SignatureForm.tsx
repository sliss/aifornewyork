'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

interface SignatureFormProps {
  billSlug: string;
  billNumber: string;
}

const ORG_TYPES = [
  'Nonprofit',
  'Small Business',
  'Professional Association',
  'Legal Aid',
  'Community Organization',
  'Tech Company',
  'Other',
];

const FREE_EMAIL_DOMAINS = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com', 'protonmail.com'];

export default function SignatureForm({ billSlug, billNumber }: SignatureFormProps) {
  const [mode, setMode] = useState<'individual' | 'organization'>('individual');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    zip_code: '',
    borough_or_city: '',
    description: '',
    display_publicly: true,
    email_updates: false,
    // Org fields
    org_name: '',
    org_website: '',
    org_type: '',
    org_title: '',
    org_statement: '',
    // Honeypot
    website: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/signatures', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          type: mode,
          bill_slug: billSlug,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong. Please try again.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
        <h3 className="font-serif text-2xl font-bold text-navy mb-3">Thank you!</h3>
        <p className="text-text-light mb-4">
          We&apos;ve sent a confirmation email to <strong>{formData.email}</strong>.
          Please click the link in the email to confirm your signature.
        </p>
        <p className="text-sm text-text-light">
          Didn&apos;t get the email? Check your spam folder, or try signing again with a different email address.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-border rounded-lg p-6 md:p-8">
      <h3 className="font-serif text-2xl font-bold text-navy mb-2">Sign the Open Letter</h3>
      <p className="text-text-light text-sm mb-6">
        Add your name to oppose {billNumber}. Your signature matters.
      </p>

      {/* Mode toggle */}
      <div className="flex gap-2 mb-6">
        <button
          type="button"
          onClick={() => setMode('individual')}
          className={`px-4 py-2 rounded-md text-sm font-ui font-semibold transition-colors ${
            mode === 'individual'
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-text-light hover:bg-gray-200'
          }`}
        >
          Individual
        </button>
        <button
          type="button"
          onClick={() => setMode('organization')}
          className={`px-4 py-2 rounded-md text-sm font-ui font-semibold transition-colors ${
            mode === 'organization'
              ? 'bg-navy text-white'
              : 'bg-gray-100 text-text-light hover:bg-gray-200'
          }`}
        >
          Organization
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Honeypot field - hidden from users */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website">Website</label>
          <input
            type="text"
            id="website"
            name="website"
            value={formData.website}
            onChange={handleChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div>
          <label htmlFor="full_name" className="block text-sm font-ui font-semibold text-navy mb-1">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            required
            value={formData.full_name}
            onChange={handleChange}
            className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-ui font-semibold text-navy mb-1">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
          />
          {mode === 'organization' && (
            <p className="text-xs text-text-light mt-1">Please use your organization email address (not Gmail, Yahoo, etc.)</p>
          )}
        </div>

        <div>
          <label htmlFor="zip_code" className="block text-sm font-ui font-semibold text-navy mb-1">
            ZIP Code <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            id="zip_code"
            name="zip_code"
            required
            maxLength={5}
            pattern="[0-9]{5}"
            value={formData.zip_code}
            onChange={handleChange}
            className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
            placeholder="10001"
          />
        </div>

        <div>
          <label htmlFor="borough_or_city" className="block text-sm font-ui font-semibold text-navy mb-1">
            Borough or City
          </label>
          <input
            type="text"
            id="borough_or_city"
            name="borough_or_city"
            value={formData.borough_or_city}
            onChange={handleChange}
            className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
            placeholder="The Bronx"
          />
        </div>

        {mode === 'individual' && (
          <div>
            <label htmlFor="description" className="block text-sm font-ui font-semibold text-navy mb-1">
              One-line description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
              placeholder="Tenant in the Bronx"
            />
          </div>
        )}

        {mode === 'organization' && (
          <>
            <div>
              <label htmlFor="org_name" className="block text-sm font-ui font-semibold text-navy mb-1">
                Organization Name <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="org_name"
                name="org_name"
                required={mode === 'organization'}
                value={formData.org_name}
                onChange={handleChange}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="org_title" className="block text-sm font-ui font-semibold text-navy mb-1">
                Your Title <span className="text-danger">*</span>
              </label>
              <input
                type="text"
                id="org_title"
                name="org_title"
                required={mode === 'organization'}
                value={formData.org_title}
                onChange={handleChange}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
                placeholder="Executive Director"
              />
            </div>

            <div>
              <label htmlFor="org_website" className="block text-sm font-ui font-semibold text-navy mb-1">
                Organization Website <span className="text-danger">*</span>
              </label>
              <input
                type="url"
                id="org_website"
                name="org_website"
                required={mode === 'organization'}
                value={formData.org_website}
                onChange={handleChange}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
                placeholder="https://example.org"
              />
            </div>

            <div>
              <label htmlFor="org_type" className="block text-sm font-ui font-semibold text-navy mb-1">
                Organization Type <span className="text-danger">*</span>
              </label>
              <select
                id="org_type"
                name="org_type"
                required={mode === 'organization'}
                value={formData.org_type}
                onChange={handleChange}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent"
              >
                <option value="">Select type...</option>
                {ORG_TYPES.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="org_statement" className="block text-sm font-ui font-semibold text-navy mb-1">
                Brief Statement of Support (optional, 280 chars max)
              </label>
              <textarea
                id="org_statement"
                name="org_statement"
                maxLength={280}
                rows={3}
                value={formData.org_statement}
                onChange={handleChange}
                className="w-full border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber focus:border-transparent resize-none"
              />
              <p className="text-xs text-text-light mt-1">{formData.org_statement.length}/280</p>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="display_publicly"
              checked={formData.display_publicly}
              onChange={handleChange}
              className="rounded border-border text-amber focus:ring-amber"
            />
            <span className="text-sm text-text">Display my name publicly as a signatory</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="email_updates"
              checked={formData.email_updates}
              onChange={handleChange}
              className="rounded border-border text-amber focus:ring-amber"
            />
            <span className="text-sm text-text">Email me updates about this campaign</span>
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <Button type="submit" variant="primary" size="lg" disabled={submitting} className="w-full">
          {submitting ? 'Signing...' : 'Sign the Letter'}
        </Button>
      </form>
    </div>
  );
}
