"use client";

export default function ResponseModal({ selectedItem, response, setResponse, onClose, submitResponse }) {
  if (!selectedItem) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Respond to: {selectedItem.title}</h2>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          rows={5}
          className="w-full p-3 border rounded mb-4"
        />
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 rounded border">Cancel</button>
          <button onClick={submitResponse} className="px-4 py-2 rounded bg-black text-white">Submit</button>
        </div>
      </div>
    </div>
  );
}
