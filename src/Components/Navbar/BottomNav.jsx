import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

// ✅ Import icons
import { ImHome } from 'react-icons/im';
import { GiOpenBook, GiCompass } from 'react-icons/gi';
import { MdMenuBook } from 'react-icons/md';
import { FaPrayingHands } from 'react-icons/fa';  // ✅ correct one

const BottomNav = () => {
  const location = useLocation();

  return (
    <>
      <div
        className="fixed bottom-2 left-1/2 -translate-x-1/2 bg-gray-200 shadow-xl rounded-full flex justify-around max-lg:rounded-none items-center w-[100%]  max-w-2xl px-2 py-2 z-50"
      >
        <NavItem to="/quran" icon={GiOpenBook} label="Quran" />
        <NavItem to="/hadith" icon={MdMenuBook} label="Hadith" />
        <NavItem to="/" icon={ImHome} label="Home" />
        <NavItem to="/ibadat" icon={FaPrayingHands} label="Ibadat" />
        <NavItem to="/qibla" icon={GiCompass} label="Qibla" />
      </div>
    </>
  );
};

// 🔹 NavItem with active color #25D162
const NavItem = ({ to, icon: Icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex flex-col items-center cursor-pointer ${
        isActive ? 'text-[#25D162]' : 'text-gray-500 hover:text-[#25D162]'
      }`
    }
  >
    {({ isActive }) => (
      <>
        <Icon className={`text-lg ${isActive ? 'text-[#25D162]' : 'text-gray-500'}`} />
        <span className={`text-[.7rem] font-medium  ${isActive ? 'text-[#25D162]' : 'text-gray-500'}`}>
          {label}
        </span>
      </>
    )}
  </NavLink>
);

export default BottomNav;
