import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SurahDetail = () => {
  const { id } = useParams();
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

  if (!surah) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="px-4 max-w-2xl mx-auto py-20">
      {/* Surah Header */}
      <h2 className="text-xl font-bold text-[#25D162] mb-4">
        {surah.englishName} - {surah.name}
      </h2>

      {/* Ayahs */}
      <div className="space-y-4">
        {arabicAyahs.map((ayah, index) => (
          <div
            key={ayah.number}
            className="bg-white shadow-sm rounded-xl p-4 border border-gray-100"
          >
            <p className="text-sm font-bold text-gray-500 mb-2">({ayah.numberInSurah})</p>

            {/* Arabic */}
            <p className="text-right text-xl font-semibold mb-3">{ayah.text}</p>

            {/* Transliteration */}
            {translitAyahs[index] && (
              <p className="text-sm text-gray-800 italic mb-2">
                <span className="text-[#25D162] font-semibold">Transliteration</span> <br />
                {translitAyahs[index].text}
              </p>
            )}

            {/* English Translation */}
            {englishAyahs[index] && (
              <p className="text-sm text-gray-700">
                <span className="text-[#25D162] font-semibold">English (Saheeh International)</span> <br />
                {englishAyahs[index].text}
              </p>
            )}

            {/* Urdu Translation */}
            {urduAyahs[index] && (
              <p className="text-sm text-gray-700 mt-2">
                <span className="text-[#25D162] font-semibold">اردو (جالندھری)</span> <br />
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
