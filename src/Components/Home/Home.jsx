import React, { useEffect, useState, useRef } from "react";
import {
  FaBookOpen,
  FaPrayingHands,
  FaDonate,
  FaMosque,
  FaSun,
  FaMoon,
  FaClock,
  FaQuran,
  FaMapMarkerAlt,
  FaSpinner,
  FaMap,
  FaTimes,
  FaLocationArrow,
} from "react-icons/fa";

const Home = () => {
  const [time, setTime] = useState(new Date());
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [nextPrayer, setNextPrayer] = useState(null);
  const [location, setLocation] = useState({ city: "Rawalpindi", country: "Pakistan" });
  const [loading, setLoading] = useState(true);
  const [locationError, setLocationError] = useState(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapLoading, setMapLoading] = useState(false);
  const [useManualLocation, setUseManualLocation] = useState(false);
  const [manualLocation, setManualLocation] = useState(null);
  
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markerRef = useRef(null);

  const GOOGLE_API_KEY = "AIzaSyBCZ15zo1KEU63Ji7PrMmloxRX0HDU6vV0";

  // Update current time every second
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  // Get user's current location
  useEffect(() => {
    const getCurrentLocation = () => {
      if (!navigator.geolocation) {
        setLocationError("Geolocation is not supported by this browser.");
        setLoading(false);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            
            // Use Google Geocoding API to get city and country
            const response = await fetch(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_API_KEY}`
            );
            
            if (!response.ok) {
              throw new Error('Failed to get location data');
            }
            
            const data = await response.json();
            
            if (data.results && data.results.length > 0) {
              const addressComponents = data.results[0].address_components;
              let city = "Rawalpindi";
              let country = "Pakistan";
              
              // Extract city and country from address components
              addressComponents.forEach(component => {
                if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
                  city = component.long_name;
                }
                if (component.types.includes('country')) {
                  country = component.long_name;
                }
              });
              
              if (!useManualLocation) {
                setLocation({ city, country });
              }
            }
            setLoading(false);
          } catch (error) {
            console.error("Error getting location details:", error);
            setLocationError("Could not get location details");
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLocationError("Could not access location. Using default location.");
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes cache
        }
      );
    };

    if (!useManualLocation) {
      getCurrentLocation();
    } else {
      setLoading(false);
    }
  }, [useManualLocation]);

  // Fetch prayer times from API based on location
  useEffect(() => {
    const currentLocation = useManualLocation && manualLocation ? manualLocation : location;
    if (!currentLocation.city || !currentLocation.country) return;

    const fetchPrayerTimes = async () => {
      try {
        const res = await fetch(
          `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(currentLocation.city)}&country=${encodeURIComponent(currentLocation.country)}&method=2`
        );
        const data = await res.json();
        
        if (data.code === 200 && data.data) {
          setPrayerTimes(data.data.timings);
        } else {
          throw new Error('Failed to fetch prayer times');
        }
      } catch (err) {
        console.error("Error fetching prayer times", err);
        // Fallback to default location
        try {
          const fallbackRes = await fetch(
            "https://api.aladhan.com/v1/timingsByCity?city=Rawalpindi&country=Pakistan&method=2"
          );
          const fallbackData = await fallbackRes.json();
          setPrayerTimes(fallbackData.data.timings);
        } catch (fallbackErr) {
          console.error("Error fetching fallback prayer times", fallbackErr);
        }
      }
    };
    
    fetchPrayerTimes();
  }, [location, manualLocation, useManualLocation]);

  // Initialize Google Maps
  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    const currentLocation = useManualLocation && manualLocation ? manualLocation : location;
    
    const map = new google.maps.Map(mapRef.current, {
      center: { lat: 33.5651, lng: 73.0169 }, // Default to Rawalpindi
      zoom: 10,
      mapTypeId: 'roadmap'
    });

    googleMapRef.current = map;

    // Add click listener to map
    map.addListener('click', (event) => {
      setMapLoading(true);
      
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      // Remove previous marker
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }

      // Add new marker
      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: 'Selected Location'
      });
      markerRef.current = marker;

      // Reverse geocode to get city and country
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        setMapLoading(false);
        
        if (status === 'OK' && results[0]) {
          const addressComponents = results[0].address_components;
          let city = "Selected Location";
          let country = "Unknown";
          
          addressComponents.forEach(component => {
            if (component.types.includes('locality') || component.types.includes('administrative_area_level_2')) {
              city = component.long_name;
            }
            if (component.types.includes('country')) {
              country = component.long_name;
            }
          });
          
          setManualLocation({ city, country, lat, lng });
        }
      });
    });
  };

  // Handle map modal
  const openMapModal = () => {
    setShowMapModal(true);
    setTimeout(initializeMap, 100); // Wait for modal to render
  };

  const closeMapModal = () => {
    setShowMapModal(false);
    if (googleMapRef.current) {
      googleMapRef.current = null;
    }
    if (markerRef.current) {
      markerRef.current = null;
    }
  };

  const confirmManualLocation = () => {
    if (manualLocation) {
      setUseManualLocation(true);
      setLocation(manualLocation);
      closeMapModal();
    }
  };

  const useCurrentLocation = () => {
    setUseManualLocation(false);
    setManualLocation(null);
    setLoading(true);
  }; 

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

  const currentDisplayLocation = useManualLocation && manualLocation ? manualLocation : location;

  if (loading) {
    return (
      <div className="min-h-screen bg-light-bg dark:bg-dark-bg flex items-center justify-center">
        <div className="text-center">
          <FaSpinner className="animate-spin text-4xl text-green-500 mb-4 mx-auto" />
          <p className="text-gray-600 dark:text-gray-300">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-500 to-gray-800 p-6 shadow-lg rounded-b-3xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt className="text-sm opacity-70" />
            <p className="text-sm opacity-90">
              {currentDisplayLocation.city}, {currentDisplayLocation.country}
              {useManualLocation && <span className="text-green-400 ml-1">(Manual)</span>}
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={useCurrentLocation}
              className={`p-2 rounded-lg transition-all ${
                !useManualLocation 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              title="Use current location"
            >
              <FaLocationArrow className="text-xs" />
            </button>
            <button
              onClick={openMapModal}
              className={`p-2 rounded-lg transition-all ${
                useManualLocation 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/20 hover:bg-white/30'
              }`}
              title="Select location manually"
            >
              <FaMap className="text-xs" />
            </button>
          </div>
        </div>
        
        {locationError && (
          <p className="text-xs text-yellow-300 opacity-80">{locationError}</p>
        )}
        <p className="text-xs opacity-70">{formattedDate}</p>

        <h1 className="text-5xl text-white font-extrabold mt-2 tracking-wide">
          {formattedTime}
        </h1>
        {nextPrayer && (
          <p className="text-xs mt-1 text-gray-200">
            {nextPrayer.label} is only{" "}
            <span className="text-green-400 font-semibold">
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
                <div className="text-lg mb-1 text-green-400">{p.icon}</div>
                <p className="font-semibold">{p.label}</p>
                <p className="text-green-400 font-bold">
                  {formatTo12Hour(p.time)}
                </p>
              </div>
            ))}
        </div>
      </div>

      {/* Quick Menu */}
      <div className="grid grid-cols-4 gap-4 px-6 py-5 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md text-gray-800 dark:text-gray-200 shadow-lg rounded-3xl mx-4 mt-3 transition-colors duration-300">
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
            className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-xl p-3 transition-all duration-200 cursor-pointer group shadow hover:shadow-xl hover:scale-105"
          >
            <div className="text-green-500 group-hover:scale-125 transition-transform">
              {item.icon}
            </div>
            <p className="text-xs mt-1 font-semibold group-hover:text-green-500">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* Today's Activities */}
      <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200 rounded-3xl mx-6 mt-6 p-6 shadow-lg transition-colors duration-300">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg">Today's Activities</h2>
          <span className="text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-900 px-3 py-1 rounded-lg shadow-sm">
            33%
          </span>
        </div>

        <p className="text-sm opacity-70 mt-1">
          Complete the daily activity checklist.
        </p>

        <p className="text-sm mt-3 font-medium">8 of 24 Tasks</p>

        {/* Progress Bar */}
        <div className="relative w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mt-3 overflow-hidden">
          <div className="absolute top-0 left-0 h-3 bg-gradient-to-r from-green-500 to-green-700 rounded-full w-1/3 transition-all duration-500 ease-out"></div>
        </div>

        <button className="mt-5 w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-95 transition-all duration-200">
          Go to Checklist
        </button>
      </div>

      {/* Map Modal - Made smaller */}
      {showMapModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-lg h-[450px] flex flex-col shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                Select Your Location
              </h3>
              <button
                onClick={closeMapModal}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <FaTimes className="text-gray-500" />
              </button>
            </div>

            {/* Map Container - Reduced height */}
            <div className="flex-1 relative bg-gray-100 dark:bg-gray-700 min-h-[250px]">
              <div 
                ref={mapRef} 
                className="w-full h-full"
              />
              
              {mapLoading && (
                <div className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center gap-3">
                    <FaSpinner className="animate-spin text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Getting location details...
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Selected Location Info */}
            {manualLocation && (
              <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                      {manualLocation.city}, {manualLocation.country}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Click "Use This Location" to confirm
                    </p>
                  </div>
                  <button
                    onClick={confirmManualLocation}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
                  >
                    Use This Location
                  </button>
                </div>
              </div>
            )}

            {/* Instructions */}
            {!manualLocation && (
              <div className="p-4 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Click anywhere on the map to select your prayer time location
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;