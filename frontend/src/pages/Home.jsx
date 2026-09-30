import { useState } from "react";
import { useNavigate } from "react-router-dom";

const today = new Date().toISOString().slice(0, 10);

export default function Home() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ source: "New Delhi", destination: "Mumbai Central", date: today });

  const submit = (e) => {
    e.preventDefault();
    navigate(`/trains?source=${encodeURIComponent(form.source)}&destination=${encodeURIComponent(form.destination)}&date=${form.date}`);
  };

  const swapStations = () => setForm(v => ({ ...v, source: v.destination, destination: v.source }));

  return (
    <main>
      <section className="hero home-hero">
        <div className="hero-overlay" />
        <div className="hero-content">
          <div className="hero-kicker"><span className="live-dot" /> RAILWAY JOURNEY MADE SIMPLE</div>
          <h1>Plan your journey.<br /><span>Book with confidence.</span></h1>
          <p>Search trains, check availability, choose your seat and manage your journey from one place.</p>

          <form className="search-panel home-search" onSubmit={submit}>
            <div className="field search-field">
              <label>FROM</label>
              <div className="input-with-icon"><span>●</span><input value={form.source} onChange={e => setForm({ ...form, source: e.target.value })} placeholder="Boarding station" required /></div>
            </div>
            <button type="button" className="swap swap-button" onClick={swapStations} aria-label="Swap stations">⇄</button>
            <div className="field search-field">
              <label>TO</label>
              <div className="input-with-icon"><span>●</span><input value={form.destination} onChange={e => setForm({ ...form, destination: e.target.value })} placeholder="Destination station" required /></div>
            </div>
            <div className="field search-field">
              <label>JOURNEY DATE</label>
              <div className="input-with-icon"><span>▣</span><input type="date" min={today} value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required /></div>
            </div>
            <button className="btn btn-primary search-btn" type="submit"><span>⌕</span> Search Trains</button>
          </form>

          <div className="quick-links">
            <span>Quick access:</span>
            <button onClick={() => navigate("/pnr-status")}>PNR Status</button>
            <button onClick={() => navigate("/status")}>Live Train Status</button>
            <button onClick={() => navigate("/trains")}>All Trains</button>
          </div>
        </div>
      </section>

      <section className="home-stats page-width">
        <div><strong>Search</strong><span>routes &amp; trains</span></div>
        <div><strong>Choose</strong><span>your preferred seat</span></div>
        <div><strong>Book</strong><span>securely online</span></div>
        <div><strong>Track</strong><span>PNR &amp; live status</span></div>
      </section>

      <section className="features page-width">
        <div className="section-heading home-section-heading">
          <div><span className="eyebrow">TRAVEL SERVICES</span><h2>Everything you need for your journey</h2></div>
          <p>One simple portal for searching, booking and tracking railway journeys.</p>
        </div>
        <div className="feature-grid">
          <div className="feature-card service-card"><span className="service-icon">🚆</span><div><h3>Train Search</h3><p>Find trains by source, destination and journey date.</p></div><span className="service-arrow">→</span></div>
          <div className="feature-card service-card"><span className="service-icon">🎫</span><div><h3>PNR Status</h3><p>Check your booking details using your PNR number.</p></div><span className="service-arrow">→</span></div>
          <div className="feature-card service-card"><span className="service-icon">📍</span><div><h3>Train Status</h3><p>View the latest status, station and delay information.</p></div><span className="service-arrow">→</span></div>
          <div className="feature-card service-card"><span className="service-icon">💺</span><div><h3>Seat Selection</h3><p>See real availability and select your preferred seat.</p></div><span className="service-arrow">→</span></div>
        </div>
      </section>

      <section className="journey-banner">
        <div className="page-width journey-banner-inner">
          <div><span className="eyebrow">YOUR JOURNEY, YOUR CONTROL</span><h2>From station search to confirmed ticket.</h2><p>Keep your bookings, passenger details and journey information together.</p></div>
          <button className="btn btn-light" onClick={() => navigate("/trains")}>Explore Trains →</button>
        </div>
      </section>
    </main>
  );
}
