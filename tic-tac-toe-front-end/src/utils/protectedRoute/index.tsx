'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token');

    if (!isAuthenticated) {
      router.push('/sign-in');
    }else{
      router.push('/tic-tac-toe-board');
    }
  }, [router]);

  return <>{children}</>;
};

export default ProtectedRoute;
