import { useState } from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceRecords from "../components/AttendanceRecords";

export default function Attendance() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [dateFilter, setDateFilter] = useState({ startDate: "", endDate: "" });

  const handleAttendanceMarked = (employeeId) => {
    setSelectedEmployeeId(employeeId);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="p-6 space-y-6">
      <AttendanceForm onSuccess={handleAttendanceMarked} />

      {/* Search for employee attendance */}
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">View Attendance History</h2>
        <input
          type="text"
          placeholder="Enter Employee ID"
          value={selectedEmployeeId}
          onChange={(e) => setSelectedEmployeeId(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
        />
      </div>

      {/* Date Range Filter */}
      {selectedEmployeeId && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-3">Filter by Date Range</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={dateFilter.startDate}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, startDate: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">
                End Date
              </label>
              <input
                type="date"
                value={dateFilter.endDate}
                onChange={(e) =>
                  setDateFilter({ ...dateFilter, endDate: e.target.value })
                }
                className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </div>
          {(dateFilter.startDate || dateFilter.endDate) && (
            <button
              onClick={() => setDateFilter({ startDate: "", endDate: "" })}
              className="mt-3 text-sm text-blue-600 hover:underline"
            >
              Clear Filters
            </button>
          )}
        </div>
      )}

      {/* Show attendance records */}
      {selectedEmployeeId && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">
            Attendance Records for {selectedEmployeeId}
          </h2>
          <AttendanceRecords
            employeeId={selectedEmployeeId}
            dateFilter={dateFilter}
            key={refreshTrigger}
          />
        </div>
      )}
    </div>
  );
}