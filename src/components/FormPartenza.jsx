// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const FormPartenza = () => {
  const { autista } = useContext(MyContext);

  return (
    <div>
      <form>
        <div>autista: {autista}</div>
        <div>auto: </div>
        <div>Km rilevati:</div>
        <div>
          <button>conferma</button>
          <button>aggiorna</button>
        </div>

        <div>km partenza:</div>
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
