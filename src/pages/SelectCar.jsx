import React from "react";
import "./SelectCar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function SelectCar() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { cars, setActiveCar, isDriving } = useAppContext();

  const handleCarSelect = (car) => {
    setActiveCar(car);

    // Naviga alla pagina di check-out se già in viaggio, altrimenti alla pagina di registrazione partenza
    if (isDriving) {
      navigate("/check-out");
    } else {
      navigate("/register-departure");
    }
  };

  return (
    <div className="car-container">
      <div className="car-title">seleziona auto</div>
      {cars.map((car) => (
        <button
          className="car-btn"
          key={car.id}
          onClick={() => handleCarSelect(car.name)}
        >
          {car.name}
        </button>
      ))}
    </div>
  );
}

export default SelectCar;
