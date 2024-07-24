import React, { useState } from "react";
import "./RegisterDeparture.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import { ImHappy2, ImAngry2 } from "react-icons/im";

function RegisterDeparture() {
  const [departureKM, setDepartureKM] = useState("");
  const [carCondition, setCarCondition] = useState("");
  const [destination, setDestination] = useState("");

  const { registerDeparture } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire la registrazione
  const handleRegister = async () => {
    try {
      await registerDeparture(departureKM, carCondition, destination);
      // Naviga alla pagina home
      navigate("/");

      // Reset dei campi dopo una registrazione riuscita
      setDepartureKM("");
      setCarCondition("");
      setDestination("");
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
        placeholder="inserisci km cruscotto"
        value={departureKM}
        onChange={(e) => setDepartureKM(e.target.value)}
        required
      />
      <input
        className="departure-input"
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
        required
      />
      <div className="departure-input">
        <div className="departure-radio-placeholder">condizione auto:</div>
        <label htmlFor="carCondition">
          <input
            name="carCondition"
            type="radio"
            value="pulita"
            checked={carCondition === "pulita"}
            onChange={(e) => setCarCondition(e.target.value)}
            required
          />
          <ImHappy2 size={30} color="green" />
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
          <ImAngry2 size={30} color="brown" />
        </label>
      </div>
      <button className="departure-btn" onClick={handleRegister}>
        registra
      </button>
    </div>
  );
}

export default RegisterDeparture;
