'use client';
import { useState } from 'react';
import Link from 'next/link';
import AuthShell from '../../../components/auth/AuthShell';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

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
    <AuthShell
      title="Reset Your Password"
      footer={
        <Link href="/login" className="focus-ring font-bold text-gold-400 hover:text-gold-300">
          Back to Sign In
        </Link>
      }
    >
      {message ? (
        <div>
          <p className="text-sm leading-relaxed text-ink-200">{message}</p>
          {resetUrl && (
            <div className="mt-5 break-all rounded-lg border border-ink-600 bg-ink-900 p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-ink-300">
                No email service is configured yet, so here&apos;s your reset link:
              </p>
              <Link href={resetUrl} className="focus-ring text-sm text-gold-400 hover:text-gold-300">
                {typeof window !== 'undefined' ? `${window.location.origin}${resetUrl}` : resetUrl}
              </Link>
            </div>
          )}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {error && (
            <div role="alert" className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-300">
              {error}
            </div>
          )}
          <Input
            id="email"
            label="Email"
            required
            type="email"
            autoComplete="email"
            placeholder="gamer@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit" disabled={submitting} variant="primary" size="lg" className="w-full">
            {submitting ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      )}
    </AuthShell>
  );
}
