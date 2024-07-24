import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function CheckOut() {
  const [returnKM, setReturnKM] = useState("");
  const [gasExpenses, setGasExpenses] = useState("");
  const [error, setError] = useState(""); // Stato per gestire gli errori

  const { checkOut } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire il check-out
  const handleCheckOut = async () => {
    // Reset degli stati di errore e successo
    setError("");

    // Validazione dei dati
    if (!returnKM || !gasExpenses) {
      setError("compilare tutti i campi.");
      return;
    }

    try {
      await checkOut(returnKM, gasExpenses);
      // Naviga alla pagina di conferma o alla pagina successiva
      navigate("/confirmation"); // Modifica il percorso secondo le tue esigenze

      // Reset dei campi dopo un check-out riuscito
      setReturnKM("");
      setGasExpenses("");
    } catch (e) {
      setError("errore nel check-out");
    }
  };

  return (
    <div>
      <h3>Check-Out</h3>
      {error && <p style={{ color: "brown" }}>{error}</p>}
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
