// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ICONS
import { FaCarSide } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { ImHappy, ImAngry } from "react-icons/im";

export const FormPartenza = () => {
  const {
    autista,
    autoSelezionata,
    handleKmAggiornati,
    handleSubmitPartenza,
    setDestinazione,
    setCondizione,
  } = useContext(MyContext);

  return (
    <>
      <h3 className="form-titolo">form partenza</h3>
      <div className="form-container">
        <div className="form-content">
          <div className="form-veicolo">
            <FaCarSide size={30} /> {autoSelezionata.marca}{" "}
            {autoSelezionata.modello}
          </div>
          <div className="form-autista">
            <TbSteeringWheel size={30} /> {autista}
          </div>
        </div>

        <form onSubmit={handleSubmitPartenza} className="form">
          <div className="form-content">
            <div className="form-partenza-cruscotto">
              <label className="form-label">km cruscotto:</label>
              <div>{autoSelezionata.kmRilevati}</div>
            </div>
          </div>

          <button type="button" onClick={handleKmAggiornati}>
            agiorna km cruscotto
          </button>

          <div className="form-partenza">
            <label htmlFor="destinazione">destinazione:</label>
            <select
              id="destinazione"
              onChange={(e) => setDestinazione(e.target.value)}
              name="destinazione"
              required
            >
              <option value="">Seleziona...</option>
              <option value="lecco">Lecco</option>
              <option value="como">Como</option>
              <option value="milano">Milano</option>
            </select>
          </div>
          <br />

          <label>condizione auto:</label>
          <div className="form-radio">
            <label>
              <input
                type="radio"
                onChange={(e) => setCondizione(e.target.value)}
                name="condizione"
                value="pulita"
              />
              <ImHappy size={30} />
            </label>

            <label>
              <input
                type="radio"
                onChange={(e) => setCondizione(e.target.value)}
                name="condizione"
                value="sporca"
              />
              <ImAngry size={30} />
            </label>
          </div>

          <br />

          <div>
            <button type="submit">inizia missione</button>
          </div>
        </form>
      </div>
    </>
  );
};
