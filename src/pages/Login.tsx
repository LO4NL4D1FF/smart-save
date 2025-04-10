
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Login = () => {
  const [firstName, setFirstName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !username || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(firstName, username, password);
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success('Login with Google successful!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to login with Google');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-smart-black flex items-center justify-center">
              <span className="text-olive-green text-4xl font-bold">$</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="firstName" className="block text-smart-black font-medium">
              First Name:
            </label>
            <Input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
              className="border-olive-green"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="username" className="block text-smart-black font-medium">
              Username:
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Link28"
              className="border-olive-green"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="password" className="block text-smart-black font-medium">
              Password:
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="border-olive-green pr-10"
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="text-right">
            <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">
              Forget password?
            </Link>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-olive-green hover:bg-olive-green/90 text-white font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>

          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="flex-shrink mx-4 text-gray-400">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          
          <Button 
            type="button"
            className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 font-semibold flex items-center justify-center gap-2"
            onClick={handleGoogleLogin}
          >
            <svg width="20" height="20" viewBox="0 0 20 20">
              <path d="M19.8 10.2a11.47 11.47 0 0 0-.17-2H10v3.8h5.5a4.77 4.77 0 0 1-2.04 3.1v2.58h3.3c1.93-1.77 3.04-4.4 3.04-7.48z" fill="#4285F4" />
              <path d="M10 20c2.75 0 5.07-.91 6.76-2.45l-3.3-2.56a5.99 5.99 0 0 1-8.92-3.15H1.14v2.64A10 10 0 0 0 10 20z" fill="#34A853" />
              <path d="M4.54 11.84a6.1 6.1 0 0 1 0-3.89V5.31H1.14a10.01 10.01 0 0 0 0 9.38l3.4-2.85z" fill="#FBBC05" />
              <path d="M10 3.96c1.5 0 2.85.51 3.92 1.52l2.92-2.9A10 10 0 0 0 10 0a10 10 0 0 0-8.86 5.31l3.4 2.64A5.99 5.99 0 0 1 10 3.96z" fill="#EA4335" />
            </svg>
            Continue with Google
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <span className="text-smart-black">I don't have an account? </span>
          <Link to="/signup" className="text-olive-green hover:underline font-medium">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
