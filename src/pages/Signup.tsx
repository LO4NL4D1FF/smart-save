
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, X } from 'lucide-react';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { signup } = useAuth();
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
      await signup(firstName, lastName, username, password);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md relative">
        <Link to="/login" className="absolute top-4 right-4">
          <X className="h-6 w-6" />
        </Link>
        
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-smart-black flex items-center justify-center">
              <span className="text-smart-green text-4xl font-bold">$</span>
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
              className="border-smart-green"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="lastName" className="block text-smart-black font-medium">
              Last Name:
            </label>
            <Input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
              className="border-smart-green"
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
              className="border-smart-green"
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
                className="border-smart-green pr-10"
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
          
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-smart-black font-medium">
              Confirm Password:
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="border-smart-green pr-10"
              />
              <button 
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="flex gap-4">
            <Button 
              type="submit" 
              className="flex-1 bg-olive-green hover:bg-olive-green/90 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "SIGN UP"}
            </Button>
            
            <Link to="/login" className="flex-1">
              <Button 
                type="button" 
                variant="outline"
                className="w-full border-olive-green text-olive-green hover:bg-olive-green/10"
              >
                Log In
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
