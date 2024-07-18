import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const Manutenzione = () => {
  const { parcoAuto } = useContext(MyContext);
  return (
    <div className="parco-auto-container">
      <ul>
        {parcoAuto.map((auto) => (
          <li key={auto.id}>
            <div>
              {auto.marca} {auto.modello}
            </div>
            <div>
              {auto.tagliando} {auto.revisione}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
