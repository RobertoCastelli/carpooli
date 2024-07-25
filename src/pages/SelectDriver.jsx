import React from "react";
import "./SelectDriver.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function SelectDriver() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { drivers, setSelectedDriver } = useAppContext();

  // Funzione per gestire la selezione di un driver
  const handleDriverSelect = (driver) => {
    setSelectedDriver(driver);
    navigate("/select-car"); // Naviga alla pagina di selezione dell'auto
  };

  return (
    <div className="driver-container">
      <div className="driver-title">seleziona conducente</div>
      {drivers.length > 0 ? (
        drivers.map((driver) => (
          <button
            className="driver-btn"
            key={driver.id}
            onClick={() => handleDriverSelect(driver.name)}
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
