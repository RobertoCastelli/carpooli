import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

import { FaRegRectangleList } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { FaPeopleGroup } from "react-icons/fa6";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-ul">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-navlink" : "navbar-li"
          }
        >
          <li>
            <FaPeopleGroup size={20} />
            <div className="navbar-label">home</div>
          </li>
        </NavLink>
        <NavLink
          to="/car-maintenance"
          className={({ isActive }) =>
            isActive ? "active-navlink" : "navbar-li"
          }
        >
          <li>
            <HiMiniWrenchScrewdriver size={20} />

            <div className="navbar-label">manutenzione</div>
          </li>
        </NavLink>
        <NavLink
          to="/trips"
          className={({ isActive }) =>
            isActive ? "active-navlink" : "navbar-li"
          }
        >
          <li>
            <FaRegRectangleList size={20} />

            <div className="navbar-label">logs</div>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
