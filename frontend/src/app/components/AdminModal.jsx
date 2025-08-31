"use client";

export default function AdminModal({ admins, newAdmin, setNewAdmin, onClose, addAdmin, deleteAdmin }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Admins</h2>

        {/* List of admins */}
        <ul className="mb-4 divide-y">
          {admins.map((a) => (
            <li key={a.id} className="py-2 flex justify-between items-center">
              <span>{a.name} - {a.email}</span>
              <button
                onClick={() => deleteAdmin(a.id)}
                className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </li>
          ))}
          {admins.length === 0 && (
            <li className="py-2 text-center text-gray-500">No admins available</li>
          )}
        </ul>

        {/* Add new admin */}
        <h3 className="font-semibold mb-2">Add New Admin</h3>
        <input
          placeholder="Name"
          value={newAdmin.name}
          onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
          className="w-full p-2 border rounded mb-2"
        />
        <input
          placeholder="Email"
          value={newAdmin.email}
          onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
          className="w-full p-2 border rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 border rounded">Close</button>
          <button onClick={addAdmin} className="px-4 py-2 bg-black text-white rounded">Add Admin</button>
        </div>
      </div>
    </div>
  );
}
