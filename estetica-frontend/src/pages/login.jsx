import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      const token = res.data.token;
      login(token);
      // redirigir según rol (decodificar token)
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g,'+').replace(/_/g,'/')));
      if (payload.role === "admin") navigate("/admin");
      else navigate("/my-appointments");
    } catch (err) {
      setError(err.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Iniciar sesión</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-2 border" placeholder="Correo" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full p-2 border" placeholder="Contraseña" value={password} onChange={e=>setPassword(e.target.value)} type="password" />
        <button className="w-full bg-indigo-600 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  );
}
