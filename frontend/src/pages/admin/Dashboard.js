import { Users, MessageSquare, ShoppingCart, Package } from "lucide-react";
import API_URL from "../../config";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const user = storedData ? JSON.parse(storedData) : null;
    if (!user || !user?.is_admin) {
      navigate("/");
    }
  }, [navigate]);
  const [statsProduct, setStatsProduct] = useState({
    productsCount: 0,
  });
  const [statsUser, setStatsUser] = useState({
    usersCount: 0,
  });
  const [statsOrder, setStatsOrder] = useState({
    rentalOrderCount: 0,
  });
  const [messages, setMessages] = useState({
    messagesCount: 0,
  });

  const fetchStatsProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats/product`);

      if (response.ok) {
        const data = await response.json();
        setStatsProduct(data);
      } else {
        console.error("Failed to fetch stats");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };
  const fetchStatsUser = async () => {
    try {
      const response = await fetch(`${API_URL}/api/stats/user`);

      if (response.ok) {
        const data = await response.json();
        setStatsUser(data);
      } else {
        console.error("Failed to fetch stats");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };
  const fetchStatsOrder = async () => {
    try {
      const response = await fetch(
        "/api/stats/rentalOrder"
      );

      if (response.ok) {
        const data = await response.json();
        setStatsOrder(data);
      } else {
        console.error("Failed to fetch stats");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };
  const fetchMessagesCount = async () => {
    try {
      const response = await fetch(`${API_URL}/api/contact`);
      if (response.ok) {
        const data = await response.json();
        setMessages({ messagesCount: data.length });
      } else {
        console.error("Failed to fetch messages");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
    }
  };
  useEffect(() => {
    fetchStatsProduct();
    fetchStatsUser();
    fetchStatsOrder();
    fetchMessagesCount();
  }, []);
  const [orders, setOrders] = useState([]);
  const loadRentalOrder = async () => {
    try {
      const res = await fetch(`${API_URL}/api/rentalOrder`);

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

  return (
    <div>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Messages</p>
              <p className="text-3xl font-bold mt-2">
                {messages.messagesCount}
              </p>
            </div>
            <MessageSquare className="w-12 h-12 text-blue-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Orders</p>
              <p className="text-3xl font-bold mt-2">
                {statsOrder.rentalOrderCount}
              </p>
            </div>
            <ShoppingCart className="w-12 h-12 text-green-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Products</p>
              <p className="text-3xl font-bold mt-2">
                {statsProduct.productsCount}
              </p>
            </div>
            <Package className="w-12 h-12 text-purple-200" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Users</p>
              <p className="text-3xl font-bold mt-2">{statsUser.usersCount}</p>
            </div>
            <Users className="w-12 h-12 text-orange-200" />
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Orders</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Name
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Email
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Type
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  StartDate
                </th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 5).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-3 px-4">{order.name}</td>
                  <td className="py-3 px-4">{order.email}</td>
                  <td className="py-3 px-4">{order.machine_type}</td>
                  <td className="py-3 px-4 font-semibold">{formatDate(order.start_date)}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {order.status}
                    </span>
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
export default Dashboard;
