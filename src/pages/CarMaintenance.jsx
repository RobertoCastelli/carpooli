import React from "react";
import "./CarMaintenance.css";
import { useAppContext } from "../utils/AppContext";

function CarMaintenance() {
  const { cars, updateCarMaintenanceDates } = useAppContext();

  const handleEditClick = (car) => {
    const newTagliando = prompt(
      "Inserisci la nuova data per il tagliando:",
      car.tagliando
    );
    const newRevisione = prompt(
      "Inserisci la nuova data per la revisione:",
      car.revisione
    );

    if (newTagliando && newRevisione) {
      updateCarMaintenanceDates(car.id, newTagliando, newRevisione);
    }
  };

  return (
    <div className="maintenance-container">
      <div className="maintenance-title">manutenzione auto</div>
      <ul className="maintenance-ul">
        {cars.map((car) => (
          <li className="maintenance-li" key={car.id}>
            <div>{car.name}</div>
            <div>{car.tagliando}</div>
            <div>{car.revisione}</div>
            <button className="edit-btn" onClick={() => handleEditClick(car)}>
              Modifica
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarMaintenance;
