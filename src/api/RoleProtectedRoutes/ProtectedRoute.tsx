// components/ProtectedRoute.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/api/auth/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredModule?: string;
  requiredAccess?: string;
}

export function ProtectedRoute({ 
  children, 
  requiredModule, 
  requiredAccess 
}: ProtectedRouteProps) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  useEffect(() => {
    if (!loading && isAuthenticated && requiredModule) {
   
    }
  }, [isAuthenticated, loading, requiredModule, requiredAccess, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }



  return <>{children}</>;
}