import React from "react";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const Autisti = () => {
  return (
    <div>
      <ul>
        <NavLink to="/CarpoolForm">
          <li>Pippo</li>
          <li>Pluto</li>
          <li>Paperino</li>
        </NavLink>
      </ul>
    </div>
  );
};
