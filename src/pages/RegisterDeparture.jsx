import React, { useState } from "react";
import "./RegisterDeparture.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import { ImHappy2, ImAngry2 } from "react-icons/im";

function RegisterDeparture() {
  const [departureKM, setDepartureKM] = useState("");
  const [carCondition, setCarCondition] = useState("");

  const {
    destinations,
    selectedDestination,
    setSelectedDestination,
    registerDeparture,
  } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire la registrazione
  const handleRegister = async () => {
    try {
      await registerDeparture(departureKM, carCondition, selectedDestination);
      // Naviga alla pagina home
      navigate("/");

      // Reset dei campi dopo una registrazione riuscita
      setDepartureKM("");
      setCarCondition("");
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

      <div className="departure-input">
        <div>Condizione auto:</div>
        <label htmlFor="carCondition">
          <input
            name="carCondition"
            type="radio"
            value="pulita"
            checked={carCondition === "pulita"}
            onChange={(e) => setCarCondition(e.target.value)}
            required
          />
          <ImHappy2 size={25} color="green" />
        </label>
        <label htmlFor="carCondition">
          <input
            name="carCondition"
            type="radio"
            value="sporca"
            checked={carCondition === "sporca"}
            onChange={(e) => setCarCondition(e.target.value)}
            required
          />
          <ImAngry2 size={25} color="brown" />
        </label>
      </div>
      <button className="departure-btn" onClick={handleRegister}>
        inizia viaggio
      </button>
    </div>
  );
}

export default RegisterDeparture;
