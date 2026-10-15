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
  const { cars, drivers, bookings, handleBooking } = useAppContext();
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

  return (
    <div className="booking-calendar">
      <div className="booking-header">
        <div>
          <h2>Prenotazioni</h2>
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

                    return (
                      <td key={car.id}>
                        <div
                          className={`booking-cell ${driverId ? "booked" : ""}`}
                        >
                          <span className="booking-name">
                            {drivers.find((d) => d.id === driverId)?.name ||
                              "LIBERA"}
                          </span>

                          <select
                            value={driverId || ""}
                            onChange={(e) =>
                              handleBooking(key, e.target.value, dateKey)
                            }
                            aria-label={`Prenotazione ${car.name} del ${dateKey}`}
                          >
                            <option value="">LIBERA</option>

                            {drivers.map((driver) => (
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
