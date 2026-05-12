import { createContext, PropsWithChildren, useContext, useEffect, useMemo, useState } from 'react';

import { clearAuthSession, getAuthSession, saveAuthSession } from '../storage';
import { AuthCredentials, AuthErrorCode, AuthSession, AuthToken, AuthUser } from '../types';

type AuthContextValue = {
  token: AuthToken | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAuthLoading: boolean;
  errorCode: AuthErrorCode | null;
  login: (credentials: AuthCredentials) => Promise<void>;
  register: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  setSession: (session: AuthSession | null) => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: PropsWithChildren) {
  const [token, setToken] = useState<AuthToken | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [errorCode, setErrorCode] = useState<AuthErrorCode | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function restoreSession() {
      const storedSession = await getAuthSession();

      if (!isMounted) {
        return;
      }

      setToken(storedSession?.token ?? null);
      setUser(storedSession?.user ?? null);
      setIsAuthLoading(false);
    }

    void restoreSession();

    return () => {
      isMounted = false;
    };
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      token,
      user,
      isAuthenticated: Boolean(token),
      isAuthLoading,
      errorCode,
      login: async (_credentials) => {
        setErrorCode(AuthErrorCode.NotImplemented);
      },
      register: async (_credentials) => {
        setErrorCode(AuthErrorCode.NotImplemented);
      },
      logout: async () => {
        await clearAuthSession();
        setToken(null);
        setUser(null);
        setErrorCode(null);
      },
      setSession: async (session) => {
        if (!session) {
          await clearAuthSession();
          setToken(null);
          setUser(null);
          return;
        }

        await saveAuthSession(session);
        setToken(session.token);
        setUser(session.user ?? null);
        setErrorCode(null);
      },
      clearError: () => {
        setErrorCode(null);
      },
    }),
    [errorCode, isAuthLoading, token, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
