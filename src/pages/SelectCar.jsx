import React from "react";
import "./SelectCar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import click from "../sounds/click.wav";

function SelectCar() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { cars, setActiveCar, playSound } = useAppContext();

  const handleCarSelect = (car) => {
    playSound(click);
    setActiveCar(car);
    navigate("/register-departure");
  };

  return (
    <div className="car-container">
      <div className="car-title">seleziona auto</div>
      {cars.map((car) => (
        <button
          className="car-btn"
          key={car.id}
          onClick={() => handleCarSelect(car)}
        >
          {car.name}
        </button>
      ))}
    </div>
  );
}

export default SelectCar;
