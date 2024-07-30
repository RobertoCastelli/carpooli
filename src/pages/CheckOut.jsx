import React, { useState } from "react";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import horn from "../sounds/horn.wav";
import { FaCarSide } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";

function CheckOut() {
  const [returnKM, setReturnKM] = useState(""); // Stato locale per i chilometri al ritorno
  const [gasExpenses, setGasExpenses] = useState(""); // Stato locale per le spese di carburante

  const { selectedDriver, activeCar, checkOut, tripID, playSound } =
    useAppContext();
  const navigate = useNavigate(); // Hook per la navigazione

  // Funzione per gestire il check-out del viaggio
  // Registra i dettagli finali e reimposta gli stati locali
  const handleCheckOut = async () => {
    // Controlla che i campi non siano vuoti e che i dati siano validi
    if (!returnKM || !gasExpenses) {
      alert("Per favore, riempi tutti i campi.");
      return;
    }

    try {
      // Registra il check-out con i dettagli forniti
      await checkOut(tripID, returnKM, gasExpenses);
      playSound(horn); // Riproduce un suono di clacson
      navigate("/"); // Naviga alla home page

      // Reset dei campi dopo un check-out riuscito
      setReturnKM("");
      setGasExpenses("");
    } catch (error) {
      console.error("Errore nel check-out", error);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-title">Check-Out</div>
      <div className="checkout-subtitle">
        <div>
          <FaCarSide size={25} />
          {activeCar}
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
        required
      />
      <input
        className="checkout-input"
        type="number"
        placeholder="Inserire spese carburante"
        value={gasExpenses}
        onChange={(e) => setGasExpenses(e.target.value)}
        required
      />
      <button className="checkout-btn" onClick={handleCheckOut}>
        Stop
      </button>
    </div>
  );
}

export default CheckOut;
