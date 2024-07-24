import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function RegisterDeparture() {
  const [departureKM, setDepartureKM] = useState("");
  const [carCondition, setCarCondition] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState(""); // Stato per gestire gli errori

  const { registerDeparture } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire la registrazione
  const handleRegister = async () => {
    // Reset degli stati di errore e successo
    setError("");

    // Validazione dei dati
    if (!departureKM || !carCondition || !destination) {
      setError("compilare tutti i campi.");
      return;
    }

    try {
      await registerDeparture(departureKM, carCondition, destination);
      // Naviga alla pagina home
      navigate("/");

      // Reset dei campi dopo una registrazione riuscita
      setDepartureKM("");
      setCarCondition("");
      setDestination("");
    } catch (e) {
      setError("errore nella registrazione.");
    }
  };

  return (
    <div>
      <h1>Register Departure</h1>
      {error && <p style={{ color: "brown" }}>{error}</p>}
      <input
        type="number"
        placeholder="Departure KM"
        value={departureKM}
        onChange={(e) => setDepartureKM(e.target.value)}
      />
      <input
        type="text"
        placeholder="Car Condition"
        value={carCondition}
        onChange={(e) => setCarCondition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Destination"
        value={destination}
        onChange={(e) => setDestination(e.target.value)}
      />
      <button onClick={handleRegister}>Register Departure</button>
    </div>
  );
}

export default RegisterDeparture;
