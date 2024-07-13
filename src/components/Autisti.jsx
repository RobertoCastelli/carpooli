import React from "react";
import { NavLink } from "react-router-dom";

export const Autisti = () => {
  return (
    <div>
      <ul>
        <NavLink to="/CarpoolForm">
          <li>Pippo</li>
          <li>Pluto</li>
        </NavLink>
      </ul>
    </div>
  );
};
