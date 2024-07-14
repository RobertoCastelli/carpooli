// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ICONS
import { FaCarSide } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";

export const FormPartenza = () => {
  const {
    autista,
    autoSelezionata,
    handleKmRilevati,
    kmPartenza,
    handleKmAggiornati,
    handleSubmitPartenza,
    setDestinazione,
    setCondizione,
  } = useContext(MyContext);

  return (
    <div className="form-container">
      <form onSubmit={handleSubmitPartenza} className="form">
        <div className="info-icons">
          <label>
            <FaCarSide size={30} />
          </label>
          {autoSelezionata.marca} {autoSelezionata.modello}
        </div>

        <div className="info-icons">
          <label>
            <TbSteeringWheel size={30} />
          </label>
          <div>
            <div>{autista}</div>
          </div>
        </div>

        <div className="form-item">
          <label>Km rilevati quadro:</label>
          <div>{autoSelezionata.kmRilevati}</div>
        </div>

        <div className="form-item--buttons">
          <button
            className="form-button-conferma"
            type="button"
            onClick={handleKmRilevati}
          >
            Conferma km rilevati
          </button>
          <button
            className="form-button-aggiorna"
            type="button"
            onClick={handleKmAggiornati}
          >
            Aggiorna km rilevati
          </button>
        </div>

        <div className="form-item">
          <label>Km partenza:</label>
          <div>{kmPartenza}</div>
        </div>

        <div className="form-item">
          <div>
            <label>
              <input
                type="radio"
                onChange={(e) => setCondizione(e.target.value)}
                name="condizione"
                value="pulita"
              />
              Pulita
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                onChange={(e) => setCondizione(e.target.value)}
                name="condizione"
                value="sporca"
              />
              Sporca
            </label>
          </div>
        </div>

        <div className="form-item">
          <label htmlFor="destinazione">Destinazione:</label>
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

        <div className="form-item-button">
          <button type="submit">INIZIA MISSIONE</button>
        </div>
      </form>
    </div>
  );
};
