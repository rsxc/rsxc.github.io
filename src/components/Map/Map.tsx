import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import { useMapEvents } from "react-leaflet";
import { Polyline } from "react-leaflet";

const LOCAL_STORAGE_KEY = "drivers";

const Table = ({ origin, destination }) => {
  const [drivers, setDrivers] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || []);
  const [newDriver, setNewDriver] = useState({
    currentDate: "",
    currentTime: "",
    driverName: "",
    date: "",
    time: "",
    comment: "",
    origin: "",
    destination: "",
  });

  const handleChange = (e) => {
    setNewDriver({ ...newDriver, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newDriver.driverName &&
      newDriver.date &&
      newDriver.time &&
      newDriver.comment &&
      origin &&
      destination
    ) {
      const newDriver1 = {
        ...newDriver,
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        origin,
        destination,
      }
      setDrivers([...drivers, newDriver1]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drivers));
    } else {
      console.log(newDriver);
    }
  };

  const isFormValid =
    newDriver.driverName &&
    newDriver.date &&
    newDriver.time &&
    newDriver.comment &&
    origin &&
    destination;

  return (
    <div className="z-0">
      <div className="grid grid-cols-8 gap-1">
        <div>Current Date</div>
        <div>Current Time</div>
        <div>Driver Name</div>
        <div>Date</div>
        <div>Time</div>
        <div>Comment</div>
        <div>Origin</div>
        <div>Destination</div>
        {drivers.map((driver, index) => (
          <React.Fragment key={index}>
            <div>{driver.currentDate}</div>
            <div>{driver.currentTime}</div>
            <div>{driver.driverName}</div>
            <div>{driver.date}</div>
            <div>{driver.time}</div>
            <div>{driver.comment}</div>
            <div>{driver.origin.lat}, {driver.origin.lng}</div>
            <div>{driver.destination.lat}, {driver.destination.lng}</div>
          </React.Fragment>
        ))}
        <div>{new Date().toLocaleDateString()}</div>
        <div>{new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</div>
        <div>
          <input
            type="text"
            name="driverName"
            required
            defaultValue={newDriver.driverName}
            className={isFormValid ? "" : "border-red-500"}
            value={newDriver.driverName}
            onChange={handleChange}
            placeholder="Driver Name"
          />
        </div>
        <div>
          <input
            type="date"
            name="date"
            required
            defaultValue={newDriver.date}
            className={isFormValid ? "" : "border-red-500"}
            value={newDriver.date}
            onChange={handleChange}
            placeholder="dd/mm/yyyy"
          />
        </div>
        <div>
          <input
            type="time"
            name="time"
            required
            defaultValue={newDriver.time}
            className={isFormValid ? "" : "border-red-500"}
            value={newDriver.time}
            onChange={handleChange}
            placeholder="hh:mm"
          />
        </div>
        <div>
          <input
            type="text"
            name="comment"
            required
            defaultValue={newDriver.comment}
            className={isFormValid ? "" : "border-red-500"}
            value={newDriver.comment}
            onChange={handleChange}
            placeholder="Add Comment"
          />
        </div>
        <div>{origin ? `${origin.lat}, ${origin.lng}` : ""}</div>
        <div>{destination ? `${destination.lat}, ${destination.lng}` : ""}</div>
        <div>
          <button onClick={handleSubmit} className={isFormValid ? "" : "opacity-50 cursor-not-allowed"}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
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
  const [position, setPosition] = useState<LatLngExpression>({ lat: 51.505, lng: -0.09 });
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    const getUserLocation = async () => {
      try {
        const response = await fetch("https://ipinfo.io/json");
        const data = await response.json();
        const { loc } = data;
        const [lat, lon] = loc.split(",");
        setPosition({ lat: Number(lat), lng: Number(lon) });
      } catch (error) {
        console.error(error);
      }
    };
    getUserLocation();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}>
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: "90vh", width: "90vh", maxHeight: "100%", maxWidth: "100%", zIndex: 0 }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationMarker
            origin={origin}
            destination={destination}
            setOrigin={setOrigin}
            setDestination={setDestination}
          />
        </MapContainer>
        <Table origin={origin} destination={destination} />
     </div>
    </div>
  );
};

export default Map;