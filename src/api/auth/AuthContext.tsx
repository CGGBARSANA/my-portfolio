/* eslint-disable react-hooks/set-state-in-effect */
// context/AuthContext.tsx
'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  clearAuthRedirectMessage,
  clearStoredAuthSession,
  getStoredToken,
  getStoredUser,
  persistAuthSession,
} from '@/lib/auth';
import { getPostLoginRedirectPath } from '@/lib/userRole';

interface UserAccess {
  UserID: number;
  UserAccess: string;
  Module: string;
}

export interface TenantUsers {
  CreatedAt: Date | null;
  IsActive: number;
  TenantID: number;
  UserID?: number;
  UserName: string;
  UserPassword: string;
  UserRole: number;
  access: UserAccess[];
}

interface AuthContextType {
  user: TenantUsers | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
//   hasAccess: (module: string, accessLevel?: string) => boolean;
  hasModuleAccess: (module: string) => boolean;
  isAdmin: () => boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';

function normalizeUser(user: unknown): TenantUsers | null {
  if (!user || typeof user !== 'object') {
    return null;
  }

  const record = user as Record<string, unknown>;
  const userId = Number(record.UserID);
  const email = typeof record.UserName === 'string' ? record.UserName : '';
  const userRole = Number(record.UserRole);

  if (!Number.isFinite(userId) || !email || !Number.isFinite(userRole)) {
    return null;
  }

  const rawAccess = Array.isArray(record.access) ? record.access : [];
  const access = rawAccess
    .map((entry) => {
      if (!entry || typeof entry !== 'object') {
        return null;
      }

      const raw = entry as Record<string, unknown>;
      const accessUserId = Number(raw.UserID);
      const moduleName = typeof raw.Module === 'string' ? raw.Module : null;
      const userAccess = typeof raw.UserAccess === 'string' ? raw.UserAccess : null;

      if (!Number.isFinite(accessUserId) || !moduleName || !userAccess) {
        return null;
      }

      return {
        UserID: accessUserId,
        Module: moduleName,
        UserAccess: userAccess,
      };
    })
    .filter((entry): entry is UserAccess => entry !== null);

  return {
    UserID: userId,
    UserName: email,
    UserRole: userRole,
    CreatedAt: record.CreatedAt ? new Date(String(record.CreatedAt)) : null,
    IsActive: Number(record.IsActive) || 0,
    TenantID: Number(record.TenantID) || 0,
    UserPassword: '', // Never store password in client state
    // UserTypeName:
    //   typeof record.UserTypeName === 'string' ? record.UserTypeName : null,
    access,
  };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<TenantUsers | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  // Handle mounting
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const savedToken = getStoredToken();
    const savedUser = normalizeUser(getStoredUser<unknown>());

    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    } else if (savedToken || savedUser) {
      clearStoredAuthSession();
    }

    setLoading(false);
  }, [mounted]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Login failed');
      }

      const data = await res.json();
      const normalizedUser = normalizeUser(data.user);
      if (!normalizedUser) {
        throw new Error('Invalid login response');
      }
      
      setToken(data.token);
      setUser(normalizedUser);
      persistAuthSession(data.token, normalizedUser);

      router.push(
        getPostLoginRedirectPath(
          normalizedUser.UserRole,
          normalizedUser.TenantID,
        ),
      );
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    clearStoredAuthSession();
    clearAuthRedirectMessage();

    router.push('/login');
  };

  const isAdmin = () => {
    return (
      user?.UserRole === 0
    );
  };

//   const accessRank = (level: string | undefined) => {
//     switch ((level ?? "").toLowerCase()) {
//       case "read":
//         return 1;
//       case "write":
//         return 2;
//       case "delete":
//         return 3;
//       case "admin":
//         return 4;
//       default:
//         return 0;
//     }
//   };

//   const hasAccess = (module: string, accessLevel?: string) => {
//     if (!user) return false;
    
//     // Admin has access to everything
//     if (isAdmin()) return true;

//     if (!accessLevel) {
//       return user.access?.some(a => a.Module === module) || false;
//     }

//     const requiredRank = accessRank(accessLevel);
//     return (
//       user.access?.some(
//         (a) => a.Module === module && accessRank(a.UserAccess) >= requiredRank
//       ) || false
//     );
//   };

  const hasModuleAccess = (module: string) => {
    if (!user) return false;
    if (isAdmin()) return true;
    return user.access?.some(a => a.Module === module) || false;
  };

  // Don't render until mounted to avoid hydration issues
  if (!mounted) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token,
        // hasAccess,
        hasModuleAccess,
        isAdmin,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
