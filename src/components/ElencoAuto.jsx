// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ICONS
import { FaCarSide } from "react-icons/fa";
import { FaRoadLock } from "react-icons/fa6";

export const ElencoAuto = () => {
  const { parcoAuto, handlePrenotazione } = useContext(MyContext);

  return (
    <div className="parco-auto-list-container">
      <ul className="parco-auto-list">
        {parcoAuto.map((auto) => (
          <li
            key={auto.id}
            className="parco-auto-item"
            onClick={() => handlePrenotazione(auto)}
          >
            <div className="auto-info">
              <div className="parco-auto-icons">
                <FaCarSide size={30} />
                {auto.marca} {auto.modello}
              </div>

              <div>
                <div className="parco-auto-icons">
                  <FaRoadLock size={30} />
                  {auto.isPrenotata ? "Prenotata" : "Libera"}
                </div>

                {auto.isPrenotata && (
                  <div className="prenotata-details">
                    <div>Conducente: {auto.autista}</div>
                    <div>Destinazione: {auto.destinazione}</div>
                    <div>In uso dal: {auto.timePartenza}</div>
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
