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
  } = useContext(MyContext);

  return (
    <div>
      <form>
        <div>autista: {autista}</div>
        <div>
          auto: {autoSelezionata.marca} {autoSelezionata.modello}
        </div>
        <div>Km rilevati: {autoSelezionata.kmRilevati}</div>
        <div>
          <button onClick={() => handleKmRilevati()}>conferma</button>
          <button onClick={() => handleKmAggiornati()}>aggiorna</button>
        </div>

        <div>km partenza:{kmPartenza}</div>
        <div>
          <label>pulita</label>
          <input
            type="radio"
            name="condizione"
            value="pulita"
            //onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>sporca</label>
          <input
            type="radio"
            name="condizione"
            value="sporca"
            //onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="destinazione">destinazione</label>
          <select
            id="destinazione"
            name="destinazione"
            //value={formData.statoAuto}
            //onChange={handleChange}
            required
          >
            <option value=""></option>
            <option value="lecco">lecco</option>
            <option value="como">como</option>
            <option value="milano">milano</option>
          </select>
        </div>
        <button type="submit">start</button>
      </form>
    </div>
  );
};
