import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ICONS
import { FaCarSide } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";

export const FormRitorno = () => {
  const {
    autista,
    autoSelezionata,
    kmRitorno,
    setKmRitorno,
    carburante,
    setCarburante,
    handleSubmitRitorno,
  } = useContext(MyContext);

  return (
    <div className="component-container">
      <div className="info">
        <div className="info-icons">
          <FaCarSide size={30} />
          {autoSelezionata.marca} {autoSelezionata.modello}
        </div>
        <div className="info-icons">
          <TbSteeringWheel size={30} /> {autista}
        </div>
      </div>
      <form onSubmit={handleSubmitRitorno} className="form">
        <label className="form-item">
          Km ritorno:
          <input
            type="number"
            value={kmRitorno}
            onChange={(e) => setKmRitorno(e.target.value)}
            className="form-input"
          />
        </label>
        <label className="form-item">
          Spese carburante:
          <input
            type="number"
            value={carburante}
            onChange={(e) => setCarburante(e.target.value)}
            className="form-input"
          />
        </label>
        <button type="submit" className="form-button">
          TERMINA MISSIONE
        </button>
      </form>
    </div>
  );
};
