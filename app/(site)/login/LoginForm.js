'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    setSubmitting(false);

    if (result?.error) {
      setError(result.error === 'CredentialsSignin' ? 'Invalid email or password.' : result.error);
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {error && (
        <div role="alert" style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '4px', fontSize: '13px' }}>
          {error}
        </div>
      )}
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
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}
        />
        <a href="/forgot-password" className="focus-outline" style={{ alignSelf: 'flex-end', fontSize: '12px', color: '#FF6A00', textDecoration: 'none' }}>
          Forgot password?
        </a>
      </div>
      <button type="submit" disabled={submitting} className="focus-outline" style={{ background: '#FF6A00', color: '#000', padding: '14px', fontWeight: 900, border: 'none', cursor: submitting ? 'default' : 'pointer', textTransform: 'uppercase', opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Signing In...' : 'Sign In'}
      </button>
    </form>
  );
}
