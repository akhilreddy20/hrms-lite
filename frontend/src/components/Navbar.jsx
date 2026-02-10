import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-slate-900 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-bold">HRMS Lite</h1>
      <div className="space-x-6 text-lg">
        <Link
          to="/"
          className="hover:underline hover:text-yellow-300 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/employees"
          className="hover:underline hover:text-yellow-300 transition"
        >
          Employees
        </Link>
        <Link
          to="/attendance"
          className="hover:underline hover:text-yellow-300 transition"
        >
          Attendance
        </Link>
      </div>
    </nav>
  );
}