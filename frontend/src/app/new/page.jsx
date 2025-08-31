"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NewComplaint() {
  const router = useRouter();
  const [type, setType] = useState("complaint");
  const [form, setForm] = useState({ title: "", body: "", anonymous: false });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    // ✅ Get user from localStorage
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    const user = JSON.parse(storedUser);

    const payload = {
      userId: user.userId, // backend expects this
      title: form.title,
      message: form.body,
      feedbackType: type,
      visibility: !form.anonymous, // if anonymous → visibility = false
    };

    try {
      setLoading(true);
      const res = await fetch("http://localhost:9090/feedback/addfeedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.status === "success") {
        alert(`${type} submitted successfully!`);
        router.push("/dashboard");
      } else {
        alert(`Failed: ${data.message}`);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      {/* Back Button */}
      <div className="self-start mb-6">
        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
        >
          <ArrowLeft size={20} /> Back to Dashboard
        </button>
      </div>

      {/* Form Card */}
      <form
        onSubmit={handleSubmit}
        className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md p-8 border border-gray-200"
      >
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          New {type.charAt(0).toUpperCase() + type.slice(1)}
        </h1>

        {/* Toggle Complaint/Feedback */}
        <div className="flex mb-5 rounded-lg overflow-hidden border border-gray-300">
          <button
            type="button"
            className={`flex-1 px-4 py-2 font-medium transition ${
              type === "complaint"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setType("complaint")}
          >
            Complaint
          </button>
          <button
            type="button"
            className={`flex-1 px-4 py-2 font-medium transition ${
              type === "feedback"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
            onClick={() => setType("feedback")}
          >
            Feedback
          </button>
        </div>

        {/* Title */}
        <input
          className="border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full p-3 rounded-lg mb-4 outline-none"
          placeholder="Enter a title..."
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        {/* Body */}
        <textarea
          className="border border-gray-300 focus:ring-2 focus:ring-blue-500 w-full p-3 rounded-lg mb-4 outline-none resize-none"
          placeholder="Write your details..."
          rows={5}
          value={form.body}
          onChange={(e) => setForm({ ...form, body: e.target.value })}
          required
        />

        {/* Anonymous Checkbox */}
        <label className="flex items-center mb-4 text-gray-700">
          <input
            type="checkbox"
            checked={form.anonymous}
            onChange={(e) =>
              setForm({ ...form, anonymous: e.target.checked })
            }
            className="h-4 w-4 accent-blue-600"
          />
          <span className="ml-2">Submit anonymously</span>
        </label>

        {/* Submit Button */}
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-3 w-full rounded-lg transition">
          Submit {type}
        </button>
      </form>
    </main>
  );
}
