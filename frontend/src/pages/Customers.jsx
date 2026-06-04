import { useEffect, useState } from "react";
import api from "../services/api";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await api.get("/customers");

      console.log("Customers API Response:", res.data);

      if (Array.isArray(res.data)) {
        setCustomers(res.data);
      } else if (Array.isArray(res.data.customers)) {
        setCustomers(res.data.customers);
      } else if (Array.isArray(res.data.data)) {
        setCustomers(res.data.data);
      } else {
        setCustomers([]);
      }
    } catch (error) {
      console.error(error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await api.put(
          `/customers/${editId}`,
          formData
        );
      } else {
        await api.post(
          "/customers",
          formData
        );
      }

      setFormData({
        name: "",
        email: "",
        phone: "",
      });

      setEditId(null);

      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (customer) => {
    setEditId(customer._id);

    setFormData({
      name: customer.name || "",
      email: customer.email || "",
      phone: customer.phone || "",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this customer?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(`/customers/${id}`);
      fetchCustomers();
    } catch (error) {
      console.error(error);
    }
  };

  const filteredCustomers = Array.isArray(customers)
    ? customers.filter((customer) =>
        customer?.name
          ?.toLowerCase()
          .includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <h1 className="text-3xl font-bold">
          Customer Management
        </h1>

        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="border border-gray-300 px-4 py-2 rounded-lg w-72"
        />

      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-xl shadow mb-8">

        <h2 className="text-xl font-semibold mb-4">

          {editId
            ? "Update Customer"
            : "Add Customer"}

        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >

          <input
            type="text"
            name="name"
            placeholder="Customer Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Customer Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded-lg"
            required
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
          >
            {editId
              ? "Update Customer"
              : "Add Customer"}
          </button>

        </form>

      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">

        <div className="p-4 border-b">

          <h2 className="font-semibold">
            Customer List
          </h2>

        </div>

        {loading ? (
          <div className="p-8 text-center">
            Loading...
          </div>
        ) : (
          <table className="w-full">

            <thead className="bg-gray-100">

              <tr>

                <th className="p-4 text-left">
                  Name
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(
                  (customer) => (
                    <tr
                      key={customer._id}
                      className="border-t hover:bg-gray-50"
                    >

                      <td className="p-4">
                        {customer.name}
                      </td>

                      <td className="p-4">
                        {customer.email}
                      </td>

                      <td className="p-4">
                        {customer.phone}
                      </td>

                      <td className="p-4 text-center">

                        <button
                          onClick={() =>
                            handleEdit(customer)
                          }
                          className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              customer._id
                            )
                          }
                          className="bg-red-500 text-white px-3 py-1 rounded"
                        >
                          Delete
                        </button>

                      </td>

                    </tr>
                  )
                )
              ) : (
                <tr>

                  <td
                    colSpan="4"
                    className="text-center p-8 text-gray-500"
                  >
                    No Customers Found
                  </td>

                </tr>
              )}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
};

export default Customers;