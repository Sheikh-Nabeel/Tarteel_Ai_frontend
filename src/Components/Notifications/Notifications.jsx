import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FiBell, FiClock, FiBookOpen, FiHeart, FiSettings } from 'react-icons/fi';

const Notifications = () => {
  const theme = useTheme();

  const notifications = [
    {
      id: 1,
      type: 'prayer',
      title: 'Prayer Time Reminder',
      message: 'Maghrib prayer time is approaching in 10 minutes',
      time: '2 minutes ago',
      icon: FiClock,
      unread: true
    },
    {
      id: 2,
      type: 'quran',
      title: 'Daily Quran Reading',
      message: 'Complete your daily Quran reading goal',
      time: '1 hour ago',
      icon: FiBookOpen,
      unread: true
    },
    {
      id: 3,
      type: 'hadith',
      title: 'Hadith of the Day',
      message: 'New hadith has been added to your collection',
      time: '3 hours ago',
      icon: FiHeart,
      unread: false
    },
    {
      id: 4,
      type: 'system',
      title: 'App Update Available',
      message: 'New features and improvements are ready',
      time: '1 day ago',
      icon: FiSettings,
      unread: false
    },
    {
      id: 5,
      type: 'prayer',
      title: 'Fajr Prayer Reminder',
      message: 'Fajr prayer time was 30 minutes ago',
      time: '2 days ago',
      icon: FiClock,
      unread: false
    }
  ];

  const getNotificationColor = (type) => {
    switch (type) {
      case 'prayer': return theme.colors.primary;
      case 'quran': return '#3B82F6';
      case 'hadith': return '#EF4444';
      case 'system': return '#8B5CF6';
      default: return theme.colors.gray;
    }
  };

  return (
    <div 
      className="min-h-screen pt-16 pb-20 px-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: theme.colors.text }}
          >
            Notifications
          </h1>
          <p style={{ color: theme.colors.textSecondary }}>
            Stay updated with your Islamic activities
          </p>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {notifications.map((notification) => {
            const IconComponent = notification.icon;
            return (
              <div
                key={notification.id}
                className="p-4 rounded-lg border transition-all duration-200 hover:shadow-md"
                style={{
                  backgroundColor: theme.colors.cardBg,
                  borderColor: notification.unread ? theme.colors.primary : theme.colors.border,
                  borderWidth: notification.unread ? '2px' : '1px'
                }}
              >
                <div className="flex items-start space-x-3">
                  {/* Icon */}
                  <div
                    className="p-2 rounded-full flex-shrink-0"
                    style={{ backgroundColor: `${getNotificationColor(notification.type)}20` }}
                  >
                    <IconComponent
                      size={20}
                      style={{ color: getNotificationColor(notification.type) }}
                    />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3
                        className="font-semibold text-sm"
                        style={{ color: theme.colors.text }}
                      >
                        {notification.title}
                      </h3>
                      {notification.unread && (
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                      )}
                    </div>
                    <p
                      className="text-sm mb-2"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {notification.message}
                    </p>
                    <p
                      className="text-xs"
                      style={{ color: theme.colors.gray }}
                    >
                      {notification.time}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mark All as Read Button */}
        <div className="mt-6">
          <button
            className="w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:opacity-90"
            style={{
              backgroundColor: theme.colors.primary,
              color: theme.colors.white
            }}
          >
            Mark All as Read
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;