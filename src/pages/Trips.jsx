import React from "react";
import "./Trips.css";
import { useAppContext } from "../utils/AppContext";

function Trips() {
  const { trips } = useAppContext();

  return (
    <div className="trip-container">
      <div className="trip-title">logs</div>
      <ul className="trip-ul">
        {trips.map((trip) => (
          <li className="trip-li" key={trip.id}>
            <div>tripID: {trip.id}</div>
            <div>{trip.activeCar}</div>
            <div>{trip.currentDriver}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trips;
