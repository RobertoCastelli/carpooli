import React from "react";
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
    <div>
      <h3>seleziona conducente</h3>
      {drivers.length > 0 ? (
        drivers.map((driver) => (
          <button key={driver} onClick={() => handleDriverSelect(driver)}>
            {driver}
          </button>
        ))
      ) : (
        <p>No drivers available</p> // Gestisci il caso in cui non ci sono driver disponibili
      )}
    </div>
  );
}

export default SelectDriver;
