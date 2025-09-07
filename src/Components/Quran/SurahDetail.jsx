import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useTheme } from '../../contexts/ThemeContext';

const SurahDetail = () => {
  const { id } = useParams();
  const theme = useTheme();
  const [surah, setSurah] = useState(null);
  const [arabicAyahs, setArabicAyahs] = useState([]);
  const [englishAyahs, setEnglishAyahs] = useState([]);
  const [urduAyahs, setUrduAyahs] = useState([]);
  const [translitAyahs, setTranslitAyahs] = useState([]);

  useEffect(() => {
    // Arabic
    axios.get(`https://api.alquran.cloud/v1/surah/${id}`)
      .then(res => {
        setSurah(res.data.data);
        setArabicAyahs(res.data.data.ayahs);
      })
      .catch(err => console.error("Arabic fetch error:", err));

    // English Translation (Saheeh International)
    axios.get(`https://api.alquran.cloud/v1/surah/${id}/en.sahih`)
      .then(res => {
        setEnglishAyahs(res.data.data.ayahs);
      })
      .catch(err => console.error("English fetch error:", err));

    // Urdu Translation (Jalandhry)
    axios.get(`https://api.alquran.cloud/v1/surah/${id}/ur.jalandhry`)
      .then(res => {
        setUrduAyahs(res.data.data.ayahs);
      })
      .catch(err => console.error("Urdu fetch error:", err));

    // English Transliteration
    axios.get(`https://api.alquran.cloud/v1/surah/${id}/en.transliteration`)
      .then(res => {
        setTranslitAyahs(res.data.data.ayahs);
      })
      .catch(err => console.error("Transliteration fetch error:", err));
  }, [id]);

  if (!surah) return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: theme.colors.background }}
    >
      <p 
        className="text-center text-lg"
        style={{ color: theme.colors.text }}
      >
        Loading...
      </p>
    </div>
  );

  return (
    <div 
      className="px-4 max-w-2xl mx-auto py-20 min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Surah Header */}
      <h2 
        className="text-xl font-bold mb-4"
        style={{ color: theme.colors.primary }}
      >
        {surah.englishName} - {surah.name}
      </h2>

      {/* Ayahs */}
      <div className="space-y-4">
        {arabicAyahs.map((ayah, index) => (
          <div
            key={ayah.number}
            className="shadow-sm rounded-xl p-4 border"
            style={{ 
              backgroundColor: theme.colors.cardBg,
              borderColor: theme.colors.border 
            }}
          >
            <p 
              className="text-sm font-bold mb-2"
              style={{ color: theme.colors.textSecondary }}
            >
              ({ayah.numberInSurah})
            </p>

            {/* Arabic */}
            <p 
              className="text-right text-xl font-semibold mb-3"
              style={{ color: theme.colors.text }}
            >
              {ayah.text}
            </p>

            {/* Transliteration */}
            {translitAyahs[index] && (
              <p 
                className="text-sm italic mb-2"
                style={{ color: theme.colors.text }}
              >
                <span 
                  className="font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  Transliteration
                </span> <br />
                {translitAyahs[index].text}
              </p>
            )}

            {/* English Translation */}
            {englishAyahs[index] && (
              <p 
                className="text-sm"
                style={{ color: theme.colors.text }}
              >
                <span 
                  className="font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  English (Saheeh International)
                </span> <br />
                {englishAyahs[index].text}
              </p>
            )}

            {/* Urdu Translation */}
            {urduAyahs[index] && (
              <p 
                className="text-sm mt-2"
                style={{ color: theme.colors.text }}
              >
                <span 
                  className="font-semibold"
                  style={{ color: theme.colors.primary }}
                >
                  اردو (جالندھری)
                </span> <br />
                {urduAyahs[index].text}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurahDetail;
