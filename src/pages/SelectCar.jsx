import React from "react";
import "./SelectCar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import click from "../sounds/click.wav";

function SelectCar() {
  const navigate = useNavigate(); // Hook per la navigazione
  const { cars, trips, setActiveCar, playSound } = useAppContext();

  // Funzione per controllare se l'auto è libera
  // Un'auto è libera se non è attualmente assegnata a nessun viaggio attivo
  const isCarFree = (car) => !trips.find((trip) => trip.activeCar === car.name);

  // Filtra le auto per mostrare solo quelle libere
  const freeCars = cars.filter(isCarFree);

  // Funzione per gestire la selezione di un'auto
  // Imposta l'auto come attiva e naviga alla pagina di registrazione della partenza
  const handleCarSelect = (car) => {
    playSound(click); // Riproduce un suono di clic
    setActiveCar(car); // Imposta l'auto selezionata come attiva
    navigate("/register-departure"); // Naviga alla pagina di registrazione della partenza
  };

  return (
    <div className="car-container">
      <div className="car-title">Seleziona auto</div>
      {freeCars.length === 0 ? (
        // Mostra un messaggio se nessuna auto è disponibile
        <h5>Nessuna auto disponibile al momento</h5>
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
