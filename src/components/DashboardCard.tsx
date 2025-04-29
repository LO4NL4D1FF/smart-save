
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
      className={`relative overflow-hidden rounded-xl border transition-all duration-300 cursor-pointer
        ${isActive 
          ? 'bg-gradient-to-br from-[#5D7D41] to-[#6E8E52] text-white border-transparent shadow-md' 
          : 'bg-white border-gray-100 hover:border-[#5D7D41]/30 hover:shadow-md'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5D7D41]/5 rounded-bl-full transform translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#5D7D41]/5 rounded-tr-full transform -translate-x-6 translate-y-6"></div>
      
      <div className="p-6 relative z-10">
        <div className="flex justify-between items-start">
          <div className="max-w-[70%]">
            <h3 className={`text-xl font-semibold mb-1.5 transition-colors duration-200
              ${isActive ? 'text-white' : isHovered ? 'text-[#5D7D41]' : 'text-gray-800'}`}>
              {title}
            </h3>
            <p className={`text-sm transition-colors duration-200
              ${isActive ? 'text-white/80' : isHovered ? 'text-gray-600' : 'text-gray-500'}`}>
              {subtitle}
            </p>
          </div>
          
          <div className="relative">
            <div className={`p-3 rounded-full transition-all duration-200
              ${isActive 
                ? 'bg-white/20' 
                : isHovered 
                  ? 'bg-[#5D7D41]/20' 
                  : 'bg-[#5D7D41]/10'}`}>
              <Icon 
                size={24} 
                className={`transition-colors duration-200
                ${isActive 
                  ? 'text-white' 
                  : 'text-[#5D7D41]'}`} 
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
