import React from "react";
import "./SelectDriver.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import { TbSteeringWheel } from "react-icons/tb";
import click from "../sounds/click.wav";

function SelectDriver() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { drivers, trips, setSelectedDriver, setTripID, playSound } =
    useAppContext();

  // Funzione per ottenere il viaggio attivo per un driver
  const getActiveTripForDriver = (driver) => {
    return trips.find(
      (trip) => trip.checkOut === null && trip.currentDriver === driver.name
    );
  };

  // Funzione per gestire la selezione di un driver
  const handleDriverSelect = (driver) => {
    playSound(click); // Funzione per riprodurre un suono
    setSelectedDriver(driver);

    // Trova se il driver ha un viaggio attivo
    const activeTrip = getActiveTripForDriver(driver);

    if (activeTrip) {
      setTripID(activeTrip.id);
      navigate("/check-out");
    } else {
      navigate("/select-car");
    }
  };

  return (
    <div className="driver-container">
      <div className="driver-title">seleziona conducente</div>
      {drivers.map((driver) => (
        <button
          className="driver-btn"
          key={driver.id}
          onClick={() => handleDriverSelect(driver)}
        >
          {driver.name}
          {getActiveTripForDriver(driver) && (
            <span>
              <TbSteeringWheel size={25} color="brown" />
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

export default SelectDriver;
