import AdminLoginForm from './AdminLoginForm';

export const metadata = {
  title: 'Admin Login | SmurfRank',
};

export default function AdminLoginPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ width: '100%', maxWidth: '360px', padding: '36px', background: '#0f0f0f', border: '1px solid #222', borderRadius: '16px' }}>
        <div style={{ marginBottom: '30px' }}>
          <div style={{ color: '#D4AF37', fontSize: '11px', fontWeight: 900, letterSpacing: '2px', textTransform: 'uppercase' }}>
            SmurfRank
          </div>
          <div style={{ fontSize: '20px', fontWeight: 900, textTransform: 'uppercase' }}>Admin Console</div>
        </div>
        <AdminLoginForm />
      </div>
    </main>
  );
}
