// --- REACT
import React from "react";
// --- ROUTER
import { NavLink } from "react-router-dom";

export const Title = () => {
  return (
    <div>
      <div>
        <NavLink to="/">home</NavLink>
      </div>
      <h1>Title</h1>
    </div>
  );
};
