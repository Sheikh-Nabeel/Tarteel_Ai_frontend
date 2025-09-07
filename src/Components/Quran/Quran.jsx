import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTheme } from '../../contexts/ThemeContext';

const Quran = () => {
  const [surahs, setSurahs] = useState([]);
  const theme = useTheme();

  useEffect(() => {
    axios.get("https://api.alquran.cloud/v1/surah")
      .then(res => setSurahs(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div 
      className="px-4 max-w-2xl mx-auto py-20 min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div 
        className="flex justify-between items-center pb-2 mb-4 border-b"
        style={{ borderColor: theme.colors.border }}
      >
        <h2 
          className="text-lg font-semibold"
          style={{ color: theme.colors.primary }}
        >
          Surah
        </h2>
        <h2 
          className="text-lg font-semibold"
          style={{ color: theme.colors.textSecondary }}
        >
          Ayah
        </h2>
      </div>

      <div className="space-y-3">
        {surahs.map((surah) => (
          <Link
            to={`/quran/${surah.number}`}
            key={surah.number}
            className="flex justify-between items-center shadow-sm rounded-xl px-4 py-3 hover:shadow-md transition"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full text-white flex items-center justify-center font-bold"
                style={{ backgroundColor: theme.colors.primary }}
              >
                {surah.number}
              </div>
              <div>
                <h3 
                  className="font-semibold"
                  style={{ color: theme.colors.text }}
                >
                  {surah.englishName}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  {surah.numberOfAyahs} Ayahs
                </p>
              </div>
            </div>

            {/* Right side (Arabic name) */}
            <h3 
              className="text-lg font-semibold"
              style={{ color: theme.colors.text }}
            >
              {surah.name}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quran;
