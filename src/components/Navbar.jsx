// --- REACT
import React from "react";
// --- ROUTER
import { NavLink } from "react-router-dom";
// --- ICONS
import { FaHome } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { RiParkingBoxLine } from "react-icons/ri";

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
            <FaHome size={25} />
          </NavLink>
          <div className="navbar-li-text">home</div>
        </li>
        <li className="navbar-li">
          <NavLink
            to="/auto"
            className={({ isActive }) =>
              isActive ? "active-link" : "navbar-link"
            }
          >
            <RiParkingBoxLine size={25} />
          </NavLink>
          <div className="navbar-li-text">parco auto</div>
        </li>
        <li className="navbar-li">
          <NavLink
            to="/manutenzione"
            className={({ isActive }) =>
              isActive ? "active-link" : "navbar-link"
            }
          >
            <HiMiniWrenchScrewdriver size={25} />
          </NavLink>
          <div className="navbar-li-text">manutenzione</div>
        </li>
        <li className="navbar-li">
          <NavLink
            to="/riepilogo"
            className={({ isActive }) =>
              isActive ? "active-link" : "navbar-link"
            }
          >
            <FaRegRectangleList size={25} />
          </NavLink>
          <div className="navbar-li-text">logs</div>
        </li>
      </ul>
    </div>
  );
};
