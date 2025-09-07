import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('tarteel-theme');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('tarteel-theme', JSON.stringify(isDarkMode));
    
    // Apply theme to document root
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      primary: '#25D162',
      darkBg: '#2B2B2B',
      darkerBg: '#1D1D1D',
      white: '#FFFFFF',
      lightBg: '#F9FAFB',
      lightGray: '#F3F4F6',
      gray: '#6B7280',
      darkGray: '#374151',
      text: isDarkMode ? '#FFFFFF' : '#1F2937',
      textSecondary: isDarkMode ? '#D1D5DB' : '#6B7280',
      background: isDarkMode ? '#2B2B2B' : '#FFFFFF',
      backgroundSecondary: isDarkMode ? '#1D1D1D' : '#F9FAFB',
      border: isDarkMode ? '#374151' : '#E5E7EB',
      cardBg: isDarkMode ? '#1D1D1D' : '#FFFFFF'
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;