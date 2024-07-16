// --- REACT
import React, { useState, useEffect } from "react";
// --- FIREBASE
import { db } from "./FirebaseConfig";
import {
  query,
  doc,
  onSnapshot,
  updateDoc,
  collection,
  addDoc,
  orderBy,
  where,
} from "firebase/firestore";
// --- ROUTER
import { useNavigate } from "react-router-dom";
// --- CONTEXT
export const MyContext = React.createContext();

export const ContextProvider = ({ children }) => {
  const [parcoAuto, setParcoAuto] = useState([]);
  const [autoSelezionata, setAutoSelezionata] = useState([]);
  const [autisti, setAutisti] = useState([]);
  const [autista, setAutista] = useState("");
  const [destinazione, setDestinazione] = useState("");
  const [kmPartenza, setKmPartenza] = useState(0);
  const [kmRitorno, setKmRitorno] = useState(0);
  const [condizione, setCondizione] = useState("");
  const [carburante, setCarburante] = useState(0);
  const [riepilogo, setRiepilogo] = useState([]);
  const [filtro, setFiltro] = useState("tutte");

  const [destinazioni] = useState(["leonardo", "newton", "pareto", "einstein"]);

  // --- NAVIGATE
  const navigate = useNavigate();

  // --- TIMESTAMP
  const timeStamp = new Date().toLocaleString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // --- FETCH AUTO DAL DB
  useEffect(() => {
    const fetchAuto = async (filtro) => {
      try {
        let q;
        if (filtro === "prenotate") {
          q = query(
            collection(db, "Auto"),
            where("isPrenotata", "==", true),
            orderBy("marca", "asc")
          );
        } else if (filtro === "libere") {
          q = query(
            collection(db, "Auto"),
            where("isPrenotata", "==", false),
            orderBy("marca", "asc")
          );
        } else {
          q = query(collection(db, "Auto"), orderBy("marca", "asc"));
        }
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const autoArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setParcoAuto(autoArray);
        });
        return () => unsubscribe(); // Pulizia dell'ascoltatore
      } catch (error) {
        console.error("Errore nel recupero dei dati: ", error);
      }
    };

    fetchAuto(filtro);
  }, [filtro]);

  // --- FETCH RIEPILOGO DAL DB
  useEffect(() => {
    const fetchPrenotazioni = async () => {
      try {
        const q = query(
          collection(db, "Prenotazioni"),
          orderBy("timeRitorno", "desc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const prenotazioniArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRiepilogo(prenotazioniArray);
        });
        return () => unsubscribe(); // Pulizia dell'ascoltatore
      } catch (error) {
        console.error("Errore nel recupero dei dati: ", error);
      }
    };

    fetchPrenotazioni();
  }, []);

  // --- FETCH AUTISTI DAL DB
  useEffect(() => {
    const fetchAutisti = async () => {
      try {
        const q = query(collection(db, "Autisti"), orderBy("autista", "asc"));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const autistiArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAutisti(autistiArray);
        });
        return () => unsubscribe(); // Pulizia dell'ascoltatore
      } catch (error) {
        console.error("Errore nel recupero dei dati: ", error);
      }
    };

    fetchAutisti();
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
        kmPartenza,
      });
      console.log("Stato prenotazione aggiornato con successo!");
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento della prenotazione:",
        error
      );
    }
    navigate("/auto");
  };

  // --- UPDATE DATI RITORNO & RIEPILOGO
  const handleSubmitRitorno = (e) => {
    e.preventDefault();
    handleRitorno();
    handleRiepilogo();
  };

  // --- UPDATE DATI RITORNO
  const handleRitorno = async () => {
    try {
      await updateDoc(doc(db, "Auto", autoSelezionata.id), {
        autista: "",
        destinazione: "",
        timePartenza: "",
        timeRitorno: timeStamp,
        isPrenotata: false,
        kmPartenza: kmRitorno,
      });
      console.log("Stato ritorno aggiornato con successo!");
    } catch (error) {
      console.error("Errore durante l'aggiornamento del ritorno:", error);
    }
    navigate("/riepilogo");
  };

  // --- ADD DATI RIEPILOGO
  const handleRiepilogo = async () => {
    try {
      await addDoc(collection(db, "Prenotazioni"), {
        autista,
        marca: autoSelezionata.marca,
        modello: autoSelezionata.modello,
        destinazione,
        kmPartenza,
        kmRitorno,
        carburante,
        condizione,
        timeRitorno: timeStamp,
      });
      console.log("Stato ritorno aggiornato con successo!");
    } catch (error) {
      console.error("Errore durante l'aggiornamento del riepilogo:", error);
    }
  };

  // --- SET AUTISTA SELEZIONATO
  const handleAutista = (e) => {
    setAutista(e.target.textContent);
    setFiltro("tutte");
    setKmPartenza(0);
  };

  // --- UPDATE KM DI PARTENZA
  const handleKmPartenza = async () => {
    try {
      await updateDoc(doc(db, "Auto", autoSelezionata.id), {
        kmPartenza,
      });
      console.log("Km aggiornati con successo!");
    } catch (error) {
      console.error("Errore durante l'aggiornamento dei km:", error);
    }
    navigate("/riepilogo");
  };

  const handleSubmitAggiornamentoKm = () => {
    const inputKmAggiornati = prompt("inserisci i km aggiornati:");
    if (inputKmAggiornati !== null) {
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
        alert(`Auto in uso da ${auto.autista}`);
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
        destinazioni,
        kmPartenza,
        parcoAuto,
        riepilogo,
        handleAutista,
        handleKmPartenza,
        handlePrenotazione,
        handleSubmitPartenza,
        handleSubmitAggiornamentoKm,
        handleSubmitRitorno,
        setAutoSelezionata,
        setCarburante,
        setCondizione,
        setDestinazione,
        setKmRitorno,
        setFiltro,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
