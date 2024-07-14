import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

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
        <div>Autista: {autista}</div>
        <div>
          Auto: {autoSelezionata.marca} {autoSelezionata.modello}
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
          Stop
        </button>
      </form>
    </div>
  );
};
