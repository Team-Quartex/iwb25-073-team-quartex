"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:9090/api/admin/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.status === "success") {
      // Save user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.data));
      alert("✅ Admin login successful!");
      router.push("/admin/dashboard");
    } else {
        alert("❌ User name or password wrong");
    }

  };

  return (
    <main className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          Admin Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="border w-full p-3 mb-4 rounded-lg focus:ring-2 focus:ring-blue-500"
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
        <button className="bg-blue-600 text-white w-full py-3 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
      </form>
    </main>
  );
}
