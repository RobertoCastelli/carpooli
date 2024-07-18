import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ICONS
import { FaCarSide } from "react-icons/fa";
import { FaOilCan } from "react-icons/fa";
import { GiSmokeBomb } from "react-icons/gi";

export const Manutenzione = () => {
  const { parcoAuto } = useContext(MyContext);
  return (
    <div className="parco-auto-container">
      <h3 className="parco-auto-titolo">manutezione</h3>

      <ul className="parco-auto-ul">
        {parcoAuto.map((auto) => (
          <li className="parco-auto-li" key={auto.id}>
            <div className="parco-auto-veicolo">
              <FaCarSide size={30} />
              {auto.marca} {auto.modello}
            </div>

            <div className="parco-auto-veicolo">
              <FaOilCan size={30} />
              tagliando: {auto.tagliando}
            </div>
            <div className="parco-auto-veicolo">
              <GiSmokeBomb size={30} />
              revisione: {auto.revisione}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
