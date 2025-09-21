import React, { createContext, useContext, useState, useEffect } from "react";
import { parseJwt } from "../utils/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    const t = localStorage.getItem("token");
    return t ? parseJwt(t) : null;
  });

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
      setUser(parseJwt(token));
    } else {
      localStorage.removeItem("token");
      setUser(null);
    }
  }, [token]);

  const login = (t) => setToken(t);
  const logout = () => setToken(null);

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
