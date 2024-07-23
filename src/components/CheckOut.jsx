import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function CheckOut() {
  const [returnKM, setReturnKM] = useState("");
  const [gasExpenses, setGasExpenses] = useState("");
  const [error, setError] = useState(""); // Stato per gestire gli errori
  const [success, setSuccess] = useState(""); // Stato per gestire il successo

  const { checkOut } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire il check-out
  const handleCheckOut = async () => {
    // Reset degli stati di errore e successo
    setError("");
    setSuccess("");

    // Validazione dei dati
    if (!returnKM || !gasExpenses) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      await checkOut(returnKM, gasExpenses);
      setSuccess("Check-Out completed successfully!");

      // Naviga alla pagina di conferma o alla pagina successiva
      navigate("/confirmation"); // Modifica il percorso secondo le tue esigenze

      // Reset dei campi dopo un check-out riuscito
      setReturnKM("");
      setGasExpenses("");
    } catch (e) {
      setError("Failed to complete check-out. Please try again.");
    }
  };

  return (
    <div>
      <h1>Check-Out</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
      <input
        type="number"
        placeholder="Return KM"
        value={returnKM}
        onChange={(e) => setReturnKM(e.target.value)}
      />
      <input
        type="number"
        placeholder="Gas Expenses"
        value={gasExpenses}
        onChange={(e) => setGasExpenses(e.target.value)}
      />
      <button onClick={handleCheckOut}>Complete Check-Out</button>
    </div>
  );
}

export default CheckOut;
