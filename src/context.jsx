// --- REACT
import React, { useState, useEffect } from "react";
// --- FIREBASE
import { db } from "./FirebaseConfig";
import { getDocs, collection } from "firebase/firestore";
// --- CONTEXT
export const MyContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [parcoAuto, setParcoAuto] = useState([]);
  const [autoSelezionata, setAutoSelezionata] = useState([]);
  const [autista, setAutista] = useState("");
  const [kmPartenza, setKmPartenza] = useState(0);

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
  const handleAutista = (e) => setAutista(e.target.textContent);

  // --- CONFERMA KM RILEVATI
  const handleKmRilevati = () => setKmPartenza(autoSelezionata.kmRilevati);

  // --- AGGIORNA KM RILEVATI
  const handleKmAggiornati = () => {
    const kmAggiornati = prompt("inserisci i km effettivi:");
    kmAggiornati !== null && setKmPartenza(kmAggiornati);
  };

  return (
    <MyContext.Provider
      value={{
        parcoAuto,
        autista,
        autoSelezionata,
        setAutoSelezionata,
        handleAutista,
        kmPartenza,
        handleKmRilevati,
        handleKmAggiornati,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
