import React, { createContext, useState, useEffect, useContext } from "react";
import {
  doc,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "./FirebaseConfig";

// Creazione del Context per gestire lo stato dell'app
const AppContext = createContext();

// Provider del Context che gestisce lo stato e le operazioni Firebase
export const AppProvider = ({ children }) => {
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [activeCar, setActiveCar] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [destinations, setDestinations] = useState([]);
  const [trips, setTrips] = useState([]);
  const [tripID, setTripID] = useState(null);

  // Funzione per riprodurre un suono
  const playSound = (src) => {
    const audio = new Audio(src);
    audio.play();
  };

  // Genera un timestamp formattato per la data e l'ora correnti
  const timeStamp = new Date().toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Funzione generica per fetch dei dati
  const fetchData = async (collectionName, orderField = null) => {
    try {
      const collectionRef = collection(db, collectionName);
      const q = query(collectionRef, orderBy(orderField, "asc"));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    } catch (error) {
      console.error(`Error fetching ${collectionName}:`, error);
      return [];
    }
  };

  useEffect(() => {
    // Funzione asincrona per caricare tutti i dati
    const loadData = async () => {
      const driversData = await fetchData("drivers", "name");
      const carsData = await fetchData("cars", "name");
      const destinationsData = await fetchData("destinations", "name");
      const tripsData = await fetchData("trip", "currentDriver");

      setDrivers(driversData);
      setCars(carsData);
      setDestinations(destinationsData);
      setTrips(tripsData);
    };

    loadData();
  }, []);

  // Funzione per registrare una partenza nel database
  const registerDeparture = async (departureKM, destination) => {
    try {
      const departuresCollection = collection(db, "trip");
      await addDoc(departuresCollection, {
        currentDriver: selectedDriver.name,
        activeCar: activeCar.name,
        departure: {
          departureKM,
          destination,
          timestamp: timeStamp,
        },
        checkOut: null,
      });
      alert("Partenza registrata con successo!");
    } catch (error) {
      console.error("Errore nella registrazione della partenza: ", error);
      alert(
        "Si è verificato un errore durante la registrazione della partenza. Per favore, riprova."
      );
    }
  };

  // Funzione per gestire il check-out dell'auto
  const checkOut = async (tripID, returnKM, gasExpenses) => {
    const checkoutDocRef = doc(db, "trip", tripID);
    try {
      await updateDoc(checkoutDocRef, {
        checkOut: {
          returnKM,
          gasExpenses,
          timestamp: timeStamp,
        },
      });
      alert("Rientro registrato con successo!");
    } catch (error) {
      console.error("Errore nella registrazione del rientro: ", error);
      alert(
        "Si è verificato un errore durante la registrazione del rientro. Per favore, riprova."
      );
    }
    setTripID(null);
    setSelectedDriver(null);
    setActiveCar(null);
  };

  // Funzione per aggiornare le date di manutenzione dell'auto
  const updateCarMaintenanceDates = async (
    carId,
    newTagliando,
    newRevisione
  ) => {
    const carDocRef = doc(db, "cars", carId);
    try {
      await updateDoc(carDocRef, {
        tagliando: newTagliando,
        revisione: newRevisione,
      });
      alert("Date di manutenzione aggiornate con successo!");
    } catch (error) {
      console.error(
        "Errore nell'aggiornamento delle date di manutenzione: ",
        error
      );
      alert(
        "Si è verificato un errore durante l'aggiornamento delle date di manutenzione. Per favore, riprova."
      );
    }
  };

  // Fornisce lo stato e le funzioni attraverso il contesto
  return (
    <AppContext.Provider
      value={{
        selectedDriver,
        setSelectedDriver,
        activeCar,
        setActiveCar,
        destinations,
        selectedDestination,
        setSelectedDestination,
        drivers,
        cars,
        trips,
        registerDeparture,
        checkOut,
        tripID,
        setTripID,
        updateCarMaintenanceDates,
        playSound,
        timeStamp,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizzato per usare il Context
export const useAppContext = () => useContext(AppContext);
