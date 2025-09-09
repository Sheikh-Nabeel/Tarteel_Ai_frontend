import React, { useEffect, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { FaCompass, FaLocationArrow, FaMapMarkerAlt } from "react-icons/fa";

const Qibla = () => {
  const theme = useTheme();
  const [heading, setHeading] = useState(0);
  const [qiblaDirection, setQiblaDirection] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [location, setLocation] = useState(null);
  const [accuracy, setAccuracy] = useState(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [magneticDeclination, setMagneticDeclination] = useState(0);

  // Kaaba coordinates (Mecca)
  const KAABA_LAT = 21.4225;
  const KAABA_LON = 39.8262;

  // Calculate Qibla direction using spherical trigonometry
  const calculateQiblaDirection = (userLat, userLon) => {
    const lat1 = (userLat * Math.PI) / 180;
    const lat2 = (KAABA_LAT * Math.PI) / 180;
    const deltaLon = ((KAABA_LON - userLon) * Math.PI) / 180;

    const y = Math.sin(deltaLon) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLon);
    
    let bearing = Math.atan2(y, x);
    bearing = (bearing * 180) / Math.PI;
    bearing = (bearing + 360) % 360;
    
    return bearing;
  };

  // Get magnetic declination for location (simplified calculation)
  const getMagneticDeclination = async (lat, lon) => {
    try {
      // Using a simplified magnetic declination calculation
      // For production, you'd use a proper magnetic declination API
      const declination = Math.sin((lat * Math.PI) / 180) * 15; // Simplified formula
      return declination;
    } catch (error) {
      console.warn('Could not get magnetic declination:', error);
      return 0;
    }
  };

  // Request device orientation permission
  const requestOrientationPermission = async () => {
    setIsCalibrating(true);
    try {
      if (typeof DeviceOrientationEvent?.requestPermission === "function") {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === "granted") {
          setPermissionGranted(true);
        }
      } else {
        setPermissionGranted(true);
      }
    } catch (error) {
      console.error('Permission request failed:', error);
    } finally {
      setTimeout(() => setIsCalibrating(false), 2000);
    }
  };

  // Enhanced orientation handling with real-time updates
  useEffect(() => {
    if (!permissionGranted) return;

    let lastHeading = 0;
    const smoothingFactor = 0.3; // Increased for more responsiveness

    const handleOrientation = (e) => {
      if (e.alpha !== null) {
        let newHeading = e.alpha;
        
        // Apply magnetic declination correction
        newHeading += magneticDeclination;
        
        // Normalize heading to 0-360 range
        newHeading = (newHeading + 360) % 360;
        
        // Smooth the heading to reduce jitter while maintaining responsiveness
        const smoothedHeading = lastHeading + smoothingFactor * (newHeading - lastHeading);
        lastHeading = smoothedHeading;
        
        setHeading(smoothedHeading);
        setAccuracy(e.webkitCompassAccuracy || null);
      }
    };

    // Use higher frequency updates for better real-time response
    window.addEventListener("deviceorientationabsolute", handleOrientation, true);
    window.addEventListener("deviceorientation", handleOrientation, true);

    return () => {
      window.removeEventListener("deviceorientationabsolute", handleOrientation, true);
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, [permissionGranted, magneticDeclination]);

  // Get user location and calculate Qibla direction
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const userLocation = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };
        setLocation(userLocation);
        
        // Calculate Qibla direction
        const qibla = calculateQiblaDirection(userLocation.lat, userLocation.lon);
        setQiblaDirection(qibla);
        
        // Get magnetic declination for this location
        const declination = await getMagneticDeclination(userLocation.lat, userLocation.lon);
        setMagneticDeclination(declination);
      },
      (err) => {
        console.error('Geolocation error:', err);
        // Fallback to a default location (e.g., New York)
        const defaultLocation = { lat: 40.7128, lon: -74.0060 };
        setLocation(defaultLocation);
        const qibla = calculateQiblaDirection(defaultLocation.lat, defaultLocation.lon);
        setQiblaDirection(qibla);
      },
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000 // 5 minutes
      }
    );
  }, []);

  // Calculate the relative angle between device heading and Qibla direction
  let qiblaAngle = qiblaDirection - heading;
  // Normalize to -180 to 180 range for proper direction indication
  if (qiblaAngle > 180) qiblaAngle -= 360;
  if (qiblaAngle < -180) qiblaAngle += 360;

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
        className="text-center mb-8 relative z-10"
      >
        <h1
          className="text-4xl md:text-5xl font-extrabold mb-3"
          style={{ color: theme.colors.text }}
        >
          <FaCompass className="inline-block mr-2 text-green-500 drop-shadow-md" />
          Qibla Compass
        </h1>
        <p
          className="text-lg opacity-80"
          style={{ color: theme.colors.textSecondary }}
        >
          Accurate direction to the Holy Kaaba
        </p>
        <div className="mt-3 w-28 h-1 mx-auto bg-gradient-to-r from-primary to-green-700 rounded-full shadow"></div>
        
        {/* Qibla Direction Info */}
        {location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 text-sm"
            style={{ color: theme.colors.textSecondary }}
          >
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <span>📍 Qibla: {qiblaDirection.toFixed(1)}°</span>
              <span>🧭 Heading: {heading.toFixed(1)}°</span>
              {accuracy && <span>📶 Accuracy: ±{accuracy.toFixed(1)}°</span>}
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Compass Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="relative w-80 h-80 rounded-full flex items-center justify-center 
        bg-white/50 dark:bg-gray-900/60 shadow-2xl backdrop-blur-xl border border-white/20 overflow-hidden z-10"
      >
        {/* Static compass background */}
        <div className="absolute w-full h-full rounded-full"></div>

        {/* Pulsing Glow Ring */}
        <motion.div
          className={`absolute w-72 h-72 rounded-full border-2 ${
            Math.abs(qiblaAngle) < 5 ? 'border-green-500' : 
            Math.abs(qiblaAngle) < 15 ? 'border-yellow-500' : 'border-red-500/40'
          }`}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        ></motion.div>

        {/* Compass Rose that rotates with device heading */}
        <motion.div
          animate={{ rotate: -heading }}
          transition={{ type: "spring", stiffness: 120, damping: 25, mass: 0.8 }}
          className="absolute w-full h-full"
        >
          {/* Cardinal directions */}
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold" style={{ color: theme.colors.text }}>N</div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-bold" style={{ color: theme.colors.text }}>S</div>
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs font-bold" style={{ color: theme.colors.text }}>E</div>
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-xs font-bold" style={{ color: theme.colors.text }}>W</div>
          
          {/* Degree markings */}
          {[...Array(36)].map((_, i) => {
            const angle = i * 10;
            const isMainDirection = angle % 90 === 0;
            return (
              <div
                key={i}
                className={`absolute w-0.5 ${isMainDirection ? 'h-6 bg-gray-600' : 'h-3 bg-gray-400'} top-0 left-1/2 transform -translate-x-1/2 origin-bottom`}
                style={{ transform: `translateX(-50%) rotate(${angle}deg) translateY(${isMainDirection ? '8px' : '12px'})` }}
              />
            );
          })}

          {/* Qibla Direction Indicator (Fixed relative to North) */}
          <motion.div
            animate={{ rotate: qiblaDirection }}
            transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.6 }}
            className="absolute w-1 h-32 bg-gradient-to-t from-green-600 to-green-400 rounded-full top-6 left-1/2 transform -translate-x-1/2 origin-bottom shadow-lg"
          >
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <FaLocationArrow className="text-green-600 text-xl drop-shadow-md" />
            </div>
          </motion.div>
        </motion.div>

        {/* Device Heading Needle (Always points North) */}
        <div className="absolute w-0.5 h-28 bg-gradient-to-t from-red-600 to-red-400 rounded-full top-10 left-1/2 transform -translate-x-1/2 origin-bottom">
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2">
            <FaLocationArrow className="text-red-600 text-sm" />
          </div>
        </div>

        {/* Center Circle */}
        <div className="absolute w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 border-2 border-white shadow-lg flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-gray-700"></div>
        </div>

        {/* Calibration Indicator */}
        {isCalibrating && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="absolute w-full h-full border-4 border-transparent border-t-blue-500 rounded-full"
          />
        )}
      </motion.div>

      {/* Direction Status */}
      {location && permissionGranted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center z-10"
        >
          <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
            Math.abs(qiblaAngle) < 5 ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
            Math.abs(qiblaAngle) < 15 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
            'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
          }`}>
            {Math.abs(qiblaAngle) < 5 ? '✅ Aligned with Qibla' :
             Math.abs(qiblaAngle) < 15 ? '⚠️ Close to Qibla' :
             `🧭 Turn ${qiblaAngle > 0 ? 'left' : 'right'} ${Math.abs(qiblaAngle).toFixed(0)}°`}
          </div>
        </motion.div>
      )}

      {/* Permission Button */}
      {!permissionGranted && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center z-10"
        >
          <motion.button
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            onClick={requestOrientationPermission}
            disabled={isCalibrating}
            className={`px-8 py-4 rounded-xl font-semibold text-white shadow-lg transition-all duration-300 ${
              isCalibrating 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'bg-gradient-to-r from-primary to-green-700 hover:shadow-2xl'
            }`}
          >
            {isCalibrating ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Calibrating...
              </div>
            ) : (
              <>🧭 Enable Compass</>  
            )}
          </motion.button>
          <p className="mt-3 text-sm opacity-70" style={{ color: theme.colors.textSecondary }}>
            Allow device orientation access for accurate Qibla direction
          </p>
        </motion.div>
      )}

      {/* Compass Legend */}
      {permissionGranted && location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 max-w-sm mx-auto z-10"
        >
          <h3 className="text-sm font-semibold mb-3 text-center" style={{ color: theme.colors.text }}>
            Compass Guide
          </h3>
          <div className="space-y-2 text-xs" style={{ color: theme.colors.textSecondary }}>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Green needle: Qibla direction</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Blue needle: Your device heading</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 border-2 border-green-500 rounded-full"></div>
              <span>Ring color: Alignment accuracy</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Location Info */}
      {location && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 text-center z-10"
        >
          <div className="bg-white/10 dark:bg-gray-800/30 backdrop-blur-sm rounded-lg px-4 py-2 inline-block">
            <p className="text-xs" style={{ color: theme.colors.textSecondary }}>
              📍 Location: {location.lat.toFixed(4)}°, {location.lon.toFixed(4)}°
            </p>
            <p className="text-xs mt-1" style={{ color: theme.colors.textSecondary }}>
              🕋 Distance to Kaaba: {(
                Math.acos(
                  Math.sin(location.lat * Math.PI / 180) * Math.sin(KAABA_LAT * Math.PI / 180) +
                  Math.cos(location.lat * Math.PI / 180) * Math.cos(KAABA_LAT * Math.PI / 180) *
                  Math.cos((KAABA_LON - location.lon) * Math.PI / 180)
                ) * 6371
              ).toFixed(0)} km
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Qibla;
