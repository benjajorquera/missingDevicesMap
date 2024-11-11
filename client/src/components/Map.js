import React from "react";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import { useState, useCallback } from "react";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: -33.42,
  lng: -70.61,
};

const OPTIONS = {
  minZoom: 1,
  maxZoom: 12,
};

const Map = ({ devices }) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={3}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={OPTIONS}
    >
      {devices.map((device) => {
        return (
          <Marker
            key={device.id}
            position={device.location}
            title={device.name}
          />
        );
      })}
    </GoogleMap>
  ) : (
    <div> Loading ... </div>
  );
};

export default Map;
