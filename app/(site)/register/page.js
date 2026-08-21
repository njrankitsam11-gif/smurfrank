import Link from 'next/link';
import AuthShell from '../../../components/auth/AuthShell';
import RegisterForm from './RegisterForm';

export const metadata = {
  title: 'Register | SmurfRank',
  description: 'Join SmurfRank to buy premium ranked accounts and boosting services.',
};

export default function RegisterPage() {
  return (
    <AuthShell
      title="Join the Elite"
      footer={
        <>
          Already have an account?{' '}
          <Link href="/login" className="focus-ring font-bold text-gold-400 hover:text-gold-300">
            Sign in
          </Link>
        </>
      }
    >
      <RegisterForm />
    </AuthShell>
  );
}
