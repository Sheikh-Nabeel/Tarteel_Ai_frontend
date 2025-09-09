import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiSettings, FiMenu } from 'react-icons/fi';
import { IoMdNotifications } from 'react-icons/io';
import { useTheme } from '../../contexts/ThemeContext';

const TopNav = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  
  // Get page title based on current route
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'Home';
      case '/quran':
        return 'Holy Quran';
      case '/hadith':
        return 'Hadith';
      case '/ibadat':
        return 'Ibadat';
      case '/qibla':
        return 'Qibla Direction';
      case '/login':
        return 'Login';
      case '/signup':
        return 'Sign Up';
      case '/forgot-password':
        return 'Forgot Password';
      case '/create-new-password':
        return 'Create New Password';
      default:
        if (location.pathname.startsWith('/quran/')) {
          return 'Surah Details';
        }
        return 'Tarteel AI';
    }
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleMenuClick = () => {
    // Could implement sidebar or menu functionality
    console.log('Menu clicked');
  };

  return (
    <div 
      className="sticky top-0 left-0 right-0 shadow-md z-40"
      style={{
        backgroundColor: theme.colors.background,
        borderColor: theme.colors.border
      }}
    >
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Menu or Back button */}
        <div className="flex items-center">
          <button 
            onClick={handleMenuClick}
            className="p-2 rounded-full transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: theme.colors.backgroundSecondary }}
          >
            <FiMenu className="text-xl" style={{ color: theme.colors.text }} />
          </button>
        </div>
        
        {/* Center - Page Title */}
        <div className="flex-1 text-center">
          <h1 
            className="text-lg font-semibold"
            style={{ color: theme.colors.text }}
          >
            {getPageTitle()}
          </h1>
        </div>
        
        {/* Right side - User actions */}
        <div className="flex items-center space-x-2">
          <button 
            onClick={handleNotificationClick}
            className="p-2 rounded-full relative transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: theme.colors.backgroundSecondary }}
          >
            <IoMdNotifications className="text-xl" style={{ color: theme.colors.text }} />
            {/* Notification badge */}
            <span className="absolute -top-1 -right-1 bg-[#25D162] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <button 
            onClick={handleProfileClick}
            className="p-2 rounded-full transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: theme.colors.backgroundSecondary }}
          >
            <FiUser className="text-xl" style={{ color: theme.colors.text }} />
          </button>
          
          <button 
            onClick={handleSettingsClick}
            className="p-2 rounded-full transition-all duration-200 hover:opacity-80"
            style={{ backgroundColor: theme.colors.backgroundSecondary }}
          >
            <FiSettings className="text-xl" style={{ color: theme.colors.text }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;