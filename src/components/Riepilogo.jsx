// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const Riepilogo = () => {
  const { riepilogo } = useContext(MyContext);

  return (
    <div className="riepilogo-container">
      <ul className="riepilogo-list">
        {riepilogo.map((record) => {
          const kmPercorsi = record.kmRitorno - record.kmPartenza;
          return (
            <li key={record.id} className="riepilogo-item">
              <div className="riepilogo-field">
                <span className="riepilogo-label">Conducente:</span>
                <span className="riepilogo-value">{record.autista}</span>
              </div>
              <div className="riepilogo-field">
                <span className="riepilogo-label">Destinazione:</span>
                <span className="riepilogo-value">{record.destinazione}</span>
              </div>
              <div className="riepilogo-field">
                <span className="riepilogo-label">Spesa per carburante:</span>
                <span className="riepilogo-value">{record.carburante} €</span>
              </div>
              <div className="riepilogo-field">
                <span className="riepilogo-label">Km partenza:</span>
                <span className="riepilogo-value">{record.kmPartenza}</span>
              </div>
              <div className="riepilogo-field">
                <span className="riepilogo-label">Km ritorno:</span>
                <span className="riepilogo-value">{record.kmRitorno}</span>
              </div>
              <div className="riepilogo-field">
                <span className="riepilogo-label">Km percorsi:</span>
                <span className="riepilogo-value">{kmPercorsi}</span>
              </div>
              <div className="riepilogo-field">
                <span className="riepilogo-label">Data:</span>
                <span className="riepilogo-value">{record.time}</span>
              </div>
              <div className="riepilogo-field">
                <span className="riepilogo-label">Condizione auto:</span>
                <span className="riepilogo-value">{record.condizione}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
