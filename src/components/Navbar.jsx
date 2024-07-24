// --- REACT
import React from "react";
// --- ROUTER

// --- ICONS
import { FaHome } from "react-icons/fa";
import { FaRegRectangleList } from "react-icons/fa6";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <ul className="navbar-ul">
        <li className="navbar-li">
          <FaHome size={25} />

          <div className="navbar-li-text">home</div>
        </li>
        <li className="navbar-li">
          <HiMiniWrenchScrewdriver size={25} />

          <div>manutenzione</div>
        </li>
        <li className="navbar-li">
          <FaRegRectangleList size={25} />

          <div className="navbar-li-text">logs</div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
