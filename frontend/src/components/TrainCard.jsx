import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from "../api/client";

export default function TrainCard({ train, date }) {
  const [availableSeats, setAvailableSeats] = useState(Number(train.totalSeats) || 0);

  useEffect(() => {
    let cancelled = false;
    const loadAvailability = async () => {
      try {
        const response = await client.get(`/trains/${train.id}/seats`, { params: { travelDate: date } });
        if (!cancelled && Array.isArray(response.data)) setAvailableSeats(response.data.filter(seat => seat.available).length);
      } catch {
        // Keep configured capacity when availability cannot be loaded.
      }
    };
    if (date) loadAvailability();
    return () => { cancelled = true; };
  }, [train.id, date, train.totalSeats]);

  return (
    <article className="train-card">
      <div className="train-card-top">
        <div>
          <span className="train-number">{train.trainNumber}</span>
          <h3>{train.trainName}</h3>
        </div>
        <span className="badge">{train.trainType || "EXPRESS"}</span>
      </div>

      <div className="route">
        <div><strong>{train.departureTime}</strong><span>{train.source}</span></div>
        <div className="route-line">● ───────────── ●<small> Journey</small></div>
        <div className="align-right"><strong>{train.arrivalTime}</strong><span>{train.destination}</span></div>
      </div>

      <div className="train-card-bottom">
        <span>💺 <strong>{availableSeats}</strong> seats available</span>
        <Link className="btn btn-primary" to={`/book/${train.id}${date ? `?date=${date}` : ""}`}>Select Train →</Link>
      </div>
    </article>
  );
}
