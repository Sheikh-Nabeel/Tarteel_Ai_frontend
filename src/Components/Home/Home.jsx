import React, { useEffect, useState } from "react";
import {
  FaBookOpen,
  FaPrayingHands,
  FaDonate,
  FaMosque,
  FaSun,
  FaMoon,
  FaClock,
  FaQuran,
} from "react-icons/fa";

const Home = () => {
  const [time, setTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch prayer times from API
  useEffect(() => {
    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          "https://api.aladhan.com/v1/timingsByCity?city=Rawalpindi&country=Pakistan&method=2"
        );
        const data = await res.json();
        setPrayerTimes(data.data.timings);
      } catch (err) {
        console.error("Error fetching prayer times", err);
      }
    };
    fetchPrayerTimes();
  }, []);

  // Format to 12-hour with AM/PM
  const formatTo12Hour = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":").map(Number);
    const date = new Date();
    date.setHours(hour, minute);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Find next prayer
  useEffect(() => {
    if (!prayerTimes) return;

    const prayers = [
      { label: "Fajr", time: prayerTimes.Fajr },
      { label: "Sunrise", time: prayerTimes.Sunrise },
      { label: "Dhuhr", time: prayerTimes.Dhuhr },
      { label: "Asr", time: prayerTimes.Asr },
      { label: "Maghrib", time: prayerTimes.Maghrib },
      { label: "Isha", time: prayerTimes.Isha },
    ];

    const now = new Date();
    let upcoming = null;

    for (let p of prayers) {
      const [h, m] = p.time.split(":").map(Number);
      const prayerDate = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate(),
        h,
        m
      );
      if (prayerDate > now) {
        upcoming = p;
        break;
      }
    }

    if (!upcoming) {
      upcoming = prayers[0]; // If all passed, next day Fajr
    }

    setNextPrayer(upcoming);
  }, [time, prayerTimes]);

  // Countdown until next prayer
  const getCountdown = () => {
    if (!nextPrayer) return "";
    const now = new Date();
    const [h, m] = nextPrayer.time.split(":").map(Number);
    const prayerDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      h,
      m
    );
    if (prayerDate < now) prayerDate.setDate(prayerDate.getDate() + 1);

    const diff = Math.floor((prayerDate - now) / 60000); // minutes left
    const hours = Math.floor(diff / 60);
    const mins = diff % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const formattedTime = time.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const formattedDate = time.toLocaleDateString("en-GB", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen pb-20 bg-light-bg dark:bg-dark-bg transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#25d162] to-[#1d1d1d] p-6 shadow-lg rounded-b-3xl text-white">
        <p className="text-sm opacity-90">Rawalpindi, Pakistan</p>
        <p className="text-xs opacity-70">{formattedDate}</p>

        <h1 className="text-5xl text-white font-extrabold mt-2 tracking-wide">
          {formattedTime}
        </h1>
        {nextPrayer && (
          <p className="text-xs mt-1 text-gray-200">
            {nextPrayer.label} is only{" "}
            <span className="text-[#25d162] font-semibold">
              {getCountdown()}
            </span>{" "}
            away
          </p>
        )}

        {/* Prayer Times */}
        <div className="grid grid-cols-6 gap-3 mt-6 text-center text-xs">
          {prayerTimes &&
            [
              { label: "Fajr", time: prayerTimes.Fajr, icon: <FaSun /> },
              { label: "Sunrise", time: prayerTimes.Sunrise, icon: <FaSun /> },
              { label: "Dhuhr", time: prayerTimes.Dhuhr, icon: <FaSun /> },
              { label: "Asr", time: prayerTimes.Asr, icon: <FaSun /> },
              { label: "Maghrib", time: prayerTimes.Maghrib, icon: <FaMoon /> },
              { label: "Isha", time: prayerTimes.Isha, icon: <FaMoon /> },
            ].map((p, i) => (
              <div
                key={i}
                className="bg-white/10 backdrop-blur-md rounded-xl p-2 flex flex-col items-center shadow-md"
              >
                <div className="text-lg mb-1 text-[#25d162]">{p.icon}</div>
                <p className="font-semibold">{p.label}</p>
                <p className="text-[#25d162] font-bold">
                  {formatTo12Hour(p.time)}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Menu */}
      {/* Quick Menu */}
      <div
        className="grid grid-cols-4 gap-4 px-6 py-5 
  bg-white/70 dark:bg-gray-900/70 
  backdrop-blur-md text-[#2b2b2b] dark:text-gray-200 
  shadow-lg rounded-3xl mx-4 mt-3 transition-colors duration-300"
      >
        {[
          { icon: <FaBookOpen />, label: "Last Read" },
          { icon: <FaQuran />, label: "Quran" },
          { icon: <FaPrayingHands />, label: "Duas" },
          { icon: <FaMosque />, label: "Hifz" },
          { icon: <FaPrayingHands />, label: "Qibla" },
          { icon: <FaClock />, label: "Prayer" },
          { icon: <FaMosque />, label: "Apps" },
          { icon: <FaDonate />, label: "Donation" },
        ].map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center 
      bg-white dark:bg-gray-800 
      rounded-xl p-3 transition-all duration-200 
      cursor-pointer group shadow hover:shadow-xl hover:scale-105"
          >
            <div className="text-[#25d162] text-2xl group-hover:scale-125 transition-transform">
              {item.icon}
            </div>
            <p className="text-xs mt-1 font-semibold group-hover:text-[#25d162]">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Today’s Activities */}
      <div
        className="bg-white dark:bg-gray-900 
  text-[#2b2b2b] dark:text-gray-200 
  rounded-3xl mx-6 mt-6 p-6 shadow-lg transition-colors duration-300"
      >
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Today's Activities</h2>
          <span className="text-sm font-semibold text-[#25d162] bg-[#25d162]/10 px-3 py-1 rounded-lg shadow-sm">
            33%
          </span>
        </div>

        <p className="text-sm opacity-70 mt-1">
          Complete the daily activity checklist.
        </p>

        <p className="text-sm mt-3 font-medium">8 of 24 Tasks</p>

        {/* Progress Bar */}
        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-3 overflow-hidden">
          <div className="absolute top-0 left-0 h-3 bg-gradient-to-r from-[#25d162] to-green-700 rounded-full w-1/3 transition-all duration-500 ease-out"></div>
        </div>

        <button className="mt-5 w-full bg-gradient-to-r from-[#25d162] to-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200">
          Go to Checklist
        </button>
      </div>
    </div>
  );
};

export default Home;
