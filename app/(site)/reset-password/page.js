import { Suspense } from 'react';
import AuthShell from '../../../components/auth/AuthShell';
import ResetPasswordForm from './ResetPasswordForm';

export const metadata = {
  title: 'Reset Password | SmurfRank',
};

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Set New Password">
      <Suspense fallback={null}>
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  );
}
