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
    destinazioni,
    kmPartenza,
    handleSubmitAggiornamentoKm,
    handleSubmitPartenza,
    setDestinazione,
    setCondizione,
  } = useContext(MyContext);

  return (
    <>
      <h3 className="form-titolo">form partenza</h3>
      <div className="form-partenza-container">
        <div className="form-content-veicolo-autista">
          <div className="form-veicolo">
            <FaCarSide size={30} /> {autoSelezionata.marca}{" "}
            {autoSelezionata.modello}
          </div>
          <div className="form-autista">
            <TbSteeringWheel size={30} /> {autista}
          </div>
        </div>

        <form
          onSubmit={handleSubmitPartenza}
          className="form-partenza-km-destinazione-condizione"
        >
          <div className="form-partenza-km-cruscotto-aggiornati">
            <div className="form-partenza-km-cruscotto">
              {autoSelezionata.kmPartenza} km cruscotto
            </div>
            <button
              className="btn-aggiorna-km"
              type="button"
              onClick={handleSubmitAggiornamentoKm}
            >
              aggiorna km
            </button>
            <div className="form-partenza-km-aggioranti">
              {kmPartenza} km aggiornati
            </div>
          </div>

          <div className="form-destinazione">
            <label htmlFor="destinazione">destinazione:</label>
            <select
              id="destinazione"
              onChange={(e) => setDestinazione(e.target.value)}
              name="destinazione"
              required
            >
              <option value="">Seleziona...</option>
              {destinazioni.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.destinazione}
                </option>
              ))}
            </select>
          </div>

          <div className="form-radio">
            <label>condizione auto:</label>
            <label>
              <input
                type="radio"
                onChange={(e) => setCondizione(e.target.value)}
                name="condizione"
                value="pulita"
              />
              <ImHappy size={30} color="green" />
            </label>

            <label>
              <input
                type="radio"
                onChange={(e) => setCondizione(e.target.value)}
                name="condizione"
                value="sporca"
              />
              <ImAngry size={30} color="brown" />
            </label>
          </div>

          <button className="btn-partenza-inizio" type="submit">
            inizia missione
          </button>
        </form>
      </div>
    </>
  );
};
