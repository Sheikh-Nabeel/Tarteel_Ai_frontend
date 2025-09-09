import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { FaCompass, FaLocationArrow } from "react-icons/fa";

const Qibla = () => {
  const theme = useTheme();
  const [heading, setHeading] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);

  // Request device orientation
  const requestOrientationPermission = async () => {
    if (typeof DeviceOrientationEvent?.requestPermission === "function") {
      const response = await DeviceOrientationEvent.requestPermission();
      if (response === "granted") {
        setPermissionGranted(true);
      }
    } else {
      setPermissionGranted(true);
    }
  };

  // Listen to orientation changes
  useEffect(() => {
    if (!permissionGranted) return;

    const handleOrientation = (e) => {
      if (e.alpha !== null) {
        setHeading(e.alpha);
      }
    };
    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [permissionGranted]);

  // Get location for Qibla calc (dummy for now)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden"
      style={{ backgroundColor: theme.colors.background }}
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-green-700/10 animate-pulse"></div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 relative z-10"
      >
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-3"
          style={{ color: theme.colors.text }}
        >
          <FaCompass className="inline-block mr-2 text-green-500 drop-shadow-md" />
          Qibla Direction
        </h1>
        <p
          className="text-lg opacity-80"
          style={{ color: theme.colors.textSecondary }}
        >
          Find the direction of Kaaba for your prayers
        </p>
        <div className="mt-3 w-28 h-1 mx-auto bg-gradient-to-r from-primary to-green-700 rounded-full shadow"></div>
      </motion.div>

      {/* Compass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-80 h-80 rounded-full flex items-center justify-center 
        bg-white/50 dark:bg-gray-900/60 shadow-2xl backdrop-blur-xl border border-white/20 overflow-hidden z-10"
      >
        {/* Pulsing Glow Ring */}
        <motion.div
          className="absolute w-72 h-72 rounded-full border-2 border-green-500/40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Rotating Needle */}
        <motion.div
          animate={{ rotate: -heading }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute w-60 h-60 rounded-full border-4 border-green-500 flex items-center justify-center"
        >
          <FaLocationArrow className="text-green-600 text-5xl transform rotate-180 drop-shadow-lg" />
        </motion.div>
      </motion.div>

      {/* Permission Button */}
      {!permissionGranted && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={requestOrientationPermission}
          className="mt-12 px-8 py-4 rounded-xl font-semibold text-white shadow-lg 
          bg-gradient-to-r from-primary to-green-700 hover:shadow-2xl transition-all duration-300 z-10"
        >
          Enable Compass
        </motion.button>
      )}

      {/* Location Info */}
      {location && (
        <p
          className="mt-8 text-sm text-center opacity-80 z-10"
          style={{ color: theme.colors.textSecondary }}
        >
          📍 Your Location: {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
        </p>
      )}
    </div>
  );
};

export default Qibla;
