import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [convertedLeads, setConvertedLeads] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [customersRes, leadsRes] = await Promise.all([
          api.get("/customers"),
          api.get("/leads"),
        ]);

        const customersData = Array.isArray(customersRes.data) ? customersRes.data : [];
        const leadsData = Array.isArray(leadsRes.data) ? leadsRes.data : [];

        setCustomers(customersData);
        setLeads(leadsData);
        setConvertedLeads(leadsData.filter((lead) => lead.status === "Converted"));
      } catch (err) {
        console.error("Dashboard load error", err);
      }
    };

    fetchData();
  }, []);

  const renderList = (items, labelField) => {
    if (!Array.isArray(items) || items.length === 0) {
      return <div className="text-sm text-gray-500">No items found</div>;
    }

    return (
      <ul className="space-y-2 list-disc list-inside">
        {items.map((item) => (
          <li key={item._id || item.email || item.customerName || item.name}>
            {labelField ? item[labelField] : item.name || item.customerName || item.email}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-6">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Customers</h2>
          {renderList(customers, "name")}
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Leads</h2>
          {renderList(leads, "customerName")}
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Converted</h2>
          {renderList(convertedLeads, "customerName")}
        </section>
      </div>

    </div>
  );
}