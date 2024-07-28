import React from "react";
import "./Trips.css";
import { useAppContext } from "../utils/AppContext";

function Trips() {
  const { trips } = useAppContext();

  // Funzione per convertire stringa "DD/MM/YYYY, HH:MM" in oggetto Date
  function parseDate(dateString) {
    const [date, time] = dateString.split(", ");
    const [day, month, year] = date.split("/");
    const [hours, minutes] = time.split(":");
    return new Date(year, month - 1, day, hours, minutes);
  }

  // Calcola il tempo di percorrenza in ore
  function calculateTravelTime(departureTime, checkOutTime) {
    if (departureTime && checkOutTime) {
      const departureDate = parseDate(departureTime);
      const checkOutDate = parseDate(checkOutTime);

      // Verifica se i valori di Date sono validi
      if (!isNaN(departureDate) && !isNaN(checkOutDate)) {
        const diffMs = checkOutDate - departureDate; // differenza in millisecondi
        const diffHrs = diffMs / 36e5; // converti millisecondi in ore
        return diffHrs.toFixed(2); // arrotonda a 2 decimali
      }
    }
    return "N/A";
  }

  // Calcola i km di percorrenza
  const calculateDistance = (departureKm, returnKm) => {
    if (departureKm != null && returnKm != null) {
      const departureKmNum = Number(departureKm);
      const returnKmNum = Number(returnKm);

      // Verifica se i valori sono numeri validi
      if (!isNaN(departureKmNum) && !isNaN(returnKmNum)) {
        return returnKmNum - departureKmNum;
      }
      return returnKm - departureKm;
    }
    return "N/A";
  };

  return (
    <div className="trip-container">
      <div className="trip-title">logs</div>
      <ul className="trip-ul">
        {trips.map((trip) => (
          <li className="trip-li" key={trip.id}>
            <div className="trip-driver">{trip.checkOut?.driver || "N/A"}</div>
            <div className="trip-item">
              <label>destinazione:</label>
              <div>{trip.departure?.destination || "N/A"}</div>
            </div>
            <div className="trip-item">
              <label>ore di percorrenza:</label>
              <div>
                {calculateTravelTime(
                  trip.departure?.timestamp,
                  trip.checkOut?.timestamp
                )}
              </div>
            </div>
            <div className="trip-item">
              <label>km totali: </label>
              <div>
                {calculateDistance(
                  trip.departure?.departureKM,
                  trip.checkOut?.returnKM
                )}
              </div>
            </div>
            <div className="trip-item">
              <label>Spese carburante: </label>
              {trip.checkOut?.gasExpenses || "N/A"}
            </div>

            <div className="trip-partenza">Dati partenza</div>
            <div className="trip-item">
              <label>km: </label>
              {trip.departure?.departureKM || "N/A"}
            </div>
            <div className="trip-item">
              <label>giorno e ora: </label>
              {trip.departure?.timestamp || "N/A"}
            </div>

            <div className="trip-checkout">Dati check-out</div>
            <div className="trip-item">
              <label>km:</label>
              <div>{trip.checkOut?.returnKM || "N/A"}</div>
            </div>
            <div className="trip-item">
              <label>giorno e ora: </label>
              <div>{trip.checkOut?.timestamp || "N/A"}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trips;
