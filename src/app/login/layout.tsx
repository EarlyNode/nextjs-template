import { redirect } from 'next/navigation';

import { getUserId } from '@/features/user-authentication/user-authentication-server-helpers';

async function Layout({ children }: { children: React.ReactNode }) {
  const userId = await getUserId();
  if (userId) {
    redirect('/');
  }

  return children;
}

export default Layout;
