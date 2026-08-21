'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      {error && (
        <div role="alert" className="rounded-lg border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}
      <Input
        id="username"
        label="Username"
        required
        type="text"
        autoComplete="username"
        placeholder="Gamer123"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
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
      <Input
        id="password"
        label="Password"
        required
        type="password"
        autoComplete="new-password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        hint="At least 8 characters, with uppercase, lowercase, a number, and a symbol."
      />
      <Button type="submit" disabled={submitting} variant="primary" size="lg" className="w-full">
        {submitting ? 'Creating Account...' : 'Create Account'}
      </Button>
    </form>
  );
}
