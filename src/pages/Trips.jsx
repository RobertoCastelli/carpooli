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
            <div>car: {trip.activeCar}</div>
            <div>driver: {trip.currentDriver}</div>
            <div>condition: {trip.departure.carCondition}</div>
            <div>km: {trip.departure.departureKM}</div>
            <div>destination: {trip.destination}</div>
            <div>time: {trip.timestamp}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trips;
