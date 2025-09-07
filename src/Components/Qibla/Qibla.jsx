import React, { useState, useEffect } from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const Qibla = () => {
  const theme = useTheme();
  const [location, setLocation] = useState(null);
  const [qiblaDirection, setQiblaDirection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
  };

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
                <div className="text-6xl mb-4" style={{ color: theme.colors.primary }}>
                  <i 
                    className="fas fa-compass" 
                    style={{ transform: `rotate(${qiblaDirection}deg)` }}
                  ></i>
                </div>
                <h3 className="text-xl font-semibold mb-2" style={{ color: theme.colors.text }}>Qibla Direction</h3>
                <p className="text-2xl font-bold mb-4" style={{ color: theme.colors.primary }}>{Math.round(qiblaDirection)}°</p>
                <div className="text-sm space-y-1" style={{ color: theme.colors.textSecondary }}>
                  <p>Latitude: {location.latitude.toFixed(4)}</p>
                  <p>Longitude: {location.longitude.toFixed(4)}</p>
                </div>
                <button 
                  onClick={getLocation}
                  className="mt-4 px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: theme.colors.gray,
                    color: theme.colors.white
                  }}
                >
                  Refresh Location
                </button>
              </div>
            )}
          </div>
          
          <div 
            className="mt-6 rounded-lg shadow-md p-4"
            style={{ backgroundColor: theme.colors.cardBg }}
          >
            <h4 className="font-semibold mb-2" style={{ color: theme.colors.primary }}>Instructions:</h4>
            <ul className="text-sm space-y-1" style={{ color: theme.colors.textSecondary }}>
              <li>• Allow location access when prompted</li>
              <li>• Hold your phone flat and point it in the direction shown</li>
              <li>• The compass will point towards the Kaaba in Mecca</li>
              <li>• Make sure you're away from magnetic interference</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Qibla;