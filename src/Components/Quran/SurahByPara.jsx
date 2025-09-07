import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../contexts/ThemeContext';
import { FiArrowLeft, FiBookOpen, FiChevronRight } from 'react-icons/fi';

const SurahByPara = () => {
  const { paraNumber } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const [surahs, setSurahs] = useState([]);
  const [paraInfo, setParaInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Para information mapping
  const paraData = {
    1: { name: 'Alif Lam Meem', arabicName: 'الم', startSurah: 1, endSurah: 2 },
    2: { name: 'Sayaqool', arabicName: 'سيقول', startSurah: 2, endSurah: 2 },
    3: { name: 'Tilkal Rusul', arabicName: 'تلك الرسل', startSurah: 2, endSurah: 3 },
    4: { name: 'Lan Tanaloo', arabicName: 'لن تنالوا', startSurah: 3, endSurah: 4 },
    5: { name: 'Wal Mohsanat', arabicName: 'والمحصنات', startSurah: 4, endSurah: 5 },
    6: { name: 'La Yuhibbullah', arabicName: 'لا يحب الله', startSurah: 4, endSurah: 6 },
    7: { name: 'Wa Iza Samiu', arabicName: 'وإذا سمعوا', startSurah: 5, endSurah: 7 },
    8: { name: 'Wa Lau Annana', arabicName: 'ولو أننا', startSurah: 6, endSurah: 8 },
    9: { name: 'Qalal Malao', arabicName: 'قال الملأ', startSurah: 7, endSurah: 9 },
    10: { name: 'Wa A\'lamu', arabicName: 'واعلموا', startSurah: 8, endSurah: 11 },
    11: { name: 'Ya\'tazeroon', arabicName: 'يعتذرون', startSurah: 9, endSurah: 11 },
    12: { name: 'Wa Ma Min Dabbah', arabicName: 'وما من دابة', startSurah: 11, endSurah: 12 },
    13: { name: 'Wa Ma Ubrioo', arabicName: 'وما أبرئ', startSurah: 12, endSurah: 14 },
    14: { name: 'Rubama', arabicName: 'ربما', startSurah: 15, endSurah: 16 },
    15: { name: 'Subhan Allazi', arabicName: 'سبحان الذي', startSurah: 17, endSurah: 18 },
    16: { name: 'Qal Alam', arabicName: 'قال ألم', startSurah: 18, endSurah: 20 },
    17: { name: 'Iqtaraba', arabicName: 'اقترب', startSurah: 21, endSurah: 22 },
    18: { name: 'Qad Aflaha', arabicName: 'قد أفلح', startSurah: 23, endSurah: 25 },
    19: { name: 'Wa Qalallazina', arabicName: 'وقال الذين', startSurah: 25, endSurah: 27 },
    20: { name: 'A Man Khalaq', arabicName: 'أمن خلق', startSurah: 27, endSurah: 29 },
    21: { name: 'Utlu Ma Oohi', arabicName: 'اتل ما أوحي', startSurah: 29, endSurah: 33 },
    22: { name: 'Wa Man Yaqnut', arabicName: 'ومن يقنت', startSurah: 33, endSurah: 36 },
    23: { name: 'Wa Maliya', arabicName: 'وما لي', startSurah: 36, endSurah: 39 },
    24: { name: 'Fa Man Azlam', arabicName: 'فمن أظلم', startSurah: 39, endSurah: 41 },
    25: { name: 'Elahe Yuraddo', arabicName: 'إليه يرد', startSurah: 41, endSurah: 45 },
    26: { name: 'Ha Meem', arabicName: 'حم', startSurah: 46, endSurah: 51 },
    27: { name: 'Qala Fama Khatbukum', arabicName: 'قال فما خطبكم', startSurah: 51, endSurah: 57 },
    28: { name: 'Qad Samia', arabicName: 'قد سمع', startSurah: 58, endSurah: 66 },
    29: { name: 'Tabarakallazi', arabicName: 'تبارك الذي', startSurah: 67, endSurah: 77 },
    30: { name: 'Amma Yatasa\'aloon', arabicName: 'عم يتساءلون', startSurah: 78, endSurah: 114 }
  };

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        setLoading(true);
        const para = paraData[paraNumber];
        if (!para) {
          navigate('/quran');
          return;
        }
        
        setParaInfo(para);
        
        // Fetch all surahs
        const response = await axios.get('https://api.alquran.cloud/v1/surah');
        const allSurahs = response.data.data;
        
        // Filter surahs for this para
        const filteredSurahs = allSurahs.filter(surah => 
          surah.number >= para.startSurah && surah.number <= para.endSurah
        );
        
        setSurahs(filteredSurahs);
      } catch (error) {
        console.error('Error fetching surahs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurahs();
  }, [paraNumber, navigate]);

  if (loading) {
    return (
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
  }

  if (!paraInfo) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: theme.colors.background }}
      >
        <p 
          className="text-center text-lg"
          style={{ color: theme.colors.text }}
        >
          Para not found
        </p>
      </div>
    );
  }

  return (
    <div 
      className="px-4 max-w-2xl mx-auto py-20 min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Header */}
      <div 
        className="rounded-lg p-6 mb-6 shadow-sm"
        style={{ backgroundColor: theme.colors.cardBg }}
      >
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate('/quran')}
            className="p-2 rounded-lg hover:bg-opacity-80 transition"
            style={{ backgroundColor: theme.colors.primary + '20' }}
          >
            <FiArrowLeft 
              size={20} 
              style={{ color: theme.colors.primary }} 
            />
          </button>
          <div>
            <h1 
              className="text-xl font-bold"
              style={{ color: theme.colors.text }}
            >
              Para {paraNumber}: {paraInfo.name}
            </h1>
            <p 
              className="text-lg"
              style={{ color: theme.colors.primary }}
            >
              {paraInfo.arabicName}
            </p>
          </div>
        </div>
        <p style={{ color: theme.colors.textSecondary }}>
          Select a Surah to read its Ayahs
        </p>
      </div>

      {/* Surahs List */}
      <div className="space-y-3">
        {surahs.map((surah) => (
          <Link
            to={`/quran/para/${paraNumber}/surah/${surah.number}`}
            key={surah.number}
            className="flex justify-between items-center shadow-sm rounded-xl px-4 py-3 hover:shadow-md transition group"
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

            {/* Right side */}
            <div className="flex items-center gap-3">
              <h3 
                className="text-lg font-semibold"
                style={{ color: theme.colors.text }}
              >
                {surah.name}
              </h3>
              <FiChevronRight 
                size={20} 
                style={{ color: theme.colors.textSecondary }}
                className="group-hover:translate-x-1 transition-transform"
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SurahByPara;