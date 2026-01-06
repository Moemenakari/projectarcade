import { useState, useEffect } from "react";
import API_URL from "../../config";
import { Trash2 } from "lucide-react";

const Contact = () => {
  const [contacts, setContacts] = useState([]);

  const loadContacts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/contact`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setContacts(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error loading contacts:", error);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB") + " " + date.toLocaleTimeString("en-GB");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this message?")) {
      try {
        const response = await fetch(`${API_URL}/api/contact/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          loadContacts();
        } else {
          alert("Failed to delete message");
        }
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Contact Messages
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
                  Subject
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Message
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Date
                </th>
                <th className="py-4 px-6 font-semibold text-gray-700 whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-6 whitespace-nowrap">#{contact.id}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{contact.name}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{contact.email}</td>
                  <td className="py-4 px-6 whitespace-nowrap">{contact.subject}</td>
                  <td className="py-4 px-6 max-w-md">
                    <div className="line-clamp-2">{contact.message}</div>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {formatDate(contact.created_at)}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <button
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                      onClick={() => handleDelete(contact.id)}
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

export default Contact;
