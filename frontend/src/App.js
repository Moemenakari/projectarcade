import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Events from "./pages/Events";
import AboutUs from "./pages/AboutUs";
import SellMachines from "./pages/SellMachines";
import RentMachines from "./pages/RentMachines";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Sidebar from "./components/adminPanel/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import Product from "./pages/admin/Product";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Event from "./pages/admin/Event"

function App() {
  const MainLayout = () => {
    return (
      <>
        <Navbar />
        <div className="min-h-screen">
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };

  const AdminLayout = () => {
    return (
      <div className="flex min-h-screen bg-gray-100 overflow-x-hidden">
        <Sidebar />
        <div className="ml-80 p-4 w-[calc(100vw-20rem)]">
          <Outlet />
        </div>
      </div>
    );
  };
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sellmachines" element={<SellMachines />} />
          <Route path="/rentmachines" element={<RentMachines />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="product" element={<Product />} />
          <Route path="order" element={<Orders />} />
          <Route path="users" element={<Users />} />
          <Route path="events" element={<Event/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
