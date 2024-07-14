// --- REACT
import React from "react";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const Title = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link" activeclassName="active-link">
            Home
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/riepilogo"
            className="navbar-link"
            activeclassName="active-link"
          >
            Riepilogo
          </NavLink>
        </li>
      </ul>
      <h1 className="navbar-title">
        CAR<span className="title-highlight">POOLI</span>
      </h1>
    </div>
  );
};
