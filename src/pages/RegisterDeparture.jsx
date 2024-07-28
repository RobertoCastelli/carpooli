import React, { useState } from "react";
import "./RegisterDeparture.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function RegisterDeparture() {
  const [departureKM, setDepartureKM] = useState("");

  const {
    destinations,
    selectedDestination,
    setSelectedDestination,
    registerDeparture,
  } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire la registrazione
  const handleRegister = async () => {
    if (!departureKM || !selectedDestination) {
      alert("Per favore, riempi tutti i campi.");
      return;
    }

    try {
      await registerDeparture(departureKM, selectedDestination);
      // Naviga alla pagina home
      navigate("/");

      // Reset dei campi dopo una registrazione riuscita
      setDepartureKM("");
      setSelectedDestination("");
    } catch (err) {
      console.error("errore nella registrazione", err);
    }
  };

  return (
    <div className="departure-container">
      <div className="departure-title">registra partenza</div>
      <input
        className="departure-input"
        type="number"
        placeholder="Inserire km cruscotto"
        value={departureKM}
        onChange={(e) => setDepartureKM(e.target.value)}
        required
      />

      <select
        className="departure-input"
        value={selectedDestination}
        onChange={(e) => setSelectedDestination(e.target.value)}
        required
      >
        <option value="" disabled>
          Seleziona destinazione...
        </option>
        {destinations.map((dest) => (
          <option
            key={dest.id}
            value={dest.name}
            onChange={(e) => setSelectedDestination(e.target.value)}
          >
            {dest.name}
          </option>
        ))}
      </select>

      <button className="departure-btn" onClick={handleRegister}>
        start
      </button>
    </div>
  );
}

export default RegisterDeparture;
