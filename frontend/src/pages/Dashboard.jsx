import axios from "axios";
import { useEffect, useState } from "react";
import StatsCard from "../components/StatsCard";

export default function Dashboard() {

  const [stats, setStats] =
    useState({});

  useEffect(() => {

    axios
      .get(
        "http://localhost:5000/api/dashboard"
      )
      .then((res) =>
        setStats(res.data)
      );

  }, []);

  return (
    <div className="p-6">

      <div className="grid grid-cols-3 gap-4">

        <StatsCard
          title="Customers"
          value={stats.totalCustomers}
        />

        <StatsCard
          title="Leads"
          value={stats.totalLeads}
        />

        <StatsCard
          title="Converted"
          value={stats.convertedLeads}
        />

      </div>

    </div>
  );
}