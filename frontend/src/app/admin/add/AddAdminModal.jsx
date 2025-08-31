"use client";
import { useState } from "react";

export default function AddAdminModal({ show, onClose, onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:9090/api/admin/auth/addAdmin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    console.log("Backend response:", data);

    if (data.status === "success") {
      alert("Admin added successfully!");
    } else {
      alert("Failed to add admin: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Network or server error");
  }

  setForm({ name: "", email: "", password: "" });
  onClose();
};

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-lg"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Add Admin
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border w-full p-3 mb-4 rounded-lg focus:ring-2"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border w-full p-3 mb-4 rounded-lg focus:ring-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="border w-full p-3 mb-6 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
          <button className="bg-gray-600 text-white w-full py-3 rounded-lg hover:bg-gray-700 transition">
            Add Admin
          </button>
        </form>
      </div>
    </div>
  );
}
