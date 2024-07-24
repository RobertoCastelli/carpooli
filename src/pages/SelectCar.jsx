import React from "react";
import "./SelectCar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";

function SelectCar() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { cars, setActiveCar, setIsDriving, isDriving } = useAppContext();

  const handleCarSelect = (car) => {
    setActiveCar(car);
    setIsDriving(true);

    // Naviga alla pagina di check-out se già in viaggio, altrimenti alla pagina di registrazione partenza
    if (isDriving) {
      navigate("/check-out");
    } else {
      navigate("/register-departure");
    }
  };

  return (
    <div className="car-container">
      <h3 className="car-title">seleziona auto</h3>
      {cars.map((car) => (
        <button
          className="car-btn"
          key={car}
          onClick={() => handleCarSelect(car)}
        >
          {car}
        </button>
      ))}
    </div>
  );
}

export default SelectCar;
