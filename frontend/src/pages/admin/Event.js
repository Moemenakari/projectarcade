import { useState, useEffect } from "react";
import API_URL from "../config";
import { Trash2 } from "lucide-react";
const Event = () => {
  const [events, setEvents] = useState([]);
  const loadEvent = async () => {
    try {
      const res = await fetch(`${API_URL}/api/event");

      const data = await res.json();
      if (Array.isArray(data)) {
        setEvents(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };
  useEffect(() => {
    loadEvent();
  }, []);
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB");
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(`${API_URL}/api/event/" + id, {
          method: "DELETE",
        });
        if (response.ok) {
          loadEvent();
        } else {
          alert("Failed To Delete Item");
        }
      } catch (error) {
        console.error("Error Deleting Event:", error);
      }
    }
  };
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Event Management
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
                  MachineType
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Date
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Attendee
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Price
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Note
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap">#{event.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.phone}</td>
                  <td className="py-4 px-6 font-semibold whitespace-nowrap">
                    {event.type}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {formatDate(event.date)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {event.attendee}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.price}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{event.note}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                      onClick={() => handleDelete(event.id)}
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

export default Event;
