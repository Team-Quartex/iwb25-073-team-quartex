"use client";
import { useState } from "react";
import Link from "next/link";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "",nic:"" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:9090/user/signup", {
      method: "POST",
      body: JSON.stringify(form),
    });
      if (res.ok) {
        alert("✅ Signup successful!");
        setForm({ name: "", email: "", password: "" });
      } else {
        alert("❌ Signup failed. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("❌ Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col gap-4"
      >
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Account
        </h1>

        <input
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="NIC"
          value={form.nic}
          onChange={(e) => setForm({ ...form, nic: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Email Address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-sm text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
