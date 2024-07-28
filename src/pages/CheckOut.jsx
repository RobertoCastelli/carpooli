import React, { useState } from "react";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import horn from "../sounds/horn.wav";
import { FaCarSide } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";

function CheckOut() {
  const [returnKM, setReturnKM] = useState("");
  const [gasExpenses, setGasExpenses] = useState("");

  const { selectedDriver, checkOut, tripID, playSound } = useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire il check-out
  const handleCheckOut = async () => {
    // Trova se il driver ha un viaggio attivo
    try {
      await checkOut(tripID, returnKM, gasExpenses);
      playSound(horn); // Funzione per riprodurre un suono
      navigate("/"); // Naviga alla Home

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
      <div className="checkout-subtitle">
        <div>
          <FaCarSide size={25} />
        </div>
        <div>
          <TbSteeringWheel size={25} />
          {selectedDriver.name}
        </div>
      </div>
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
