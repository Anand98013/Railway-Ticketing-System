import { useState } from "react";
import client from "../api/client";

export default function Status() {
  const [number, setNumber] = useState("");
  const [status, setStatus] = useState(null);
  const [error, setError] = useState("");

  const search = async (e) => {
    e.preventDefault();
    const trainNumber = number.trim();
    setError("");
    setStatus(null);
    if (!trainNumber) {
      setError("Please enter a train number");
      return;
    }
    try {
      const { data } = await client.get(`/status/${encodeURIComponent(trainNumber)}`);
      setStatus(data);
    } catch (err) {
      console.error("Train status error:", err);
      setError(err.response?.data?.message || "Unable to fetch train status");
    }
  };

  return (
    <main className="page-width page narrow-page">
      <span className="eyebrow">LIVE RAILWAY STATUS</span>
      <h1>Track your train</h1>
      <p className="muted">Enter a train number to view the latest status available from the system.</p>
      <form className="filter-bar single" onSubmit={search}>
        <input placeholder="e.g. 12001" value={number} onChange={e=>setNumber(e.target.value)} required />
        <button className="btn btn-primary">Check Status</button>
      </form>
      {error && <div className="alert error">{error}</div>}
      {status && (
        <div className="status-card">
          <div><span>Train</span><strong>{status.trainNumber}</strong></div>
          <div><span>Status</span><strong className="on-time">{status.status}</strong></div>
          <div><span>Current station</span><strong>{status.currentStation}</strong></div>
          <div><span>Next station</span><strong>{status.nextStation}</strong></div>
          <div><span>Platform</span><strong>{status.platform}</strong></div>
          <div><span>Delay</span><strong>{status.delayMinutes} min</strong></div>
        </div>
      )}
    </main>
  );
}
