// -- CONTEXT
import React, { useContext } from "react";
import { MyContext } from "../context";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const ElencoAuto = () => {
  const { auto } = useContext(MyContext);

  return (
    <div>
      <ul>
        {auto.map((element) => (
          <li key={element.id}>
            <NavLink to="/autisti">
              {element.marca} {element.modello}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
