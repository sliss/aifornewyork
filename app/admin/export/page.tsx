'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function ExportPage() {
  const [exporting, setExporting] = useState(false);

  const handleExport = async (mode: 'public' | 'full') => {
    setExporting(true);
    try {
      const res = await fetch(`/api/admin/export?mode=${mode}`);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `signatures-${mode}-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();
    } catch (error) {
      console.error('Export error:', error);
    }
    setExporting(false);
  };

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Export Signatures</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="font-ui font-semibold text-navy mb-2">Public List</h3>
          <p className="text-sm text-text-light mb-4">
            Only includes signatures where the signer opted in to public display. Includes: name, ZIP code, borough/city, description, date signed.
          </p>
          <Button onClick={() => handleExport('public')} disabled={exporting}>
            {exporting ? 'Exporting...' : 'Download Public CSV'}
          </Button>
        </div>

        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="font-ui font-semibold text-navy mb-2">Full List (Legislative Submission)</h3>
          <p className="text-sm text-text-light mb-4">
            All confirmed signatures for submission to legislators. Includes: name, email, ZIP code, borough/city, description, type, date signed.
          </p>
          <Button onClick={() => handleExport('full')} disabled={exporting}>
            {exporting ? 'Exporting...' : 'Download Full CSV'}
          </Button>
        </div>
      </div>
    </div>
  );
}
