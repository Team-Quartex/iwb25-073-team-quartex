"use client";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // import your Navbar
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredItems, setFilteredItems] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.log("fail1");
      // 🚨 No user found → go login
      router.push("/login");
      return;
    }

    let userData;
    try {
      console.log("pass1");
      userData = JSON.parse(storedUser);
    } catch (err) {
      console.log("fail2");
      // 🚨 Invalid JSON → clear and redirect
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    if (!userData || userData.userType !== "user") {
      console.log("fail3");
      // 🚨 Wrong type or missing → redirect
      router.push("/login");
      return;
    }
    // Fetch dummy complaints
    fetch(`http://localhost:9090/feedback/userfeedback?userId=${userData.userId}`,{
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.feedbacks || []);
        setFilteredItems(data.feedbacks || []);
      }).catch(()=>{
        console.log("fail4");
        router.push("/login")});
  }, [router]);

  useEffect(() => {
    // Filter items whenever search changes
    const filtered = items.filter(
      (c) =>
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.body.toLowerCase().includes(search.toLowerCase()) ||
        c.feedbacktype.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredItems(filtered);
  }, [search, items]);

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Dashboard Content */}
      <main className="p-8"> {/* pt-24 to avoid overlapping with fixed navbar */}
        <h1 className="text-3xl font-bold mb-6">My Complaints & Feedback</h1>

        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search complaints or feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 shadow rounded-xl border hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold flex justify-between mb-2">
                  {c.title}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      c.feedbacktype === "complaint"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {c.feedbacktype}
                  </span>
                </h2>
                <p className="text-gray-600 text-sm mb-3">{c.body}</p>
                <p className="text-sm font-medium">
                  Status:{" "}
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : c.status === "Reviewed"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </p>
                {c.response && (
                  <p className="text-sm text-green-600 mt-2">
                    Response: {c.response}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center mt-6">
              No complaints or feedback found.
            </p>
          )}
        </div>
      </main>
    </>
  );
}
