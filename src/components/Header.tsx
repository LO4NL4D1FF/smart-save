
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { LogOut, Settings, User, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsSheetOpen(false);
    toast.success('You have been logged out');
  };

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <header className="bg-white border-b border-gray-100 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left section */}
        <div className="flex-1 flex items-center">
          {/* Mobile menu button would go here */}
        </div>
        
        {/* Logo */}
        <div className="flex items-center justify-center flex-1">
          <h1 className="text-3xl font-bold flex items-center">
            <span className="text-gray-800">SMART</span>
            <div className="mx-1 relative">
              <div className="w-10 h-10 rounded-full bg-[#5D7D41]/10 flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-[#5D7D41]" />
              </div>
            </div>
            <span className="text-[#5D7D41]">SAVE</span>
          </h1>
        </div>
        
        {/* User Profile */}
        <div className="flex items-center justify-end flex-1">
          <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <div className="flex items-center space-x-3 cursor-pointer bg-gray-50 py-1.5 px-3 rounded-full hover:bg-gray-100 transition-colors">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium text-gray-700">
                    {user?.firstName || 'Guest'}
                  </p>
                  <p className="text-xs text-gray-500">
                    @{user?.username || 'guest'}
                  </p>
                </div>
                <Avatar className="w-8 h-8 border border-gray-200">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.username} />
                  ) : (
                    <AvatarFallback className="bg-[#5D7D41] text-white">
                      {user ? getInitials(user.firstName) : 'G'}
                    </AvatarFallback>
                  )}
                </Avatar>
              </div>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>User Profile</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-6">
                <div className="flex flex-col items-center gap-2 py-4">
                  <Avatar className="w-20 h-20 border-2 border-[#5D7D41]/20">
                    {user?.avatar ? (
                      <AvatarImage src={user.avatar} alt={user.username} />
                    ) : (
                      <AvatarFallback className="bg-[#5D7D41] text-white text-xl">
                        {user ? getInitials(user.firstName) : 'G'}
                      </AvatarFallback>
                    )}
                  </Avatar>
                  <h3 className="text-lg font-semibold mt-2">
                    {user?.firstName} {user?.lastName}
                  </h3>
                  <p className="text-sm text-muted-foreground">@{user?.username}</p>
                </div>
                
                <div className="space-y-2 mt-4">
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Profile settings coming soon')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={() => toast.info('Account settings coming soon')}>
                    <Settings className="mr-2 h-4 w-4" />
                    Account Settings
                  </Button>
                  <Button 
                    variant="destructive" 
                    className="w-full justify-start mt-8" 
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Log Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
