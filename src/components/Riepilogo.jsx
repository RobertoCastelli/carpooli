// --- REACT
import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const Riepilogo = () => {
  const { riepilogo, deleteAllDocumentsInCollection } = useContext(MyContext);

  return (
    <>
      <h3 className="riepilogo-titolo">riepilogo</h3>
      <div className="riepilogo-container">
        <button
          className="btn-riepilogo-delete"
          onClick={deleteAllDocumentsInCollection}
        >
          cancella
        </button>
        <ul className="riepilogo-ul">
          {riepilogo.map((record) => {
            const kmPercorsi = record.kmRitorno - record.kmPartenza;
            return (
              <li key={record.id} className="riepilogo-li">
                <div className="riepilogo-field-autista">
                  <span className="riepilogo-label-autista">conducente:</span>
                  <span className="riepilogo-value-autista">
                    {record.autista}
                  </span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">auto:</span>
                  <span className="riepilogo-value">
                    {record.marca} {record.modello}
                  </span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">destinazione:</span>
                  <span className="riepilogo-value">{record.destinazione}</span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">spesa carburante:</span>
                  <span className="riepilogo-value">{record.carburante} €</span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">km partenza:</span>
                  <span className="riepilogo-value">{record.kmPartenza}</span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">km ritorno:</span>
                  <span className="riepilogo-value">{record.kmRitorno}</span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">km percorsi:</span>
                  <span className="riepilogo-value">{kmPercorsi}</span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">data:</span>
                  <span className="riepilogo-value">{record.timeRitorno}</span>
                </div>
                <div className="riepilogo-field">
                  <span className="riepilogo-label">condizione auto:</span>
                  <span className="riepilogo-value">{record.condizione}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
