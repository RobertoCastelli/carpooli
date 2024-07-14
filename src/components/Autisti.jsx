import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const Autisti = () => {
  const { autisti, handleAutista } = useContext(MyContext);

  return (
    <div className="autisti-list-container">
      <ul className="autisti-list" onClick={handleAutista}>
        {autisti.map((autista, index) => (
          <NavLink key={index} to="/auto" className="autista-link">
            <li className="autista-item">{autista}</li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
};
