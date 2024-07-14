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
    <div>
      <form onSubmit={handleSubmitPartenza}>
        <div>Autista: {autista}</div>

        <div>
          Auto: {autoSelezionata.marca} {autoSelezionata.modello}
        </div>

        <div>Km rilevati: {autoSelezionata.kmRilevati}</div>

        <div>
          <button type="button" onClick={() => handleKmRilevati()}>
            Conferma
          </button>
          <button type="button" onClick={() => handleKmAggiornati()}>
            Aggiorna
          </button>
        </div>

        <div>Km partenza: {kmPartenza}</div>

        <div>
          <label>
            <div>Condizione: </div>
            <input
              type="radio"
              onChange={(e) => setCondizione(e.target.value)}
              name="condizione"
              value="pulita"
            ></input>
            Pulita
          </label>
        </div>

        <div>
          <label>
            <input type="radio" name="condizione" value="sporca"></input>
            Sporca
          </label>
        </div>

        <div>
          <label htmlFor="destinazione">Destinazione finale</label>
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

        <button type="submit">Start</button>
      </form>
    </div>
  );
};
