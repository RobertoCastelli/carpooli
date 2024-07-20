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
    <>
      <h3 className="form-titolo">form ritorno</h3>

      <div className="form-ritorno-container">
        <div className="form-content-veicolo-autista">
          <div className="form-veicolo">
            <FaCarSide size={30} />
            {autoSelezionata.marca} {autoSelezionata.modello}
          </div>
          <div className="form-autista">
            <TbSteeringWheel size={30} /> {autista}
          </div>
        </div>

        <form
          onSubmit={handleSubmitRitorno}
          className="form-ritorno-km-carburante"
        >
          <div className="form-ritorno-km">
            <label className="form-label">km ritorno:</label>
            <input
              type="number"
              value={kmRitorno}
              onChange={(e) => setKmRitorno(e.target.value)}
              className="form-input"
            />
          </div>

          <div className="form-ritorno-carburante">
            <label className="form-label">spese carburante:</label>
            <input
              type="number"
              value={carburante}
              onChange={(e) => setCarburante(e.target.value)}
              className="form-input"
            />
          </div>
          <button className="btn-ritorno-termina" type="submit">
            termina missione
          </button>
        </form>
      </div>
    </>
  );
};
