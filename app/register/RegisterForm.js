'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function RegisterForm() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      const result = await signIn('credentials', { email, password, redirect: false });

      if (result?.error) {
        router.push('/login');
        return;
      }

      router.push('/');
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {error && (
        <div role="alert" style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '4px', fontSize: '13px' }}>
          {error}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="username" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Username <span aria-hidden="true" style={{ color: '#FF6A00' }}>*</span></label>
        <input
          id="username"
          className="focus-outline"
          required
          aria-required="true"
          type="text"
          autoComplete="username"
          placeholder="Gamer123"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="email" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Email <span aria-hidden="true" style={{ color: '#FF6A00' }}>*</span></label>
        <input
          id="email"
          className="focus-outline"
          required
          aria-required="true"
          type="email"
          autoComplete="email"
          placeholder="gamer@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}
        />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="password" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Password <span aria-hidden="true" style={{ color: '#FF6A00' }}>*</span></label>
        <input
          id="password"
          className="focus-outline"
          required
          aria-required="true"
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}
        />
        <span style={{ fontSize: '11px', color: '#666' }}>At least 8 characters, with uppercase, lowercase, a number, and a symbol.</span>
      </div>
      <button type="submit" disabled={submitting} className="focus-outline" style={{ background: '#FF6A00', color: '#000', padding: '14px', fontWeight: 900, border: 'none', cursor: submitting ? 'default' : 'pointer', textTransform: 'uppercase', opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Creating Account...' : 'Create Account'}
      </button>
    </form>
  );
}
