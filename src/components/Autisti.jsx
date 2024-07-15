import React, { useContext } from "react";
// --- CONTEXT
import { MyContext } from "../context";
// --- ROUTER
import { Link } from "react-router-dom";

export const Autisti = () => {
  const { autisti, handleAutista } = useContext(MyContext);

  return (
    <div className="autisti-list-container">
      <h3 className="autisti-titolo">conducenti</h3>
      <ul className="autisti-list" onClick={handleAutista}>
        {autisti.map((autista, index) => (
          <Link key={index} to="/auto" className="autista-link">
            <li className="autista-item">{autista}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
};
