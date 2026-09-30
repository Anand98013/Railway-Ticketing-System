import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [email, setEmail] = useState(localStorage.getItem("email"));

  const login = (data) => {
    localStorage.setItem("token", data.token);
    localStorage.setItem("email", data.email);
    localStorage.setItem("role", data.role);
    setToken(data.token);
    setEmail(data.email);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setEmail(null);
  };

  const value = useMemo(() => ({ token, email, isAuthenticated: Boolean(token), login, logout }), [token, email]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
