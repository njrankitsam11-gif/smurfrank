import Link from 'next/link';
import { Suspense } from 'react';
import AuthShell from '../../../components/auth/AuthShell';
import LoginForm from './LoginForm';

export const metadata = {
  title: 'Sign In | SmurfRank',
  description: 'Log in to your SmurfRank account to manage your gaming listings and purchases.',
};

export default function LoginPage() {
  return (
    <AuthShell
      title="Welcome Back"
      footer={
        <>
          New here?{' '}
          <Link href="/register" className="focus-ring font-bold text-gold-400 hover:text-gold-300">
            Create an account
          </Link>
        </>
      }
    >
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
