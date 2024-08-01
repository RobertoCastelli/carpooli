import React, { useState } from "react";
import "./CarMaintenance.css";
import { useAppContext } from "../utils/AppContext";
import { FaCarSide } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";

function CarMaintenance() {
  const [showModal, setShowModal] = useState(false);
  const [currentCar, setCurrentCar] = useState(null);
  const [newTagliando, setNewTagliando] = useState("");
  const [newRevisione, setNewRevisione] = useState("");
  const [newBollo, setNewBollo] = useState("");
  const [newAssicurazione, setNewAssicurazione] = useState("");

  const { cars, updateCarMaintenanceDates } = useAppContext();

  // Funzione per formattare una data in formato dd/mm/yyyy
  const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Funzione per verificare se una data è maggiore di oggi
  const isDatePast = (date) => {
    const today = new Date();
    const dateToCheck = new Date(date);
    return dateToCheck > today;
  };

  // Funzione per gestire la visualizzazione del modale e prepopolare i campi
  const handleMaintClick = (car) => {
    setCurrentCar(car);
    setNewTagliando(formatDate(car.tagliando) || "");
    setNewRevisione(formatDate(car.revisione) || "");
    setNewBollo(formatDate(car.bollo) || "");
    setNewAssicurazione(formatDate(car.assicurazione) || "");
    setShowModal(true);
  };

  // Funzione per salvare le nuove date e chiudere il modale
  const handleSave = async () => {
    if (
      currentCar &&
      newTagliando &&
      newRevisione &&
      newBollo &&
      newAssicurazione
    ) {
      try {
        // Converte le date nel formato corretto per il salvataggio
        const tagliandoDate = new Date(
          newTagliando.split("/").reverse().join("-")
        );
        const revisioneDate = new Date(
          newRevisione.split("/").reverse().join("-")
        );
        const bolloDate = new Date(newBollo.split("/").reverse().join("-"));
        const assicurazioneDate = new Date(
          newAssicurazione.split("/").reverse().join("-")
        );

        await updateCarMaintenanceDates(
          currentCar.id,
          tagliandoDate.toISOString().split("T")[0],
          revisioneDate.toISOString().split("T")[0],
          bolloDate.toISOString().split("T")[0],
          assicurazioneDate.toISOString().split("T")[0]
        );
        setShowModal(false);
      } catch (error) {
        console.error(
          "Errore nell'aggiornamento delle date di manutenzione:",
          error
        );
      }
    } else {
      alert("Per favore, inserisci tutte le date.");
    }
  };

  // Funzione per chiudere il modale senza salvare
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="maint-container">
      <div className="maint-title">Manutenzione Auto</div>
      <ul className="maint-ul">
        {cars.map((car) => (
          <li className="maint-li" key={car.id}>
            <div className="maint-car">
              <FaCarSide size={25} />
              {car.name}
            </div>
            <div
              className={`date ${isDatePast(car.tagliando) ? "past-date" : ""}`}
            >
              <label>tagliando:</label>
              {formatDate(car.tagliando)}
            </div>
            <div
              className={`date ${isDatePast(car.revisione) ? "past-date" : ""}`}
            >
              <label>revisione:</label>
              {formatDate(car.revisione)}
            </div>
            <div className={`date ${isDatePast(car.bollo) ? "past-date" : ""}`}>
              <label>bollo:</label>
              {formatDate(car.bollo)}
            </div>
            <div
              className={`date ${
                isDatePast(car.assicurazione) ? "past-date" : ""
              }`}
            >
              <label>assicurazione:</label>
              {formatDate(car.assicurazione)}
            </div>
            <button className="maint-btn" onClick={() => handleMaintClick(car)}>
              <LuCalendarClock size={20} color="white" />
            </button>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Modifica date per {currentCar?.name}</h2>
            <label>
              Data TAGLIANDO:
              <input
                type="date"
                value={newTagliando.split("/").reverse().join("-")}
                onChange={(e) =>
                  setNewTagliando(e.target.value.split("-").reverse().join("/"))
                }
              />
            </label>
            <label>
              Data REVISIONE:
              <input
                type="date"
                value={newRevisione.split("/").reverse().join("-")}
                onChange={(e) =>
                  setNewRevisione(e.target.value.split("-").reverse().join("/"))
                }
              />
            </label>
            <label>
              Data BOLLO:
              <input
                type="date"
                value={newBollo.split("/").reverse().join("-")}
                onChange={(e) =>
                  setNewBollo(e.target.value.split("-").reverse().join("/"))
                }
              />
            </label>
            <label>
              Data ASSICURAZIONE:
              <input
                type="date"
                value={newAssicurazione.split("/").reverse().join("-")}
                onChange={(e) =>
                  setNewAssicurazione(
                    e.target.value.split("-").reverse().join("/")
                  )
                }
              />
            </label>
            <button className="modal-save-btn" onClick={handleSave}>
              Salva
            </button>
            <button className="modal-close-btn" onClick={handleClose}>
              Annulla
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CarMaintenance;
