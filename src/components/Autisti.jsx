import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";

export const Autisti = () => {
  const { autisti, handleAutistaSelezionato } = useContext(MyContext);

  return (
    <div className="autisti-list-container">
      <h3 className="autisti-titolo">conducenti</h3>
      <ul className="autisti-ul">
        {autisti.map((autista) => (
          <li
            key={autista.id}
            onClick={handleAutistaSelezionato}
            className="autista-li"
          >
            <div>{autista.autista}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
