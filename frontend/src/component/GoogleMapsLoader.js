import React, { useEffect, useState } from 'react';

const GoogleMapsLoader = ({ children }) => {
  const [mapStatus, setMapStatus] = useState({
    loaded: false,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (mapStatus.loaded || mapStatus.loading) return;

    setMapStatus((prev) => ({ ...prev, loading: true }));

    const existingScript = document.querySelector('script[src*="maps.googleapis.com/maps/api/js"]');

    if (existingScript) {
      existingScript.addEventListener('load', () => {
        setMapStatus({ loaded: true, loading: false, error: null });
      });
      return;
    }

    // Required by Google Maps
    window.initMap = () => {
      setMapStatus({ loaded: true, loading: false, error: null });
    };

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      setMapStatus({ loaded: false, loading: false, error: 'Failed to load Google Maps' });
    };

    document.body.appendChild(script);
  }, [mapStatus]);

  if (mapStatus.error) return <p>Error loading map: {mapStatus.error}</p>;
  if (!mapStatus.loaded) return <p>Loading map...</p>;

  return <>{children}</>;
};

export default GoogleMapsLoader;
