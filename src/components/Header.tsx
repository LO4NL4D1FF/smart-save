
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
import { LogOut, Settings, User } from 'lucide-react';
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
    <header className="bg-gray-200 p-4 flex items-center justify-between">
      <div className="flex-1"></div>
      
      {/* Logo */}
      <div className="flex items-center justify-center flex-1">
        <h1 className="text-3xl font-bold flex items-center">
          <span className="text-smart-black">SMART</span>
          <div className="mx-1 relative">
            <div className="w-12 h-12 rounded-full border-2 border-smart-black flex items-center justify-center">
              <span className="text-smart-green text-3xl font-bold">$</span>
            </div>
          </div>
          <span className="text-smart-green">SAVE</span>
        </h1>
      </div>
      
      {/* User Profile */}
      <div className="flex items-center justify-end flex-1">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <div className="flex flex-col items-center cursor-pointer">
              <Avatar className="w-10 h-10 bg-gray-800">
                {user?.avatar ? (
                  <AvatarImage src={user.avatar} alt={user.username} />
                ) : (
                  <AvatarFallback className="bg-olive-green text-white">
                    {user ? getInitials(user.firstName) : 'U'}
                  </AvatarFallback>
                )}
              </Avatar>
              <span className="text-xs mt-1">{user?.username || 'Guest'}</span>
            </div>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>User Profile</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 mt-6">
              <div className="flex flex-col items-center gap-2 py-4">
                <Avatar className="w-20 h-20">
                  {user?.avatar ? (
                    <AvatarImage src={user.avatar} alt={user.username} />
                  ) : (
                    <AvatarFallback className="bg-olive-green text-white text-xl">
                      {user ? getInitials(user.firstName) : 'U'}
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
    </header>
  );
};

export default Header;
