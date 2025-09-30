import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import axios from 'axios';

interface AuthContextType {
  userName: string;
  userId: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  token: string;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userName, setUserName] = useState('');
  const [userId, setUserId] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  const decodeToken = (token: string) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      const isExpired = Date.now() > decoded.exp * 1000;
      return isExpired ? null : decoded;
    } catch {
      return null;
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      const decoded = decodeToken(storedToken);
      if (decoded) {
        setToken(storedToken);
        setUserName(decoded.username || '');
        setUserId(decoded.id || '');
        setEmail(decoded.email || '');
        setRole(decoded.role || '');
        setFirstName(decoded.firstName || '');
        setLastName(decoded.lastName || '');
      } else {
        logout();
      }
    }
  }, []);

  const login = (newToken: string) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    const user = decodeToken(newToken);
    if (user) {
      setUserName(user.username || '');
      setUserId(user.id || '');
      setEmail(user.email || '');
      setRole(user.role || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUserName('');
    setUserId('');
    setEmail('');
    setRole('');
    setFirstName('');
    setLastName('');
  };

  return (
    <AuthContext.Provider value={{
      userName,
      userId,
      email,
      role,
      firstName,
      lastName,
      token,
      login,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };
