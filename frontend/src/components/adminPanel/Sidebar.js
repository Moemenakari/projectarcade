import { Link,useNavigate } from "react-router-dom";
import { useState } from "react";
import { Users, Package, Home, ShoppingCart, LogOut,PartyPopper,HomeIcon } from "lucide-react";
const Sidebar = () => {
  const [currentView, setCurrentView] = useState("dashboard");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-xl">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav className="space-y-2">
          <Link to="">
            <button
              onClick={() => setCurrentView("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "dashboard"
                  ? "bg-blue-600"
                  : "hover:bg-gray-700"
              }`}
            >
              <Home className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
          </Link>
          <Link to="product">
            <button
              onClick={() => setCurrentView("products")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "products" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Package className="w-5 h-5" />
              <span>Products</span>
            </button>
          </Link>
          <Link to="order">
            <button
              onClick={() => setCurrentView("orders")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "orders" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Rental Orders</span>
            </button>
          </Link>
          <Link to="users">
            <button
              onClick={() => setCurrentView("users")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "users" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <Users className="w-5 h-5" />
              <span>Users</span>
            </button>
          </Link>
          <Link to="events">
            <button
              onClick={() => setCurrentView("events")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "events" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <PartyPopper className="w-5 h-5" />
              <span>Events</span>
            </button>
          </Link>
        </nav>
      </div>
      <div className="absolute bottom-0 w-full p-6">
        <Link to="/">
            <button
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentView === "" ? "bg-blue-600" : "hover:bg-gray-700"
              }`}
            >
              <HomeIcon className="w-5 h-5" />
              <span>Back To Home</span>
            </button>
          </Link>
        <button
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-700 transition-colors"
          onClick={logout}
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};
export default Sidebar;
