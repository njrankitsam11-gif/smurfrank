export const metadata = {
  title: 'Sign In | RankVault',
  description: 'Log in to your RankVault account to manage your gaming listings and purchases.',
};

import Link from 'next/link';

export default function LoginPage() {
  return (
    <main style={{ backgroundColor: '#050507', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', color: 'white' }}>
      <style>{`
        .focus-outline:focus-visible {
          outline: 2px solid #FF6A00;
          outline-offset: 2px;
        }
      `}</style>
      <div style={{ width: '100%', maxWidth: '400px', padding: '40px', background: '#0f0f17', border: '1px solid #1a1a1a' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Link href="/" className="focus-outline" style={{ fontSize: '24px', fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none', color: 'white' }}>
            RANK<span style={{ color: '#FF6A00' }}>VAULT</span>
          </Link>
          <h1 style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginTop: '20px', letterSpacing: '1px' }}>Welcome Back</h1>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="email" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Email <span aria-hidden="true" style={{ color: '#FF6A00' }}>*</span></label>
            <input id="email" className="focus-outline" required type="email" placeholder="gamer@email.com" style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="password" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Password <span aria-hidden="true" style={{ color: '#FF6A00' }}>*</span></label>
            <input id="password" className="focus-outline" required type="password" placeholder="••••••••" style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }} />
          </div>
          <button type="submit" className="focus-outline" style={{ background: '#FF6A00', color: '#000', padding: '14px', fontWeight: 900, border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}>Sign In</button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '13px', color: '#666' }}>
          New here? <Link href="/register" className="focus-outline" style={{ color: '#FF6A00', textDecoration: 'none' }}>Create an account</Link>
        </p>
      </div>
    </main>
  );
}