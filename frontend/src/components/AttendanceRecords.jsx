import { useEffect, useState } from "react";
import api from "../api/api";

export default function AttendanceRecords({ employeeId, dateFilter }) {
  const [records, setRecords] = useState([]);
  const [filteredRecords, setFilteredRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ present: 0, absent: 0, total: 0 });

  const loadRecords = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/attendance/${employeeId}`);
      const data = res.data.data || res.data;
      setRecords(data);
      setFilteredRecords(data);
      calculateStats(data);
    } catch (err) {
      console.error(err);
      setRecords([]);
      setFilteredRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const present = data.filter((r) => r.status === "Present").length;
    const absent = data.filter((r) => r.status === "Absent").length;
    setStats({ present, absent, total: data.length });
  };

  useEffect(() => {
    if (employeeId) {
      loadRecords();
    }
  }, [employeeId]);

  useEffect(() => {
    if (!dateFilter.startDate && !dateFilter.endDate) {
      setFilteredRecords(records);
      calculateStats(records);
      return;
    }

    const filtered = records.filter((rec) => {
      const recDate = new Date(rec.date);
      const start = dateFilter.startDate ? new Date(dateFilter.startDate) : null;
      const end = dateFilter.endDate ? new Date(dateFilter.endDate) : null;

      if (start && end) {
        return recDate >= start && recDate <= end;
      } else if (start) {
        return recDate >= start;
      } else if (end) {
        return recDate <= end;
      }
      return true;
    });

    setFilteredRecords(filtered);
    calculateStats(filtered);
  }, [dateFilter, records]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  if (!filteredRecords.length) {
    return (
      <div className="bg-white p-8 rounded shadow text-center">
        <p className="text-gray-500">No attendance records found.</p>
      </div>
    );
  }

  const attendancePercent =
    stats.total > 0 ? ((stats.present / stats.total) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-4">
      {/* Statistics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-600">Total Days</p>
          <p className="text-2xl font-bold text-blue-900">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <p className="text-sm text-green-600">Present Days</p>
          <p className="text-2xl font-bold text-green-900">{stats.present}</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <p className="text-sm text-red-600">Absent Days</p>
          <p className="text-2xl font-bold text-red-900">{stats.absent}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <p className="text-sm text-purple-600">Attendance %</p>
          <p className="text-2xl font-bold text-purple-900">
            {attendancePercent}%
          </p>
        </div>
      </div>

      {/* Attendance Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map((rec) => (
              <tr key={rec.id} className="border-b hover:bg-gray-50 transition">
                <td className="py-2 px-4">
                  {new Date(rec.date).toLocaleDateString()}
                </td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    rec.status === "Present" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {rec.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}