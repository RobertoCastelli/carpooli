// --- REACT
import React from "react";

export const CarpoolForm = () => {
  return (
    <div>
      <form>
        <div>
          <label htmlFor="autista">Autista:</label>
          <input
            type="text"
            id="autista"
            name="autista"
            //value={formData.autista}
            // onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="destinazione">Destinazione:</label>
          <input
            type="text"
            id="destinazione"
            name="destinazione"
            //value={formData.destinazione}
            //onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="statoAuto">Stato dell'Auto:</label>
          <select
            id="statoAuto"
            name="statoAuto"
            //value={formData.statoAuto}
            //onChange={handleChange}
            required
          >
            <option value="">Seleziona lo stato</option>
            <option value="buono">Buono</option>
            <option value="medio">Medio</option>
            <option value="cattivo">Cattivo</option>
          </select>
        </div>
        <button type="submit">Invia</button>
      </form>
    </div>
  );
};
