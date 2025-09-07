import React from 'react';
import { FiBook, FiBookOpen, FiHeart, FiStar } from 'react-icons/fi';
import { useTheme } from '../../contexts/ThemeContext';

const Hadith = () => {
  const theme = useTheme();

  const hadithCollections = [
    {
      title: 'Sahih Bukhari',
      description: 'The most authentic collection of Hadith',
      count: '7,563',
      icon: FiBook,
      color: '#25D162'
    },
    {
      title: 'Sahih Muslim',
      description: 'Second most authentic collection of Hadith',
      count: '7,190',
      icon: FiBookOpen,
      color: '#3B82F6'
    },
    {
      title: 'Sunan Abu Dawood',
      description: 'Collection focusing on legal matters',
      count: '5,274',
      icon: FiHeart,
      color: '#8B5CF6'
    },
    {
      title: 'Jami at-Tirmidhi',
      description: 'Collection with detailed commentary',
      count: '3,956',
      icon: FiStar,
      color: '#F59E0B'
    }
  ];
  return (
    <div 
      className="min-h-screen pt-16 pb-20 px-4"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div 
          className="rounded-lg p-6 mb-6 shadow-sm"
          style={{ backgroundColor: theme.colors.cardBg }}
        >
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ color: theme.colors.text }}
          >
            Hadith Collections
          </h1>
          <p style={{ color: theme.colors.textSecondary }}>
            Explore authentic sayings and teachings of Prophet Muhammad (PBUH)
          </p>
        </div>
        
        {/* Hadith Collections Grid */}
        <div className="grid grid-cols-1 gap-4">
          {hadithCollections.map((collection, index) => {
            const IconComponent = collection.icon;
            return (
              <div
                key={index}
                className="rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer border-l-4"
                style={{ 
                  backgroundColor: theme.colors.cardBg,
                  borderLeftColor: collection.color 
                }}
              >
                <div className="flex items-start space-x-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${collection.color}20` }}
                  >
                    <IconComponent size={24} style={{ color: collection.color }} />
                  </div>
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: theme.colors.text }}
                    >
                      {collection.title}
                    </h3>
                    <p 
                      className="text-sm mb-3"
                      style={{ color: theme.colors.textSecondary }}
                    >
                      {collection.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span 
                        className="text-sm"
                        style={{ color: theme.colors.gray }}
                      >
                        {collection.count} Hadiths
                      </span>
                      <button 
                        className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:opacity-90"
                        style={{
                          backgroundColor: theme.colors.primary,
                          color: theme.colors.white
                        }}
                      >
                        Read
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hadith;