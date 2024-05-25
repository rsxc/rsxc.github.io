import React, { useState } from "react";

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
    if (newDriver.driverName && newDriver.date && newDriver.time && newDriver.comment && origin && destination) {
      const newDriver1 = {
        ...newDriver,
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        origin,
        destination,
      };
      setDrivers([...drivers, newDriver1]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(drivers));
    } else {
      console.log(newDriver);
    }
  };

  const isFormValid =
    newDriver.driverName && newDriver.date && newDriver.time && newDriver.comment && origin && destination;

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
            <div>
              {driver.origin.lat}, {driver.origin.lng}
            </div>
            <div>
              {driver.destination.lat}, {driver.destination.lng}
            </div>
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

export default Table;
