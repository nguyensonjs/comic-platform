'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AUTH_KEY = 'netcomic_logged_in';

type AuthContextType = {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isReady: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

function getStoredAuth(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(AUTH_KEY) === 'true';
  } catch {
    return false;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsLoggedIn(getStoredAuth());
    setIsReady(true);
  }, []);

  const login = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsLoggedIn(true);
    }
  }, []);

  const logout = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(AUTH_KEY);
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, isReady }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
