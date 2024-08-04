import React, { useState } from "react";
import "./SelectDriver.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import { TbSteeringWheel } from "react-icons/tb";
import { IoPersonAddSharp } from "react-icons/io5";
import click from "../sounds/click.wav";

function SelectDriver() {
  const navigate = useNavigate();
  const {
    drivers,
    trips,
    setSelectedDriver,
    setActiveCar,
    setTripID,
    addNewDriver,
    playSound,
  } = useAppContext();

  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [error, setError] = useState("");

  // Funzione per ottenere il viaggio attivo per un driver
  const getActiveTripForDriver = (driver) =>
    trips.find(
      (trip) => trip.checkOut === null && trip.currentDriver === driver.name
    );

  // Funzione per gestire la selezione di un driver
  const handleDriverSelect = (driver, activeTrip) => {
    playSound(click);
    setSelectedDriver(driver);

    if (activeTrip) {
      setTripID(activeTrip.id);
      setActiveCar(activeTrip.activeCar);
      navigate("/check-out");
    } else {
      navigate("/select-car");
    }
  };

  // Funzione per gestire l'aggiunta di un nuovo driver
  const handleAddDriver = async () => {
    if (!name.trim() || !surname.trim()) {
      setError("Entrambi i campi, Nome e Cognome, devono essere compilati.");
      return;
    }

    try {
      await addNewDriver(`${name.trim()} ${surname.trim()}`);
      alert("Il nuovo conducente è stato aggiunto con successo.");
      setName("");
      setSurname("");
      setError("");
      setShowModal(false);
    } catch (error) {
      console.error("Errore nell'aggiungere il conducente:", error);
      alert(
        "Si è verificato un errore durante l'aggiunta del conducente. Per favore, riprova più tardi."
      );
    }
  };

  return (
    <div className="driver-container">
      <button className="driver-add" onClick={() => setShowModal(true)}>
        <IoPersonAddSharp size={25} color="#282c34" />
      </button>
      <div className="driver-title">Seleziona conducente</div>
      {drivers.map((driver) => {
        const activeTrip = getActiveTripForDriver(driver);
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

      {/* Modale integrato */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Nuovo Conducente</h2>
            <label>
              Nome:
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label>
              Cognome:
              <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
            </label>
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleAddDriver}>Salva</button>
            <button onClick={() => setShowModal(false)}>Annulla</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectDriver;
