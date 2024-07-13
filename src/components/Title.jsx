import React from "react";
import { NavLink } from "react-router-dom";

export const Title = () => {
  return (
    <div>
      <NavLink to="/" exact>
        home
      </NavLink>
      <div>Title</div>
    </div>
  );
};
