import toast from "react-hot-toast";
import api from "../api/api";

export default function EmployeeList({ employees, refresh }) {
  const remove = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) {
      return;
    }

    try {
      await api.delete(`/employees/${id}`);
      toast.success("Employee deleted successfully!");
      refresh();
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Failed to delete employee";
      toast.error(errorMsg);
    }
  };

  if (!employees.length) {
    return (
      <div className="bg-white p-8 rounded shadow text-center">
        <p className="text-gray-500">No employees found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-3">Employee List</h2>
      {employees.map((emp) => (
        <div
          key={emp.employee_id}
          className="bg-white p-3 rounded shadow flex justify-between items-center hover:shadow-md transition"
        >
          <div>
            <p className="font-medium">{emp.full_name}</p>
            <p className="text-sm text-gray-600">
              {emp.email} • {emp.department}
            </p>
            <p className="text-xs text-gray-500 mt-1">ID: {emp.employee_id}</p>
          </div>
          <button
            onClick={() => remove(emp.employee_id)}
            className="text-red-600 hover:text-red-800 px-3 py-1 rounded hover:bg-red-50 transition"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}