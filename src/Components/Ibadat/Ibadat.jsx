import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { FaBookReader, FaHandHoldingHeart, FaHands, FaKaaba, FaMoon, FaPray } from "react-icons/fa";

const features = [
  {
    icon: <FaPray />,
    title: "Salah (Prayer)",
    desc: "Learn the five daily prayers and their importance",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Zakat (Charity)",
    desc: "Understanding the pillar of giving in Islam",
  },
  {
    icon: <FaMoon />,
    title: "Sawm (Fasting)",
    desc: "Learn about fasting during Ramadan and beyond",
  },
  {
    icon: <FaKaaba />,
    title: "Hajj (Pilgrimage)",
    desc: "Understanding the pilgrimage to Mecca",
  },
  {
    icon: <FaHands />,
    title: "Dua (Supplication)",
    desc: "Collection of daily duas and prayers",
  },
  {
    icon: <FaBookReader />,
    title: "Dhikr (Remembrance)",
    desc: "Learn about remembrance of Allah",
  },
];

const Ibadat = () => {
  const theme = useTheme();

  return (
    <div
      className="min-h-screen mt-4 pb-20 transition-colors duration-500"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-2xl p-10 mb-12 shadow-lg bg-gradient-to-b from-[#25d162] to-[#1d1d1d] dark:from-[#1d1d1d] dark:to-[#25d162] text-center text-white relative overflow-hidden"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold mb-3 ">
            Ibadat & Worship
          </h1>
          <p className="text-lg opacity-90">
            Learn about Islamic worship practices and rituals
          </p>
          <div className="mt-3 w-28 h-1 mx-auto bg-gradient-to-r from-primary to-green-700 rounded-full"></div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{ scale: 1.04 }}
              className="rounded-2xl shadow-md p-8 backdrop-blur-xl border border-white/20 
              bg-white/60 dark:bg-gray-900/60 relative overflow-hidden
              hover:shadow-2xl transition-all duration-300"
              style={{ backgroundColor: theme.colors.cardBg }}
            >
              {/* Glow border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent hover:border-green-500/50 transition-all duration-300"></div>

              {/* Icon */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-green-700 text-white shadow-md mb-6 text-3xl">
                {item.icon}
              </div>

              {/* Title */}
              <h3
                className="text-2xl font-semibold mb-3"
                style={{ color: theme.colors.text }}
              >
                {item.title}
              </h3>

              {/* Description */}
              <p
                className="mb-6 leading-relaxed"
                style={{ color: theme.colors.textSecondary }}
              >
                {item.desc}
              </p>

              {/* Button */}
              <button
                className="w-full py-3 rounded-xl font-semibold shadow-md relative overflow-hidden
                text-white bg-gradient-to-r from-primary to-green-700 group"
              >
                <span className="relative z-10">Learn More</span>
                <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"></span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ibadat;
