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
    <div>
      <div>autista: {autista}</div>
      <div>
        auto: {autoSelezionata.marca} {autoSelezionata.modello}
      </div>
      <form onSubmit={handleSubmitRitorno}>
        <label>
          Km ritorno:
          <input
            type="number"
            value={kmRitorno}
            onChange={(e) => setKmRitorno(e.target.value)}
          />
        </label>
        <br />
        <label>
          Spese carburante:
          <input
            type="number"
            value={carburante}
            onChange={(e) => setCarburante(e.target.value)}
          />
        </label>
        <br />
        <button type="submit">stop</button>
      </form>
    </div>
  );
};
