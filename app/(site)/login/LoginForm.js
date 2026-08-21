'use client';
import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

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
      <div className="flex flex-col gap-2">
        <Input
          id="password"
          label="Password"
          required
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Link href="/forgot-password" className="focus-ring self-end text-xs text-gold-400 hover:text-gold-300">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" disabled={submitting} variant="primary" size="lg" className="w-full">
        {submitting ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
}
