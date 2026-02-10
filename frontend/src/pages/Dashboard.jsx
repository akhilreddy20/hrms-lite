import { useEffect, useState } from "react";
import api from "../api/api";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    totalAttendanceRecords: 0,
    todayPresent: 0,
    todayAbsent: 0,
  });
  const [topEmployees, setTopEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch employees
      const employeesRes = await api.get("/employees");
      const employees = employeesRes.data;

      // Fetch all attendance records
      const attendancePromises = employees.map((emp) =>
        api.get(`/attendance/${emp.employee_id}`).catch(() => ({ data: [] }))
      );
      const attendanceResults = await Promise.all(attendancePromises);

      // Calculate statistics
      let totalRecords = 0;
      let todayPresent = 0;
      let todayAbsent = 0;
      const today = new Date().toISOString().split("T")[0];

      const employeeStats = employees.map((emp, index) => {
        const records = attendanceResults[index].data.data || attendanceResults[index].data || [];
        totalRecords += records.length;

        const presentCount = records.filter((r) => r.status === "Present").length;
        const absentCount = records.filter((r) => r.status === "Absent").length;

        // Today's attendance
        const todayRecord = records.find((r) => r.date === today);
        if (todayRecord) {
          if (todayRecord.status === "Present") todayPresent++;
          else todayAbsent++;
        }

        return {
          employee_id: emp.employee_id,
          full_name: emp.full_name,
          department: emp.department,
          presentDays: presentCount,
          absentDays: absentCount,
          totalDays: records.length,
        };
      });

      // Sort by present days and get top 5
      const topFive = employeeStats
        .sort((a, b) => b.presentDays - a.presentDays)
        .slice(0, 5);

      setStats({
        totalEmployees: employees.length,
        totalAttendanceRecords: totalRecords,
        todayPresent,
        todayAbsent,
      });
      setTopEmployees(topFive);
    } catch (error) {
      console.error("Error loading dashboard:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Employees"
          value={stats.totalEmployees}
          icon="👥"
          color="bg-blue-500"
        />
        <StatCard
          title="Total Attendance Records"
          value={stats.totalAttendanceRecords}
          icon="📊"
          color="bg-purple-500"
        />
        <StatCard
          title="Present Today"
          value={stats.todayPresent}
          icon="✅"
          color="bg-green-500"
        />
        <StatCard
          title="Absent Today"
          value={stats.todayAbsent}
          icon="❌"
          color="bg-red-500"
        />
      </div>

      {/* Top Employees Table */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Top Employees by Attendance</h2>
        {topEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-800 text-white">
                <tr>
                  <th className="py-3 px-4 text-left">Employee ID</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Department</th>
                  <th className="py-3 px-4 text-center">Present Days</th>
                  <th className="py-3 px-4 text-center">Absent Days</th>
                  <th className="py-3 px-4 text-center">Total Days</th>
                  <th className="py-3 px-4 text-center">Attendance %</th>
                </tr>
              </thead>
              <tbody>
                {topEmployees.map((emp, index) => {
                  const attendancePercent =
                    emp.totalDays > 0
                      ? ((emp.presentDays / emp.totalDays) * 100).toFixed(1)
                      : 0;
                  return (
                    <tr
                      key={emp.employee_id}
                      className={`border-b hover:bg-gray-50 transition ${
                        index === 0 ? "bg-yellow-50" : ""
                      }`}
                    >
                      <td className="py-3 px-4">{emp.employee_id}</td>
                      <td className="py-3 px-4 font-medium">{emp.full_name}</td>
                      <td className="py-3 px-4">{emp.department}</td>
                      <td className="py-3 px-4 text-center text-green-600 font-semibold">
                        {emp.presentDays}
                      </td>
                      <td className="py-3 px-4 text-center text-red-600 font-semibold">
                        {emp.absentDays}
                      </td>
                      <td className="py-3 px-4 text-center">{emp.totalDays}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`px-2 py-1 rounded ${
                            attendancePercent >= 90
                              ? "bg-green-100 text-green-800"
                              : attendancePercent >= 75
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {attendancePercent}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center py-8">
            No attendance data available
          </p>
        )}
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
      <div className={`${color} text-white text-4xl p-4 rounded-full`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
      </div>
    </div>
  );
}