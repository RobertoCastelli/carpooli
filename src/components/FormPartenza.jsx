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
   
    kmPartenza,
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
            <div className="form-partenza">
           <label className="form-label">Km rilevati quadro:</label>
            <div>{autoSelezionata.kmRilevati}</div>   
            </div>
          </div>
 
                  <div className="form-buttons">
         

            <button type="button" onClick={handleKmAggiornati}>
              Aggiorna km rilevati
            </button>
          </div>

          
       

          <div className="form-item">
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

          <div>
            <div className="form-radio">
              <label>condizione auto:</label>
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
          <br />

          <div>
            <button type="submit">inizia missione</button>
          </div>
        </form>
      </div>
    </>
  );
};
