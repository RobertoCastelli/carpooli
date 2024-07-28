import React from "react";
import "./SelectCar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import click from "../sounds/click.wav";

function SelectCar() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { cars, trips, setActiveCar, playSound } = useAppContext();

  // Funzione per controllare se l'auto è libera
  const isCarFree = (car) => !trips.find((trip) => trip.activeCar === car.name);

  // Filtra le auto per mostrare solo quelle libere
  const freeCars = cars.filter(isCarFree);

  const handleCarSelect = (car) => {
    playSound(click);
    setActiveCar(car);
    navigate("/register-departure");
  };

  return (
    <div className="car-container">
      <div className="car-title">seleziona auto</div>
      {freeCars.length === 0 ? (
        <div>Nessuna auto disponibile al momento</div>
      ) : (
        freeCars.map((car) => (
          <button
            className="car-btn"
            key={car.id}
            onClick={() => handleCarSelect(car)}
          >
            {car.name}
          </button>
        ))
      )}
    </div>
  );
}

export default SelectCar;
