import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { FiMoon, FiSun, FiBell, FiVolume2, FiGlobe, FiShield, FiHelpCircle, FiLogOut, FiChevronRight } from 'react-icons/fi';

const Settings = () => {
  const theme = useTheme();
  const { toggleTheme } = theme;

  const settingsGroups = [
    {
      title: 'Appearance',
      items: [
        {
          icon: theme.isDarkMode ? FiSun : FiMoon,
          label: 'Theme',
          value: theme.isDarkMode ? 'Dark Mode' : 'Light Mode',
          action: 'toggle',
          toggle: true
        }
      ]
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: FiBell,
          label: 'Prayer Reminders',
          value: 'Enabled',
          action: 'navigate'
        },
        {
          icon: FiVolume2,
          label: 'Sound Settings',
          value: 'Default Adhan',
          action: 'navigate'
        }
      ]
    },
    {
      title: 'General',
      items: [
        {
          icon: FiGlobe,
          label: 'Language',
          value: 'English',
          action: 'navigate'
        },
        {
          icon: FiShield,
          label: 'Privacy & Security',
          value: '',
          action: 'navigate'
        }
      ]
    },
    {
      title: 'Support',
      items: [
        {
          icon: FiHelpCircle,
          label: 'Help & Support',
          value: '',
          action: 'navigate'
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          icon: FiLogOut,
          label: 'Sign Out',
          value: '',
          action: 'logout',
          danger: true
        }
      ]
    }
  ];

  const handleItemClick = (item) => {
    if (item.action === 'toggle' && item.toggle) {
      toggleTheme();
    } else if (item.action === 'logout') {
      // Handle logout
      console.log('Logout clicked');
    } else {
      // Handle navigation
      console.log(`Navigate to ${item.label}`);
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
            Settings
          </h1>
          <p style={{ color: theme.colors.textSecondary }}>
            Customize your Tarteel AI experience
          </p>
        </div>

        {/* Settings Groups */}
        <div className="space-y-6">
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex}>
              {/* Group Title */}
              <h3
                className="text-sm font-semibold mb-3 px-2"
                style={{ color: theme.colors.textSecondary }}
              >
                {group.title.toUpperCase()}
              </h3>

              {/* Group Items */}
              <div
                className="rounded-lg overflow-hidden"
                style={{ backgroundColor: theme.colors.cardBg }}
              >
                {group.items.map((item, itemIndex) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={itemIndex}
                      onClick={() => handleItemClick(item)}
                      className={`w-full p-4 flex items-center justify-between transition-all duration-200 hover:opacity-80 ${
                        itemIndex !== group.items.length - 1 ? 'border-b' : ''
                      }`}
                      style={{
                        borderColor: theme.colors.border
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className="p-2 rounded-lg"
                          style={{
                            backgroundColor: item.danger 
                              ? '#FEE2E2' 
                              : theme.colors.backgroundSecondary
                          }}
                        >
                          <IconComponent
                            size={18}
                            style={{
                              color: item.danger 
                                ? '#EF4444' 
                                : theme.colors.textSecondary
                            }}
                          />
                        </div>
                        <div className="text-left">
                          <p
                            className="font-medium"
                            style={{
                              color: item.danger 
                                ? '#EF4444' 
                                : theme.colors.text
                            }}
                          >
                            {item.label}
                          </p>
                          {item.value && (
                            <p
                              className="text-sm"
                              style={{ color: theme.colors.textSecondary }}
                            >
                              {item.value}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="flex items-center space-x-2">
                        {item.toggle && (
                          <div
                            className={`w-12 h-6 rounded-full p-1 transition-all duration-200 ${
                              theme.isDarkMode ? 'justify-end' : 'justify-start'
                            } flex`}
                            style={{
                              backgroundColor: theme.isDarkMode 
                                ? theme.colors.primary 
                                : theme.colors.border
                            }}
                          >
                            <div
                              className="w-4 h-4 rounded-full transition-all duration-200"
                              style={{
                                backgroundColor: theme.colors.white
                              }}
                            />
                          </div>
                        )}
                        {!item.toggle && !item.danger && (
                          <FiChevronRight
                            size={16}
                            style={{ color: theme.colors.textSecondary }}
                          />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* App Version */}
        <div className="mt-8 text-center">
          <p
            className="text-sm"
            style={{ color: theme.colors.textSecondary }}
          >
            Tarteel AI v1.0.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default Settings;