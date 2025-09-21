import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [services, setServices] = useState([]);
  const [form, setForm] = useState({ service_id: "", appointment_date: "", appointment_time: "" });

  const load = async () => {
    const res = await api.get("/appointments");
    setAppointments(res.data);
  };

  const loadServices = async () => {
    const res = await api.get("/services");
    setServices(res.data);
  };

  useEffect(()=>{ load(); loadServices(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post("/appointments", {
      service_id: Number(form.service_id),
      appointment_date: form.appointment_date,
      appointment_time: form.appointment_time
    });
    setForm({ service_id: "", appointment_date: "", appointment_time: "" });
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Mis Citas</h2>

      <form onSubmit={create} className="mb-6 grid gap-2 grid-cols-1 md:grid-cols-3">
        <select value={form.service_id} onChange={e=>setForm({...form, service_id:e.target.value})} className="border p-2">
          <option value="">Selecciona un servicio</option>
          {services.map(s=> <option key={s.id} value={s.id}>{s.name} - ₡{s.price}</option>)}
        </select>
        <input type="date" value={form.appointment_date} onChange={e=>setForm({...form, appointment_date:e.target.value})} className="border p-2" />
        <input type="time" value={form.appointment_time} onChange={e=>setForm({...form, appointment_time:e.target.value})} className="border p-2" />
        <button className="md:col-span-3 bg-indigo-600 text-white p-2 rounded">Pedir cita</button>
      </form>

      <div className="space-y-3">
        {appointments.map(a=>(
          <div key={a.id} className="p-4 bg-white rounded shadow">
            <div className="font-bold">{a.service_name}</div>
            <div>{a.appointment_date} {a.appointment_time}</div>
            <div>Estado: <span className="font-semibold">{a.status}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
