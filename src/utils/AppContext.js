import React, { createContext, useState, useEffect, useContext } from "react";
import {
  collection,
  getDocs,
  addDoc,
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
  const [isDriving, setIsDriving] = useState(false);
  const [drivers, setDrivers] = useState([]);
  const [cars, setCars] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState("");
  const [destinations, setDestinations] = useState([]);

  // Effettua il fetch dei dati delle auto e degli autisti al montaggio del componente
  useEffect(() => {
    const fetchDrivers = async () => {
      const driversCollection = collection(db, "drivers");
      const querySnapshot = await getDocs(
        query(driversCollection, orderBy("name", "asc"))
      );
      setDrivers(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    const fetchCars = async () => {
      const carsCollection = collection(db, "cars");
      const querySnapshot = await getDocs(carsCollection);
      setCars(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    };

    const fetchDestinations = async () => {
      const destinationsCollection = collection(db, "destinations");
      const querySnapshot = await getDocs(destinationsCollection);
      setDestinations(
        querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    };

    fetchDrivers();
    fetchDestinations();
    fetchCars();
  }, []);

  // Funzione per registrare una partenza nel database
  const registerDeparture = async (departureKM, carCondition, destination) => {
    const departuresCollection = collection(db, "departures");
    await addDoc(departuresCollection, {
      selectedDriver,
      activeCar,
      isDriving: true,
      departureKM,
      destination,
      carCondition,
    });
  };

  // Funzione per gestire il check-out dell'auto
  const checkOut = async (returnKM, gasExpenses) => {
    const checkoutsCollection = collection(db, "checkouts");
    await addDoc(checkoutsCollection, {
      returnKM,
      gasExpenses,
    });
    setActiveCar(null);
    setIsDriving(false);
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
        isDriving,
        setIsDriving,
        drivers,
        cars,
        registerDeparture,
        checkOut,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook personalizzato per usare il Context
export const useAppContext = () => useContext(AppContext);
