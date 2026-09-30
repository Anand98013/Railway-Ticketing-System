import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import client from "../api/client";

export default function BookTicket() {
  const { trainId } = useParams();
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [train, setTrain] = useState(null);
  const [seats, setSeats] = useState([]);
  const [selected, setSelected] = useState(null);
  const [date, setDate] = useState(params.get("date") || new Date().toISOString().slice(0,10));
  const [passenger, setPassenger] = useState({ name: "", age: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const today = new Date().toISOString().slice(0,10);

  useEffect(() => {
    client.get(`/trains/${trainId}`).then(r => setTrain(r.data)).catch(() => setError("Train not found"));
  }, [trainId]);

  useEffect(() => {
    if (!date) return;
    client.get(`/trains/${trainId}/seats`, { params: { travelDate: date } })
      .then(r => setSeats(r.data))
      .catch(() => setError("Could not load seats"));
  }, [trainId, date]);

  const book = async (e) => {
    e.preventDefault();
    setError("");
    if (!selected) return setError("Please select an available seat.");

    try {
      const { data } = await client.post("/bookings", {
        trainId: Number(trainId),
        seatId: selected.id,
        passengerName: passenger.name,
        passengerAge: Number(passenger.age),
        travelDate: date
      });
      setMessage(`Booking confirmed. Your PNR is ${data.pnr}`);

      // Refresh the seat map immediately so the newly booked seat becomes
      // unavailable and the available-seat count is reduced.
      const response = await client.get(`/trains/${trainId}/seats`, {
        params: { travelDate: date }
      });
      setSeats(response.data);
      setSelected(null);

      setTimeout(() => navigate("/bookings"), 1200);
    } catch (err) {
      setError(err.response?.data?.message || "Booking failed");
    }
  };

  if (!train) return <main className="page-width page"><div className="loader">Loading...</div></main>;

  return (
    <main className="page-width page">
      <div className="booking-layout">
        <section>
          <span className="eyebrow">SELECT SEAT</span>
          <h1>{train.trainName}</h1>
          <p className="muted">{train.trainNumber} · {train.source} → {train.destination}</p>

          <div className="date-card">
            <label>Travel date<input type="date" min={today} value={date} onChange={e=>{ setDate(e.target.value); setSelected(null); setError(""); }} /></label>
          </div>

          <div className="coach-heading"><h2>Available seats</h2><span>{seats.filter(s=>s.available).length} available</span></div>
          <div className="seat-grid">
            {seats.map(seat => (
              <button key={seat.id}
                disabled={!seat.available}
                className={`seat ${!seat.available ? "booked" : ""} ${selected?.id === seat.id ? "selected" : ""}`}
                onClick={() => setSelected(seat)}>
                <strong>{seat.seatNumber}</strong><small>{seat.seatClass}</small>
              </button>
            ))}
          </div>
        </section>

        <form className="booking-summary" onSubmit={book}>
          <h2>Passenger details</h2>
          {error && <div className="alert error">{error}</div>}
          {message && <div className="alert success">{message}</div>}
          <label>Passenger name<input value={passenger.name} onChange={e=>setPassenger({...passenger,name:e.target.value})} required /></label>
          <label>Age<input type="number" min="1" max="120" value={passenger.age} onChange={e=>setPassenger({...passenger,age:e.target.value})} required /></label>
          <div className="summary-row"><span>Selected seat</span><strong>{selected ? `${selected.coach} / ${selected.seatNumber}` : "—"}</strong></div>
          <div className="summary-row"><span>Class</span><strong>{selected?.seatClass || "—"}</strong></div>
          <div className="summary-total"><span>Estimated fare</span><strong>₹{selected ? ({ "1A":2500,"2A":1600,"3A":1100,"SL":650 }[selected.seatClass] || 500) : 0}</strong></div>
          <button className="btn btn-primary full">Confirm Booking</button>
        </form>
      </div>
    </main>
  );
}
