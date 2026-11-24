import React, { createContext, useState, useEffect, useContext } from "react";
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  orderBy,
  query,
  onSnapshot,
  setDoc,
  deleteDoc,
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
  const [bookings, setBookings] = useState([]);

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
      },
    );
  };

  useEffect(() => {
    // Imposta gli snapshot per tutte le collezioni
    const unsubDrivers = fetchData("drivers", "name", setDrivers);
    const unsubCars = fetchData("cars", "name", setCars);
    const unsubDestinations = fetchData(
      "destinations",
      "name",
      setDestinations,
    );
    const unsubTrips = fetchData("trip", "currentDriver", setTrips);
    const unsubBookings = fetchData("bookings", "date", setBookings);

    // Cleanup on unmount
    return () => {
      unsubDrivers();
      unsubCars();
      unsubDestinations();
      unsubTrips();
      unsubBookings();
    };
  }, []);

  // Attiva o disattiva lo stato di manutenzione del veicolo
  const setCarMaintenance = async (car, inMaintenance) => {
    if (!car?.id) {
      alert("Veicolo non valido.");
      return false;
    }

    // Non mettere in manutenzione un veicolo in uso
    if (
      inMaintenance &&
      trips.some((trip) => trip.activeCar === car.name && trip.checkOut == null)
    ) {
      alert(
        "Prima di mettere il veicolo in manutenzione, registra il rientro.",
      );
      return false;
    }

    try {
      await updateDoc(doc(db, "cars", car.id), {
        outOfService: inMaintenance,
      });

      return true;
    } catch (error) {
      console.error("Errore aggiornamento manutenzione:", error);
      alert("Impossibile aggiornare lo stato del veicolo.");
      return false;
    }
  };

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
        "Si è verificato un errore durante la registrazione della partenza. Per favore, riprova.",
      );

      throw error;
    }
  };

  // Funzione per gestire il check-out dell'auto
  const checkOut = async (tripID, returnKM, gasExpenses, refuelingLevel) => {
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
          refuelingLevel,
          timestamp: timeStamp,
        },
      });
    } catch (error) {
      console.error("Errore nella registrazione del rientro: ", error);
      alert(
        "Si è verificato un errore durante la registrazione del rientro. Per favore, riprova.",
      );

      // Segnala alla pagina che il salvataggio non è riuscito
      throw error;
    }
  };

  // Funzione per aggiornare le date di manutenzione dell'auto
  const updateCarMaintenanceDates = async (
    carId,
    newTagliando,
    newRevisione,
    newBollo,
    newAssicurazione,
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
        error,
      );
      alert(
        "Si è verificato un errore durante l'aggiornamento delle date di manutenzione. Per favore, riprova.",
      );
    }
  };

  const addNewDriver = async (driver) => {
    try {
      const driversCollection = collection(db, "drivers");
      await addDoc(driversCollection, {
        name: driver,
      });
    } catch (error) {
      console.error("Errore nella registrazione del nuovo conducente: ", error);
      alert(
        "Si è verificato un errore durante la registrazione del nuovo utente. Per favore, riprova.",
      );
    }
  };

  const handleBooking = async (key, driverId, date) => {
    const bookingRef = doc(db, "bookings", key);

    try {
      if (driverId) {
        await setDoc(bookingRef, { driverId, date });
      } else {
        await deleteDoc(bookingRef);
      }
    } catch (error) {
      console.error("Errore prenotazione:", error);
      alert("Impossibile aggiornare la prenotazione.");
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
        setCarMaintenance,
        addNewDriver,
        playSound,
        timeStamp,
        bookings,
        handleBooking,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizzato per usare il Context
export const useAppContext = () => useContext(AppContext);
