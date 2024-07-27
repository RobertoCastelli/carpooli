import React from "react";
import "./CarMaintenance.css";
import { useAppContext } from "../utils/AppContext";

function CarMaintenance() {
  const { cars } = useAppContext();

  return (
    <div className="maintenance-container">
      <div className="maintenance-title">manutenzione auto</div>
      <ul className="maintenance-ul">
        {cars.map((car) => (
          <li className="maintenance-li" key={car.id}>
            <div>{car.name}</div>
            <div>{car.tagliando}</div>
            <div>{car.revisione}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CarMaintenance;
