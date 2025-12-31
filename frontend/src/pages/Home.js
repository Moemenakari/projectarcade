import { useEffect,useState } from "react";
import API_URL from "../config";
import { Link } from "react-router-dom";
// Import all necessary images from the assets folder
import HeroImage from "../assets/hero_image.jpg";

// The Home page component
const Home = () => {
  const [product, setProduct] = useState([]);
  const loadProduct = async () => {
    try {
      const res = await fetch(`${API_URL}/api/product`);

      const data = await res.json();
      if (Array.isArray(data)) {
        setProduct(data);
      } else {
        console.error("Data is not an array:", data);
      }
    } catch (error) {
      console.error("Error loading products:", error);
    }
  };
  useEffect(() => {
    loadProduct();
  }, []);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 1. Hero Section -*/}
      <div className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        {/* Background Image  Effect */}
        <div
          className="absolute inset-0 bg-fixed bg-cover bg-center"
          style={{ backgroundImage: `url(${HeroImage})` }}
        ></div>

        {/* Dark Overlay and Content */}
        <div className="absolute inset-0 bg-black bg-opacity-60 flex flex-col justify-center items-center text-white p-4">
          {/* Main Headline */}
          <h1 className="text-4xl md:text-7xl font-black text-center tracking-tight drop-shadow-lg">
            <span className="text-yellow-400">#1</span> Arcade Zone in Lebanon
          </h1>

          {/* Secondary Message */}
          <p className="text-xl md:text-3xl font-light mt-4 text-center max-w-3xl">
            Transforming every event into an{" "}
            <span className="font-bold text-red-500">
              unforgettable gaming experience
            </span>
            .
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              to="/events"
              className="px-8 py-3 bg-red-600 text-white text-lg font-bold rounded-full hover:bg-red-700 transition duration-300 shadow-2xl uppercase transform hover:scale-105"
            >
              Book Your Festival Now
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Arcade Showcase - Featured Machines */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
            Our Top Arcade Machines
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Map through the featuredMachines array to display cards */}
            {product.slice(0,4).map((machine, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-[1.02] transition duration-300"
              >
                <img
                  src={`/uploads/${machine.image}`}
                  alt={machine.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-red-600 mb-2">
                    {machine.name}
                  </h3>
                  <p className="text-gray-600 text-sm">{machine.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Call to Action Banner - Final Push */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            Ready to Bring the Joy?
          </h2>
          <p className="text-xl mb-8 font-light">
            Contact us today to discuss your event or machine purchase.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
