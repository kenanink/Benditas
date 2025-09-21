import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "", duration_minutes: 60 });

  const load = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post("/services", { ...form, price: parseFloat(form.price) });
    setForm({ name: "", description: "", price: "", duration_minutes: 60 });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/services/${id}`);
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Servicios</h2>

      <form onSubmit={create} className="mb-6 space-y-2">
        <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="border p-2 w-full"/>
        <input placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="border p-2 w-full"/>
        <input placeholder="Precio" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="border p-2 w-full"/>
        <input placeholder="Duración (min)" value={form.duration_minutes} onChange={e=>setForm({...form, duration_minutes:e.target.value})} className="border p-2 w-full"/>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Crear</button>
      </form>

      <div className="grid gap-4">
        {services.map(s=>(
          <div key={s.id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-bold">{s.name}</div>
              <div className="text-sm">{s.description}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-semibold">₡ {s.price}</div>
              <button onClick={()=>remove(s.id)} className="text-red-600 text-sm mt-2">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
