import React from "react";
import "./CarMaintenance.css";
import { useAppContext } from "../utils/AppContext";
import { FaCarSide } from "react-icons/fa";
import { LuCalendarClock } from "react-icons/lu";

function CarMaintenance() {
  const { cars, updateCarMaintenanceDates, timeStamp } = useAppContext();

  // Funzione per convertire una stringa formattata come "dd/mm/yyyy" in un oggetto Date
  const parseDate = (dateStr) => {
    const [day, month, year] = dateStr.split("/");
    return new Date(`${year}-${month}-${day}`);
  };

  // Funzione per verificare se una data è passata rispetto alla data odierna
  const isDatePast = (date) =>
    parseDate(date) < parseDate(timeStamp.split(",")[0]);

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
              {car.name}
            </div>
            <div
              style={{ color: isDatePast(car.tagliando) ? "brown" : "green" }}
            >
              <label>tagliando:</label>
              {car.tagliando}
            </div>
            <div
              style={{ color: isDatePast(car.revisione) ? "brown" : "green" }}
            >
              <label>revisione:</label>
              {car.revisione}
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
