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

  const [condizioneAuto, setCondizioneAuto] = useState("pulita");

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
    const inputKmAggiornati = prompt("inserisci i km aggiornati:");
    if (inputKmAggiornati !== null) {
      if (/^\d+$/.test(inputKmAggiornati)) {
        // ACCETTA SOLO NUMERI
        setKmPartenza(inputKmAggiornati);
      } else {
        alert("Inserisci numeri validi.");
      }
    }
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
