import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// ✅ Import icons
import { ImHome } from 'react-icons/im';
import { GiOpenBook, GiCompass } from 'react-icons/gi';
import { MdMenuBook } from 'react-icons/md';
import { FaPrayingHands } from 'react-icons/fa';  // ✅ correct one
import { useTheme } from '../../contexts/ThemeContext';

const BottomNav = () => {
  const location = useLocation();
  const theme = useTheme();

  return (
    <>
      <div
        className="fixed bottom-2 left-1/2 -translate-x-1/2 shadow-xl rounded-full flex justify-around max-lg:rounded-none items-center w-[100%]  max-w-2xl px-2 py-2 z-50"
        style={{
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.border
        }}
      >
        <NavItem to="/quran" icon={GiOpenBook} label="Quran" theme={theme} />
        <NavItem to="/hadith" icon={MdMenuBook} label="Hadith" theme={theme} />
        <NavItem to="/" icon={ImHome} label="Home" theme={theme} />
        <NavItem to="/ibadat" icon={FaPrayingHands} label="Ibadat" theme={theme} />
        <NavItem to="/qibla" icon={GiCompass} label="Qibla" theme={theme} />
      </div>
    </>
  );
};

// 🔹 NavItem with theme integration
const NavItem = ({ to, icon: Icon, label, theme }) => (
  <NavLink
    to={to}
    className="flex flex-col items-center cursor-pointer transition-all duration-200"
  >
    {({ isActive }) => (
      <>
        <Icon 
          className="text-lg" 
          style={{ 
            color: isActive ? theme.colors.primary : theme.colors.textSecondary 
          }} 
        />
        <span 
          className="text-[.7rem] font-medium"
          style={{ 
            color: isActive ? theme.colors.primary : theme.colors.textSecondary 
          }}
        >
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default BottomNav;
