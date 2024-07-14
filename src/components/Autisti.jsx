import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const Autisti = () => {
  const { autisti, handleAutista } = useContext(MyContext);

  return (
    <div>
      <ul onClick={handleAutista}>
        {autisti.map((autista, index) => (
          <NavLink key={index} to="/auto">
            <li>{autista}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
