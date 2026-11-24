import React, { useState } from "react";
import "./BookingCalendar.css";
import { useAppContext } from "../utils/AppContext";

const weekdays = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

function getMonday(date) {
  const monday = new Date(date);
  const day = monday.getDay();

  monday.setDate(monday.getDate() - ((day + 6) % 7));
  monday.setHours(12, 0, 0, 0);

  return monday;
}

export default function BookingCalendar() {
  const { cars, drivers, bookings, trips, handleBooking, setCarMaintenance } =
    useAppContext();

  const [weekOffset, setWeekOffset] = useState(0);

  const monday = getMonday(new Date());

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + weekOffset * 7 + index);
    return date;
  });

  const weekStart = days[0].toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
  });

  const weekEnd = days[6].toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const now = new Date();
  const today = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");

  const bookingsByKey = Object.fromEntries(
    bookings.map((booking) => [booking.id, booking.driverId]),
  );

  // Converte la data di partenza nel formato del calendario
  const getDepartureDate = (timestamp) => {
    if (typeof timestamp !== "string") return null;

    const match = timestamp.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);

    if (!match) return null;

    const [, day, month, year] = match;

    const date = new Date(Number(year), Number(month) - 1, Number(day));

    if (
      date.getFullYear() !== Number(year) ||
      date.getMonth() !== Number(month) - 1 ||
      date.getDate() !== Number(day)
    ) {
      return null;
    }

    return [year, month.padStart(2, "0"), day.padStart(2, "0")].join("-");
  };

  // Recupera il viaggio aperto nella giornata selezionata
  const getActiveTrip = (car, dateKey) =>
    trips.find((trip) => {
      if (trip.checkOut !== null || trip.activeCar !== car.name) {
        return false;
      }

      const departureDate = getDepartureDate(trip.departure?.timestamp);

      return (
        departureDate !== null && departureDate <= dateKey && dateKey <= today
      );
    });

  const handleCalendarChange = async (car, key, dateKey, value) => {
    // Attiva la manutenzione globale
    if (value === "MANUTENZIONE") {
      await setCarMaintenance(car, true);
      return;
    }

    // Riattiva il veicolo
    if (car.outOfService === true) {
      if (value === "") {
        await setCarMaintenance(car, false);
      }
      return;
    }

    // Normale prenotazione
    await handleBooking(key, value, dateKey);
  };

  return (
    <div className="booking-calendar">
      <div className="booking-header">
        <div>
          <div className="booking-title">Prenota</div>
          <p>
            {weekStart} – {weekEnd}
          </p>
        </div>

        <div className="booking-navigation">
          <button
            disabled={weekOffset === 0}
            onClick={() => setWeekOffset((w) => w - 1)}
          >
            ◀
          </button>

          <button onClick={() => setWeekOffset(0)}>Oggi</button>

          <button
            disabled={weekOffset === 4}
            onClick={() => setWeekOffset((w) => w + 1)}
          >
            ▶
          </button>
        </div>

        {/* Legenda dei colori del calendario */}
        <div className="booking-legend" aria-label="Legenda colori calendario">
          <div className="booking-legend-item">
            <span className="booking-legend-color booking-legend-booked" />
            <span>Prenotata</span>
          </div>

          <div className="booking-legend-item">
            <span className="booking-legend-color booking-legend-in-use" />
            <span>In uso</span>
          </div>
        </div>
      </div>

      <div className="booking-table-wrapper">
        <table className="booking-table">
          <thead>
            <tr>
              <th></th>
              {cars.map((car) => (
                <th key={car.id}>{car.name}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((date, index) => {
              const dateKey = [
                date.getFullYear(),
                String(date.getMonth() + 1).padStart(2, "0"),
                String(date.getDate()).padStart(2, "0"),
              ].join("-");

              return (
                <tr key={dateKey}>
                  <th className={dateKey === today ? "booking-today" : ""}>
                    {weekdays[index]}
                    <div>
                      {date.getDate()}/{date.getMonth() + 1}
                    </div>
                  </th>

                  {cars.map((car) => {
                    const key = `${car.id}_${dateKey}`;
                    const driverId = bookingsByKey[key];
                    const activeTrip = getActiveTrip(car, dateKey);

                    const isInUse = Boolean(activeTrip);

                    const isMaintenance = car.outOfService === true;

                    const driverName = isMaintenance
                      ? "FERMA"
                      : isInUse
                        ? activeTrip.currentDriver
                        : drivers.find((driver) => driver.id === driverId)
                            ?.name || "LIBERA";

                    return (
                      <td key={car.id}>
                        <div
                          className={`booking-cell ${
                            isMaintenance
                              ? "maintenance"
                              : isInUse
                                ? "in-use"
                                : driverId
                                  ? "booked"
                                  : ""
                          }`}
                        >
                          <span className="booking-name">{driverName}</span>

                          <select
                            value={
                              car.outOfService === true
                                ? "MANUTENZIONE"
                                : driverId || ""
                            }
                            disabled={isInUse}
                            onChange={(e) =>
                              handleCalendarChange(
                                car,
                                key,
                                dateKey,
                                e.target.value,
                              )
                            }
                            aria-label={`Stato ${car.name} del ${dateKey}`}
                          >
                            <option value="">LIBERA</option>

                            <option value="MANUTENZIONE">FERMA</option>

                            {car.outOfService !== true &&
                              drivers.map((driver) => (
                                <option key={driver.id} value={driver.id}>
                                  {driver.name}
                                </option>
                              ))}
                          </select>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
