import { useEffect, useState } from "react";
import api from "../services/api";

const Leads = () => {

  const [leads, setLeads] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [statusFilter,
    setStatusFilter] =
    useState("");

  const [formData,
    setFormData] =
    useState({
      customerName: "",
      status: "New",
    });

  const [editId,
    setEditId] =
    useState(null);

  const fetchLeads =
    async () => {

      const res =
        await api.get("/leads");

      if (Array.isArray(res.data)) {
        setLeads(res.data);
      } else if (Array.isArray(res.data.leads)) {
        setLeads(res.data.leads);
      } else if (Array.isArray(res.data.data)) {
        setLeads(res.data.data);
      } else {
        setLeads([]);
      }
    };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      if (editId) {

        await api.put(
          `/leads/${editId}`,
          formData
        );

      } else {

        await api.post(
          "/leads",
          formData
        );

      }

      setFormData({
        customerName: "",
        status: "New",
      });

      setEditId(null);

      fetchLeads();
    };

  const handleEdit =
    (lead) => {

      setEditId(lead._id);

      setFormData({
        customerName:
          lead.customerName,
        status:
          lead.status,
      });
    };

  const handleDelete =
    async (id) => {

      if (
        !window.confirm(
          "Delete Lead?"
        )
      )
        return;

      await api.delete(
        `/leads/${id}`
      );

      fetchLeads();
    };

  const filteredLeads =
    leads.filter((lead) => {

      const matchesSearch =
        lead.customerName
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesStatus =
        statusFilter === ""
          ? true
          : lead.status ===
            statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });

  return (
    <div>

      <div className="flex justify-between mb-6">

        <h1 className="text-3xl font-bold">
          Leads
        </h1>

        <div className="flex gap-3">

          <input
            placeholder="Search..."
            className="border px-4 py-2 rounded"
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
          />

          <select
            className="border px-4 py-2 rounded"
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
          >
            <option value="">
              All
            </option>

            <option>
              New
            </option>

            <option>
              Contacted
            </option>

            <option>
              Qualified
            </option>

            <option>
              Converted
            </option>

          </select>

        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-6">

        <form
          onSubmit={handleSubmit}
          className="grid md:grid-cols-3 gap-4"
        >

          <input
            placeholder="Customer Name"
            className="border p-2 rounded"
            value={
              formData.customerName
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                customerName:
                  e.target.value,
              })
            }
          />

          <select
            className="border p-2 rounded"
            value={
              formData.status
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                status:
                  e.target.value,
              })
            }
          >
            <option>
              New
            </option>

            <option>
              Contacted
            </option>

            <option>
              Qualified
            </option>

            <option>
              Converted
            </option>

          </select>

          <button
            className="bg-blue-600 text-white rounded"
          >
            {editId
              ? "Update Lead"
              : "Add Lead"}
          </button>

        </form>

      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>

              <th className="p-3">
                Customer
              </th>

              <th className="p-3">
                Status
              </th>

              <th className="p-3">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredLeads.map(
              (lead) => (

                <tr
                  key={lead._id}
                  className="border-t"
                >

                  <td className="p-3">
                    {
                      lead.customerName
                    }
                  </td>

                  <td className="p-3">

                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">

                      {lead.status}

                    </span>

                  </td>

                  <td className="p-3">

                    <button
                      onClick={() =>
                        handleEdit(
                          lead
                        )
                      }
                      className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          lead._id
                        )
                      }
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Leads;