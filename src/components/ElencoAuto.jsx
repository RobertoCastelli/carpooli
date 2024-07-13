// -- CONTEXT
import React, { useContext } from "react";
import { MyContext } from "../context";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const ElencoAuto = () => {
  const { parcoAuto, handleAuto } = useContext(MyContext);

  return (
    <div>
      <ul onClick={handleAuto}>
        {parcoAuto.map((auto) => (
          <NavLink key={auto.id} to="/autisti">
            <li onClick={() => handleAuto(auto)}>
              <div>
                <div>marca: {auto.marca}</div>
                <div>modello: {auto.modello}</div>
                <div>km: {auto.km}</div>
                <div>
                  stato prenotazione:
                  {auto.stato ? "prenotata" : "libera"}
                </div>
              </div>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
