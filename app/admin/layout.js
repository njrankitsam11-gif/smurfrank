import { redirect } from 'next/navigation';
import { requireAdminSession } from '../../lib/requireAdmin';
import AdminNav from './AdminNav';

export const metadata = {
  title: 'Admin Console | SmurfRank',
};

export default async function AdminLayout({ children }) {
  const session = await requireAdminSession();
  if (!session) {
    redirect('/admin-login');
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050505', color: '#fff', display: 'flex' }}>
      <AdminNav userEmail={session.user.email} />
      <main style={{ flex: 1, padding: '40px', maxWidth: '1200px' }}>
        {children}
      </main>
    </div>
  );
}
