import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import client from "../api/client";
import TrainCard from "../components/TrainCard";

export default function Trains() {
  const [params, setParams] = useSearchParams();
  const [form, setForm] = useState({
    source: params.get("source") || "",
    destination: params.get("destination") || "",
    date: params.get("date") || new Date().toISOString().slice(0, 10)
  });
  const [trains, setTrains] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const search = async (e) => {
    e?.preventDefault();
    setLoading(true);
    setError("");
    try {
      let data;
      if (form.source && form.destination) {
        const response = await client.get("/trains/search", { params: form });
        data = response.data;
      } else {
        const response = await client.get("/trains");
        data = response.data;
      }
      setTrains(data);
      setParams(form);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load trains");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { search(); }, []);

  return (
    <main className="page-width page">
      <div className="page-title">
        <div><span className="eyebrow">TRAIN SEARCH</span><h1>Find your train</h1></div>
      </div>

      <form className="filter-bar" onSubmit={search}>
        <input placeholder="From" value={form.source} onChange={e=>setForm({...form,source:e.target.value})} />
        <input placeholder="To" value={form.destination} onChange={e=>setForm({...form,destination:e.target.value})} />
        <input type="date" min={new Date().toISOString().slice(0, 10)} value={form.date} onChange={e=>setForm({...form,date:e.target.value})} />
        <button className="btn btn-primary">Search</button>
      </form>

      {error && <div className="alert error">{error}</div>}
      {loading ? <div className="loader">Loading trains...</div> :
        <div className="train-list">
          {trains.length ? trains.map(t => <TrainCard key={t.id} train={t} date={form.date} />) :
            <div className="empty">No trains found for this route.</div>}
        </div>
      }
    </main>
  );
}
