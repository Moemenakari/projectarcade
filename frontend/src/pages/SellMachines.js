import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";

const SellMachines = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState([]);
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const user = storedData ? JSON.parse(storedData) : null;
    if (!user || !user.username) {
      navigate("/login");
    }
  }, [navigate]);

  const loadProduct = async () => {
    try {
      const res = await fetch("/api/product");

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
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-4">
          Buy Arcade Machines
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Browse our selection of high-quality arcade machines available for
          purchase.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {product.map((pro) => (
            //maapp hata naaml list
            <div
              key={pro.id}
              className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200 transform hover:scale-[1.02] transition duration-300 relative"
            >
              {/*  call mn file products  */}
              <img
                src={`/uploads/${pro.image}`}
                alt={pro.name}
                className="w-full h-56 object-cover"
              />

              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {pro.name}
                </h2>
                <p className="text-3xl font-extrabold text-red-600 mb-4">
                  $ {pro.sale_price.toLocaleString()}{" "}
                </p>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {" "}
                  {pro.description}{" "}
                </p>

                <div className="flex justify-between text-xs text-gray-500 mb-4">
                  <span>
                    Category:
                    <span className="font-semibold">{pro.category}</span>
                  </span>
                  <span>
                    Power:{" "}
                    <span className="font-semibold">{pro.power}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default SellMachines;
