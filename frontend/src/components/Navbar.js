import React, { useState, } from "react";
import { Link,useNavigate } from "react-router-dom";
import logo from "../assets/logonextlevelgame.jpg";

const Navbar = () => {
  // State for managing the mobile menu visibbility
  const [isOpen, setIsOpen] = useState(false);
  const IsLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };
  const StoredData = localStorage.getItem("user");
  const user = StoredData ? JSON.parse(StoredData) : null;

  const navLinks = [
    { title: "Home", url: "/" },
    { title: "Events", url: "/events" },
    { title: "Sell Machines", url: "/sellmachines" },
    { title: "Rent Machines", url: "/rentmachines" },
    { title: "About Us", url: "/aboutus" },
    { title: "Contact Us", url: "/contactus" },
  ];

  return (
    <nav className="bg-gray-900 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo/ Name */}
        <Link to="/" className="flex items-center space-x-3">
          <img
            src={logo}
            alt="Arcade Lebanon Logo"
            className="h-10 w-10 rounded-full object-cover"
          />
          <span className="text-white text-2xl font-bold">
            Next Level Games
          </span>
        </Link>

        {/*  Navigation Links */}
        {!IsLoggedIn ? (
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.url}
                className="text-white hover:text-yellow-400 transition duration-300 text-lg"
              >
                {link.title}
              </Link>
            ))}

            {/*  Login Button */}
            <Link
              to="/login"
              className="px-4 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition duration-300 shadow-md"
            >
              Login / Register
            </Link>
          </div>
        ) : IsLoggedIn && user?.is_admin ? (
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.url}
                className="text-white hover:text-yellow-400 transition duration-300 text-lg"
              >
                {link.title}
              </Link>
            ))}
            <button>
              <Link
                to="/admin"
                className="px-4 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition duration-300 shadow-md"
              >
                Admin
              </Link>
            </button>
          </div>
        ) : (
          <div className="hidden md:flex space-x-8 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.url}
                className="text-white hover:text-yellow-400 transition duration-300 text-lg"
              >
                {link.title}
              </Link>
            ))}
            <button onClick={logout}>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition duration-300 shadow-md"
              >
                Logout
              </Link>
            </button>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.url}
              className="block text-white hover:text-yellow-400 transition duration-300 text-lg p-2 rounded"
              onClick={() => setIsOpen(false)} // Close menu on click
            >
              {link.title}
            </Link>
          ))}
          <Link
            to="/login"
            className="block px-4 py-2 rounded-full bg-red-600 text-white font-bold hover:bg-red-700 transition duration-300 shadow-md text-center mt-2"
            onClick={() => setIsOpen(false)}
          >
            Login / Register
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
