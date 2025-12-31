import { useState,useEffect } from "react";
import { Trash2 } from "lucide-react";
const Users = () => {
  const [users, setUsers] = useState([]);
  const loadUsers = async () => {
    try {
      const res = await fetch("/api/users");

      const data = await res.json();
      if (Array.isArray(data)) {
        setUsers(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(
          "/api/users/" + id,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          loadUsers();
        } else {
          alert("Failed To Delete Item");
        }
      } catch (error) {
        console.error("Error Deleting product:", error);
      }
    }
  };
  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">User Management</h2>
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  ID
                </th>
                <th className="text-left py-4 px-6 font-semibold text-gray-700">
                  Name
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">#{user.id}</td>
                  <td className="py-4 px-6">{user.username}</td>
                  <td className="py-4 px-6">
                    <button className="text-red-600 hover:text-red-800" onClick={()=>handleDelete(user.id)}>
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
export default Users;
