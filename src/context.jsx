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
  const [destinazioni, setDestinazioni] = useState([]);
  const [destinazione, setDestinazione] = useState("");
  const [kmPartenza, setKmPartenza] = useState(0);
  const [kmRitorno, setKmRitorno] = useState(0);
  const [carburante, setCarburante] = useState(0);
  const [condizione, setCondizione] = useState("");
  const [filtro, setFiltro] = useState("tutte");

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

  // --- FETCH DESTINAZIONI DAL DB
  useEffect(() => {
    const fetchDestinazioni = async () => {
      try {
        const q = query(
          collection(db, "Destinazioni"),
          orderBy("destinazione", "asc")
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const destinazioniArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setDestinazioni(destinazioniArray);
        });
        return () => unsubscribe(); // Pulizia dell'ascoltatore
      } catch (error) {
        console.error("Errore nel recupero dei dati: ", error);
      }
    };

    fetchDestinazioni();
  }, []);

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
        condizione,
      });
      console.log("Stato prenotazione aggiornato con successo!");
    } catch (error) {
      console.error(
        "Errore durante l'aggiornamento della prenotazione:",
        error
      );
    }
    navigate("/");
  };

  // --- SET KM AGGIORNATI
  const handleKmAggiornati = () => {
    const inputKmAggiornati = prompt("inserisci i km aggiornati:");
    if (inputKmAggiornati !== null) {
      if (/^\d+$/.test(inputKmAggiornati)) {
        setKmPartenza(inputKmAggiornati);
      } else {
        alert("Inserisci numeri validi.");
      }
    }
  };

  // --- SET AUTISTA SELEZIONATO
  const handleAutistaSelezionato = (e) => {
    setAutista(e.target.textContent);
    setFiltro("tutte");
    navigate("/auto");
  };

  // --- SET AUTO SELEZIONATA && Navigate to Partenza || Ritorno
  const handleAutoSelezionata = (auto) => {
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
        autisti,
        autista,
        parcoAuto,
        autoSelezionata,
        filtro,
        kmPartenza,
        destinazioni,
        handleAutistaSelezionato,
        handleAutoSelezionata,
        handleKmAggiornati,
        handleSubmitPartenza,
        setDestinazione,
        setFiltro,
        setCondizione,
        //controllati

        handleSubmitRitorno,
        setCarburante,
        setKmRitorno,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};
