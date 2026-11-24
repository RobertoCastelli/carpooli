import React, { useState } from "react";
import "./CheckOut.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import horn from "../sounds/horn.wav";
import { FaCarSide, FaUser, FaGasPump } from "react-icons/fa";

const refuelingLevels = ["Riserva", "1/4", "2/4", "3/4", "4/4"];

function CheckOut() {
  const [returnKM, setReturnKM] = useState("");
  const [gasExpenses, setGasExpenses] = useState("");
  const [refuelingLevel, setRefuelingLevel] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const { selectedDriver, activeCar, checkOut, tripID, trips, playSound } =
    useAppContext();

  const navigate = useNavigate();

  const handleCheckOut = async () => {
    if (isSaving) return;

    if (returnKM === "" || gasExpenses === "" || refuelingLevel === "") {
      alert("Per favore, riempi tutti i campi.");
      return;
    }

    if (
      !Number.isFinite(Number(returnKM)) ||
      Number(returnKM) < 0 ||
      !Number.isFinite(Number(gasExpenses)) ||
      Number(gasExpenses) < 0
    ) {
      alert("Inserisci valori validi per chilometri e spese carburante.");
      return;
    }

    if (!tripID || !selectedDriver || !activeCar) {
      alert("Dati del viaggio incompleti. Torna alla flotta.");
      return;
    }

    const currentTrip = trips.find((trip) => trip.id === tripID);

    const departureKM = Number(currentTrip?.departure?.departureKM);

    if (
      !currentTrip ||
      currentTrip.checkOut != null ||
      currentTrip.departure?.departureKM === undefined ||
      !Number.isFinite(departureKM)
    ) {
      alert("Impossibile verificare i chilometri di partenza.");
      return;
    }

    if (Number(returnKM) < departureKM) {
      alert(
        `I chilometri di rientro non possono essere inferiori a quelli di partenza (${departureKM} km).`,
      );
      return;
    }

    setIsSaving(true);

    try {
      await checkOut(tripID, returnKM, gasExpenses, refuelingLevel);

      playSound(horn);
      navigate("/");
    } catch (error) {
      console.error("Errore nel check-out", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="checkout-container">
      <div className="checkout-title">Registra Rientro</div>

      <div className="checkout-card">
        <div className="checkout-subtitle">
          <div className="checkout-car">
            <FaCarSide size={25} />
            <span>{activeCar}</span>
          </div>
        </div>

        <div className="checkout-driver">
          <FaUser />
          <span>
            In uso: <strong>{selectedDriver?.name || ""}</strong>
          </span>
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
          placeholder="Inserire spese rifornimento"
          value={gasExpenses}
          onChange={(e) => setGasExpenses(e.target.value)}
          required
        />

        <div className="checkout-refueling">
          <div className="checkout-refueling-title">
            <FaGasPump />
            <span>Livello rifornimento al rientro</span>
          </div>

          <div
            className="checkout-refueling-options"
            role="group"
            aria-label="Livello rifornimento al rientro"
          >
            {refuelingLevels.map((level) => (
              <button
                key={level}
                type="button"
                className={`checkout-refueling-option ${
                  refuelingLevel === level ? "checkout-refueling-selected" : ""
                }`}
                onClick={() => setRefuelingLevel(level)}
                aria-pressed={refuelingLevel === level}
                disabled={isSaving}
              >
                {level}
              </button>
            ))}
          </div>
        </div>

        <button
          className="checkout-btn"
          type="button"
          onClick={handleCheckOut}
          disabled={isSaving}
        >
          {isSaving ? "Salvataggio..." : "Stop"}
        </button>
      </div>
    </div>
  );
}

export default CheckOut;
