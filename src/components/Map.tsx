import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map: React.FC = () => {
  const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 });

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch("https://ipinfo.io/json");
        const data = await response.json();
        const { loc } = data;
        const [lat, lon] = loc.split(",");
        setPosition({ lat, lng: lon });
      } catch (error) {
        console.error(error);
      }
    };
    getUserLocation();
  }, []);

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "400px", zIndex: 1 }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
  );
};

export default Map;
