
import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = 'https://grknunsjidgjhqrnjmuc.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdya251bnNqaWRnamhxcm5qbXVjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMwNDQ4MDAsImV4cCI6MjAyODYyMDgwMH0.YOUR_ANON_KEY'; // Replace with your actual anon key
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  signup: (firstName: string, lastName: string, username: string, password: string, avatar?: string | null) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check for existing user in localStorage and Supabase on mount
  useEffect(() => {
    // Check localStorage first (for development without Supabase)
    const storedUser = localStorage.getItem('smartsave_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }

    // Check Supabase session
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          // Get user profile from Supabase
          supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()
            .then(({ data, error }) => {
              if (!error && data) {
                const supabaseUser: User = {
                  id: session.user.id,
                  firstName: data.first_name || '',
                  lastName: data.last_name || '',
                  username: data.username || session.user.email?.split('@')[0] || '',
                  avatar: data.avatar_url
                };
                setUser(supabaseUser);
                setIsAuthenticated(true);
                localStorage.setItem('smartsave_user', JSON.stringify(supabaseUser));
              } else if (session.user.email) {
                // If no profile exists, create minimal user from auth
                const minimalUser: User = {
                  id: session.user.id,
                  firstName: session.user.user_metadata.full_name?.split(' ')[0] || '',
                  lastName: session.user.user_metadata.full_name?.split(' ').slice(1).join(' ') || '',
                  username: session.user.email.split('@')[0] || '',
                  avatar: session.user.user_metadata.avatar_url
                };
                setUser(minimalUser);
                setIsAuthenticated(true);
                localStorage.setItem('smartsave_user', JSON.stringify(minimalUser));
              }
            });
        } else {
          setUser(null);
          setIsAuthenticated(false);
          localStorage.removeItem('smartsave_user');
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (firstName: string, username: string, password: string) => {
    try {
      // Try Supabase login first
      const { data, error } = await supabase.auth.signInWithPassword({
        email: `${username}@example.com`, // Assuming username is used as email
        password,
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Success with Supabase
        return;
      }
    } catch (supabaseError) {
      console.log('Supabase login failed, using mock login:', supabaseError);
      
      // Fallback to mock login for development
      if (!username || !password) {
        throw new Error('Username and password are required');
      }

      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        firstName,
        username,
        avatar: undefined
      };

      localStorage.setItem('smartsave_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  };

  const signup = async (firstName: string, lastName: string, username: string, password: string, avatar?: string | null) => {
    try {
      // Try Supabase signup first
      const { data, error } = await supabase.auth.signUp({
        email: `${username}@example.com`, // For demo purposes
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
            username: username,
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create a profile in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              first_name: firstName,
              last_name: lastName,
              username: username,
              avatar_url: avatar || null,
            },
          ]);

        if (profileError) {
          throw profileError;
        }

        // Success with Supabase
        return;
      }
    } catch (supabaseError) {
      console.log('Supabase signup failed, using mock signup:', supabaseError);
      
      // Fallback to mock signup for development
      if (!firstName || !username || !password) {
        throw new Error('First name, username and password are required');
      }

      const mockUser: User = {
        id: Math.random().toString(36).substring(2, 9),
        firstName,
        lastName,
        username,
        avatar: avatar || undefined
      };

      localStorage.setItem('smartsave_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    }
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin + '/',
        },
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error with Google login:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Try Supabase logout
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Error during Supabase logout:', error);
    }

    // Always remove from localStorage and clear state
    localStorage.removeItem('smartsave_user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, loginWithGoogle, logout, isAuthenticated }}>
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
