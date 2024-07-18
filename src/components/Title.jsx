// --- REACT
import React from "react";
// --- NAVBAR
import { Navbar } from "./Navbar";

export const Title = () => {
  return (
    <div className="title-container">
      <Navbar />
      <div className="title-content">
        <h1>
          car<span className="title-highlight">pooli</span>
        </h1>
        <div className="title-subtitle">politecnico di milano</div>
      </div>
    </div>
  );
};
