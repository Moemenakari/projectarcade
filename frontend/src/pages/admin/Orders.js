import { useState, useEffect } from "react";
import API_URL from "../config";
import { Trash2 } from "lucide-react";
const Orders = () => {;
  const [orders, setOrders] = useState([]);
  const loadRentalOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/api/rentalOrder");

      const data = await res.json();
      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };
  useEffect(() => {
    loadRentalOrder();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };

  const updateStatus = async (id, newStatus) => {
    const previousOrders = [...orders];
    setOrders(
      orders.map((o) => (o.id === id ? { ...o, status: newStatus } : o))
    );
    try {
      const response = await fetch(`${API_URL}/api/updateStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update in database");
      }

      console.log("Status updated successfully in DB");
    } catch (error) {
      console.error("Error updating status:", error);
      setOrders(previousOrders);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(
          "/api/rentalOrder/" + id,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          loadRentalOrder();
        } else {
          alert("Failed To Delete Item");
        }
      } catch (error) {
        console.error("Error Deleting order:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Rental Order Management
      </h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden w-full max-w-[85vw] lg:max-w-[calc(100vw-18rem)] mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  ID
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Name
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Email
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Phone
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Machine
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  StartDate
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  EndDate
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Location
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Status
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap">#{order.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{order.phone}</td>
                  <td className="py-4 px-6 font-semibold whitespace-nowrap">
                    {order.machine_type}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {formatDate(order.start_date)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {formatDate(order.end_date)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {order.location}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <select
                      value={order.status}
                      onChange={(e) => updateStatus(order.id, e.target.value)}
                      className={`px-3 py-1 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer
                        ${
                          order.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : order.status === "Shipping"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                      onClick={()=>handleDelete(order.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default Orders;
