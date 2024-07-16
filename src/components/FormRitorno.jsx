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
      <div className="form-container">
        
        <div className="form-content">
          <div className="form-veicolo">
            <FaCarSide size={30} />
            {autoSelezionata.marca} {autoSelezionata.modello}
          </div>
          <div className="form-autista">
            <TbSteeringWheel size={30} /> {autista}
          </div>
        </div>

        <form onSubmit={handleSubmitRitorno} className="form">
          <div className="form-content">
            <div className="form-ritorno">
              <label className="form-label">km ritorno:</label>
              <input
                type="number"
                value={kmRitorno}
                onChange={(e) => setKmRitorno(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-ritorno">
              <label className="form-label">spese carburante:</label>
              <input
                type="number"
                value={carburante}
                onChange={(e) => setCarburante(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <button type="submit">termina missione</button>
        </form>
      </div>
    </>
  );
};
