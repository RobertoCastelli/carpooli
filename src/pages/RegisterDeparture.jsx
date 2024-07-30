import React, { useState } from "react";
import "./RegisterDeparture.css";
import { useNavigate } from "react-router-dom";
import engine from "../sounds/engine.wav";
import { useAppContext } from "../utils/AppContext";
import { FaCarSide } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";

function RegisterDeparture() {
  const [departureKM, setDepartureKM] = useState(""); // Stato locale per il chilometraggio di partenza

  const {
    activeCar,
    selectedDriver,
    destinations,
    selectedDestination,
    setSelectedDestination,
    registerDeparture,
    playSound,
  } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire la registrazione della partenza
  // Controlla che tutti i campi siano compilati prima di procedere
  const handleRegister = async () => {
    if (!departureKM || !selectedDestination) {
      alert("Per favore, riempi tutti i campi.");
      return;
    }

    try {
      // Registra la partenza con i dettagli forniti
      await registerDeparture(departureKM, selectedDestination);

      // Riproduce il suono del motore
      playSound(engine);

      // Naviga alla pagina home
      navigate("/");

      // Reset dei campi dopo una registrazione riuscita per evitare dati residui
      setDepartureKM("");
      setSelectedDestination("");
    } catch (err) {
      console.error("Errore nella registrazione", err);
    }
  };

  return (
    <div className="departure-container">
      <div className="departure-title">Registra Partenza</div>
      <div className="departure-subtitle">
        <div>
          <FaCarSide size={25} /> {activeCar.name}
        </div>
        <div>
          <TbSteeringWheel size={25} />
          {selectedDriver.name}
        </div>
      </div>
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
          <option key={dest.id} value={dest.name}>
            {dest.name}
          </option>
        ))}
      </select>

      <button className="departure-btn" onClick={handleRegister}>
        Start
      </button>
    </div>
  );
}

export default RegisterDeparture;
