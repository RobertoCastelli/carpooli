/* import React from "react";
import "./CarMaintenance.css";
import { useAppContext } from "../utils/AppContext";

import { FaCarSide } from "react-icons/fa";
import { FaOilCan } from "react-icons/fa";
import { GiSmokeBomb } from "react-icons/gi";
import { LuCalendarClock } from "react-icons/lu";

function CarMaintenance() {
  const { cars, updateCarMaintenanceDates } = useAppContext();

  const handleMaintClick = (car) => {
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
    <div className="maint-container">
      <div className="maint-title">manutenzione auto</div>
      <ul className="maint-ul">
        {cars.map((car) => (
          <li className="maint-li" key={car.id}>
            <div className="maint-car">
              <FaCarSide size={25} />
              auto: {car.name}
            </div>
            <div className="maint-tagliando">
              <FaOilCan size={25} />
              tagliando: {car.tagliando}
            </div>
            <div className="maint-revisione">
              <GiSmokeBomb size={25} /> revisione: {car.revisione}
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
 */

import React, { useState } from "react";
import "./CarMaintenance.css";
import { useAppContext } from "../utils/AppContext";
import { FaCarSide, FaOilCan } from "react-icons/fa";
import { GiSmokeBomb } from "react-icons/gi";
import { LuCalendarClock } from "react-icons/lu";

function CarMaintenance() {
  const { cars, updateCarMaintenanceDates } = useAppContext();
  const [modalData, setModalData] = useState({
    showModal: false,
    carId: null,
    newTagliando: "",
    newRevisione: "",
  });

  const handleMaintClick = (car) => {
    setModalData({
      showModal: true,
      carId: car.id,
      newTagliando: car.tagliando,
      newRevisione: car.revisione,
    });
  };

  const handleSave = () => {
    if (modalData.newTagliando && modalData.newRevisione) {
      const formattedTagliando = new Date(
        modalData.newTagliando
      ).toLocaleDateString("it-IT");
      const formattedRevisione = new Date(
        modalData.newRevisione
      ).toLocaleDateString("it-IT");
      updateCarMaintenanceDates(
        modalData.carId,
        formattedTagliando,
        formattedRevisione
      );
      setModalData({
        showModal: false,
        carId: null,
        newTagliando: "",
        newRevisione: "",
      });
    }
  };

  const handleChange = (field, value) => {
    setModalData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
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
            <div className="maint-tagliando">
              <FaOilCan size={25} />
              Tagliando: {car.tagliando}
            </div>
            <div className="maint-revisione">
              <GiSmokeBomb size={25} /> Revisione: {car.revisione}
            </div>
            <button className="maint-btn" onClick={() => handleMaintClick(car)}>
              <LuCalendarClock size={20} color="white" />
            </button>
          </li>
        ))}
      </ul>
      {modalData.showModal && (
        <div className="maint-modal">
          <h3>Aggiorna le date di manutenzione</h3>
          <label>
            Nuova data tagliando:
            <input
              type="date"
              value={modalData.newTagliando}
              onChange={(e) => handleChange("newTagliando", e.target.value)}
            />
          </label>
          <label>
            Nuova data revisione:
            <input
              type="date"
              value={modalData.newRevisione}
              onChange={(e) => handleChange("newRevisione", e.target.value)}
            />
          </label>
          <button onClick={handleSave}>Salva</button>
          <button
            onClick={() =>
              setModalData({
                showModal: false,
                carId: null,
                newTagliando: "",
                newRevisione: "",
              })
            }
          >
            Annulla
          </button>
        </div>
      )}
    </div>
  );
}

export default CarMaintenance;
