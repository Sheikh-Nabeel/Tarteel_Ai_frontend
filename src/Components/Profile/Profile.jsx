import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FiUser, FiMail, FiPhone, FiMapPin, FiCalendar, FiBookOpen, FiClock, FiHeart, FiEdit3 } from 'react-icons/fi';

const Profile = () => {
  const theme = useTheme();

  const userStats = [
    {
      icon: FiBookOpen,
      label: 'Surahs Read',
      value: '45',
      color: '#3B82F6'
    },
    {
      icon: FiClock,
      label: 'Prayer Streak',
      value: '12 days',
      color: theme.colors.primary
    },
    {
      icon: FiHeart,
      label: 'Favorite Duas',
      value: '8',
      color: '#EF4444'
    }
  ];

  const profileInfo = [
    {
      icon: FiMail,
      label: 'Email',
      value: 'user@tarteelai.com'
    },
    {
      icon: FiPhone,
      label: 'Phone',
      value: '+1 (555) 123-4567'
    },
    {
      icon: FiMapPin,
      label: 'Location',
      value: 'New York, USA'
    },
    {
      icon: FiCalendar,
      label: 'Joined',
      value: 'January 2024'
    }
  ];

  return (
    <div 
      className="min-h-screen pt-16 pb-20 px-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-md mx-auto">
        {/* Profile Header */}
        <div 
          className="p-6 rounded-lg mb-6 text-center"
          style={{ backgroundColor: theme.colors.cardBg }}
        >
          {/* Profile Picture */}
          <div className="relative inline-block mb-4">
            <div
              className="w-24 h-24 rounded-full flex items-center justify-center mx-auto"
              style={{ backgroundColor: `${theme.colors.primary}20` }}
            >
              <FiUser size={40} style={{ color: theme.colors.primary }} />
            </div>
            <button
              className="absolute bottom-0 right-0 p-2 rounded-full shadow-lg"
              style={{
                backgroundColor: theme.colors.primary,
                color: theme.colors.white
              }}
            >
              <FiEdit3 size={14} />
            </button>
          </div>

          {/* User Info */}
          <h2
            className="text-xl font-bold mb-1"
            style={{ color: theme.colors.text }}
          >
            Ahmed Hassan
          </h2>
          <p
            className="text-sm"
            style={{ color: theme.colors.textSecondary }}
          >
            Devoted Muslim • Quran Student
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {userStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="p-4 rounded-lg text-center"
                style={{ backgroundColor: theme.colors.cardBg }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2"
                  style={{ backgroundColor: `${stat.color}20` }}
                >
                  <IconComponent size={20} style={{ color: stat.color }} />
                </div>
                <p
                  className="text-lg font-bold"
                  style={{ color: theme.colors.text }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Profile Information */}
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: theme.colors.cardBg }}
        >
          <h3
            className="text-lg font-semibold mb-4"
            style={{ color: theme.colors.text }}
          >
            Personal Information
          </h3>
          <div className="space-y-4">
            {profileInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="flex items-center space-x-3">
                  <div
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: theme.colors.backgroundSecondary }}
                  >
                    <IconComponent
                      size={18}
                      style={{ color: theme.colors.textSecondary }}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className="text-sm font-medium"
                      style={{ color: theme.colors.text }}
                    >
                      {info.label}
                    </p>
                    <p
                      className="text-sm"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {info.value}
                    </p>
                  </div>
                  <button
                    className="p-1"
                    style={{ color: theme.colors.primary }}
                  >
                    <FiEdit3 size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.white
            }}
          >
            Edit Profile
          </button>
          <button
            className="w-full py-3 px-4 rounded-lg font-medium border transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: 'transparent',
              color: theme.colors.text,
              borderColor: theme.colors.border
            }}
          >
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;