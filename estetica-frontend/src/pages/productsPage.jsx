import React, { useState, useEffect } from "react";
import api from "../api/api";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", price: "" });

  const load = async () => {
    const res = await api.get("/products");
    setProducts(res.data);
  };

  useEffect(() => { load(); }, []);

  const create = async (e) => {
    e.preventDefault();
    await api.post("/products", { ...form, price: parseFloat(form.price) });
    setForm({ name: "", description: "", price: "" });
    load();
  };

  const remove = async (id) => {
    await api.delete(`/products/${id}`);
    load();
  };

  return (
    <div className="p-6">
      <h2 className="text-xl mb-4">Productos</h2>

      <form onSubmit={create} className="mb-6 space-y-2">
        <input placeholder="Nombre" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="border p-2 w-full"/>
        <input placeholder="Descripción" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} className="border p-2 w-full"/>
        <input placeholder="Precio" value={form.price} onChange={e=>setForm({...form, price:e.target.value})} className="border p-2 w-full"/>
        <button className="bg-green-600 text-white px-4 py-2 rounded">Crear</button>
      </form>

      <div className="grid gap-4">
        {products.map(p=>(
          <div key={p.id} className="p-4 bg-white rounded shadow flex justify-between">
            <div>
              <div className="font-bold">{p.name}</div>
              <div className="text-sm">{p.description}</div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-semibold">₡ {p.price}</div>
              <button onClick={()=>remove(p.id)} className="text-red-600 text-sm mt-2">Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
