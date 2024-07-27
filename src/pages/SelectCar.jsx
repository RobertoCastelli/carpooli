import React from "react";
import "./SelectCar.css";
import { useAppContext } from "../utils/AppContext";

function SelectCar() {
  const { cars, setActiveCar } = useAppContext();

  const handleCarSelect = (car) => {
    setActiveCar(car);
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
