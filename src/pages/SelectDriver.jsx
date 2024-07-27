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

  // Funzione per gestire la selezione di un driver
  const handleDriverSelect = (driver) => {
    playSound(click); // Funzione per riprodurre un suono di click
    setSelectedDriver(driver);

    // Trova se il driver ha un viaggio attivo
    const isTripActive = trips.find(
      (trip) => trip.checkOut === null && trip.currentDriver === driver.id
    );

    if (isTripActive) {
      setTripID(isTripActive.id);
      navigate("/check-out");
    } else {
      navigate("/select-car");
    }
  };

  // Funzione per verificare se un driver ha un viaggio attivo
  const isDriverActive = (driverId) =>
    trips.some(
      (trip) => trip.checkOut === null && trip.currentDriver === driverId
    );

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
          {isDriverActive(driver.id) && (
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
