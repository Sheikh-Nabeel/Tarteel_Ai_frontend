import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { FaCompass, FaLocationArrow, FaKaaba } from "react-icons/fa";

const Qibla = () => {
  const theme = useTheme();
  const [heading, setHeading] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(0);

  // Kaaba coordinates (Mecca, Saudi Arabia)
  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  /**
   * Calculate Qibla direction using spherical trigonometry
   * @param {number} userLat - User's latitude
   * @param {number} userLon - User's longitude
   * @returns {number} - Qibla bearing in degrees
   */
  const calculateQiblaDirection = (userLat, userLon) => {
    const toRadians = (deg) => (deg * Math.PI) / 180;
    const toDegrees = (rad) => (rad * 180) / Math.PI;

    const lat1 = toRadians(userLat);
    const lat2 = toRadians(KAABA_LAT);
    const deltaLon = toRadians(KAABA_LON - userLon);

    const x = Math.sin(deltaLon) * Math.cos(lat2);
    const y = Math.cos(lat1) * Math.sin(lat2) - 
              Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);

    let bearing = toDegrees(Math.atan2(x, y));
    
    // Normalize to 0-360 degrees
    return (bearing + 360) % 360;
  };

  // Request device orientation permission
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

  // Get user location and calculate Qibla direction
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(userLocation);
        
        // Calculate Qibla direction
        const qiblaAngle = calculateQiblaDirection(userLocation.lat, userLocation.lon);
        setQiblaDirection(qiblaAngle);
      },
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true }
    );
  }, []);

  // Calculate relative Qibla direction (compass heading vs Qibla direction)
  const relativeQiblaDirection = (qiblaDirection - heading + 360) % 360;

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
          <FaKaaba className="inline-block mr-3 text-green-500 drop-shadow-md" />
          Qibla Direction
        </h1>
        <p
          className="text-lg opacity-80"
          style={{ color: theme.colors.textSecondary }}
        >
          Find the direction of Kaaba for your prayers
        </p>
        <div className="mt-3 w-28 h-1 mx-auto bg-gradient-to-r from-green-500 to-green-700 rounded-full shadow"></div>
      </motion.div>

      {/* Compass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-80 h-80 rounded-full flex items-center justify-center 
        bg-white/50 dark:bg-gray-900/60 shadow-2xl backdrop-blur-xl border border-white/20 overflow-hidden z-10"
      >
        {/* Compass Background Markings */}
        <div className="absolute inset-4 rounded-full border border-green-300/30">
          {/* Cardinal directions */}
          {['N', 'E', 'S', 'W'].map((direction, index) => (
            <div
              key={direction}
              className="absolute text-xs font-bold text-green-600"
              style={{
                top: index === 0 ? '8px' : index === 2 ? 'auto' : '50%',
                bottom: index === 2 ? '8px' : 'auto',
                left: index === 3 ? '8px' : index === 1 ? 'auto' : '50%',
                right: index === 1 ? '8px' : 'auto',
                transform: (index === 0 || index === 2) ? 'translateX(-50%)' : 
                          (index === 1 || index === 3) ? 'translateY(-50%)' : 'none'
              }}
            >
              {direction}
            </div>
          ))}
        </div>

        {/* Pulsing Glow Ring */}
        <motion.div
          className="absolute w-72 h-72 rounded-full border-2 border-green-500/40"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Device Orientation Needle (North) */}
        <motion.div
          animate={{ rotate: -heading }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="absolute w-60 h-60 rounded-full flex items-center justify-center"
        >
          <FaLocationArrow className="text-blue-500 text-3xl transform -translate-y-24 drop-shadow-lg" />
        </motion.div>

        {/* Qibla Direction Indicator */}
        <motion.div
          animate={{ rotate: relativeQiblaDirection }}
          transition={{ type: "spring", stiffness: 150, damping: 25 }}
          className="absolute w-64 h-64 rounded-full flex items-center justify-center"
        >
          <div className="absolute -translate-y-28 flex flex-col items-center">
            <FaKaaba className="text-green-600 text-4xl drop-shadow-lg mb-1" />
            <div className="w-1 h-8 bg-green-600 rounded-full shadow-md"></div>
          </div>
        </motion.div>

        {/* Center Dot */}
        <div className="w-3 h-3 bg-green-600 rounded-full shadow-lg z-10"></div>
      </motion.div>

      {/* Qibla Information Panel */}
      {location && qiblaDirection && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-8 p-6 rounded-xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md 
          shadow-lg border border-white/20 text-center z-10 max-w-sm"
        >
          <h3 
            className="text-lg font-bold mb-3"
            style={{ color: theme.colors.text }}
          >
            🧭 Direction Details
          </h3>
          <div className="space-y-2 text-sm" style={{ color: theme.colors.textSecondary }}>
            <p><strong>Qibla Bearing:</strong> {qiblaDirection.toFixed(1)}°</p>
            <p><strong>Your Heading:</strong> {heading.toFixed(1)}°</p>
            <p><strong>Distance to Kaaba:</strong> ~{(
              Math.acos(
                Math.sin(location.lat * Math.PI / 180) * Math.sin(KAABA_LAT * Math.PI / 180) +
                Math.cos(location.lat * Math.PI / 180) * Math.cos(KAABA_LAT * Math.PI / 180) *
                Math.cos((KAABA_LON - location.lon) * Math.PI / 180)
              ) * 6371
            ).toFixed(0)} km</p>
          </div>
        </motion.div>
      )}

      {/* Permission Button */}
      {!permissionGranted && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          onClick={requestOrientationPermission}
          className="mt-12 px-8 py-4 rounded-xl font-semibold text-white shadow-lg 
          bg-gradient-to-r from-green-500 to-green-700 hover:shadow-2xl transition-all duration-300 z-10"
        >
          🧭 Enable Compass
        </motion.button>
      )}

      {/* Location Info */}
      {location && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="mt-6 text-sm text-center opacity-80 z-10"
          style={{ color: theme.colors.textSecondary }}
        >
          📍 Your Location: {location.lat.toFixed(4)}, {location.lon.toFixed(4)}
        </motion.p>
      )}
    </div>
  );
};

export default Qibla;