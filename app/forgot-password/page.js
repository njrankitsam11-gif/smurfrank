'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [resetUrl, setResetUrl] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');
    setResetUrl('');

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong');
      setMessage(data.message);
      if (data.resetUrl) setResetUrl(data.resetUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

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
          <h1 style={{ fontSize: '18px', fontWeight: 700, textTransform: 'uppercase', marginTop: '20px', letterSpacing: '1px' }}>Reset Your Password</h1>
        </div>

        {message ? (
          <div>
            <p style={{ fontSize: '13px', color: '#ccc', lineHeight: 1.6 }}>{message}</p>
            {resetUrl && (
              <div style={{ marginTop: '20px', padding: '14px', background: '#050507', border: '1px solid #1a1a1a', wordBreak: 'break-all' }}>
                <p style={{ fontSize: '11px', textTransform: 'uppercase', color: '#999', marginBottom: '8px' }}>
                  No email service is configured yet, so here&apos;s your reset link:
                </p>
                <Link href={resetUrl} className="focus-outline" style={{ color: '#FF6A00', fontSize: '13px' }}>
                  {typeof window !== 'undefined' ? `${window.location.origin}${resetUrl}` : resetUrl}
                </Link>
              </div>
            )}
          </div>
        ) : (
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
                type="email"
                autoComplete="email"
                placeholder="gamer@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '12px', background: '#050507', border: '1px solid #1a1a1a', color: 'white' }}
              />
            </div>
            <button type="submit" disabled={submitting} className="focus-outline" style={{ background: '#FF6A00', color: '#000', padding: '14px', fontWeight: 900, border: 'none', cursor: submitting ? 'default' : 'pointer', textTransform: 'uppercase', opacity: submitting ? 0.7 : 1 }}>
              {submitting ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '30px', fontSize: '13px', color: '#666' }}>
          <Link href="/login" className="focus-outline" style={{ color: '#FF6A00', textDecoration: 'none' }}>Back to Sign In</Link>
        </p>
      </div>
    </main>
  );
}
