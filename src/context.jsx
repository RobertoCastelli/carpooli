// --- REACT
import React, { useState, useEffect } from "react";
// --- FIREBASE
import { db } from "./FirebaseConfig";
import { getDoc, getDocs, collection } from "firebase/firestore";
// --- CONTEXT
export const MyContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [parcoAuto, setParcoAuto] = useState([]);
  const [autoSelezionata, setAutoSelezionata] = useState("");
  const [autista, setAutista] = useState("");
  /* const [km, setKm] = useState(0);
  const [statoPrenotazione, setStatoPrenotazione] = useState(true); */

  // --- FETCH AUTO DAL DB
  useEffect(() => {
    const fetchAuto = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Auto"));
        let autoArray = [];
        querySnapshot.forEach((doc) => {
          autoArray.push({ id: doc.id, ...doc.data() });
        });
        setParcoAuto(autoArray);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAuto();
  }, []);

  // --- GET AUTISTA SELEZIONATO
  const handleAutista = (e) => {
    if (e.target.tagName === "LI") {
      setAutista(e.target.textContent);
    }
  };

  // --- GET AUTO SELEZIONATO
  const handleAuto = async (e) => {
    try {
      const autoRef = doc(db, "auto", e.id);
      const autoSnap = await getDoc(autoRef);
      if (autoRef.exists()) {
        console.log(autoSnap.data());
      } else {
        console.log("non trovato");
      }
    } catch (error) {
      console.error("Errore nel recuper dei dati dell'auto ", error);
    }
  };

  return (
    <MyContext.Provider
      value={{ parcoAuto, autista, autoSelezionata, handleAuto, handleAutista }}
    >
      {children}
    </MyContext.Provider>
  );
};
