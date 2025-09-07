import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

// Add custom CSS animations
const compassStyles = `
  @keyframes compassPulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.8; }
  }
  
  @keyframes needleGlow {
    0%, 100% { filter: drop-shadow(0 0 8px currentColor); }
    50% { filter: drop-shadow(0 0 15px currentColor); }
  }
  
  @keyframes compassRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  
  .compass-container {
    animation: compassPulse 3s ease-in-out infinite;
  }
  
  .compass-needle {
    animation: needleGlow 2s ease-in-out infinite;
  }
  
  .compass-active .compass-needle {
    transition: transform 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .compass-inactive .compass-needle {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = compassStyles;
  document.head.appendChild(styleSheet);
}

const Qibla = () => {
  const theme = useTheme();
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [deviceHeading, setDeviceHeading] = useState(0);
  const [smoothedHeading, setSmoothedHeading] = useState(0);
  const [distanceToKaaba, setDistanceToKaaba] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [compassSupported, setCompassSupported] = useState(false);
  const [calibrationNeeded, setCalibrationNeeded] = useState(false);
  const [isCompassActive, setIsCompassActive] = useState(false);
  const [headingHistory, setHeadingHistory] = useState([]);

  const getCompassRotation = () => {
    if (qiblaDirection !== null && isCompassActive) {
      return qiblaDirection - smoothedHeading;
    }
    return qiblaDirection || 0;
  };

  const getLocation = () => {
    setLoading(true);
    setError(null);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          calculateQiblaDirection(latitude, longitude);
          setLoading(false);
        },
        (error) => {
          setError('Unable to get your location. Please enable location services.');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const calculateQiblaDirection = (lat, lng) => {
    // Kaaba coordinates
    const kaabaLat = 21.4225;
    const kaabaLng = 39.8262;
    
    // Convert to radians
    const latRad = lat * Math.PI / 180;
    const lngRad = lng * Math.PI / 180;
    const kaabaLatRad = kaabaLat * Math.PI / 180;
    const kaabaLngRad = kaabaLng * Math.PI / 180;
    
    // Calculate bearing
    const dLng = kaabaLngRad - lngRad;
    const y = Math.sin(dLng) * Math.cos(kaabaLatRad);
    const x = Math.cos(latRad) * Math.sin(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLatRad) * Math.cos(dLng);
    
    let bearing = Math.atan2(y, x) * 180 / Math.PI;
    bearing = (bearing + 360) % 360; // Normalize to 0-360
    
    setQiblaDirection(bearing);
    
    // Calculate distance to Kaaba
    const distance = calculateDistance(lat, lng, kaabaLat, kaabaLng);
    setDistanceToKaaba(distance);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const smoothHeading = (newHeading, history) => {
    const maxHistory = 5;
    const updatedHistory = [...history, newHeading].slice(-maxHistory);
    
    // Apply exponential moving average for smoothing
    const alpha = 0.3;
    let smoothed = updatedHistory[0];
    
    for (let i = 1; i < updatedHistory.length; i++) {
      let diff = updatedHistory[i] - smoothed;
      
      // Handle 360-degree wrap around
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;
      
      smoothed += alpha * diff;
      if (smoothed < 0) smoothed += 360;
      if (smoothed >= 360) smoothed -= 360;
    }
    
    return { smoothed, history: updatedHistory };
  };

  const handleDeviceOrientation = (event) => {
    if (event.alpha !== null) {
      let heading = event.alpha;
      
      // Use webkitCompassHeading for iOS devices for better accuracy
      if (event.webkitCompassHeading !== undefined) {
        heading = event.webkitCompassHeading;
      } else {
        // For Android, convert alpha to compass heading
        heading = 360 - heading;
      }
      
      // Ensure heading is in 0-360 range
      heading = ((heading % 360) + 360) % 360;
      
      setDeviceHeading(heading);
      
      // Apply smoothing
      const { smoothed, history } = smoothHeading(heading, headingHistory);
      setSmoothedHeading(smoothed);
      setHeadingHistory(history);
      
      setCalibrationNeeded(event.alpha === 0 || Math.abs(event.alpha) < 1);
      setIsCompassActive(true);
    }
  };

  const handleDeviceMotion = (event) => {
    // Use gyroscope data for more responsive updates
    if (event.rotationRate && event.rotationRate.alpha !== null) {
      const rotationRate = event.rotationRate.alpha;
      // Additional processing can be added here for gyroscope integration
    }
  };

  const requestOrientationPermission = async () => {
    try {
      // Request permission for iOS 13+ devices
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        const orientationPermission = await DeviceOrientationEvent.requestPermission();
        if (orientationPermission !== 'granted') {
          setError('Device orientation permission denied');
          return;
        }
      }
      
      // Request permission for device motion (gyroscope)
      if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
        const motionPermission = await DeviceMotionEvent.requestPermission();
        if (motionPermission !== 'granted') {
          setError('Device motion permission denied');
          return;
        }
      }
      
      // Check if device orientation is supported
      if (window.DeviceOrientationEvent) {
        setCompassSupported(true);
        
        // Add event listeners with high frequency updates
        window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });
        
        // Add device motion listener for gyroscope data
        if (window.DeviceMotionEvent) {
          window.addEventListener('devicemotion', handleDeviceMotion, { passive: true });
        }
        
        setError(null);
      } else {
        setError('Device orientation not supported on this device');
      }
    } catch (error) {
      setError('Error requesting device permissions: ' + error.message);
    }
  };

  useEffect(() => {
    // Auto-enable compass on component mount if supported
    if (window.DeviceOrientationEvent && !compassSupported) {
      requestOrientationPermission();
    }
    
    return () => {
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      window.removeEventListener('devicemotion', handleDeviceMotion);
    };
  }, []);

  // Update compass smoothly with animation frame
  useEffect(() => {
    let animationFrame;
    
    const updateCompass = () => {
      if (isCompassActive && qiblaDirection !== null) {
        // Trigger re-render for smooth animation
        animationFrame = requestAnimationFrame(updateCompass);
      }
    };
    
    if (isCompassActive) {
      updateCompass();
    }
    
    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isCompassActive, qiblaDirection]);

  return (
    <div 
      className="min-h-screen pt-16 pb-20"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold mb-4"
            style={{ color: theme.colors.text }}
          >
            Qibla Direction
          </h1>
          <p 
            className="text-lg"
            style={{ color: theme.colors.textSecondary }}
          >
            Find the direction of Kaaba from your location
          </p>
        </div>
        
        <div className="max-w-md mx-auto">
          <div 
            className="rounded-lg shadow-md p-6 text-center"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            {!location && !loading && (
              <div>
                <div className="text-6xl mb-4" style={{ color: theme.colors.primary }}>
                  <i className="fas fa-compass"></i>
                </div>
                <p className="mb-6" style={{ color: theme.colors.textSecondary }}>Click the button below to get your location and find Qibla direction</p>
                <button 
                  onClick={getLocation}
                  className="px-6 py-3 rounded-lg transition-colors font-semibold"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white
                  }}
                >
                  Get My Location
                </button>
              </div>
            )}
            
            {loading && (
              <div>
                <div className="text-6xl mb-4 animate-spin" style={{ color: theme.colors.primary }}>
                  <i className="fas fa-spinner"></i>
                </div>
                <p style={{ color: theme.colors.textSecondary }}>Getting your location...</p>
              </div>
            )}
            
            {error && (
              <div>
                <div className="text-red-500 text-6xl mb-4">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={getLocation}
                  className="px-6 py-3 rounded-lg transition-colors font-semibold"
                  style={{
                    backgroundColor: theme.colors.primary,
                    color: theme.colors.white
                  }}
                >
                  Try Again
                </button>
              </div>
            )}
            
            {location && qiblaDirection !== null && (
              <div>
                {/* Enhanced Visual Compass */}
                <div className={`compass-container relative w-80 h-80 mx-auto mb-6 ${isCompassActive ? 'compass-active' : 'compass-inactive'}`}>
                  {/* Outer compass ring */}
                  <div 
                    className="absolute inset-0 rounded-full border-4 shadow-2xl"
                    style={{ 
                      borderColor: theme.colors.primary,
                      background: `conic-gradient(from 0deg, ${theme.colors.cardBg} 0deg, ${theme.colors.background} 90deg, ${theme.colors.cardBg} 180deg, ${theme.colors.background} 270deg, ${theme.colors.cardBg} 360deg)`,
                      boxShadow: `0 0 30px ${theme.colors.primary}40`
                    }}
                  >
                    {/* Degree markings */}
                    {[...Array(36)].map((_, i) => {
                      const angle = i * 10;
                      const isMainDirection = angle % 90 === 0;
                      const isSubDirection = angle % 30 === 0;
                      return (
                        <div
                          key={i}
                          className="absolute w-0.5 origin-bottom"
                          style={{
                            height: isMainDirection ? '20px' : isSubDirection ? '15px' : '10px',
                            backgroundColor: theme.colors.text,
                            left: '50%',
                            top: '8px',
                            transform: `translateX(-50%) rotate(${angle}deg)`,
                            transformOrigin: '50% 140px'
                          }}
                        />
                      );
                    })}
                    
                    {/* Cardinal directions */}
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-lg font-bold" style={{ color: theme.colors.primary }}>N</div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-lg font-bold" style={{ color: theme.colors.text }}>S</div>
                    <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-lg font-bold" style={{ color: theme.colors.text }}>W</div>
                    <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-lg font-bold" style={{ color: theme.colors.text }}>E</div>
                    
                    {/* Qibla needle with enhanced design */}
                     <div 
                       className="compass-needle absolute top-1/2 left-1/2 origin-bottom transform -translate-x-1/2 -translate-y-full"
                       style={{ 
                         transform: `translate(-50%, -100%) rotate(${getCompassRotation()}deg)`
                       }}
                     >
                      {/* Needle body */}
                      <div 
                        className="w-2 h-28 rounded-full shadow-lg"
                        style={{ 
                          background: `linear-gradient(to top, ${theme.colors.primary}, #10b981)`,
                          boxShadow: `0 0 15px ${theme.colors.primary}80`
                        }}
                      >
                        {/* Needle tip */}
                        <div 
                          className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-0 h-0"
                          style={{
                            borderLeft: '6px solid transparent',
                            borderRight: '6px solid transparent',
                            borderBottom: `12px solid ${theme.colors.primary}`,
                            filter: `drop-shadow(0 0 8px ${theme.colors.primary}80)`
                          }}
                        />
                      </div>
                    </div>
                    
                    {/* Center hub */}
                    <div 
                      className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 border-2 shadow-lg"
                      style={{ 
                        backgroundColor: theme.colors.cardBg,
                        borderColor: theme.colors.primary,
                        boxShadow: `0 0 10px ${theme.colors.primary}60`
                      }}
                    />
                  </div>
                  
                  {/* Kaaba icon with glow effect */}
                  <div 
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-3xl"
                    style={{
                      filter: `drop-shadow(0 0 8px ${theme.colors.primary}60)`,
                      animation: isCompassActive ? 'pulse 2s infinite' : 'none'
                    }}
                  >
                    🕋
                  </div>
                  
                  {/* Compass status indicator */}
                  {isCompassActive && (
                    <div 
                      className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-pulse"
                      style={{ backgroundColor: '#10b981' }}
                    />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.colors.text }}>Qibla Direction</h3>
                <p className="text-2xl font-bold mb-2" style={{ color: theme.colors.primary }}>{Math.round(qiblaDirection)}°</p>
                <p className="text-sm mb-2" style={{ color: theme.colors.textSecondary }}>from North</p>
                
                {/* Enhanced Distance display */}
                {distanceToKaaba && (
                  <div className="text-center mb-6">
                    <div 
                      className="inline-block px-6 py-3 rounded-full border-2 shadow-lg"
                      style={{ 
                        backgroundColor: theme.colors.cardBg,
                        borderColor: theme.colors.primary,
                        boxShadow: `0 4px 15px ${theme.colors.primary}20`
                      }}
                    >
                      <p className="text-lg font-semibold" style={{ color: theme.colors.text }}>
                        Distance to Kaaba
                      </p>
                      <p className="text-2xl font-bold" style={{ color: theme.colors.primary }}>
                        {Math.round(distanceToKaaba)} km
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="text-sm space-y-1 mb-4" style={{ color: theme.colors.textSecondary }}>
                  <p>Latitude: {location.latitude.toFixed(4)}</p>
                  <p>Longitude: {location.longitude.toFixed(4)}</p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                  <button
                    onClick={getLocation}
                    className="group px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: theme.colors.primary,
                      color: 'white',
                      boxShadow: `0 4px 15px ${theme.colors.primary}30`
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.boxShadow = `0 6px 20px ${theme.colors.primary}50`;
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.boxShadow = `0 4px 15px ${theme.colors.primary}30`;
                    }}
                  >
                    <span className="flex items-center gap-2">
                      📍 Refresh Location
                    </span>
                  </button>
                  
                  {!isCompassActive ? (
                    <button
                      onClick={requestOrientationPermission}
                      className="group px-8 py-4 rounded-xl font-semibold border-2 transition-all duration-300 transform hover:scale-105 shadow-lg"
                      style={{
                        borderColor: theme.colors.primary,
                        color: theme.colors.primary,
                        backgroundColor: 'transparent',
                        boxShadow: `0 4px 15px ${theme.colors.primary}20`
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = theme.colors.primary;
                        e.target.style.color = 'white';
                        e.target.style.boxShadow = `0 6px 20px ${theme.colors.primary}40`;
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = theme.colors.primary;
                        e.target.style.boxShadow = `0 4px 15px ${theme.colors.primary}20`;
                      }}
                    >
                      <span className="flex items-center gap-2">
                        🧭 Enable Compass
                      </span>
                    </button>
                  ) : (
                    <div 
                      className="flex items-center gap-3 px-8 py-4 rounded-xl border-2 shadow-lg"
                      style={{
                        borderColor: '#10b981',
                        backgroundColor: theme.colors.cardBg,
                        boxShadow: '0 4px 15px #10b98120'
                      }}
                    >
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-lg"></div>
                      <span className="font-semibold" style={{ color: '#10b981' }}>Compass Active</span>
                      <span className="text-sm" style={{ color: theme.colors.textSecondary }}>Real-time tracking</span>
                    </div>
                  )}
                </div>
                
                {calibrationNeeded && (
                  <div 
                    className="mt-4 p-6 rounded-xl border-2 shadow-lg animate-pulse"
                    style={{ 
                      backgroundColor: theme.colors.cardBg, 
                      borderColor: '#f59e0b',
                      boxShadow: '0 4px 15px #f59e0b20'
                    }}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="text-2xl">⚠️</div>
                      <h3 className="font-bold text-lg" style={{ color: '#f59e0b' }}>Compass Calibration Required</h3>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium" style={{ color: theme.colors.text }}>
                        For accurate Qibla direction, please calibrate your device:
                      </p>
                      <div className="flex items-center gap-2 text-sm" style={{ color: theme.colors.textSecondary }}>
                        <span className="text-lg">📱</span>
                        <span>Move your device in a figure-8 pattern</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: theme.colors.textSecondary }}>
                        <span className="text-lg">🔄</span>
                        <span>Rotate slowly in all directions</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm" style={{ color: theme.colors.textSecondary }}>
                        <span className="text-lg">✨</span>
                        <span>Keep away from magnetic objects</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div 
            className="mt-6 rounded-lg shadow-md p-4"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <h4 className="font-semibold mb-2" style={{ color: theme.colors.primary }}>Instructions:</h4>
            <ul className="text-sm space-y-1" style={{ color: theme.colors.textSecondary }}>
              <li>• Allow location and compass access when prompted</li>
              <li>• Hold your device flat and level</li>
              <li>• The green needle points toward Kaaba</li>
              <li>• For best accuracy, use outdoors away from metal objects</li>
              <li>• Calibrate compass if needed by moving device in figure-8</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qibla;