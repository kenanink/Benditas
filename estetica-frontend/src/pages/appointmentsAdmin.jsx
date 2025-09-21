import React, { useEffect, useState } from "react";
import api from "../api/api";

export default function AppointmentsAdmin() {
  const [appointments, setAppointments] = useState([]);

  const load = async () => {
    const res = await api.get("/appointments");
    setAppointments(res.data);
  };

  useEffect(()=>{ load(); }, []);

  const changeStatus = async (id, status) => {
    await api.put(`/appointments/${id}/status`, { status });
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Citas (Admin)</h2>
      <div className="space-y-3">
        {appointments.map(a=>(
          <div key={a.id} className="p-4 bg-white rounded shadow flex justify-between items-center">
            <div>
              <div><strong>{a.user_name || a.user}</strong> - {a.service_name}</div>
              <div>{a.appointment_date} {a.appointment_time}</div>
              <div className="text-sm">Estado: <span className="font-semibold">{a.status}</span></div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>changeStatus(a.id, "confirmada")} className="px-3 py-1 bg-green-600 text-white rounded">Confirmar</button>
              <button onClick={()=>changeStatus(a.id, "atendida")} className="px-3 py-1 bg-blue-600 text-white rounded">Marcar atendida</button>
              <button onClick={()=>changeStatus(a.id, "cancelada")} className="px-3 py-1 bg-red-600 text-white rounded">Cancelar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
