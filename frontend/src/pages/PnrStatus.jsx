import { useState } from "react";
import client from "../api/client";

export default function PnrStatus() {
  const [pnr, setPnr] = useState("");
  const [booking, setBooking] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchPnr = async (e) => {
    e.preventDefault();

    const value = pnr.trim().toUpperCase();
    setError("");
    setBooking(null);

    if (!/^[A-Z0-9]{10}$/.test(value)) {
      setError("Please enter a valid 10-character PNR number.");
      return;
    }

    try {
      setLoading(true);
      const { data } = await client.get(`/bookings/pnr/${encodeURIComponent(value)}`);
      setBooking(data);
    } catch (err) {
      console.error("PNR search failed:", err);
      setError(err.response?.data?.message || "PNR not found. Please check the number and try again.");
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : date.toLocaleString();
  };

  return (
    <main className="page-width page pnr-page">
      <section className="pnr-hero">
        <div>
          <span className="eyebrow">PNR STATUS</span>
          <h1>Check your ticket status</h1>
          <p>Enter your 10-digit PNR number to view your booking, passenger and journey details.</p>
        </div>
        <div className="pnr-rail-icon" aria-hidden="true">🚆</div>
      </section>

      <section className="pnr-search-card">
        <div className="pnr-search-heading">
          <div>
            <h2>PNR Enquiry</h2>
            <span>Enter the PNR printed on your ticket</span>
          </div>
          <span className="pnr-count">10 characters</span>
        </div>

        <form onSubmit={searchPnr} className="pnr-search-form">
          <label htmlFor="pnr">PNR Number</label>
          <div className="pnr-input-row">
            <input
              id="pnr"
              value={pnr}
              maxLength={10}
              autoComplete="off"
              placeholder="e.g. A1B2C3D4E5"
              onChange={(e) => setPnr(e.target.value.replace(/[^a-zA-Z0-9]/g, "").toUpperCase())}
            />
            <button className="btn btn-primary pnr-button" type="submit" disabled={loading}>
              {loading ? "Checking..." : "Check PNR Status"}
            </button>
          </div>
        </form>

        {error && <div className="alert error">{error}</div>}
      </section>

      {booking && (
        <section className="pnr-result">
          <div className="pnr-result-top">
            <div>
              <span className="result-label">PNR NUMBER</span>
              <strong className="pnr-number">{booking.pnr}</strong>
            </div>
            <span className={`status ${String(booking.status || "").toLowerCase()}`}>
              {booking.status}
            </span>
          </div>

          <div className="pnr-route">
            <div>
              <span>FROM</span>
              <strong>{booking.source}</strong>
            </div>
            <div className="pnr-route-line"><span>●</span><i></i><span>●</span></div>
            <div className="align-right">
              <span>TO</span>
              <strong>{booking.destination}</strong>
            </div>
          </div>

          <div className="pnr-train-strip">
            <div><span>Train</span><strong>{booking.trainNumber} · {booking.trainName}</strong></div>
            <div><span>Journey date</span><strong>{booking.travelDate}</strong></div>
          </div>

          <div className="pnr-details-grid">
            <div className="pnr-detail-card">
              <span>Passenger</span>
              <strong>{booking.passengerName}</strong>
              <small>Age: {booking.passengerAge}</small>
            </div>
            <div className="pnr-detail-card">
              <span>Coach</span>
              <strong>{booking.coach}</strong>
              <small>Coach</small>
            </div>
            <div className="pnr-detail-card">
              <span>Seat / Berth</span>
              <strong>{booking.seatNumber}</strong>
              <small>Confirmed allocation</small>
            </div>
            <div className="pnr-detail-card">
              <span>Fare</span>
              <strong>₹{Number(booking.amount || 0).toLocaleString("en-IN")}</strong>
              <small>Total amount</small>
            </div>
          </div>

          <div className="pnr-timeline">
            <div className="timeline-step active"><span>✓</span><div><strong>Booking created</strong><small>{formatDateTime(booking.bookedAt)}</small></div></div>
            <div className={`timeline-step ${booking.status === "CONFIRMED" ? "active" : ""}`}><span>{booking.status === "CONFIRMED" ? "✓" : "2"}</span><div><strong>Booking status</strong><small>{booking.status}</small></div></div>
            <div className="timeline-step"><span>3</span><div><strong>Journey</strong><small>{booking.travelDate}</small></div></div>
          </div>
        </section>
      )}

      {!booking && !error && !loading && (
        <div className="pnr-help">
          <strong>How to find your PNR?</strong>
          <span>Your PNR is the 10-character booking reference generated after a successful ticket booking.</span>
        </div>
      )}
    </main>
  );
}
