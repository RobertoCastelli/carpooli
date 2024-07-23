import React from "react";
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
    <div>
      <h1>Select Car</h1>
      {cars.map((car) => (
        <button key={car} onClick={() => handleCarSelect(car)}>
          {car}
        </button>
      ))}
    </div>
  );
}

export default SelectCar;
