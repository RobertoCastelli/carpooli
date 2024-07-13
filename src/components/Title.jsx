// --- REACT
import React from "react";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const Title = () => {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">home</NavLink>
        </li>
        <li>
          <NavLink to="/riepilogo">riepilogo</NavLink>
        </li>
      </ul>
      <h1>
        CAR<span className="title_highlight">POOLI</span>
      </h1>
    </div>
  );
};
