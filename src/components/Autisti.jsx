import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const Autisti = () => {
  const autisti = ["pippo", "pluto", "paperino"];
  const { handleAutista } = useContext(MyContext);

  return (
    <div>
      <ul onClick={handleAutista}>
        {autisti.map((autista, index) => (
          <NavLink key={index} to="/partenza">
            <li>{autista}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
