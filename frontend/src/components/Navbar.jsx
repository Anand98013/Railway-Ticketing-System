import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import client from "../api/client";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isAuthenticated, email, logout } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!isAuthenticated) {
      setProfile(null);
      return;
    }
    client.get("/profile")
      .then(({ data }) => setProfile(data))
      .catch(() => setProfile(null));
  }, [isAuthenticated]);

  useEffect(() => {
    const close = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const signOut = () => {
    logout();
    setOpen(false);
    setMobileOpen(false);
    navigate("/login");
  };

  const displayName = profile?.fullName?.trim() || email?.split("@")[0] || "User";
  const initial = displayName.charAt(0).toUpperCase();

  const navItems = [
    ["/", "Home"],
    ["/trains", "Train Search"],
    ["/pnr-status", "PNR Status"],
    ["/status", "Train Status"],
    ...(isAuthenticated ? [["/bookings", "My Bookings"]] : [])
  ];

  return (
    <>
      <div className="top-strip">
        <div className="top-strip-inner">
          <span>Indian Rail Journey Portal</span>
          <span className="top-strip-right"><span>24×7 Booking</span><span>•</span><span>Secure &amp; Fast</span></span>
        </div>
      </div>

      <header className="navbar">
        <Link className="brand" to="/" onClick={() => setMobileOpen(false)}>
          <span className="brand-mark"><span>RG</span></span>
          <span className="brand-copy"><strong>RailGo</strong><small>Railway Ticketing</small></span>
        </Link>

        <nav className="nav-links desktop-nav" aria-label="Primary navigation">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} className={({ isActive }) => isActive ? "active" : ""}>
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-actions">
          {isAuthenticated ? (
            <div className="profile-menu" ref={menuRef}>
              <button className="profile-trigger" onClick={() => setOpen(v => !v)} aria-expanded={open}>
                <span className="avatar">{initial}</span>
                <span className="profile-trigger-text"><strong>{displayName}</strong><small>My Account</small></span>
                <span className={`chevron ${open ? "up" : ""}`}>⌄</span>
              </button>
              {open && (
                <div className="profile-dropdown">
                  <div className="profile-dropdown-head">
                    <span className="avatar avatar-large">{initial}</span>
                    <div><strong>{displayName}</strong><small>{email}</small></div>
                  </div>
                  <div className="dropdown-divider" />
                  <Link to="/profile" onClick={() => setOpen(false)}>👤 <span>My Profile</span></Link>
                  <Link to="/bookings" onClick={() => setOpen(false)}>🎫 <span>My Bookings</span></Link>
                  <button onClick={signOut}>↪ <span>Logout</span></button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link className="nav-login" to="/login">Login</Link>
              <Link className="btn btn-primary nav-register" to="/register">Register</Link>
            </>
          )}
          <button className="mobile-menu-btn" onClick={() => setMobileOpen(v => !v)} aria-label="Open menu">☰</button>
        </div>
      </header>

      {mobileOpen && (
        <nav className="mobile-nav">
          {navItems.map(([to, label]) => (
            <NavLink key={to} to={to} onClick={() => setMobileOpen(false)}>{label}</NavLink>
          ))}
          {isAuthenticated && <NavLink to="/profile" onClick={() => setMobileOpen(false)}>My Profile</NavLink>}
          {!isAuthenticated && <NavLink to="/login" onClick={() => setMobileOpen(false)}>Login</NavLink>}
        </nav>
      )}
    </>
  );
}
