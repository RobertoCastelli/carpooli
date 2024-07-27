import React from "react";
import "./SelectDriver.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function SelectDriver() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { drivers, trips, setSelectedDriver } = useAppContext();

  // Funzione per gestire la selezione di un driver
  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);

    // Trova se il driver ha un viaggio attivo
    const isDriving = trips.find(
      (trip) => trip.checkOut === null && trip.currentDriver === driver.id
    );

    // Naviga alla pagina appropriata in base allo stato del viaggio
    isDriving ? navigate("/check-out") : navigate("/select-car");
  };

  return (
    <div className="driver-container">
      <div className="driver-title">seleziona conducente</div>
      {drivers.length > 0 ? (
        drivers.map((driver) => (
          <button
            className="driver-btn"
            key={driver.id}
            onClick={() => handleDriverSelect(driver)}
          >
            {driver.name}
          </button>
        ))
      ) : (
        <p>non ci sono conducenti in elenco</p> // Gestisci il caso in cui non ci sono driver disponibili
      )}
    </div>
  );
}

export default SelectDriver;
