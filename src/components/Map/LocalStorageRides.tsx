const LOCAL_STORAGE_KEY = "rides";
const initializeLocalStorage = () => {
  const storedRides = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!storedRides) {
    const sampleRides = [
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver A",
        date: "2024-03-03",
        time: "10:00",
        comment: "comment A",
        origin: { lat: 43.46312557670116, lng: -80.52313327789308 },
        destination: { lat: 43.588934042894586, lng: -79.66461181640626 },
      },
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver B",
        date: "2024-04-04",
        time: "12:00",
        comment: "comment B",
        origin: { lat: 43.45158510015951, lng: -80.49133300781251 },
        destination: { lat: 43.6983093157438, lng: -79.72915649414064 },
      },
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver C",
        date: "2024-05-05",
        time: "14:00",
        comment: "comment C",
        origin: { lat: 43.35496565681908, lng: -80.30456542968751 },
        destination: { lat: 43.705929901862504, lng: -80.37666320800783 },
      },
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver D",
        date: "2024-06-06",
        time: "16:00",
        comment: "comment D",
        origin: { lat: 43.44233510640555, lng: -80.31540749511719 },
        destination: { lat: 43.69105853542717, lng: -80.27442016601563 },
      },
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver E",
        date: "2024-07-07",
        time: "18:00",
        comment: "comment E",
        origin: { lat: 43.39938793827859, lng: -80.35369095117188 },
        destination: { lat: 43.75352320646282, lng: -80.22013549804689 },
      },
      {
        currentDate: new Date().toLocaleDateString(),
        currentTime: new Date().toLocaleTimeString(),
        driverName: "Driver F",
        date: "2024-08-08",
        time: "20:00",
        comment: "comment F",
        origin: { lat: 43.49855226246251, lng: -80.39101751708984 },
        destination: { lat: 43.69894695604243, lng: -80.29122619628906 },
      },
    ];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(sampleRides));
  }
};

export default initializeLocalStorage;
