'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';

interface BillData {
  _id: string;
  slug: string;
  bill_number: string;
  title: string;
  status: string;
  threat_level: string;
  sponsor: string;
  last_action: string;
  last_action_date: string;
  short_summary: string;
}

const STATUSES = ['introduced', 'committee', 'floor_vote', 'passed_one_chamber', 'passed_both', 'signed', 'vetoed', 'dead'];
const THREAT_LEVELS = ['dangerous', 'watch', 'supportive'];

export default function BillsAdminPage() {
  const [bills, setBills] = useState<BillData[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<BillData>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    const res = await fetch('/api/admin/bills');
    const data = await res.json();
    setBills(data.bills || []);
    setLoading(false);
  };

  const startEdit = (bill: BillData) => {
    setEditing(bill._id);
    setEditData({
      status: bill.status,
      threat_level: bill.threat_level,
      last_action: bill.last_action,
      last_action_date: bill.last_action_date?.split('T')[0],
      short_summary: bill.short_summary,
    });
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);

    await fetch('/api/admin/bills', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: editing, ...editData }),
    });

    setEditing(null);
    setSaving(false);
    fetchBills();
  };

  if (loading) return <p className="text-text-light">Loading...</p>;

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Bill Management</h2>

      <div className="space-y-4">
        {bills.map((bill) => (
          <div key={bill._id} className="bg-white border border-border rounded-lg p-6">
            {editing === bill._id ? (
              <div className="space-y-4">
                <h3 className="font-ui font-semibold text-navy">{bill.bill_number} — {bill.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-ui font-semibold text-navy mb-1">Status</label>
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData({ ...editData, status: e.target.value })}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm"
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-ui font-semibold text-navy mb-1">Threat Level</label>
                    <select
                      value={editData.threat_level}
                      onChange={(e) => setEditData({ ...editData, threat_level: e.target.value })}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm"
                    >
                      {THREAT_LEVELS.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-ui font-semibold text-navy mb-1">Last Action</label>
                    <input
                      type="text"
                      value={editData.last_action || ''}
                      onChange={(e) => setEditData({ ...editData, last_action: e.target.value })}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-ui font-semibold text-navy mb-1">Last Action Date</label>
                    <input
                      type="date"
                      value={editData.last_action_date || ''}
                      onChange={(e) => setEditData({ ...editData, last_action_date: e.target.value })}
                      className="w-full border border-border rounded-md px-3 py-2 text-sm"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" onClick={handleSave} disabled={saving}>
                    {saving ? 'Saving...' : 'Save'}
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setEditing(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-ui font-semibold text-navy">{bill.bill_number} — {bill.title}</h3>
                  <p className="text-sm text-text-light mt-1">
                    Status: <span className="font-semibold capitalize">{bill.status}</span> &middot;
                    Threat: <span className="font-semibold capitalize">{bill.threat_level}</span>
                  </p>
                  <p className="text-sm text-text-light mt-1">{bill.last_action}</p>
                </div>
                <Button size="sm" variant="secondary" onClick={() => startEdit(bill)}>
                  Edit
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
