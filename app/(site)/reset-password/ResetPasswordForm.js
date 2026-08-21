'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setSuccess(true);
      setTimeout(() => router.push('/login'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (!token) {
    return (
      <p style={{ fontSize: '13px', color: '#f88' }}>
        This reset link is missing its token. Request a new one from the{' '}
        <Link href="/forgot-password" className="focus-outline" style={{ color: '#FF6A00' }}>forgot password page</Link>.
      </p>
    );
  }

  if (success) {
    return <p style={{ fontSize: '13px', color: '#ccc' }}>Your password has been reset. Redirecting to sign in...</p>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {error && (
        <div role="alert" style={{ background: '#3a1010', border: '1px solid #a33', color: '#f88', padding: '10px 14px', borderRadius: '4px', fontSize: '13px' }}>
          {error}
        </div>
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="password" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>New Password <span aria-hidden="true" style={{ color: '#FF6A00' }}>*</span></label>
        <input
          id="password"
          className="focus-outline"
          required
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}
        />
        <span style={{ fontSize: '11px', color: '#666' }}>At least 8 characters, with uppercase, lowercase, a number, and a symbol.</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label htmlFor="confirmPassword" style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999' }}>Confirm Password <span aria-hidden="true" style={{ color: '#FF6A00' }}>*</span></label>
        <input
          id="confirmPassword"
          className="focus-outline"
          required
          type="password"
          autoComplete="new-password"
          placeholder="••••••••"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}
        />
      </div>
      <button type="submit" disabled={submitting} className="focus-outline" style={{ background: '#FF6A00', color: '#000', padding: '14px', fontWeight: 900, border: 'none', cursor: submitting ? 'default' : 'pointer', textTransform: 'uppercase', opacity: submitting ? 0.7 : 1 }}>
        {submitting ? 'Saving...' : 'Set New Password'}
      </button>
    </form>
  );
}
