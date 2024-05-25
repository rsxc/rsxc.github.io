import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { Polyline } from "react-leaflet";
import CreateRide from "./CreateRide";

const LOCAL_STORAGE_KEY = "rides";

const initializeLocalStorage = () => {
  const storedRides = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storedRides) {
    const sampleRides = [
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver A",
        date: "2022-01-01",
        time: "10:00",
        comment: "comment A",
        origin: { lat: 43.46312557670116, lng: -80.52313327789308 },
        destination: { lat: 43.588934042894586, lng: -79.66461181640626 },
      },
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver B",
        date: "2022-01-02",
        time: "12:00",
        comment: "comment B",
        origin: { lat: 43.45158510015951, lng: -80.49133300781251 },
        destination: { lat: 43.6983093157438, lng: -79.72915649414064 },
      },
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver C",
        date: "2022-01-03",
        time: "14:00",
        comment: "comment C",
        origin: { lat: 43.35496565681908, lng: -80.30456542968751 },
        destination: { lat: 43.705929901862504, lng: -80.37666320800783 },
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleRides));
  }
};

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
    initializeLocalStorage();
  }, []);
  const storedRides = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));

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
            {storedRides.map((ride, index) => (
              <Polyline key={index} positions={[ride.origin, ride.destination]} />
            ))}
          </MapContainer>
        )}
      </div>
      <div className="grid-column-2">
        <CreateRide origin={origin} destination={destination} />
      </div>
    </div>
  );
};

export default Map;
