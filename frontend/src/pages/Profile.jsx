import { useEffect, useState } from "react";
import client from "../api/client";

export default function Profile() {
  const [form, setForm] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    client.get("/profile").then(r=>setForm(r.data));
  }, []);

  const save = async (e) => {
    e.preventDefault();
    await client.put("/profile", form);
    setMessage("Profile updated successfully.");
  };

  return (
    <main className="page-width page narrow-page">
      <span className="eyebrow">ACCOUNT</span>
      <h1>My profile</h1>
      {message && <div className="alert success">{message}</div>}
      <form className="profile-form" onSubmit={save}>
        {["fullName","phone","address","city","state"].map(field => (
          <label key={field}>{field.replace(/([A-Z])/g, " $1")}
            <input value={form[field] || ""} onChange={e=>setForm({...form,[field]:e.target.value})} />
          </label>
        ))}
        <button className="btn btn-primary">Save Profile</button>
      </form>
    </main>
  );
}
