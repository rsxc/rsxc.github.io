import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { Polyline } from "react-leaflet";
import CreateRide from "./CreateRide";
import { CircleMarker, Tooltip, Circle } from "react-leaflet";
import initializeLocalStorage from "./LocalStorageRides";
import { point, distance } from "@turf/turf";

const LOCAL_STORAGE_KEY = "rides";

function LocationMarker({
  origin,
  destination,
  setOrigin,
  setDestination,
  originBuffer,
  destinationBuffer,
  setOriginBuffer,
  setDestinationBuffer,
}) {
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
        <>
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
          <Circle
            center={origin}
            radius={originBuffer}
            color="red"
            fillColor="red"
            fillOpacity={0.5}
            stroke={false}
          ></Circle>
        </>
      )}
      {destination && (
        <>
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
          <Circle
            center={destination}
            radius={destinationBuffer}
            color="red"
            fillColor="red"
            fillOpacity={0.5}
            stroke={false}
          ></Circle>
        </>
      )}
      {origin && destination && <Polyline positions={[origin, destination]} />}
    </>
  );
}

const Map: React.FC = () => {
  const [position, setPosition] = useState(null);
  const [origin, setOrigin] = useState(null);
  const [originBuffer, setOriginBuffer] = useState(null);
  const [destination, setDestination] = useState(null);
  const [destinationBuffer, setDestinationBuffer] = useState(null);
  const [drawRides, setDrawRides] = useState(null);

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
    const storedRides = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (origin?.lat && origin?.lng && destination?.lat && destination?.lng) {
      const filteredRides = storedRides?.filter((ride) => {
        const bufferDistance = originBuffer / 1000;
        const originPoint = point([origin?.lng, origin?.lat]);
        const rideOriginPoint = point([ride.origin?.lng, ride.origin?.lat]);
        const d = distance(originPoint, rideOriginPoint);
        return d <= bufferDistance;
      });

      setDrawRides(filteredRides);
    }
  });

  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center justify-start z-0 h-screen min-h-screen w-screen">
      <div className="grid-column-1 border-2 border-white mx-10">
        {position && (
          <MapContainer center={position} zoom={13} style={{ height: "80vh", margin: "10px" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationMarker
              origin={origin}
              destination={destination}
              setOrigin={setOrigin}
              setDestination={setDestination}
              originBuffer={originBuffer}
              setOriginBuffer={setOriginBuffer}
              destinationBuffer={destinationBuffer}
              setDestinationBuffer={setDestinationBuffer}
            />
            {drawRides?.map((ride, index) => (
              <>
                <Polyline key={index} positions={[ride.origin, ride.destination]} />
                <CircleMarker center={ride.origin} pathOptions={{ color: "red" }} radius={5}>
                  <Tooltip>Origin</Tooltip>
                </CircleMarker>
                <CircleMarker center={ride.destination} pathOptions={{ color: "green" }} radius={5}>
                  <Tooltip>Destination</Tooltip>
                </CircleMarker>
              </>
            ))}
          </MapContainer>
        )}
      </div>
      <div className="grid-column-2 align-left">
        <div>
          <input
            type="range"
            id="originBuffer"
            name="originBuffer"
            min="999"
            max="9999"
            className="bg-white"
            onChange={(e) => setOriginBuffer(parseInt(e.target.value))}
          />
          <label> Origin Buffer </label>
        </div>
        <div>
          <input
            type="range"
            id="destinationBuffer"
            name="destinationBuffer"
            min="999"
            max="9999"
            className="bg-white"
            onChange={(e) => setDestinationBuffer(parseInt(e.target.value))}
          />
          <label> Destination Buffer </label>
        </div>
        {/* <CreateRide origin={origin} destination={destination} /> */}
      </div>
    </div>
  );
};

export default Map;
