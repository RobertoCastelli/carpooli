import React, { useState } from "react";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function CheckOut() {
  const [returnKM, setReturnKM] = useState("");
  const [gasExpenses, setGasExpenses] = useState("");

  const { checkOut, tripID } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire il check-out
  const handleCheckOut = async () => {
    // Trova se il driver ha un viaggio attivo
    try {
      await checkOut(tripID, returnKM, gasExpenses);
      // Naviga alla Home
      navigate("/"); //

      // Reset dei campi dopo un check-out riuscito
      setReturnKM("");
      setGasExpenses("");
    } catch (error) {
      console.error("Errore nel check-out", error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-title">check-Out</div>
      <input
        className="checkout-input"
        type="number"
        placeholder="Inserire km cruscotto"
        value={returnKM}
        onChange={(e) => setReturnKM(e.target.value)}
      />
      <input
        className="checkout-input"
        type="number"
        placeholder="Inserire spese carburante"
        value={gasExpenses}
        onChange={(e) => setGasExpenses(e.target.value)}
      />
      <button className="checkout-btn" onClick={handleCheckOut}>
        stop
      </button>
    </div>
  );
}

export default CheckOut;
