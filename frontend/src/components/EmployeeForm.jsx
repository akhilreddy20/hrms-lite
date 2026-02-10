import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api/api";

export default function EmployeeForm({ refresh }) {
  const [form, setForm] = useState({
    employee_id: "",
    full_name: "",
    email: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post("/employees/", form);
      toast.success("Employee added successfully!");
      setForm({ employee_id: "", full_name: "", email: "", department: "" });
      refresh();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Failed to add employee";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
      <h2 className="text-xl font-semibold mb-2">Add Employee</h2>
      <input
        placeholder="Employee ID"
        value={form.employee_id}
        onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
        className="input"
        required
        disabled={loading}
      />
      <input
        placeholder="Full Name"
        value={form.full_name}
        onChange={(e) => setForm({ ...form, full_name: e.target.value })}
        className="input"
        required
        disabled={loading}
      />
      <input
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className="input"
        required
        disabled={loading}
      />
      <input
        placeholder="Department"
        value={form.department}
        onChange={(e) => setForm({ ...form, department: e.target.value })}
        className="input"
        required
        disabled={loading}
      />
      <button 
        className="btn w-full disabled:bg-gray-400 disabled:cursor-not-allowed" 
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Employee"}
      </button>
    </form>
  );
}