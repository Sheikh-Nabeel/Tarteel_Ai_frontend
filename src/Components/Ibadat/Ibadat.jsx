import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Ibadat = () => {
  const theme = useTheme();
  return (
    <div 
      className="min-h-screen pt-16 pb-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            Ibadat & Worship
          </h1>
          <p 
            className="text-lg"
            style={{ color: theme.colors.textSecondary }}
          >
            Learn about Islamic worship practices and rituals
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          <div 
            className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <div 
              className="text-3xl mb-4"
              style={{ color: theme.colors.primary }}
            >
              <i className="fas fa-pray"></i>
            </div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: theme.colors.text }}
            >
              Salah (Prayer)
            </h3>
            <p 
              className="mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Learn the five daily prayers and their importance
            </p>
            <button 
              className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Learn More
            </button>
          </div>
          
          <div 
            className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <div 
              className="text-3xl mb-4"
              style={{ color: theme.colors.primary }}
            >
              <i className="fas fa-hand-holding-heart"></i>
            </div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: theme.colors.text }}
            >
              Zakat (Charity)
            </h3>
            <p 
              className="mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Understanding the pillar of giving in Islam
            </p>
            <button 
              className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Learn More
            </button>
          </div>
          
          <div 
            className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <div 
              className="text-3xl mb-4"
              style={{ color: theme.colors.primary }}
            >
              <i className="fas fa-moon"></i>
            </div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: theme.colors.text }}
            >
              Sawm (Fasting)
            </h3>
            <p 
              className="mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Learn about fasting during Ramadan and beyond
            </p>
            <button 
              className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Learn More
            </button>
          </div>
          
          <div 
            className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <div 
              className="text-3xl mb-4"
              style={{ color: theme.colors.primary }}
            >
              <i className="fas fa-kaaba"></i>
            </div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: theme.colors.text }}
            >
              Hajj (Pilgrimage)
            </h3>
            <p 
              className="mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Understanding the pilgrimage to Mecca
            </p>
            <button 
              className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Learn More
            </button>
          </div>
          
          <div 
            className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <div 
              className="text-3xl mb-4"
              style={{ color: theme.colors.primary }}
            >
              <i className="fas fa-hands"></i>
            </div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: theme.colors.text }}
            >
              Dua (Supplication)
            </h3>
            <p 
              className="mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Collection of daily duas and prayers
            </p>
            <button 
              className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Learn More
            </button>
          </div>
          
          <div 
            className="rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <div 
              className="text-3xl mb-4"
              style={{ color: theme.colors.primary }}
            >
              <i className="fas fa-book-reader"></i>
            </div>
            <h3 
              className="text-xl font-semibold mb-2"
              style={{ color: theme.colors.text }}
            >
              Dhikr (Remembrance)
            </h3>
            <p 
              className="mb-4"
              style={{ color: theme.colors.textSecondary }}
            >
              Learn about remembrance of Allah
            </p>
            <button 
              className="text-white px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ibadat;