import React from "react";
import "./CarMaintenance.css";
import { useAppContext } from "../utils/AppContext";
import { FaCarSide, FaOilCan } from "react-icons/fa";
import { GiSmokeBomb } from "react-icons/gi";
import { LuCalendarClock } from "react-icons/lu";

function CarMaintenance() {
  const { cars, updateCarMaintenanceDates, timeStamp } = useAppContext();

  // Funzione per verificare se una data è passata rispetto alla data odierna
  const isDatePast = (date) => date < timeStamp;

  // Funzione per validare la data nel formato "dd/mm/yyyy"
  const isValidDate = (date) => {
    const regex = /^\d{2}\/\d{2}\/\d{4}$/;
    return regex.test(date);
  };

  // Gestore per aprire il prompt e ottenere le nuove date
  const handleMaintClick = async (car) => {
    const newTagliando = prompt(
      `Inserisci nuova data tagliando per ${car.name} (formato: dd/mm/yyyy):`,
      car.tagliando
    );
    const newRevisione = prompt(
      `Inserisci nuova data revisione per ${car.name} (formato: dd/mm/yyyy):`,
      car.revisione
    );

    if (
      newTagliando &&
      newRevisione &&
      isValidDate(newTagliando) &&
      isValidDate(newRevisione)
    ) {
      try {
        await updateCarMaintenanceDates(car.id, newTagliando, newRevisione);
      } catch (error) {
        console.error(
          "Errore nell'aggiornamento delle date di manutenzione:",
          error
        );
      }
    } else {
      alert("Per favore, inserisci le date nel formato corretto (dd/mm/yyyy).");
    }
  };

  return (
    <div className="maint-container">
      <div className="maint-title">Manutenzione Auto</div>
      <ul className="maint-ul">
        {cars.map((car) => (
          <li className="maint-li" key={car.id}>
            <div className="maint-car">
              <FaCarSide size={25} />
              Auto: {car.name}
            </div>
            <div
              className="maint-tagliando"
              style={{ color: isDatePast(car.tagliando) ? "brown" : "green" }}
            >
              <FaOilCan size={25} />
              Tagliando: {car.tagliando}
            </div>
            <div
              className="maint-revisione"
              style={{ color: isDatePast(car.revisione) ? "brown" : "green" }}
            >
              <GiSmokeBomb size={25} /> Revisione: {car.revisione}
            </div>
            <button className="maint-btn" onClick={() => handleMaintClick(car)}>
              <LuCalendarClock size={20} color="white" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarMaintenance;
