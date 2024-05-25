import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { Polyline } from "react-leaflet";
import Table from "./CreateRide";

function LocationMarker({ origin, destination, setOrigin, setDestination }) {
  useMapEvents({
    click(e: any) {
      if (!origin) {
        setOrigin(e.latlng);
      } else if (!destination) {
        setDestination(e.latlng);
      }
    },
  });

  return (
    <>
      {origin && (
        <Marker
          title={"Origin"}
          position={origin}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              setOrigin(e.target.getLatLng());
            },
          }}
        >
          <Popup>
            <p>
              Origin: {origin.lat}, {origin.lng}
            </p>
          </Popup>
        </Marker>
      )}
      {destination && (
        <Marker
          position={destination}
          draggable={true}
          eventHandlers={{
            dragend: (e) => {
              setDestination(e.target.getLatLng());
            },
          }}
        >
          <Popup>
            <p>
              Destination: {destination.lat}, {destination.lng}
            </p>
          </Popup>
        </Marker>
      )}
      {origin && destination && <Polyline positions={[origin, destination]} />}
    </>
  );
}

const Map: React.FC = () => {
  const [position, setPosition] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  const getUserLocation = async () => {
    try {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error(error);
            console.log("Error getting user's position");
          }
        );
      } else {
        console.log("Geolocation is not supported by this browser");
      }
    } catch (error) {
      console.error(error);
      console.log("Error getting user's position");
    }
  };

  useEffect(() => {
    getUserLocation();
  }, []);

  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center justify-start z-0 h-screen min-h-screen">
      <div className="grid-column-1 border-2 border-white mx-10">
        {position && (
          <MapContainer center={position} zoom={13} style={{ height: "80vh", margin: "10px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker
              origin={origin}
              destination={destination}
              setOrigin={setOrigin}
              setDestination={setDestination}
            />
          </MapContainer>
        )}
      </div>
      <div className="grid-column-2">
        <Table origin={origin} destination={destination} />
      </div>
    </div>
  );
};

export default Map;
