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
    <div className="parco-auto-container">
      <h3 className="parco-auto-titolo">parco auto</h3>
      <ul className="parco-auto-ul">
        {parcoAuto.map((auto) => (
          <li
            key={auto.id}
            className="parco-auto-li"
            onClick={() => handlePrenotazione(auto)}
          >
            <div className="parco-auto-veicolo">
              <FaCarSide size={30} />
              {auto.marca} {auto.modello}
            </div>

            <div
              className={
                auto.isPrenotata
                  ? "parco-auto-prenotata"
                  : "parco-auto-stato-prenotazione"
              }
            >
              <FaRoadLock size={30} />
              {auto.isPrenotata ? "prenotata" : "libera"}
            </div>

            {auto.isPrenotata && (
              <div className="parco-auto-dettagli">
                <div className="parco-auto-info">
                  <div>conducente:</div>
                  <div>{auto.autista}</div>
                </div>
                <div className="parco-auto-info">
                  <div>destinazione:</div>
                  <div>{auto.destinazione}</div>
                </div>
                <div className="parco-auto-info">
                  <div>in uso dal:</div>
                  <div>{auto.timePartenza}</div>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
