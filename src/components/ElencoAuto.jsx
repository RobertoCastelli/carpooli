// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ICONS
import { FaCarSide } from "react-icons/fa";
import { FaRoadLock } from "react-icons/fa6";

export const ElencoAuto = () => {
  const { parcoAuto, handleAutoSelezionata, filtro, setFiltro } =
    useContext(MyContext);

  return (
    <div className="parco-auto-container">
      <h3 className="parco-auto-titolo">elenco auto</h3>
      <div className="parco-auto-filtri">
        <button
          className={
            filtro === "tutte" ? "btn-filtro-attivo" : "btn-filtro-disattivo"
          }
          onClick={() => setFiltro("tutte")}
        >
          tutte
        </button>
        <button
          className={
            filtro === "prenotate"
              ? "btn-filtro-attivo"
              : "btn-filtro-disattivo"
          }
          onClick={() => setFiltro("prenotate")}
        >
          prenotate
        </button>
        <button
          className={
            filtro === "libere" ? "btn-filtro-attivo" : "btn-filtro-disattivo"
          }
          onClick={() => setFiltro("libere")}
        >
          libere
        </button>
      </div>
      <ul className="parco-auto-ul">
        {parcoAuto.map((auto) => (
          <li
            key={auto.id}
            className="parco-auto-li"
            onClick={() => handleAutoSelezionata(auto)}
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
