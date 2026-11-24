import React from "react";
import "./Trips.css";
import { useAppContext } from "../utils/AppContext";
import { FiDownload } from "react-icons/fi";

function Trips() {
  const { trips } = useAppContext();

  // Formatta i chilometri soltanto per la visualizzazione
  const formatKm = (value) => {
    if (value === null || value === undefined || value === "") {
      return "N/A";
    }

    const km = Number(value);

    return Number.isFinite(km) ? km.toLocaleString("it-IT") : "N/A";
  };

  // Converte "DD/MM/YYYY, HH:MM" in Date
  function parseDate(dateString) {
    if (!dateString || typeof dateString !== "string") {
      return new Date(NaN);
    }

    const [date, time] = dateString.split(", ");

    if (!date || !time) {
      return new Date(NaN);
    }

    const [day, month, year] = date.split("/");
    const [hours, minutes] = time.split(":");

    return new Date(year, month - 1, day, hours, minutes);
  }

  // Calcola la durata in ore decimali
  function calculateTravelTime(departureTime, checkOutTime) {
    if (departureTime && checkOutTime) {
      const departureDate = parseDate(departureTime);
      const checkOutDate = parseDate(checkOutTime);

      if (!isNaN(departureDate) && !isNaN(checkOutDate)) {
        const diffMs = checkOutDate - departureDate;
        const diffHrs = diffMs / 36e5;
        return diffHrs.toFixed(2);
      }
    }

    return "N/A";
  }

  // Calcola i chilometri percorsi
  const calculateDistance = (departureKm, returnKm) => {
    if (
      departureKm === null ||
      departureKm === undefined ||
      departureKm === "" ||
      returnKm === null ||
      returnKm === undefined ||
      returnKm === ""
    ) {
      return "N/A";
    }

    const dep = Number(departureKm);
    const ret = Number(returnKm);

    if (!Number.isFinite(dep) || !Number.isFinite(ret)) {
      return "N/A";
    }

    return ret - dep;
  };

  // Filtra i viaggi conclusi
  const completedTrips = trips.filter((trip) => trip.checkOut != null);

  // Ordina per data di rientro, dal più recente
  const sortedTrips = [...completedTrips].sort((a, b) => {
    const dateA = parseDate(
      a.checkOut?.timestamp || a.departure?.timestamp || "",
    );

    const dateB = parseDate(
      b.checkOut?.timestamp || b.departure?.timestamp || "",
    );

    const timeA = !isNaN(dateA) ? dateA.getTime() : -Infinity;

    const timeB = !isNaN(dateB) ? dateB.getTime() : -Infinity;

    return timeB - timeA;
  });

  // Protegge i valori esportati nel CSV
  const escapeCSV = (value) => {
    if (value === null || value === undefined || value === "N/A") {
      return '""';
    }

    let text = String(value);

    if (/^\s*[=+\-@]/.test(text)) {
      text = "'" + text;
    }

    return `"${text.replace(/"/g, '""')}"`;
  };

  // Esporta tutti i viaggi conclusi
  const exportCSV = () => {
    if (sortedTrips.length === 0) {
      alert("Nessun viaggio da esportare.");
      return;
    }

    const headers = [
      "Veicolo",
      "Conducente",
      "Destinazione",
      "Data e ora partenza",
      "Data e ora rientro",
      "Km iniziali",
      "Km finali",
      "Km percorsi",
      "Ore di percorrenza",
      "Spese carburante",
      "Livello rifornimento",
    ];

    const rows = sortedTrips.map((trip) => {
      const departure = trip.departure || {};
      const checkOut = trip.checkOut || {};

      const distance = calculateDistance(
        departure.departureKM,
        checkOut.returnKM,
      );

      const travelTime = calculateTravelTime(
        departure.timestamp,
        checkOut.timestamp,
      );

      return [
        checkOut.car ?? "",
        checkOut.driver ?? trip.currentDriver ?? "",
        departure.destination ?? "",
        departure.timestamp ?? "",
        checkOut.timestamp ?? "",
        departure.departureKM ?? "",
        checkOut.returnKM ?? "",
        distance,
        travelTime,
        checkOut.gasExpenses ?? "",
        checkOut.refuelingLevel ?? "",
      ];
    });

    const csvContent = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(";"))
      .join("\r\n");

    const blob = new Blob(["\uFEFF", csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "carpooli-viaggi.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="trip-container">
      <div className="trip-title">
        <span>logs</span>

        <button
          type="button"
          className="trip-export"
          onClick={exportCSV}
          title="Esporta CSV"
          aria-label="Esporta CSV"
        >
          <FiDownload size={23} />
        </button>
      </div>

      <ul className="trip-ul">
        {sortedTrips.map((trip) => (
          <li className="trip-li" key={trip.id}>
            {/* Intestazione senza riquadro */}
            <div className="trip-driver">
              <div>{trip.checkOut?.car || "no car"}</div>
              <div>{trip.checkOut?.driver || trip.currentDriver}</div>
            </div>

            {/* Riquadro unico con tutti i dati */}
            <div className="trip-data-panel">
              <div className="trip-item">
                <label>destinazione:</label>
                <div className="trip-value">
                  {trip.departure?.destination || "N/A"}
                </div>
              </div>

              <div className="trip-item">
                <label>ore di percorrenza:</label>
                <div className="trip-value">
                  {calculateTravelTime(
                    trip.departure?.timestamp,
                    trip.checkOut?.timestamp,
                  )}
                </div>
              </div>

              <div className="trip-item">
                <label>km totali:</label>
                <div className="trip-value">
                  {formatKm(
                    calculateDistance(
                      trip.departure?.departureKM,
                      trip.checkOut?.returnKM,
                    ),
                  )}
                </div>
              </div>

              <div className="trip-item">
                <label>Spese carburante:</label>
                <div className="trip-value">
                  {trip.checkOut?.gasExpenses || "N/A"}
                </div>
              </div>

              <div className="trip-partenza">Dati partenza</div>

              <div className="trip-item">
                <label>km:</label>
                <div className="trip-value">
                  {formatKm(trip.departure?.departureKM)}
                </div>
              </div>

              <div className="trip-item">
                <label>giorno e ora:</label>
                <div className="trip-value">
                  {trip.departure?.timestamp || "N/A"}
                </div>
              </div>

              <div className="trip-checkout">Dati check-out</div>

              <div className="trip-item">
                <label>km:</label>
                <div className="trip-value">
                  {formatKm(trip.checkOut?.returnKM)}
                </div>
              </div>

              <div className="trip-item">
                <label>giorno e ora:</label>
                <div className="trip-value">
                  {trip.checkOut?.timestamp || "N/A"}
                </div>
              </div>

              <div className="trip-item">
                <label>livello rifornimento:</label>
                <div className="trip-value">
                  {trip.checkOut?.refuelingLevel || "N/A"}
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Trips;
