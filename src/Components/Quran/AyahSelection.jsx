import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';
import { FiArrowLeft, FiBookOpen, FiCopy, FiShare2 } from 'react-icons/fi';

const AyahSelection = () => {
  const { paraNumber, surahNumber } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [ayahs, setAyahs] = useState([]);
  const [surahInfo, setSurahInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copiedAyah, setCopiedAyah] = useState(null);

  useEffect(() => {
    const fetchAyahs = async () => {
      try {
        setLoading(true);
        
        // Fetch surah with ayahs
        const response = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}`);
        const surahData = response.data.data;
        
        setSurahInfo({
          number: surahData.number,
          name: surahData.name,
          englishName: surahData.englishName,
          englishNameTranslation: surahData.englishNameTranslation,
          numberOfAyahs: surahData.numberOfAyahs,
          revelationType: surahData.revelationType
        });
        
        // Fetch English translation
        const translationResponse = await axios.get(`https://api.alquran.cloud/v1/surah/${surahNumber}/en.asad`);
        const translationData = translationResponse.data.data;
        
        // Combine Arabic and English
        const combinedAyahs = surahData.ayahs.map((ayah, index) => ({
          number: ayah.number,
          numberInSurah: ayah.numberInSurah,
          text: ayah.text,
          translation: translationData.ayahs[index]?.text || 'Translation not available'
        }));
        
        setAyahs(combinedAyahs);
      } catch (error) {
        console.error('Error fetching ayahs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAyahs();
  }, [surahNumber]);

  const copyAyah = async (ayah) => {
    const textToCopy = `${ayah.text}\n\n${ayah.translation}\n\n- Quran ${surahInfo.englishName} (${surahInfo.name}) ${ayah.numberInSurah}:${ayah.number}`;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedAyah(ayah.number);
      setTimeout(() => setCopiedAyah(null), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  const shareAyah = async (ayah) => {
    const textToShare = `${ayah.text}\n\n${ayah.translation}\n\n- Quran ${surahInfo.englishName} (${surahInfo.name}) ${ayah.numberInSurah}:${ayah.number}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Quran - ${surahInfo.englishName} ${ayah.numberInSurah}:${ayah.number}`,
          text: textToShare
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      copyAyah(ayah);
    }
  };

  if (loading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <div className="text-center">
          <div 
            className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: theme.colors.primary, borderTopColor: 'transparent' }}
          ></div>
          <p 
            className="text-lg"
            style={{ color: theme.colors.text }}
          >
            Loading Ayahs...
          </p>
        </div>
      </div>
    );
  }

  if (!surahInfo) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <p 
          className="text-center text-lg"
          style={{ color: theme.colors.text }}
        >
          Surah not found
        </p>
      </div>
    );
  }

  return (
    <div 
      className="px-4 max-w-4xl mx-auto py-20 min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <div 
        className="rounded-lg p-6 mb-6 shadow-sm"
        style={{ backgroundColor: theme.colors.cardBg }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(`/quran/para/${paraNumber}`)}
            className="p-2 rounded-lg hover:bg-opacity-80 transition"
            style={{ backgroundColor: theme.colors.primary + '20' }}
          >
            <FiArrowLeft 
              size={20} 
              style={{ color: theme.colors.primary }} 
            />
          </button>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 
                className="text-xl font-bold"
                style={{ color: theme.colors.text }}
              >
                {surahInfo.englishName}
              </h1>
              <span 
                className="text-2xl font-bold"
                style={{ color: theme.colors.primary }}
              >
                {surahInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span style={{ color: theme.colors.textSecondary }}>
                {surahInfo.englishNameTranslation}
              </span>
              <span style={{ color: theme.colors.textSecondary }}>•</span>
              <span style={{ color: theme.colors.textSecondary }}>
                {surahInfo.numberOfAyahs} Ayahs
              </span>
              <span style={{ color: theme.colors.textSecondary }}>•</span>
              <span style={{ color: theme.colors.textSecondary }}>
                {surahInfo.revelationType}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Ayahs List */}
      <div className="space-y-6">
        {ayahs.map((ayah) => (
          <div
            key={ayah.number}
            className="rounded-lg p-6 shadow-sm hover:shadow-md transition"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            {/* Ayah Number */}
            <div className="flex items-center justify-between mb-4">
              <div 
                className="w-8 h-8 rounded-full text-white flex items-center justify-center text-sm font-bold"
                style={{ backgroundColor: theme.colors.primary }}
              >
                {ayah.numberInSurah}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyAyah(ayah)}
                  className="p-2 rounded-lg hover:bg-opacity-80 transition"
                  style={{ backgroundColor: theme.colors.primary + '20' }}
                  title="Copy Ayah"
                >
                  <FiCopy 
                    size={16} 
                    style={{ color: copiedAyah === ayah.number ? '#10B981' : theme.colors.primary }} 
                  />
                </button>
                <button
                  onClick={() => shareAyah(ayah)}
                  className="p-2 rounded-lg hover:bg-opacity-80 transition"
                  style={{ backgroundColor: theme.colors.primary + '20' }}
                  title="Share Ayah"
                >
                  <FiShare2 
                    size={16} 
                    style={{ color: theme.colors.primary }} 
                  />
                </button>
              </div>
            </div>

            {/* Arabic Text */}
            <div className="mb-4">
              <p 
                className="text-right text-2xl leading-loose font-arabic"
                style={{ color: theme.colors.text }}
                dir="rtl"
              >
                {ayah.text}
              </p>
            </div>

            {/* English Translation */}
            <div 
              className="border-t pt-4"
              style={{ borderColor: theme.colors.border }}
            >
              <p 
                className="text-base leading-relaxed"
                style={{ color: theme.colors.textSecondary }}
              >
                {ayah.translation}
              </p>
            </div>

            {/* Copy Success Message */}
            {copiedAyah === ayah.number && (
              <div className="mt-3">
                <p 
                  className="text-sm text-green-600"
                >
                  ✓ Ayah copied to clipboard
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AyahSelection;