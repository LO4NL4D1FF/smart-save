
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, X, Upload, DollarSign, Wallet } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState<string | null>(null);
  
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!firstName || !lastName || !username || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await signup(firstName, lastName, username, password, avatar);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    try {
      await loginWithGoogle();
      toast.success('Signed up with Google successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign up with Google');
    }
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setAvatar(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-white to-gray-50">
      {/* Financial illustration side */}
      <div className="hidden md:flex md:w-1/2 bg-[#5D7D41]/10 p-12 items-center justify-center">
        <div className="max-w-md text-center">
          <div className="mb-6">
            <div className="w-24 h-24 rounded-full bg-[#5D7D41]/20 flex items-center justify-center mx-auto mb-4">
              <Wallet className="h-12 w-12 text-[#5D7D41]" />
            </div>
            <h2 className="text-3xl font-bold text-[#5D7D41] mb-2">Smart Financial Planning</h2>
            <p className="text-gray-600">Take control of your finances with our comprehensive tools and insights.</p>
          </div>
          <div className="space-y-4 text-left">
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#5D7D41]/10 flex items-center justify-center mr-3">
                <DollarSign className="h-5 w-5 text-[#5D7D41]" />
              </div>
              <div>
                <h3 className="font-medium">Easy Tracking</h3>
                <p className="text-sm text-gray-500">Monitor your expenses effortlessly</p>
              </div>
            </div>
            <div className="flex items-center p-3 bg-white rounded-lg shadow-sm">
              <div className="w-10 h-10 rounded-full bg-[#5D7D41]/10 flex items-center justify-center mr-3">
                <Wallet className="h-5 w-5 text-[#5D7D41]" />
              </div>
              <div>
                <h3 className="font-medium">Smart Budgeting</h3>
                <p className="text-sm text-gray-500">Create and manage your budgets with ease</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Signup form */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md relative">
          <Link to="/login" className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </Link>
          
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#5D7D41] to-[#8AAF5E] flex items-center justify-center">
                <DollarSign className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create your account</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex justify-center mb-4">
              <div className="relative">
                <Avatar className="w-24 h-24 cursor-pointer border-2 border-[#5D7D41]/30">
                  {avatar ? (
                    <AvatarImage src={avatar} alt="User avatar" />
                  ) : (
                    <AvatarFallback className="bg-gray-100 text-[#5D7D41]">
                      <Upload size={32} />
                    </AvatarFallback>
                  )}
                </Avatar>
                <input
                  type="file"
                  id="avatar"
                  className="hidden"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
                <label
                  htmlFor="avatar"
                  className="absolute bottom-0 right-0 bg-[#5D7D41] rounded-full p-1 text-white cursor-pointer shadow-md hover:bg-[#4A6633] transition-colors"
                >
                  <Upload size={16} />
                </label>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-medium">
                  First Name
                </label>
                <Input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="John"
                  className="border-gray-200 focus:border-[#5D7D41] focus:ring focus:ring-[#5D7D41]/20"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-medium">
                  Last Name
                </label>
                <Input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Doe"
                  className="border-gray-200 focus:border-[#5D7D41] focus:ring focus:ring-[#5D7D41]/20"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="username" className="block text-gray-700 text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="smartinvestor"
                className="border-gray-200 focus:border-[#5D7D41] focus:ring focus:ring-[#5D7D41]/20"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border-gray-200 focus:border-[#5D7D41] focus:ring focus:ring-[#5D7D41]/20 pr-10"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" 
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-medium">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="border-gray-200 focus:border-[#5D7D41] focus:ring focus:ring-[#5D7D41]/20 pr-10"
                />
                <button 
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600" 
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#5D7D41] to-[#8AAF5E] hover:from-[#4A6633] hover:to-[#7A9F4E] text-white font-semibold py-2.5"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Create Account"}
            </Button>

            <div className="relative flex items-center py-2">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-sm">or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>
            
            <Button 
              type="button"
              className="w-full border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 font-medium flex items-center justify-center gap-2 py-2.5"
              onClick={handleGoogleSignup}
            >
              <svg width="18" height="18" viewBox="0 0 20 20">
                <path d="M19.8 10.2a11.47 11.47 0 0 0-.17-2H10v3.8h5.5a4.77 4.77 0 0 1-2.04 3.1v2.58h3.3c1.93-1.77 3.04-4.4 3.04-7.48z" fill="#4285F4" />
                <path d="M10 20c2.75 0 5.07-.91 6.76-2.45l-3.3-2.56a5.99 5.99 0 0 1-8.92-3.15H1.14v2.64A10 10 0 0 0 10 20z" fill="#34A853" />
                <path d="M4.54 11.84a6.1 6.1 0 0 1 0-3.89V5.31H1.14a10.01 10.01 0 0 0 0 9.38l3.4-2.85z" fill="#FBBC05" />
                <path d="M10 3.96c1.5 0 2.85.51 3.92 1.52l2.92-2.9A10 10 0 0 0 10 0a10 10 0 0 0-8.86 5.31l3.4 2.64A5.99 5.99 0 0 1 10 3.96z" fill="#EA4335" />
              </svg>
              Google
            </Button>
            
            <div className="mt-6 text-center">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-[#5D7D41] hover:text-[#4A6633] font-medium">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
