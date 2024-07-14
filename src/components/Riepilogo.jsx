// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const Riepilogo = () => {
  const { riepilogo } = useContext(MyContext);

  return (
    <div className="riepilogo-container">
      <ul className="riepilogo-list">
        {riepilogo.map((record) => (
          <li key={record.id} className="riepilogo-item">
            <div className="riepilogo-field">
              <span className="riepilogo-label">Autista:</span>
              <span className="riepilogo-value">{record.autista}</span>
            </div>
            <div className="riepilogo-field">
              <span className="riepilogo-label">Spesa per carburante:</span>
              <span className="riepilogo-value">{record.carburante} €</span>
            </div>
            <div className="riepilogo-field">
              <span className="riepilogo-label">Condizione auto:</span>
              <span className="riepilogo-value">{record.condizione}</span>
            </div>
            <div className="riepilogo-field">
              <span className="riepilogo-label">Destinazione:</span>
              <span className="riepilogo-value">{record.destinazione}</span>
            </div>
            <div className="riepilogo-field">
              <span className="riepilogo-label">Km partenza:</span>
              <span className="riepilogo-value">{record.kmPartenza}</span>
            </div>
            <div className="riepilogo-field">
              <span className="riepilogo-label">Km ritorno:</span>
              <span className="riepilogo-value">{record.kmRitorno}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
    /*   <div>
      <ul>
        {riepilogo.map((record) => (
          <li key={record.id}>
            <div>Autista: {record.autista}</div>
            <div>Spesa per carburante: {record.carburante}</div>
            <div>condizione auto: {record.condizione}</div>
            <div>destinazione{record.destinazione}</div>
            <div>km partenza{record.kmPartenza}</div>
            <div>km ritorno{record.kmRitorno}</div>
          </li>
        ))}
      </ul>
    </div> */
  );
};
