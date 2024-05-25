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

export default initializeLocalStorage;
