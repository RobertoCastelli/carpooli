import React from "react";
import "./SelectCar.css";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../utils/AppContext";
import {
  FaCarSide,
  FaGasPump,
  FaTachometerAlt,
  FaUser,
  FaCalendarAlt,
  FaArrowRight,
} from "react-icons/fa";
import { HiMiniWrenchScrewdriver } from "react-icons/hi2";
import click from "../sounds/click.wav";

function SelectCar() {
  const navigate = useNavigate();

  const {
    cars,
    trips,
    bookings,
    drivers,
    setSelectedDriver,
    setActiveCar,
    setTripID,
    playSound,
  } = useAppContext();

  const now = new Date();

  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  // Formatta i km soltanto per la visualizzazione
  const formatKm = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    const km = Number(value);

    return Number.isFinite(km) ? km.toLocaleString("it-IT") : "N/A";
  };

  const getActiveTrip = (car) =>
    trips.find((trip) => trip.checkOut === null && trip.activeCar === car.name);

  const getTodayBooking = (car) =>
    bookings.find((booking) => booking.id === `${car.id}_${today}`);

  const getBookingDriver = (booking) => {
    if (!booking) return null;

    return (
      drivers.find((driver) => driver.id === booking.driverId)?.name || "N/A"
    );
  };

  const getTripDate = (timestamp) => {
    if (typeof timestamp !== "string") return 0;

    const match = timestamp.match(
      /^(\d{1,2})\/(\d{1,2})\/(\d{4}),?\s+(\d{1,2}):(\d{2})/,
    );

    if (!match) return 0;

    const [, day, month, year, hours, minutes] = match;

    const date = new Date(
      Number(year),
      Number(month) - 1,
      Number(day),
      Number(hours),
      Number(minutes),
    );

    return date.getTime() || 0;
  };

  const getLastTrip = (car) => {
    const completedTrips = trips.filter(
      (trip) => trip.checkOut != null && trip.checkOut.car === car.name,
    );

    return [...completedTrips].sort(
      (a, b) =>
        getTripDate(b.checkOut?.timestamp) - getTripDate(a.checkOut?.timestamp),
    )[0];
  };

  const getDocumentStatus = (car) => {
    const dates = [car.tagliando, car.revisione, car.bollo, car.assicurazione];

    const validDates = dates.every((value) => {
      if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
      }

      const [year, month, day] = value.split("-").map(Number);

      const date = new Date(year, month - 1, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month - 1 &&
        date.getDate() === day
      );
    });

    if (!validDates) return "N/A";

    return dates.some((date) => date < today) ? "Scadenza" : "OK";
  };

  const getRefuelingSegments = (level) => {
    const levels = {
      Riserva: 1,
      "1/4": 1,
      "2/4": 2,
      "3/4": 3,
      "4/4": 4,
    };

    return levels[level] ?? null;
  };

  const handleCarCheckIn = (car) => {
    if (getActiveTrip(car) || car.outOfService === true) {
      alert("Il veicolo non è disponibile.");
      return;
    }

    playSound(click);
    setSelectedDriver(null);
    setActiveCar(car);
    navigate("/register-departure");
  };

  const handleCarCheckOut = (car, activeTrip) => {
    if (!activeTrip || !activeTrip.currentDriver) {
      alert("Impossibile identificare il viaggio attivo.");
      return;
    }

    const confirmed = window.confirm(
      `Confermi di voler registrare il rientro di ${car.name}, ` +
        `attualmente in uso da ${activeTrip.currentDriver}?`,
    );

    if (!confirmed) return;

    const driver = drivers.find(
      (driver) => driver.name === activeTrip.currentDriver,
    ) || { name: activeTrip.currentDriver };

    playSound(click);
    setSelectedDriver(driver);
    setActiveCar(activeTrip.activeCar);
    setTripID(activeTrip.id);
    navigate("/check-out");
  };

  return (
    <div className="car-container">
      <div className="car-title">Guida</div>

      {cars.length === 0 ? (
        <h5>Nessuna auto presente</h5>
      ) : (
        cars.map((car) => {
          const activeTrip = getActiveTrip(car);
          const booking = getTodayBooking(car);
          const bookingDriver = getBookingDriver(booking);

          const inMaintenance = car.outOfService === true;

          const lastTrip = getLastTrip(car);

          const refuelingLevel = lastTrip?.checkOut?.refuelingLevel ?? null;

          const refuelingSegments = getRefuelingSegments(refuelingLevel);

          // Ultimi km formattati: 10000 -> 10.000
          const lastKM = formatKm(lastTrip?.checkOut?.returnKM);

          const documentStatus = getDocumentStatus(car);

          const status = activeTrip
            ? "In uso"
            : inMaintenance
              ? "Ferma"
              : booking
                ? "Prenotata"
                : "Disponibile";

          const statusClass = activeTrip
            ? "car-status-in-use"
            : inMaintenance
              ? "car-status-maintenance"
              : booking
                ? "car-status-booked"
                : "car-status-available";

          const showDetails = !activeTrip && !inMaintenance;

          const isDisabled = !activeTrip && inMaintenance;

          const handleCarClick = () => {
            if (activeTrip) {
              handleCarCheckOut(car, activeTrip);
            } else if (!inMaintenance) {
              handleCarCheckIn(car);
            }
          };

          return (
            <button
              type="button"
              className="car-btn"
              key={car.id}
              onClick={handleCarClick}
              disabled={isDisabled}
            >
              {/* Nome del veicolo */}
              <div className="car-name">
                <FaCarSide className="car-name-icon" aria-hidden="true" />
                <span>{car.name}</span>
              </div>

              {/* Conducente attivo */}
              {activeTrip && (
                <div className="car-driver">
                  <FaUser />
                  <span>
                    In uso: <strong>{activeTrip.currentDriver}</strong>
                  </span>
                </div>
              )}

              {/* Prenotazione */}
              {booking && (
                <div className="car-booking">
                  <FaCalendarAlt />
                  <span>
                    Prenotata: <strong>{bookingDriver}</strong>
                  </span>
                </div>
              )}

              {/* Stato operativo */}
              <div className={`car-status ${statusClass}`}>
                <span>{status}</span>
              </div>

              {/* Dati del veicolo */}
              {showDetails && (
                <div className="car-details">
                  {/* Ultimi chilometri */}
                  <div className="car-detail">
                    <div className="car-detail-label">
                      <FaTachometerAlt />
                      <span>Ultimi km</span>
                    </div>

                    <span className="car-detail-value">{lastKM}</span>
                  </div>

                  {/* Rifornimento */}
                  <div className="car-detail">
                    <div className="car-detail-label">
                      <FaGasPump />
                      <span>Rifornimento</span>
                    </div>

                    <div className="car-detail-value">
                      {refuelingSegments === null ? (
                        <span>N/A</span>
                      ) : (
                        <div
                          className="car-fuel"
                          role="img"
                          aria-label={`Livello rifornimento: ${refuelingLevel}`}
                        >
                          {[1, 2, 3, 4].map((segment) => (
                            <span
                              key={segment}
                              className={`car-fuel-segment ${
                                segment <= refuelingSegments
                                  ? refuelingLevel === "Riserva"
                                    ? "car-fuel-reserve"
                                    : "car-fuel-active"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Controlli */}
                  <div className="car-detail car-detail-controls">
                    <div className="car-detail-label">
                      <HiMiniWrenchScrewdriver />
                      <span>Controlli</span>
                    </div>

                    <span className="car-detail-value">{documentStatus}</span>
                  </div>
                </div>
              )}

              {/* START / STOP */}
              <div
                className={`car-action ${
                  activeTrip
                    ? "car-action-checkout"
                    : inMaintenance
                      ? "car-action-unavailable"
                      : "car-action-checkin"
                }`}
              >
                <span>
                  {activeTrip
                    ? "STOP"
                    : inMaintenance
                      ? "NON DISPONIBILE"
                      : "START"}
                </span>

                {!isDisabled && <FaArrowRight />}
              </div>
            </button>
          );
        })
      )}
    </div>
  );
}

export default SelectCar;
