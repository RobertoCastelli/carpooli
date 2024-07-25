import React from "react";
import "./Title.css";
import Navbar from "./Navbar";

const Title = () => {
  return (
    <header>
      <Navbar />
      <h1>
        <span className="title-span">car</span>pooli
      </h1>
      <h5>fleet manager</h5>
    </header>
  );
};

export default Title;
