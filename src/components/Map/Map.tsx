import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useMapEvents } from "react-leaflet";
import { Polyline } from "react-leaflet";
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
            color="green"
            fillColor="green"
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
  const [originBuffer, setOriginBuffer] = useState(999);
  const [destination, setDestination] = useState(null);
  const [destinationBuffer, setDestinationBuffer] = useState(999);
  const [drawRides, setDrawRides] = useState(null);
  const [includeDestBuffer, setIncludeDestBuffer] = useState(0);
  const [rideDate, setRideDate] = useState(null);
  const [rideTime, setRideTime] = useState(null);
  const [rideTimeBuffer, setRideTimeBuffer] = useState(0);

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

  useEffect(() => {
    initializeLocalStorage();
    const storedRides = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (origin?.lat && origin?.lng && destination?.lat && destination?.lng && rideDate && rideTime) {
      const filteredRides = storedRides?.filter((ride) => {
        const bufferDistance = originBuffer / 1000;
        const destBufferDistance = includeDestBuffer / 1000;
        const timeBuffer = rideTimeBuffer * 60 * 1000; // convert to milliseconds
        const rideDateAndTime = new Date(`${rideDate}T${rideTime}:00`).getTime();
        const currentRideTime = new Date(`${ride.date}T${ride.time}:00`).getTime();
        const isWithinDateAndTime = Math.abs(currentRideTime - rideDateAndTime) <= timeBuffer;
        const originPoint = point([origin?.lng, origin?.lat]);
        const rideOriginPoint = point([ride.origin?.lng, ride.origin?.lat]);
        const destPoint = point([destination?.lng, destination?.lat]);
        const rideDestPoint = point([ride.destination?.lng, ride.destination?.lat]);
        const originWithinBuffer = distance(originPoint, rideOriginPoint) <= bufferDistance;
        const destWithinBuffer = includeDestBuffer === 0 || (distance(destPoint, rideDestPoint) <= destBufferDistance && isWithinDateAndTime);
        return originWithinBuffer && destWithinBuffer && isWithinDateAndTime;
      });

      setDrawRides(filteredRides);
    }
  });

  return (
    <div className="grid grid-cols-2 grid-rows-1 items-center justify-start z-0 h-screen min-h-screen w-screen">
      <div className="grid-column-1 border-2 border-white mx-10">
        {position ? (
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
        ) : <>Loading map location. Please wait...</>}
      </div>

      <div className="grid-column-2 flex flex-col items-start">
        <p>Searching for rides.</p>
        <p> click on the map to add origin and destination. Adjust buffers.</p>
        <div>
          <input
            type="range"
            id="originBuffer"
            name="originBuffer"
            min="999"
            max="9999"
            className="appearance-none bg-red-500"
            onChange={(e) => setOriginBuffer(parseInt(e.target.value))}
          />
          <label> Origin Buffer </label>
        </div>
        <div className="">
          <input
            type="range"
            id="destinationBuffer"
            name="destinationBuffer"
            min="999"
            max="9999"
            className="appearance-none bg-red-500"
            onChange={(e) => setDestinationBuffer(parseInt(e.target.value))}
          />
          <label> Destination Buffer </label>
          <input type="checkbox" onChange={(e) => setIncludeDestBuffer(parseInt(e.target.value))} />
          <label> include </label>
        </div>
        <div>
          <label htmlFor="date" className="text-lg font-bold p-2">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setRideDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="time" className="text-lg font-bold p-2">
            Time
          </label>
          <input
            type="time"
            id="time"
            name="time"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setRideTime(e.target.value)}
          />
          <label htmlFor="timeLength" className="text-lg font-bold p-2">
            buffer
          </label>
          <input
            type="number"
            min="0"
            id="timeLengthHours"
            name="timeLengthHours"
            className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) => setRideTimeBuffer(parseInt(e.target.value))}
          />
          <label htmlFor="timeLengthHours" className="text-lg font-bold p-2">
            Hours
          </label>
        </div>
        {/* <CreateRide origin={origin} destination={destination} /> */}
      </div>
    </div>
  );
};

export default Map;
