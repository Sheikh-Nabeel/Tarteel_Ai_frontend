import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { FiBookOpen, FiChevronRight } from 'react-icons/fi';

const ParaList = () => {
  const theme = useTheme();

  // Quran is divided into 30 Paras (Juz/Sipara)
  const paras = [
    { number: 1, name: 'Alif Lam Meem', arabicName: 'الم', startSurah: 1, endSurah: 2 },
    { number: 2, name: 'Sayaqool', arabicName: 'سيقول', startSurah: 2, endSurah: 2 },
    { number: 3, name: 'Tilkal Rusul', arabicName: 'تلك الرسل', startSurah: 2, endSurah: 3 },
    { number: 4, name: 'Lan Tanaloo', arabicName: 'لن تنالوا', startSurah: 3, endSurah: 4 },
    { number: 5, name: 'Wal Mohsanat', arabicName: 'والمحصنات', startSurah: 4, endSurah: 5 },
    { number: 6, name: 'La Yuhibbullah', arabicName: 'لا يحب الله', startSurah: 4, endSurah: 6 },
    { number: 7, name: 'Wa Iza Samiu', arabicName: 'وإذا سمعوا', startSurah: 5, endSurah: 7 },
    { number: 8, name: 'Wa Lau Annana', arabicName: 'ولو أننا', startSurah: 6, endSurah: 8 },
    { number: 9, name: 'Qalal Malao', arabicName: 'قال الملأ', startSurah: 7, endSurah: 9 },
    { number: 10, name: 'Wa A\'lamu', arabicName: 'واعلموا', startSurah: 8, endSurah: 11 },
    { number: 11, name: 'Ya\'tazeroon', arabicName: 'يعتذرون', startSurah: 9, endSurah: 11 },
    { number: 12, name: 'Wa Ma Min Dabbah', arabicName: 'وما من دابة', startSurah: 11, endSurah: 12 },
    { number: 13, name: 'Wa Ma Ubrioo', arabicName: 'وما أبرئ', startSurah: 12, endSurah: 14 },
    { number: 14, name: 'Rubama', arabicName: 'ربما', startSurah: 15, endSurah: 16 },
    { number: 15, name: 'Subhan Allazi', arabicName: 'سبحان الذي', startSurah: 17, endSurah: 18 },
    { number: 16, name: 'Qal Alam', arabicName: 'قال ألم', startSurah: 18, endSurah: 20 },
    { number: 17, name: 'Iqtaraba', arabicName: 'اقترب', startSurah: 21, endSurah: 22 },
    { number: 18, name: 'Qad Aflaha', arabicName: 'قد أفلح', startSurah: 23, endSurah: 25 },
    { number: 19, name: 'Wa Qalallazina', arabicName: 'وقال الذين', startSurah: 25, endSurah: 27 },
    { number: 20, name: 'A Man Khalaq', arabicName: 'أمن خلق', startSurah: 27, endSurah: 29 },
    { number: 21, name: 'Utlu Ma Oohi', arabicName: 'اتل ما أوحي', startSurah: 29, endSurah: 33 },
    { number: 22, name: 'Wa Man Yaqnut', arabicName: 'ومن يقنت', startSurah: 33, endSurah: 36 },
    { number: 23, name: 'Wa Maliya', arabicName: 'وما لي', startSurah: 36, endSurah: 39 },
    { number: 24, name: 'Fa Man Azlam', arabicName: 'فمن أظلم', startSurah: 39, endSurah: 41 },
    { number: 25, name: 'Elahe Yuraddo', arabicName: 'إليه يرد', startSurah: 41, endSurah: 45 },
    { number: 26, name: 'Ha Meem', arabicName: 'حم', startSurah: 46, endSurah: 51 },
    { number: 27, name: 'Qala Fama Khatbukum', arabicName: 'قال فما خطبكم', startSurah: 51, endSurah: 57 },
    { number: 28, name: 'Qad Samia', arabicName: 'قد سمع', startSurah: 58, endSurah: 66 },
    { number: 29, name: 'Tabarakallazi', arabicName: 'تبارك الذي', startSurah: 67, endSurah: 77 },
    { number: 30, name: 'Amma Yatasa\'aloon', arabicName: 'عم يتساءلون', startSurah: 78, endSurah: 114 }
  ];

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
        <div className="flex items-center gap-3 mb-2">
          <FiBookOpen 
            size={24} 
            style={{ color: theme.colors.primary }} 
          />
          <h1 
            className="text-2xl font-bold"
            style={{ color: theme.colors.text }}
          >
            Select Para (Juz)
          </h1>
        </div>
        <p style={{ color: theme.colors.textSecondary }}>
          Choose a Para to explore its Surahs and Ayahs
        </p>
      </div>

      {/* Para List */}
      <div className="space-y-3">
        {paras.map((para) => (
          <Link
            to={`/quran/para/${para.number}`}
            key={para.number}
            className="flex justify-between items-center shadow-sm rounded-xl px-4 py-4 hover:shadow-md transition group"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            {/* Left side */}
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full text-white flex items-center justify-center font-bold text-lg"
                style={{ backgroundColor: theme.colors.primary }}
              >
                {para.number}
              </div>
              <div>
                <h3 
                  className="font-semibold text-lg"
                  style={{ color: theme.colors.text }}
                >
                  {para.name}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: theme.colors.textSecondary }}
                >
                  Surah {para.startSurah} - {para.endSurah}
                </p>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3">
              <h3 
                className="text-xl font-semibold"
                style={{ color: theme.colors.text }}
              >
                {para.arabicName}
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

export default ParaList;