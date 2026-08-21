import { getServerSession } from 'next-auth';
import { authOptions } from './authOptions';

export async function requireAdminSession() {
  const session = await getServerSession(authOptions);
  if (!session?.user || session.user.role !== 'admin') {
    return null;
  }
  return session;
}
