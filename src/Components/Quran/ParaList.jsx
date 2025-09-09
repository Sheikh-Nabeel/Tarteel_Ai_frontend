import React from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion";


const ParaList = () => {
  // Quran Paras (Juz)
  const paras = [
    {
      number: 1,
      name: "Alif Lam Meem",
      arabicName: "الم",
      startSurah: 1,
      endSurah: 2,
    },
    {
      number: 2,
      name: "Sayaqool",
      arabicName: "سيقول",
      startSurah: 2,
      endSurah: 2,
    },
    {
      number: 3,
      name: "Tilkal Rusul",
      arabicName: "تلك الرسل",
      startSurah: 2,
      endSurah: 3,
    },
    {
      number: 4,
      name: "Lan Tanaloo",
      arabicName: "لن تنالوا",
      startSurah: 3,
      endSurah: 4,
    },
    {
      number: 5,
      name: "Wal Mohsanat",
      arabicName: "والمحصنات",
      startSurah: 4,
      endSurah: 5,
    },
    {
      number: 6,
      name: "La Yuhibbullah",
      arabicName: "لا يحب الله",
      startSurah: 4,
      endSurah: 6,
    },
    {
      number: 7,
      name: "Wa Iza Samiu",
      arabicName: "وإذا سمعوا",
      startSurah: 5,
      endSurah: 7,
    },
    {
      number: 8,
      name: "Wa Lau Annana",
      arabicName: "ولو أننا",
      startSurah: 6,
      endSurah: 8,
    },
    {
      number: 9,
      name: "Qalal Malao",
      arabicName: "قال الملأ",
      startSurah: 7,
      endSurah: 9,
    },
    {
      number: 10,
      name: "Wa A'lamu",
      arabicName: "واعلموا",
      startSurah: 8,
      endSurah: 11,
    },
    {
      number: 11,
      name: "Ya'tazeroon",
      arabicName: "يعتذرون",
      startSurah: 9,
      endSurah: 11,
    },
    {
      number: 12,
      name: "Wa Ma Min Dabbah",
      arabicName: "وما من دابة",
      startSurah: 11,
      endSurah: 12,
    },
    {
      number: 13,
      name: "Wa Ma Ubrioo",
      arabicName: "وما أبرئ",
      startSurah: 12,
      endSurah: 14,
    },
    {
      number: 14,
      name: "Rubama",
      arabicName: "ربما",
      startSurah: 15,
      endSurah: 16,
    },
    {
      number: 15,
      name: "Subhan Allazi",
      arabicName: "سبحان الذي",
      startSurah: 17,
      endSurah: 18,
    },
    {
      number: 16,
      name: "Qal Alam",
      arabicName: "قال ألم",
      startSurah: 18,
      endSurah: 20,
    },
    {
      number: 17,
      name: "Iqtaraba",
      arabicName: "اقترب",
      startSurah: 21,
      endSurah: 22,
    },
    {
      number: 18,
      name: "Qad Aflaha",
      arabicName: "قد أفلح",
      startSurah: 23,
      endSurah: 25,
    },
    {
      number: 19,
      name: "Wa Qalallazina",
      arabicName: "وقال الذين",
      startSurah: 25,
      endSurah: 27,
    },
    {
      number: 20,
      name: "A Man Khalaq",
      arabicName: "أمن خلق",
      startSurah: 27,
      endSurah: 29,
    },
    {
      number: 21,
      name: "Utlu Ma Oohi",
      arabicName: "اتل ما أوحي",
      startSurah: 29,
      endSurah: 33,
    },
    {
      number: 22,
      name: "Wa Man Yaqnut",
      arabicName: "ومن يقنت",
      startSurah: 33,
      endSurah: 36,
    },
    {
      number: 23,
      name: "Wa Maliya",
      arabicName: "وما لي",
      startSurah: 36,
      endSurah: 39,
    },
    {
      number: 24,
      name: "Fa Man Azlam",
      arabicName: "فمن أظلم",
      startSurah: 39,
      endSurah: 41,
    },
    {
      number: 25,
      name: "Elahe Yuraddo",
      arabicName: "إليه يرد",
      startSurah: 41,
      endSurah: 45,
    },
    {
      number: 26,
      name: "Ha Meem",
      arabicName: "حم",
      startSurah: 46,
      endSurah: 51,
    },
    {
      number: 27,
      name: "Qala Fama Khatbukum",
      arabicName: "قال فما خطبكم",
      startSurah: 51,
      endSurah: 57,
    },
    {
      number: 28,
      name: "Qad Samia",
      arabicName: "قد سمع",
      startSurah: 58,
      endSurah: 66,
    },
    {
      number: 29,
      name: "Tabarakallazi",
      arabicName: "تبارك الذي",
      startSurah: 67,
      endSurah: 77,
    },
    {
      number: 30,
      name: "Amma Yatasa'aloon",
      arabicName: "عم يتساءلون",
      startSurah: 78,
      endSurah: 114,
    },
  ];

  return (
    <div className="px-4 max-w-2xl mx-auto mt-4 min-h-screen bg-light-bg dark:bg-dark-bg transition-colors">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="rounded-2xl p-8 mb-8 shadow-md bg-gradient-to-b from-[#25d162] to-[#1d1d1d] dark:from-[#1d1d1d] dark:to-[#25d162] text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <FiBookOpen className="text-white" size={28} />
          <h1 className="text-2xl font-bold text-white">Select Para (Juz)</h1>
        </div>
        <p className="text-white opacity-90">
          Choose a Para to explore its Surahs and Ayahs
        </p>
      </motion.div>

      {/* Para List */}
      <div className="space-y-4">
        {paras.map((para, i) => (
          <motion.div
            key={para.number}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            whileHover={{ scale: 1.04 }}
          >
            <Link
              to={`/quran/para/${para.number}`}
              className="flex justify-between items-center rounded-xl px-5 py-4 
      bg-white/70 dark:bg-custom-black/70 backdrop-blur-md border border-gray-200 dark:border-gray-800 
      shadow-md hover:shadow-xl hover:-translate-y-1 hover:border-primary/50 transition-all duration-300 group"
            >
              {/* Left side */}
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg 
          shadow-md group-hover:ring-4 group-hover:ring-primary/30 transition-all"
                >
                  {para.number}
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
                    {para.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Surah {para.startSurah} - {para.endSurah}
                  </p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-semibold bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent">
                  {para.arabicName}
                </h3>
                <FiChevronRight
                  size={20}
                  className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all"
                />
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );

};

export default ParaList;
