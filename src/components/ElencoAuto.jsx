// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const ElencoAuto = () => {
  const { parcoAuto, handlePrenotazione } = useContext(MyContext);

  return (
    <div>
      <ul>
        {parcoAuto.map((auto) => (
          <li key={auto.id} onClick={() => handlePrenotazione(auto)}>
            <div>
              <div>marca: {auto.marca}</div>
              <div>modello: {auto.modello}</div>
              <div>km rilevati: {auto.kmRilevati}</div>
              <div>
                stato prenotazione:
                {auto.isPrenotata ? "prenotata" : "libera"}
                {auto.isPrenotata && (
                  <>
                    <div>autista: {auto.autista}</div>
                    <div>destinazione: {auto.destinazione}</div>
                    <div>giorno prenotazione: {auto.timePartenza}</div>
                  </>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
