"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:9090/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.status === "success") {
      // Save user info in localStorage
      localStorage.setItem("user", JSON.stringify(data.data));
      setLoading(false);
      alert("✅ Login successful!");
      router.push("/dashboard");
    } else {
        setLoading(false);
        alert("❌ User name or password wrong");
    }
  }

  return (
    <main className="flex justify-center items-center h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-xl rounded-2xl w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
          User Login
        </h1>

        {/* Email input */}
        <input
          className="border w-full p-3 mb-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="email"
          placeholder="Enter your email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        {/* Password input */}
        <input
          className="border w-full p-3 mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="password"
          placeholder="Enter your password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 w-full rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Signup redirect */}
        <p className="text-sm text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </main>
  );
}
