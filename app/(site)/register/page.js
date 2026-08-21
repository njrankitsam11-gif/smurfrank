import Link from 'next/link';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register | RankVault',
  description: 'Join RankVault to buy and sell premium ranked accounts.',
};

export default function RegisterPage() {
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
          <h1 style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginTop: '20px', letterSpacing: '1px' }}>Join the Elite</h1>
        </div>
        <RegisterForm />
        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '13px', color: '#666' }}>
          Already have an account? <Link href="/login" className="focus-outline" style={{ color: '#FF6A00', textDecoration: 'none' }}>Sign in</Link>
        </p>
      </div>
    </main>
  );
}
