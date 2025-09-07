import React from 'react';
import { FiBook, FiBookOpen, FiCompass, FiHeart, FiClock, FiUsers } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

const Home = () => {
  const theme = useTheme();

  const features = [
    {
      icon: FiBookOpen,
      title: 'Quran',
      description: 'Read and listen to the Holy Quran with translations',
      action: 'Read Now'
    },
    {
      icon: FiBook,
      title: 'Hadith',
      description: 'Explore authentic Hadith collections',
      action: 'Explore'
    },
    {
      icon: FiClock,
      title: 'Prayer Times',
      description: 'Get accurate prayer times for your location',
      action: 'View Times'
    },
    {
      icon: FiHeart,
      title: 'Ibadat',
      description: 'Learn about Islamic worship and practices',
      action: 'Learn More'
    },
    {
      icon: FiCompass,
      title: 'Qibla Direction',
      description: 'Find the direction of Kaaba from anywhere',
      action: 'Find Qibla'
    },
    {
      icon: FiUsers,
      title: 'Islamic Calendar',
      description: 'Stay updated with Islamic dates and events',
      action: 'View Calendar'
    }
  ];
  return (
    <div 
      className="min-h-screen pt-16 pb-20 px-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-md mx-auto">
        {/* Welcome Section */}
        <div 
          className="rounded-lg p-6 mb-6 shadow-sm"
          style={{ backgroundColor: theme.colors.cardBg }}
        >
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: theme.colors.text }}
          >
            Welcome to Tarteel AI
          </h1>
          <p style={{ color: theme.colors.textSecondary }}>
            Your comprehensive Islamic companion for spiritual growth and learning.
          </p>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                style={{ backgroundColor: theme.colors.cardBg }}
              >
                <div className="flex flex-col items-center text-center">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${theme.colors.primary}20` }}
                  >
                    <IconComponent size={24} style={{ color: theme.colors.primary }} />
                  </div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: theme.colors.text }}
                  >
                    {feature.title}
                  </h3>
                  <p 
                    className="text-sm mb-3"
                    style={{ color: theme.colors.textSecondary }}
                  >
                    {feature.description}
                  </p>
                  <button 
                    className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: theme.colors.white
                    }}
                  >
                    {feature.action}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;