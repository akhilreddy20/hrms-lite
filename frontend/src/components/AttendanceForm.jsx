import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

export default function AttendanceForm({ onSuccess }) {
  const [form, setForm] = useState({
    employee_id: "",
    date: "",
    status: "Present",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/attendance", form);
      toast.success("Attendance marked successfully!");

      if (onSuccess) {
        onSuccess(form.employee_id);
      }
      setForm({ employee_id: "", date: "", status: "Present" });
    } catch (err) {
      console.error("Full error:", err.response?.data);
      const errorMsg = err.response?.data?.detail || "Error marking attendance";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-500";

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Mark Attendance</h2>
      <form onSubmit={submit} className="space-y-3">
        <input
          className={inputClass}
          placeholder="Employee ID"
          value={form.employee_id}
          onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
          required
          disabled={loading}
        />
        <input
          type="date"
          className={inputClass}
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
          disabled={loading}
          max={new Date().toISOString().split("T")[0]}
        />
        <select
          className={inputClass}
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          disabled={loading}
        >
          <option>Present</option>
          <option>Absent</option>
        </select>
        <button
          className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Marking..." : "Mark Attendance"}
        </button>
      </form>
    </div>
  );
}