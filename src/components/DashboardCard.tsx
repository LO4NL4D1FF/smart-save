
import React, { useState } from 'react';
import NotificationDot from './NotificationDot';
import { LucideIcon } from 'lucide-react';

interface DashboardCardProps {
  title: string;
  subtitle: string;
  Icon: LucideIcon;
  hasNotification?: boolean;
  onClick?: () => void;
  isActive?: boolean;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  Icon,
  hasNotification = false,
  onClick,
  isActive = false
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`dashboard-card cursor-pointer ${isActive ? 'bg-smart-black' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`card-title ${isActive || isHovered ? 'text-smart-white' : ''}`}>{title}</h3>
          <p className={`card-subtitle ${isActive || isHovered ? 'text-gray-300' : ''}`}>{subtitle}</p>
        </div>
        <div className="relative">
          <Icon 
            size={48} 
            className={`${isActive || isHovered ? 'text-white' : 'text-black'} transition-colors duration-200`} 
          />
          <div className="absolute top-0 right-0">
            <NotificationDot active={hasNotification} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
