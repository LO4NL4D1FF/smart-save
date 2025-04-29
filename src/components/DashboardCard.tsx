
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
      className={`relative overflow-hidden rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-300 cursor-pointer hover:shadow-md
        ${isActive ? 'bg-[#5D7D41] text-white' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#5D7D41]/5 rounded-bl-full transform translate-x-8 -translate-y-8"></div>
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div className="max-w-[70%]">
            <h3 className={`text-xl font-semibold mb-1 transition-colors duration-200
              ${isActive || isHovered ? 'text-[#5D7D41]' : 'text-gray-800'}`}>
              {title}
            </h3>
            <p className={`text-sm transition-colors duration-200
              ${isActive || isHovered ? 'text-gray-600' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          </div>
          
          <div className="relative">
            <div className={`p-3 rounded-full bg-[#5D7D41]/10 transition-all duration-200
              ${isActive || isHovered ? 'bg-[#5D7D41]/20' : ''}`}>
              <Icon 
                size={24} 
                className={`transition-colors duration-200
                ${isActive || isHovered ? 'text-[#5D7D41]' : 'text-[#5D7D41]'}`} 
              />
            </div>
            {hasNotification && (
              <div className="absolute -top-1 -right-1">
                <NotificationDot active={hasNotification} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;
