import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function RegisterDeparture() {
  const [departureKM, setDepartureKM] = useState("");
  const [carCondition, setCarCondition] = useState("");
  const [destination, setDestination] = useState("");
  const [error, setError] = useState(""); // Stato per gestire gli errori
  const [success, setSuccess] = useState(""); // Stato per gestire il successo

  const { registerDeparture } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire la registrazione
  const handleRegister = async () => {
    // Reset degli stati di errore e successo
    setError("");
    setSuccess("");

    // Validazione dei dati
    if (!departureKM || !carCondition || !destination) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await registerDeparture(departureKM, carCondition, destination);
      setSuccess("Departure registered successfully!");

      // Naviga alla pagina di conferma o alla pagina successiva
      navigate("/check-out"); // Modifica il percorso secondo le tue esigenze

      // Reset dei campi dopo una registrazione riuscita
      setDepartureKM("");
      setCarCondition("");
      setDestination("");
    } catch (e) {
      setError("Failed to register departure. Please try again.");
    }
  };

  return (
    <div>
      <h1>Register Departure</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
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
