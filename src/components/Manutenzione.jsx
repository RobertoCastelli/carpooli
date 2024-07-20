import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ICONS
import { FaCarSide } from "react-icons/fa";
import { FaOilCan } from "react-icons/fa";
import { GiSmokeBomb } from "react-icons/gi";

export const Manutenzione = () => {
  const { parcoAuto, isDataScaduta } = useContext(MyContext);

  return (
    <div className="manutenzione-container">
      <h3 className="manutenzione-titolo">manutezione</h3>

      <ul className="manutenzione-ul">
        {parcoAuto.map((auto) => (
          <li className="manutenzione-li" key={auto.id}>
            <div className="manutenzione-veicolo">
              <FaCarSide size={30} />
              {auto.marca} {auto.modello}
            </div>

            <div className="manutenzione-veicolo">
              <FaOilCan
                size={30}
                color={isDataScaduta(auto.tagliando) ? "brown" : null}
              />
              tagliando: {auto.tagliando}
            </div>
            <div className="manutenzione-veicolo">
              <GiSmokeBomb
                size={30}
                color={isDataScaduta(auto.revisione) ? "brown" : null}
              />
              revisione: {auto.revisione}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
