
import React from 'react';

interface NotificationDotProps {
  active?: boolean;
}

const NotificationDot: React.FC<NotificationDotProps> = ({ active = false }) => {
  if (!active) return null;
  
  return (
    <div className="absolute w-3 h-3 bg-smart-red rounded-full animate-pulse" />
  );
};

export default NotificationDot;
