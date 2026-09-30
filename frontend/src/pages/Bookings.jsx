import { useEffect, useState } from "react";
import client from "../api/client";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setError("");
      const response = await client.get("/bookings/my");
      setBookings(response.data);
    } catch (err) {
      console.error("Failed to load bookings:", err);
      setError(err.response?.data?.message || "Could not load bookings");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const cancel = async (id) => {
    if (!confirm("Cancel this booking?")) return;
    try {
      await client.delete(`/bookings/${id}`);
      await load();
    } catch (err) {
      setError(err.response?.data?.message || "Cancellation failed");
    }
  };

  return (
    <main className="page-width page">
      <span className="eyebrow">MY TRIPS</span>
      <h1>My bookings</h1>
      {error && <div className="alert error">{error}</div>}
      <div className="booking-list">
        {bookings.length ? bookings.map(b => (
          <article className="booking-card" key={b.id}>
            <div className="pnr-block"><span>PNR</span><strong>{b.pnr}</strong></div>
            <div><span className="muted">Train</span><strong>{b.trainNumber} · {b.trainName}</strong></div>
            <div><span className="muted">Route</span><strong>{b.source} → {b.destination}</strong></div>
            <div><span className="muted">Passenger</span><strong>{b.passengerName} ({b.passengerAge})</strong></div>
            <div><span className="muted">Seat</span><strong>{b.coach} / {b.seatNumber}</strong></div>
            <div><span className="muted">Travel</span><strong>{b.travelDate}</strong></div>
            <div><span className="muted">Status</span><span className={`status ${b.status.toLowerCase()}`}>{b.status}</span></div>
            {b.status === "CONFIRMED" && <button className="btn btn-danger" onClick={()=>cancel(b.id)}>Cancel</button>}
          </article>
        )) : <div className="empty">You have no bookings yet.</div>}
      </div>
    </main>
  );
}
