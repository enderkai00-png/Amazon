// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import authService, { User, AuthResponse } from '../services/auth.service';

interface AuthContextType {
  user: User | null;
  role: 'client' | 'seller' | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string, role: 'client' | 'seller') => Promise<void>;
  signup: (name: string, email: string, password: string, role: 'client' | 'seller') => Promise<void>;
  logout: () => void;
  switchAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<'client' | 'seller' | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar sesión al iniciar
  useEffect(() => {
    const loadSession = () => {
      try {
        const session = authService.getCurrentSession();
        if (session) {
          setUser(session.user);
          setRole(session.role);
        }
      } catch (error) {
        console.error('Error al cargar sesión:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSession();
  }, []);

  const login = async (email: string, password: string, loginRole: 'client' | 'seller') => {
    try {
      const response: AuthResponse = await authService.login(email, password, loginRole);
      setUser(response.user);
      setRole(response.role);
    } catch (error) {
      throw error;
    }
  };

  const signup = async (name: string, email: string, password: string, signupRole: 'client' | 'seller') => {
    try {
      const response: AuthResponse = await authService.signup(name, email, password, signupRole);
      setUser(response.user);
      setRole(response.role);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setRole(null);
  };

  const switchAccount = () => {
    authService.switchAccount();
    setUser(null);
    setRole(null);
  };

  const value: AuthContextType = {
    user,
    role,
    isAuthenticated: !!user,
    loading,
    login,
    signup,
    logout,
    switchAccount,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
