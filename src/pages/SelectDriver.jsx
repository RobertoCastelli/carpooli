import React from "react";
import "./SelectDriver.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import { TbSteeringWheel } from "react-icons/tb";
import { IoPersonAddSharp } from "react-icons/io5";
import click from "../sounds/click.wav";

function SelectDriver() {
  const navigate = useNavigate(); // Hook per la navigazione
  const {
    drivers,
    trips,
    setSelectedDriver,
    setActiveCar,
    setTripID,
    playSound,
  } = useAppContext();

  // Funzione per ottenere il viaggio attivo per un driver
  const getActiveTripForDriver = (driver) =>
    trips.find(
      (trip) => trip.checkOut === null && trip.currentDriver === driver.name
    );

  // Funzione per gestire la selezione di un driver
  const handleDriverSelect = (driver, activeTrip) => {
    playSound(click); // Riproduce un suono di click
    setSelectedDriver(driver); // Imposta il driver selezionato

    // Se il driver ha un viaggio attivo, imposta le informazioni sul viaggio e naviga alla pagina di check-out.
    if (activeTrip) {
      setTripID(activeTrip.id); // Imposta l'ID del viaggio attivo
      setActiveCar(activeTrip.activeCar); // Imposta l'auto attiva
      navigate("/check-out");
    } else {
      // Altrimenti, naviga alla pagina di selezione auto
      navigate("/select-car");
    }
  };

  return (
    <div className="driver-container">
      <button className="driver-add">
        <IoPersonAddSharp size={25} color="#282c34" />
      </button>
      <div className="driver-title">Seleziona conducente</div>
      {drivers.map((driver) => {
        const activeTrip = getActiveTripForDriver(driver); // Memorizza il viaggio attivo se presente
        return (
          <button
            className="driver-btn"
            key={driver.id}
            onClick={() => handleDriverSelect(driver, activeTrip)}
          >
            {driver.name}
            {activeTrip && (
              <span>
                <TbSteeringWheel size={25} color="brown" />
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default SelectDriver;
