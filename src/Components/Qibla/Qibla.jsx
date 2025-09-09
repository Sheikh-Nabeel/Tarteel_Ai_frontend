import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { FaCompass, FaLocationArrow } from "react-icons/fa";
import { TbBuildingMosque } from "react-icons/tb";

const Qibla = () => {
  const theme = useTheme();
  const [heading, setHeading] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [distance, setDistance] = useState(0);

  // Kaaba coordinates (Mecca, Saudi Arabia)
  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  // Calculate Qibla direction using spherical trigonometry
  const calculateQiblaDirection = (userLat, userLon) => {
    const lat1 = (userLat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLon = ((KAABA_LON - userLon) * Math.PI) / 180;

    const x = Math.sin(deltaLon) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

    let bearing = Math.atan2(x, y);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;

    return bearing;
  };

  // Calculate distance to Kaaba
  const calculateDistance = (userLat, userLon) => {
    const R = 6371; // Earth's radius in kilometers
    const lat1 = (userLat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLat = ((KAABA_LAT - userLat) * Math.PI) / 180;
    const deltaLon = ((KAABA_LON - userLon) * Math.PI) / 180;

    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
              Math.cos(lat1) * Math.cos(lat2) *
              Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

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

  // Get location and calculate Qibla direction
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(userLocation);
        
        // Calculate Qibla direction and distance
        const qiblaDir = calculateQiblaDirection(userLocation.lat, userLocation.lon);
        const dist = calculateDistance(userLocation.lat, userLocation.lon);
        
        setQiblaDirection(qiblaDir);
        setDistance(dist);
      },
      (err) => {
        console.error('Geolocation error:', err);
        // Fallback to a default location (e.g., New York)
        const defaultLocation = { lat: 40.7128, lon: -74.0060 };
        setLocation(defaultLocation);
        const qiblaDir = calculateQiblaDirection(defaultLocation.lat, defaultLocation.lon);
        const dist = calculateDistance(defaultLocation.lat, defaultLocation.lon);
        setQiblaDirection(qiblaDir);
        setDistance(dist);
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
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

        {/* Compass Rose */}
        <motion.div
          animate={{ rotate: -heading }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute w-60 h-60 rounded-full border-4 border-green-500/30 flex items-center justify-center"
        >
          {/* North indicator */}
          <div className="absolute top-2 text-green-600 font-bold text-lg">N</div>
          
          {/* Compass needle pointing North */}
          <FaLocationArrow className="text-green-600 text-3xl transform rotate-180 drop-shadow-lg" />
        </motion.div>

        {/* Qibla Direction Indicator */}
        <motion.div
          animate={{ rotate: qiblaDirection - heading }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute w-52 h-52 rounded-full flex items-center justify-center"
        >
          {/* Qibla direction line */}
          <div className="absolute w-1 h-24 bg-gradient-to-t from-yellow-500 to-yellow-300 rounded-full top-2 shadow-lg"></div>
          
          {/* Kaaba icon */}
          <motion.div
            className="absolute top-0 transform -translate-y-2"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <TbBuildingMosque className="text-yellow-500 text-4xl drop-shadow-lg" />
          </motion.div>
          
          {/* Qibla label */}
          <div className="absolute top-12 text-yellow-500 font-bold text-sm bg-black/20 px-2 py-1 rounded backdrop-blur-sm">
            QIBLA
          </div>
        </motion.div>

        {/* Center dot */}
        <div className="absolute w-4 h-4 bg-green-500 rounded-full shadow-lg"></div>
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

      {/* Location and Qibla Info */}
      {location && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 text-center z-10 space-y-3"
        >
          <div
            className="bg-white/10 dark:bg-gray-900/30 backdrop-blur-sm rounded-xl p-4 border border-white/20"
          >
            <p
              className="text-sm opacity-80 mb-2"
              style={{ color: theme.colors.textSecondary }}
            >
              📍 Your Location: {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
            </p>
            <p
              className="text-lg font-semibold mb-1"
              style={{ color: theme.colors.text }}
            >
              🕋 Qibla Direction: {qiblaDirection.toFixed(1)}°
            </p>
            <p
              className="text-sm opacity-80"
              style={{ color: theme.colors.textSecondary }}
            >
              📏 Distance to Kaaba: {distance.toFixed(0)} km
            </p>
          </div>
          
          {permissionGranted && (
            <p
              className="text-xs opacity-60"
              style={{ color: theme.colors.textSecondary }}
            >
              🧭 Compass is active - Yellow icon shows Qibla direction
            </p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default Qibla;
