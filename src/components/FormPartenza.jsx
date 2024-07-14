// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

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
        <div className="form-item">
          <label>Autista:</label>
          <div>{autista}</div>
        </div>

        <div className="form-item">
          <label>Auto:</label>
          <div>
            {autoSelezionata.marca} {autoSelezionata.modello}
          </div>
        </div>

        <div className="form-item">
          <label>Km rilevati:</label>
          <div>{autoSelezionata.kmRilevati}</div>
        </div>

        <div className="form-item">
          <div>
            <button type="button" onClick={handleKmRilevati}>
              Conferma
            </button>
            <button type="button" onClick={handleKmAggiornati}>
              Aggiorna
            </button>
          </div>
        </div>

        <div className="form-item">
          <label>Km partenza:</label>
          <div>{kmPartenza}</div>
        </div>

        <div className="form-item">
          <label>Condizione:</label>
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
          <label htmlFor="destinazione">Destinazione finale:</label>
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

        <div className="form-item">
          <button type="submit">Start</button>
        </div>
      </form>
    </div>
  );
};
