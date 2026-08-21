'use client';
import { useState } from 'react';
import { signIn, signOut, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function AdminLoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await signIn('credentials', { email, password, redirect: false });

    if (result?.error) {
      setError(result.error === 'CredentialsSignin' ? 'Invalid email or password.' : result.error);
      setSubmitting(false);
      return;
    }

    const session = await getSession();
    if (session?.user?.role !== 'admin') {
      await signOut({ redirect: false });
      setError('This account does not have admin access.');
      setSubmitting(false);
      return;
    }

    router.push('/admin');
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
      {error && (
        <div role="alert" style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '8px', fontSize: '13px' }}>
          {error}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="email" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Email</label>
        <input
          id="email"
          required
          type="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px', color: 'white' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="password" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999', letterSpacing: '1px' }}>Password</label>
        <input
          id="password"
          required
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', background: '#0a0a0a', border: '1px solid #262626', borderRadius: '8px', color: 'white' }}
        />
      </div>
      <button type="submit" disabled={submitting} style={{
        background: '#D4AF37', color: '#050505', fontWeight: 700, border: 'none',
        borderRadius: '8px', padding: '12px', cursor: submitting ? 'default' : 'pointer',
        fontSize: '14px', opacity: submitting ? 0.7 : 1, marginTop: '6px',
      }}>
        {submitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
