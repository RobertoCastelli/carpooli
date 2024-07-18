// --- REACT
import React from "react";
// --- ROUTER
import { NavLink } from "react-router-dom";
// --- ICONS
import { FaHome } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

export const Navbar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-ul">
        <li className="navbar-li">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "active-link" : "navbar-link"
            }
          >
            <FaHome size={30} />
          </NavLink>
        </li>
        <li className="navbar-li">
          <NavLink
            to="/manutenzione"
            className={({ isActive }) =>
              isActive ? "active-link" : "navbar-link"
            }
          >
            <HiMiniWrenchScrewdriver size={30} />
          </NavLink>
        </li>
        <li className="navbar-li">
          <NavLink
            to="/riepilogo"
            className={({ isActive }) =>
              isActive ? "active-link" : "navbar-link"
            }
          >
            <FaRegRectangleList size={30} />
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
