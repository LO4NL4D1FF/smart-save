
import React, { useState } from 'react';
import Header from '@/components/Header';
import DashboardCard from '@/components/DashboardCard';
import { Users, User, Bell, Receipt, PiggyBank, ChartBar, Wallet, DollarSign } from 'lucide-react';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  // State to track notifications
  const [hasActivityNotification, setHasActivityNotification] = useState(true);
  const [hasReminderNotification, setHasReminderNotification] = useState(true);
  
  // Handlers for card clicks
  const handleCreateGroup = () => {
    toast.success("Create a group feature coming soon!");
  };
  
  const handleSaveOnYourOwn = () => {
    toast.success("Individual savings feature coming soon!");
  };
  
  const handleRecentActivities = () => {
    setHasActivityNotification(false);
    toast.info("Viewing recent activities");
  };
  
  const handleReminders = () => {
    setHasReminderNotification(false);
    toast.info("Viewing reminders");
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#5D7D41] mb-2">Welcome Back</h1>
          <p className="text-gray-600">Track your savings and monitor group contributions</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First row */}
          <DashboardCard 
            title="Create A Group" 
            subtitle="Start saving together with friends & family" 
            Icon={Users}
            onClick={handleCreateGroup}
          />
          
          <DashboardCard 
            title="Recent Activities" 
            subtitle="View your latest financial activities" 
            Icon={Receipt}
            hasNotification={hasActivityNotification}
            onClick={handleRecentActivities}
          />
          
          {/* Second row */}
          <DashboardCard 
            title="Personal Savings" 
            subtitle="Track your individual saving goals" 
            Icon={PiggyBank}
            onClick={handleSaveOnYourOwn}
          />
          
          <DashboardCard 
            title="Payments Due" 
            subtitle="View upcoming contribution deadlines" 
            Icon={Bell}
            hasNotification={hasReminderNotification}
            onClick={handleReminders}
          />
        </div>
        
        {/* Financial stats section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-white shadow-sm border-[#5D7D41]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Total Savings</h3>
                <Wallet className="h-6 w-6 text-[#5D7D41]" />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#5D7D41]">$2,450.00</p>
                <span className="text-sm text-green-600 flex items-center">
                  +5.2% 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M12 5L20 13L18.6 14.4L13 8.8V19H11V8.8L5.4 14.4L4 13L12 5Z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border-[#5D7D41]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Contributions</h3>
                <DollarSign className="h-6 w-6 text-[#5D7D41]" />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#5D7D41]">$750.00</p>
                <span className="text-sm text-green-600 flex items-center">
                  +2.3% 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M12 5L20 13L18.6 14.4L13 8.8V19H11V8.8L5.4 14.4L4 13L12 5Z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white shadow-sm border-[#5D7D41]/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-800">Performance</h3>
                <ChartBar className="h-6 w-6 text-[#5D7D41]" />
              </div>
              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#5D7D41]">85%</p>
                <span className="text-sm text-green-600 flex items-center">
                  +1.8% 
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-1">
                    <path d="M12 5L20 13L18.6 14.4L13 8.8V19H11V8.8L5.4 14.4L4 13L12 5Z" fill="currentColor"/>
                  </svg>
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
