import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-offwhite">
      <div className="bg-white border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <h1 className="font-serif text-lg font-bold text-navy">Admin Panel</h1>
            <nav className="hidden sm:flex items-center gap-4">
              <Link href="/admin" className="text-sm font-ui text-text-light hover:text-navy">Dashboard</Link>
              <Link href="/admin/signatures" className="text-sm font-ui text-text-light hover:text-navy">Signatures</Link>
              <Link href="/admin/bills" className="text-sm font-ui text-text-light hover:text-navy">Bills</Link>
              <Link href="/admin/export" className="text-sm font-ui text-text-light hover:text-navy">Export</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-ui text-text-light hover:text-navy">View Site</Link>
            <Link href="/api/auth/signout" className="text-sm font-ui text-amber hover:text-amber-dark">Sign Out</Link>
          </div>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {children}
      </div>
    </div>
  );
}
