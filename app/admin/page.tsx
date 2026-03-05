import dbConnect from '@/lib/mongodb';
import Signature from '@/models/Signature';
import Bill from '@/models/Bill';
import RepContact from '@/models/RepContact';

export const dynamic = 'force-dynamic';

async function getStats() {
  await dbConnect();

  const [totalSignatures, confirmedSignatures, orgSignatures, pendingOrgs, bills, repContacts] = await Promise.all([
    Signature.countDocuments({}),
    Signature.countDocuments({ email_confirmed: true }),
    Signature.countDocuments({ type: 'organization', email_confirmed: true }),
    Signature.countDocuments({ type: 'organization', email_confirmed: true, org_verified: false }),
    Bill.find({}).select('bill_number title slug').lean(),
    RepContact.countDocuments({}),
  ]);

  // Signatures by bill
  const billStats = await Promise.all(
    bills.map(async (bill) => {
      const count = await Signature.countDocuments({ bill_id: bill._id, email_confirmed: true });
      return { ...JSON.parse(JSON.stringify(bill)), signatureCount: count };
    })
  );

  // Recent signatures
  const recentSignatures = await Signature.find({ email_confirmed: true })
    .sort({ confirmed_at: -1 })
    .limit(10)
    .select('full_name zip_code type borough_or_city confirmed_at')
    .lean();

  return {
    totalSignatures,
    confirmedSignatures,
    orgSignatures,
    pendingOrgs,
    billStats,
    repContacts,
    recentSignatures: JSON.parse(JSON.stringify(recentSignatures)),
  };
}

export default async function AdminDashboard() {
  const stats = await getStats();

  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-navy mb-6">Dashboard</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="font-ui text-xs text-text-light uppercase tracking-wide">Confirmed Signatures</p>
          <p className="font-serif text-3xl font-bold text-navy">{stats.confirmedSignatures}</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="font-ui text-xs text-text-light uppercase tracking-wide">Total Submissions</p>
          <p className="font-serif text-3xl font-bold text-navy">{stats.totalSignatures}</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="font-ui text-xs text-text-light uppercase tracking-wide">Organizations</p>
          <p className="font-serif text-3xl font-bold text-navy">{stats.orgSignatures}</p>
        </div>
        <div className="bg-white border border-border rounded-lg p-4">
          <p className="font-ui text-xs text-text-light uppercase tracking-wide">Pending Org Review</p>
          <p className="font-serif text-3xl font-bold text-amber">{stats.pendingOrgs}</p>
        </div>
      </div>

      {/* By Bill */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="font-ui text-sm font-semibold text-navy uppercase tracking-wide mb-4">Signatures by Bill</h3>
          <div className="space-y-3">
            {stats.billStats.map((bill: { _id: string; bill_number: string; title: string; signatureCount: number }) => (
              <div key={bill._id} className="flex justify-between items-center">
                <div>
                  <span className="font-ui text-sm font-bold text-navy">{bill.bill_number}</span>
                  <span className="text-sm text-text-light ml-2">{bill.title}</span>
                </div>
                <span className="font-ui text-lg font-bold text-navy">{bill.signatureCount}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-border rounded-lg p-6">
          <h3 className="font-ui text-sm font-semibold text-navy uppercase tracking-wide mb-4">Rep Contact Actions</h3>
          <p className="font-serif text-3xl font-bold text-navy">{stats.repContacts}</p>
          <p className="text-sm text-text-light">total actions tracked</p>
        </div>
      </div>

      {/* Recent Signatures */}
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-ui text-sm font-semibold text-navy uppercase tracking-wide mb-4">Recent Confirmed Signatures</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-2 font-ui font-semibold text-navy">Name</th>
                <th className="text-left py-2 font-ui font-semibold text-navy">ZIP</th>
                <th className="text-left py-2 font-ui font-semibold text-navy">Type</th>
                <th className="text-left py-2 font-ui font-semibold text-navy">Location</th>
                <th className="text-left py-2 font-ui font-semibold text-navy">Confirmed</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentSignatures.map((sig: { _id: string; full_name: string; zip_code: string; type: string; borough_or_city?: string; confirmed_at?: string }) => (
                <tr key={sig._id} className="border-b border-border">
                  <td className="py-2">{sig.full_name}</td>
                  <td className="py-2">{sig.zip_code}</td>
                  <td className="py-2 capitalize">{sig.type}</td>
                  <td className="py-2">{sig.borough_or_city || '—'}</td>
                  <td className="py-2 text-text-light">
                    {sig.confirmed_at ? new Date(sig.confirmed_at).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
              {stats.recentSignatures.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-4 text-center text-text-light">No confirmed signatures yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
