import React, { createContext, useState, useEffect, useContext } from "react";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
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

  // Funzione generica per fetch dei dati con onSnapshot
  const fetchData = (collectionName, orderField, setData) => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy(orderField, "asc"));

    return onSnapshot(
      q,
      (querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(data);
      },
      (error) => {
        console.error(`Error fetching ${collectionName}:`, error);
        setData([]);
      }
    );
  };

  useEffect(() => {
    // Imposta gli snapshot per tutte le collezioni
    const unsubDrivers = fetchData("drivers", "name", setDrivers);
    const unsubCars = fetchData("cars", "name", setCars);
    const unsubDestinations = fetchData(
      "destinations",
      "name",
      setDestinations
    );
    const unsubTrips = fetchData("trip", "currentDriver", setTrips);

    // Cleanup on unmount
    return () => {
      unsubDrivers();
      unsubCars();
      unsubDestinations();
      unsubTrips();
    };
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
        activeCar: null,
        currentDriver: null,
        checkOut: {
          driver: selectedDriver.name,
          car: activeCar,
          returnKM,
          gasExpenses,
          timestamp: timeStamp,
        },
      });
    } catch (error) {
      console.error("Errore nella registrazione del rientro: ", error);
      alert(
        "Si è verificato un errore durante la registrazione del rientro. Per favore, riprova."
      );
    }
  };

  // Funzione per aggiornare le date di manutenzione dell'auto
  const updateCarMaintenanceDates = async (
    carId,
    newTagliando,
    newRevisione,
    newBollo,
    newAssicurazione
  ) => {
    const carDocRef = doc(db, "cars", carId);
    try {
      await updateDoc(carDocRef, {
        tagliando: newTagliando,
        revisione: newRevisione,
        bollo: newBollo,
        assicurazione: newAssicurazione,
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
        drivers,
        cars,
        destinations,
        trips,
        selectedDriver,
        setSelectedDriver,
        activeCar,
        setActiveCar,
        selectedDestination,
        setSelectedDestination,
        tripID,
        setTripID,
        registerDeparture,
        checkOut,
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
