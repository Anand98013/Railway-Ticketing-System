import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await client.post("/auth/register", form);
      login(data);
      navigate("/trains");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <form className="auth-card" onSubmit={submit}>
        <span className="eyebrow">JOIN RAILGO</span>
        <h1>Create account</h1>
        {error && <div className="alert error">{error}</div>}
        <label>Full name<input value={form.fullName} onChange={e=>setForm({...form,fullName:e.target.value})} required /></label>
        <label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required /></label>
        <label>Phone<input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} /></label>
        <label>Password<input type="password" minLength="6" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required /></label>
        <button className="btn btn-primary full" disabled={loading}>{loading ? "Creating..." : "Create Account"}</button>
        <p className="auth-footer">Already registered? <Link to="/login">Sign in</Link></p>
      </form>
    </main>
  );
}
