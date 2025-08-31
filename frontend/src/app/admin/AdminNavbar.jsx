"use client";
import { useState, useEffect } from "react";
import AddAdminModal from "./add/AddAdminModal";
import { useRouter } from "next/navigation";

export default function AdminNavbar() {
  const [admins, setAdmins] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Fetch admins from your Ballerina backend
    fetch("http://localhost:9090/api/admin/auth/getAllAdmins")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setAdmins(data.admins); // set state with array of admins
        } else {
          console.error("Failed to fetch admins:", data.message);
        }
      })
      .catch((err) => {
        console.error("Error fetching admins:", err);
      });
  }, []);

  const addAdmin = (newAdmin) => {
    const updated = [...admins, { id: Date.now(), ...newAdmin }];
    setAdmins(updated);
    localStorage.setItem("admins", JSON.stringify(updated));
  };
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user session
    router.push("/"); // Redirect to landing page (or "/login")
  };

  const deleteAdmin = (id) => {
    const updated = admins.filter((a) => a.id !== id);
    setAdmins(updated);
    localStorage.setItem("admins", JSON.stringify(updated));
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black text-white px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-lg font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">Welcome, <b>Admin</b></span>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-white text-black px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition"
          >
            + Add Admin
          </button>
          <button
            onClick={() => setShowViewModal(true)}
            className="bg-gray-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-600 transition"
          >
            View Admins
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Add Admin Modal */}
      <AddAdminModal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={addAdmin}
      />

      {/* View Admins Modal */}
      {showViewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <h2 className="text-xl font-bold mb-4">Existing Admins</h2>
            <ul className="divide-y">
              {admins.length > 0 ? (
                admins.map((admin) => (
                  <li
                    key={admin.id}
                    className="flex justify-between items-center py-2"
                  >
                    <span>{admin.name} - {admin.email}</span>
                    <button
                      onClick={() => deleteAdmin(admin.id)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </li>
                ))
              ) : (
                <li className="py-2 text-center text-gray-500">
                  No admins available
                </li>
              )}
            </ul>

            <button
              onClick={() => setShowViewModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 font-bold text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </>
  );
}
