"use client";
import { useState, useEffect } from "react";
import AdminNavbar from "../AdminNavbar";
import AdminModal from "../add/AddAdminModal";
import ResponseModal from "@/app/components/ResponseModal";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [admins, setAdmins] = useState();
  const [adminArray,setAdminArray] = useState([]);
  const router = useRouter();

  const [showAdminModal, setShowAdminModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({ name: "", email: "" });

  const [selectedItem, setSelectedItem] = useState(null);
  const [response, setResponse] = useState("");

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("all");

  const categoryKeywords = {
    garbage: ["garbage", "trash", "waste", "rubbish"],
    roads: ["road", "street", "pothole", "traffic", "streetlight"],
    water: ["water", "pipe", "leak", "drain", "flood"],
    crime: ["crime", "theft", "robbery", "assault", "burglary"],
    digital: ["digital", "portal", "website", "online", "service"],
  };

  // Fetch complaints
  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (!storedUser) {
      console.log("fail1")
      // 🚨 No user found → go login
      router.push("/admin/login");
      return;
    }

    let userData;
    try {
      console.log("pass1")
      userData = JSON.parse(storedUser);
      setAdmins(userData.adminId)
    } catch (err) {
      console.log("fail2")
      // 🚨 Invalid JSON → clear and redirect
      localStorage.removeItem("user");
      router.push("/admin/login");
      return;
    }

    if (!userData || userData.userType !== "admin") {
      console.log("fail3")
      // 🚨 Wrong type or missing → redirect
      router.push("/admin/login");
      return;
    }

    fetch("http://localhost:9090/feedback/allfeedback",{
      method: "GET",
      headers: { "Content-Type": "application/json" }
    })
      .then((res) => res.json())
      .then((data) => {
        setItems(data.feedbacks || []);
        setFilteredItems(data.feedbacks || []);
      });
  }, []);

  // Filter items
  useEffect(() => {
    let filtered = items;

    if (category !== "all") {
      const keywords = categoryKeywords[category] || [];
      filtered = filtered.filter((i) =>
        keywords.some(
          (kw) =>
            i.title.toLowerCase().includes(kw) ||
            i.body.toLowerCase().includes(kw)
        )
      );
    }

    if (status !== "all") {
      filtered = filtered.filter((i) =>
        status === "responded"
          ? i.response
          : status === "pending"
          ? !i.response && !i.rejected
          : i.rejected
      );
    }

    if (search.trim() !== "") {
      filtered = filtered.filter(
        (i) =>
          i.title.toLowerCase().includes(search.toLowerCase()) ||
          i.body.toLowerCase().includes(search.toLowerCase()) ||
          i.type.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(filtered);
  }, [search, category, status, items]);

  // Handle response modal
  const handleRespond = (item) => {
    setSelectedItem(item);
    setResponse(item.response || "");
  };

  const submitResponse = async () => {
  if (!response.trim()) return alert("Response cannot be empty");

  try {

    const res = await fetch("http://localhost:9090/feedback/addResponse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        feedbackId: selectedItem,   // must match backend field
        adminId: admins,                    // hardcoded or from logged-in admin
        message: response              // response text
      })
    });

    const data = await res.json();

      if (data.status === "success") {
        // Update local UI after successful DB insert
        const updated = items.map((i) =>
          i.id === selectedItem.id
            ? { ...i, response: response, respondedBy: "Admin" }
            : i
        );

        setItems(updated);
        setSelectedItem(null);
        setResponse("");
      } else {
        alert("Failed to save response: " + data.message);
      }
    } catch (err) {
      console.error("Error submitting response", err);
      alert("Something went wrong while submitting response.");
    }
  };

  // Add new admin
  const addAdmin = () => {
    if (!newAdmin.name || !newAdmin.email) return alert("Please fill all fields");
    setAdmins([...admins, { id: Date.now(), ...newAdmin }]);
    setNewAdmin({ name: "", email: "" });
    setShowAdminModal(false);
  };

  const deleteAdmin = (id) => setAdmins(admins.filter((a) => a.id !== id));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <AdminNavbar onAddAdmin={() => setShowAdminModal(true)} />

      {/* Main content */}
      <main className="flex-1 p-6 overflow-auto bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">All Complaints & Feedback</h1>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
          <input
            type="text"
            placeholder="Search complaints or feedback..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full md:w-1/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            <option value="garbage">Garbage</option>
            <option value="roads">Roads</option>
            <option value="water">Water</option>
            <option value="crime">Crime</option>
            <option value="digital">Digital Services</option>
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full md:w-1/4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="responded">Responded</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        {/* Complaints Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.length > 0 ? (
            filteredItems.map((c) => (
              <div
                key={c.id}
                className="bg-white p-5 shadow rounded-xl border relative hover:shadow-lg transition"
              >
                <h2 className="text-lg font-semibold flex justify-between mb-2">
                  {c.title}
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      c.type === "complaint"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {c.type}
                  </span>
                </h2>

                <p className="text-gray-700 mb-2">{c.body}</p>
                <p className="text-sm text-gray-500 mb-2">
                  By: {c.userName || "Anonymous"}
                </p>

                {c.response && (
                  <div className="mt-4 p-3 bg-gray-100 rounded-lg border-l-4 border-green-600 max-h-40 overflow-auto">
                    <p className="text-sm text-green-800 font-semibold">
                      Response by: {c.respondedBy || "Admin"}
                    </p>
                    <p className="text-gray-700 mt-1 whitespace-pre-wrap">{c.response}</p>
                  </div>
                )}

                <button
                  onClick={() => handleRespond(c.id)}
                  className="absolute top-2 right-2 bg-black text-white px-2 py-1 rounded hover:bg-gray-800 transition"
                >
                  Respond
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center mt-6">
              No complaints or feedback found.
            </p>
          )}
        </div>
      </main>

      {/* Modals */}
      {showAdminModal && (
        <AdminModal
          admins={admins}
          newAdmin={newAdmin}
          setNewAdmin={setNewAdmin}
          onClose={() => setShowAdminModal(false)}
          addAdmin={addAdmin}
          deleteAdmin={deleteAdmin}
        />
      )}

      {selectedItem && (
        <ResponseModal
          selectedItem={selectedItem}
          response={response}
          setResponse={setResponse}
          onClose={() => setSelectedItem(null)}
          submitResponse={submitResponse}
        />
      )}
    </div>
  );
}
