
import React from 'react';

interface NotificationDotProps {
  active?: boolean;
}

const NotificationDot: React.FC<NotificationDotProps> = ({ active = false }) => {
  if (!active) return null;
  
  return (
    <div className="absolute -top-1 -right-1 w-3 h-3 bg-smart-red rounded-full animate-pulse shadow-lg" />
  );
};

export default NotificationDot;
