import React from "react";
import "./Navbar.css";
import { NavLink } from "react-router-dom";

import { FaRegRectangleList } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import { IoQrCodeSharp, IoCalendar } from "react-icons/io5";
import { TbSteeringWheel } from "react-icons/tb";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-ul">
        <NavLink
          to="/calendar"
          className={({ isActive }) =>
            isActive ? "active-navlink" : "navbar-li"
          }
        >
          <li>
            <IoCalendar size={20} />
            <div className="navbar-label">prenota</div>
          </li>
        </NavLink>{" "}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-navlink" : "navbar-li"
          }
        >
          <li>
            <TbSteeringWheel size={20} />
            <div className="navbar-label">guida</div>
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

            <div className="navbar-label">controlli</div>
          </li>
        </NavLink>{" "}
        <NavLink
          to="/qr-code"
          className={({ isActive }) =>
            isActive ? "active-navlink" : "navbar-li"
          }
        >
          <li>
            <IoQrCodeSharp size={20} />

            <div className="navbar-label">qr code</div>
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
