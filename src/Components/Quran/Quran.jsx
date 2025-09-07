import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Quran = () => {
  const [surahs, setSurahs] = useState([]);

  useEffect(() => {
    axios.get("https://api.alquran.cloud/v1/surah")
      .then(res => setSurahs(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="px-4 max-w-2xl mx-auto py-20">
      <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
        <h2 className="text-lg font-semibold text-[#25D162]">Surah</h2>
        <h2 className="text-lg font-semibold text-gray-600">Ayah</h2>
      </div>

      <div className="space-y-3">
        {surahs.map((surah) => (
          <Link
            to={`/quran/${surah.number}`}
            key={surah.number}
            className="flex justify-between items-center bg-white shadow-sm rounded-xl px-4 py-3 hover:shadow-md transition"
          >
            {/* Left side */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#25D162] text-white flex items-center justify-center font-bold">
                {surah.number}
              </div>
              <div>
                <h3 className="font-semibold">{surah.englishName}</h3>
                <p className="text-sm text-gray-500">{surah.numberOfAyahs} Ayahs</p>
              </div>
            </div>

            {/* Right side (Arabic name) */}
            <h3 className="text-lg font-semibold text-gray-700">{surah.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Quran;
