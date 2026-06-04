import { Link } from "react-router-dom";

export default function Sidebar() {
  const role = localStorage.getItem("role");

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        CRM Dashboard
      </h1>

      <div className="space-y-4">

        <Link
          to="/dashboard"
          className="block hover:text-blue-400"
        >
          Dashboard
        </Link>

        {role === "admin" && (
          <Link
            to="/customers"
            className="block hover:text-blue-400"
          >
            Customers
          </Link>
        )}

        <Link
          to="/leads"
          className="block hover:text-blue-400"
        >
          Leads
        </Link>
      </div>
    </div>
  );
}