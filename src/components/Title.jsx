// --- REACT
import React from "react";
// --- ROUTER
import { NavLink } from "react-router-dom";
// --- ICONS
import { FaHome } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";

export const Title = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-list">
        <li className="navbar-item">
          <NavLink to="/" className="navbar-link" activeclassName="active-link">
            <FaHome size={30} />
          </NavLink>
        </li>
        <li className="navbar-item">
          <NavLink
            to="/riepilogo"
            className="navbar-link"
            activeclassName="active-link"
          >
            <FaRegRectangleList size={30} />
          </NavLink>
        </li>
      </ul>
      <div>
        <h1 className="navbar-title">
          CAR<span className="title-highlight">POOLI</span>
          <div className="title-subtitle">POLITECNICO DI MILANO</div>
        </h1>
      </div>
    </div>
  );
};
