
import React from 'react';

const Header: React.FC = () => {
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
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 bg-gray-800 rounded-full overflow-hidden">
            <img 
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-xs mt-1">LinkAnon28</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
