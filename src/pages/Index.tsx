
import React, { useState } from 'react';
import Header from '@/components/Header';
import DashboardCard from '@/components/DashboardCard';
import { Users, User, Bell, Receipt } from 'lucide-react';
import { toast } from 'sonner';

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
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Header />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First row */}
          <DashboardCard 
            title="Create A Group" 
            subtitle="All group members should be respected" 
            Icon={Users}
            onClick={handleCreateGroup}
          />
          
          <DashboardCard 
            title="Recent Activities" 
            subtitle="See all recent activities" 
            Icon={Receipt}
            hasNotification={hasActivityNotification}
            onClick={handleRecentActivities}
          />
          
          {/* Second row */}
          <DashboardCard 
            title="Save On Your Own" 
            subtitle="Achieve Your Goals" 
            Icon={User}
            onClick={handleSaveOnYourOwn}
          />
          
          <DashboardCard 
            title="Reminders" 
            subtitle="View the deadlines of payments" 
            Icon={Bell}
            hasNotification={hasReminderNotification}
            onClick={handleReminders}
          />
        </div>
        
        {/* Placeholder boxes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-smart-gray rounded-lg h-48"></div>
          <div className="bg-smart-gray rounded-lg h-48"></div>
          <div className="bg-smart-gray rounded-lg h-48"></div>
        </div>
      </main>
    </div>
  );
};

export default Index;
