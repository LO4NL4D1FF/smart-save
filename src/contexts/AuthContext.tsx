
import React, { createContext, useContext, useState, useEffect } from 'react';

type User = {
  id: string;
  firstName: string;
  lastName?: string;
  username: string;
  avatar?: string;
};

type AuthContextType = {
  user: User | null;
  login: (firstName: string, username: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, username: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user in localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('smartsave_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (firstName: string, username: string, password: string) => {
    // This is a mock login - in a real app, this would validate against a backend
    if (!username || !password) {
      throw new Error('Username and password are required');
    }

    // In a real app, this would be a server response
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      firstName,
      username,
      avatar: undefined
    };

    // Store user in localStorage (in a real app, you'd store tokens)
    localStorage.setItem('smartsave_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const signup = async (firstName: string, lastName: string, username: string, password: string) => {
    // This is a mock signup - in a real app, this would create a user in the backend
    if (!firstName || !username || !password) {
      throw new Error('First name, username and password are required');
    }

    // In a real app, this would be a server response
    const mockUser: User = {
      id: Math.random().toString(36).substring(2, 9),
      firstName,
      lastName,
      username,
      avatar: undefined
    };

    // Store user in localStorage (in a real app, you'd store tokens)
    localStorage.setItem('smartsave_user', JSON.stringify(mockUser));
    setUser(mockUser);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('smartsave_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
