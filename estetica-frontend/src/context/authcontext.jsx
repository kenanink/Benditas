// import { createContext, useContext, useState } from "react";
// import { parseJwt } from "../utils/jwt";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [token, setToken] = useState(() => localStorage.getItem("token"));
//   const [user, setUser] = useState(() => {
//     const t = localStorage.getItem("token");
//     return t ? parseJwt(t) : null;
//   });

//   useEffect(() => {
//     if (token) {
//       localStorage.setItem("token", token);
//       setUser(parseJwt(token));
//     } else {
//       localStorage.removeItem("token");
//       setUser(null);
//     }
//   }, [token]);

//   const login = (t) => setToken(t);
//   const logout = () => setToken(null);

//   return (
//     <AuthContext.Provider value={{ token, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario desde localStorage al inicio
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(
          atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
        );
        setUser({ email: payload.email, role: payload.role });
      } catch (e) {
        console.error("Error al decodificar token:", e);
        localStorage.removeItem("token");
      }
    }
  }, []);

  // Guardar usuario después del login
  const login = (token) => {
    localStorage.setItem("token", token);
    const payload = JSON.parse(
      atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/'))
    );
    setUser({ email: payload.email, role: payload.role });
  };

  // Eliminar usuario al cerrar sesión
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext) ?? { user: null, login: () => {}, logout: () => {} };
}
