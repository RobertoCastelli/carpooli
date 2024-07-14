// --- REACT
import React, { useState, useEffect } from "react";
// --- FIREBASE
import { db } from "./FirebaseConfig";
import {
  doc,
  onSnapshot,
  updateDoc,
  collection,
  addDoc,
} from "firebase/firestore";
// --- ROUTER
import { useNavigate } from "react-router-dom";
// --- CONTEXT
export const MyContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [parcoAuto, setParcoAuto] = useState([]);
  const [autoSelezionata, setAutoSelezionata] = useState([]);
  const [autisti] = useState(["Pippo", "Pluto", "Paperino"]);
  const [autista, setAutista] = useState("");
  const [destinazione, setDestinazione] = useState("");
  const [kmPartenza, setKmPartenza] = useState(0);
  const [kmRitorno, setKmRitorno] = useState(0);
  const [condizione, setCondizione] = useState("");
  const [carburante, setCarburante] = useState(0);
  const [riepilogo, setRiepilogo] = useState([]);

  // --- NAVIGATE
  const navigate = useNavigate();

  // --- TIMESTAMP
  const timeStamp = new Date().toLocaleString();

  // --- FETCH AUTO DAL DB
  useEffect(() => {
    const fetchAuto = () => {
      try {
        const unsubscribe = onSnapshot(collection(db, "Auto"), (snapshot) => {
          const autoArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setParcoAuto(autoArray);
        });
        return () => unsubscribe(); // Pulizia dell'ascoltatore
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchAuto();
  }, []);

  // --- FETCH PRENOTAZIONI DAL DB
  useEffect(() => {
    const fetchPrenotazioni = () => {
      try {
        const unsubscribe = onSnapshot(
          collection(db, "Prenotazioni"),
          (snapshot) => {
            const prenotazioniArray = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setRiepilogo(prenotazioniArray);
          }
        );
        return () => unsubscribe(); // Pulizia dell'ascoltatore
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchPrenotazioni();
  }, []);

  // --- UPDATE DATI PARTENZA
  const handleSubmitPartenza = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "Auto", autoSelezionata.id), {
        autista,
        destinazione,
        timePartenza: timeStamp,
        isPrenotata: true,
        kmRilevati: kmPartenza,
      });
      console.log("Stato prenotazione aggiornato con successo!");
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento dello stato prenotazione:",
        error
      );
    }
    navigate("/auto");
  };

  // --- UPDATE DATI RITORNO
  const handleSubmitRitorno = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "Auto", autoSelezionata.id), {
        autista: "",
        destinazione: "",
        timePartenza: "",
        timeRitorno: timeStamp,
        isPrenotata: false,
        kmRilevati: kmRitorno,
      });
      console.log("Stato ritorno aggiornato con successo!");
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento dello stato ritorno:",
        error
      );
    }
    navigate("/auto");
  };

  // --- UPDATE DATI RIEPILOGO
  const handleRiepilogo = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Prenotazioni"), {
        autista: autista,
        destinazione: destinazione,
        kmPartenza,
        kmRitorno,
        carburante,
        condizione,
      });
      console.log("Stato ritorno aggiornato con successo!");
    } catch (error) {
      console.error("Errore durante l'aggiornamento del riepilogo:", error);
    }
  };

  // --- SET AUTISTA SELEZIONATO
  const handleAutista = (e) => setAutista(e.target.textContent);

  // --- SET KM RILEVATI
  const handleKmRilevati = () => setKmPartenza(autoSelezionata.kmRilevati);

  // --- UPDATE KM RILEVATI
  const handleKmAggiornati = () => {
    const inputKmAggiornati = prompt("inserisci i km aggiornati:");
    if (inputKmAggiornati !== null) {
      // ACCETTA SOLO NUMERI
      if (/^\d+$/.test(inputKmAggiornati)) {
        setKmPartenza(inputKmAggiornati);
      } else {
        alert("Inserisci numeri validi.");
      }
    }
  };

  // --- HANDLE PRENOTAZIONI
  const handlePrenotazione = (auto) => {
    if (auto.isPrenotata && auto.autista) {
      if (auto.autista === autista) {
        setAutoSelezionata(auto);
        navigate("/ritorno");
      } else {
        alert("non è una tua prenotazione");
      }
    } else {
      setAutoSelezionata(auto);
      navigate("/partenza");
    }
  };

  return (
    <MyContext.Provider
      value={{
        autista,
        autisti,
        autoSelezionata,
        kmPartenza,
        parcoAuto,
        riepilogo,
        handleAutista,
        handleKmRilevati,
        handleKmAggiornati,
        handlePrenotazione,
        handleSubmitPartenza,
        handleSubmitRitorno,
        handleRiepilogo,
        setAutoSelezionata,
        setCarburante,
        setCondizione,
        setDestinazione,
        setKmRitorno,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
