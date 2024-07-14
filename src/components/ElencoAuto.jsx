// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

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
              <div className="auto-detail">Marca: {auto.marca}</div>
              <div className="auto-detail">Modello: {auto.modello}</div>
              <div className="auto-detail">Km Rilevati: {auto.kmRilevati}</div>
              <div className="auto-status">
                Stato Prenotazione: {auto.isPrenotata ? "Prenotata" : "Libera"}
                {auto.isPrenotata && (
                  <div className="prenotata-details">
                    <div>Autista: {auto.autista}</div>
                    <div>Destinazione: {auto.destinazione}</div>
                    <div>Giorno Prenotazione: {auto.timePartenza}</div>
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
