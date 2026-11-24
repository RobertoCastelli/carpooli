import React, { useState, useEffect, useRef } from "react";
import "./RegisterDeparture.css";
import { useNavigate } from "react-router-dom";
import engine from "../sounds/engine.wav";
import { useAppContext } from "../utils/AppContext";
import { FaCarSide } from "react-icons/fa";

function RegisterDeparture() {
  const [departureKM, setDepartureKM] = useState("");
  const kmEditedByUser = useRef(false);

  const {
    activeCar,
    trips,
    drivers,
    selectedDriver,
    setSelectedDriver,
    destinations,
    selectedDestination,
    setSelectedDestination,
    registerDeparture,
    playSound,
  } = useAppContext();

  const navigate = useNavigate();

  const getTripDate = (timestamp) => {
    if (typeof timestamp !== "string") return 0;

    const match = timestamp.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})/,
    );

    if (!match) return 0;

    const [, day, month, year, hours, minutes] = match;

    return (
      new Date(
        Number(year),
        Number(month) - 1,
        Number(day),
        Number(hours),
        Number(minutes),
      ).getTime() || 0
    );
  };

  const getLastTrip = () => {
    if (!activeCar || !Array.isArray(trips)) return null;

    const completedTrips = trips.filter(
      (trip) => trip.checkOut != null && trip.checkOut.car === activeCar.name,
    );

    return (
      [...completedTrips].sort(
        (a, b) =>
          getTripDate(b.checkOut?.timestamp) -
          getTripDate(a.checkOut?.timestamp),
      )[0] || null
    );
  };

  const lastTrip = getLastTrip();

  useEffect(() => {
    if (kmEditedByUser.current) return;

    const lastKM = lastTrip?.checkOut?.returnKM;

    if (
      lastKM == null ||
      String(lastKM).trim() === "" ||
      !Number.isFinite(Number(lastKM)) ||
      Number(lastKM) < 0
    ) {
      return;
    }

    setDepartureKM(String(lastKM));
  }, [activeCar?.name, lastTrip?.id, lastTrip?.checkOut?.returnKM]);

  // Registra la partenza
  const handleRegister = async () => {
    if (!selectedDriver || !departureKM || !selectedDestination) {
      alert("Per favore, riempi tutti i campi.");
      return;
    }

    if (!activeCar) {
      alert("Nessun veicolo selezionato.");
      navigate("/");
      return;
    }

    try {
      await registerDeparture(departureKM, selectedDestination);

      playSound(engine);
      navigate("/");

      setDepartureKM("");
      setSelectedDestination("");
      setSelectedDriver(null);
    } catch (err) {
      console.error("Errore nella registrazione", err);
    }
  };

  if (!activeCar) {
    return (
      <div className="departure-container">
        <div className="departure-title">Registra Partenza</div>

        <div className="departure-card">
          <div className="departure-subtitle">Nessun veicolo selezionato.</div>

          <button className="departure-btn" onClick={() => navigate("/")}>
            Torna alla flotta
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="departure-container">
      <div className="departure-title">Registra Partenza</div>

      {/* Tessera del modulo */}
      <div className="departure-card">
        {/* Intestazione veicolo */}
        <div className="departure-subtitle">
          <div>
            <FaCarSide size={25} />
            <span>{activeCar.name}</span>
          </div>
        </div>

        {/* Conducente */}
        <select
          className="departure-input"
          value={selectedDriver?.id || ""}
          onChange={(e) => {
            const driver = drivers.find(
              (driver) => driver.id === e.target.value,
            );

            setSelectedDriver(driver || null);
          }}
          required
        >
          <option value="" disabled>
            Seleziona conducente...
          </option>

          {drivers.map((driver) => (
            <option key={driver.id} value={driver.id}>
              {driver.name}
            </option>
          ))}
        </select>

        {/* Chilometri di partenza */}
        <input
          className="departure-input"
          type="number"
          placeholder="Inserire km cruscotto"
          value={departureKM}
          onChange={(e) => {
            kmEditedByUser.current = true;
            setDepartureKM(e.target.value);
          }}
          required
        />

        {/* Destinazione */}
        <select
          className="departure-input"
          value={selectedDestination}
          onChange={(e) => setSelectedDestination(e.target.value)}
          required
        >
          <option value="" disabled>
            Seleziona destinazione...
          </option>

          {destinations.map((dest) => (
            <option key={dest.id} value={dest.name}>
              {dest.name}
            </option>
          ))}
        </select>

        <button className="departure-btn" onClick={handleRegister}>
          Start
        </button>
      </div>
    </div>
  );
}

export default RegisterDeparture;
