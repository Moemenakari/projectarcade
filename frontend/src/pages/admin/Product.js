import { Plus, Edit2, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = localStorage.getItem("user");
    const user = storedData ? JSON.parse(storedData) : null;
    if (!user || !user?.is_admin) {
      navigate("/");
    }
  }, [navigate]);
  const [product, setProduct] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    sale_price: "",
    rental_price: "",
    stock: "",
    power: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataProduct = new FormData();
      dataProduct.append("name", formData.name);
      dataProduct.append("category", formData.category);
      dataProduct.append("sale_price", formData.sale_price);
      dataProduct.append("rental_price", formData.rental_price);
      dataProduct.append("stock", formData.stock);
      dataProduct.append("power", formData.power);
      dataProduct.append("description", formData.description);
      if (image) {
        dataProduct.append("image", image);
      }
      const response = await fetch("http://localhost:5000/api/addProduct", {
        method: "POST",
        body: dataProduct,
      });

      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: "",
          category: "",
          sale_price: "",
          rental_price: "",
          stock: "",
          power: "",
          description: "",
        });
        setImage(null);
        alert("Added Successful!");
        loadProduct();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };
  const loadProduct = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/product");

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

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        const response = await fetch(
          "http://localhost:5000/api/product/" + id,
          {
            method: "DELETE",
          }
        );
        if (response.ok) {
          loadProduct();
        } else {
          alert("Failed To Delete Item");
        }
      } catch (error) {
        console.error("Error Deleting product:", error);
      }
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const id = editingProduct.id;

    const data = new FormData();
    data.append("name", editingProduct.name);
    data.append("category", editingProduct.category);
    data.append("sale_price", editingProduct.sale_price);
    data.append(
      "rental_price",
      editingProduct.rentel_price || editingProduct.rental_price
    );
    data.append("stock", editingProduct.stock);
    data.append("description", editingProduct.description || "");
    data.append("power", editingProduct.power || "");
    if (editingProduct.image instanceof File) {
      data.append("image", editingProduct.image);
    }

    try {
      const response = await fetch(`http://localhost:5000/api/update/${id}`, {
        method: "PUT",
        body: data,
      });

      if (response.ok) {
        alert("Product updated successfully!");
        setEditingProduct(null);
        loadProduct();
      } else {
        const errorData = await response.json();
        alert("Failed to update: " + errorData.message);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Product Management</h2>
        <button
          onClick={() => setIsAddingProduct(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add New Product
        </button>
      </div>

      {isAddingProduct && (
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 mb-4">New Product</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="sale_price"
              placeholder="Sale Price"
              value={formData.sale_price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="rental_price"
              placeholder="Rental Price"
              value={formData.rental_price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              name="stock"
              placeholder="Stock Quantity"
              value={formData.stock}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="file"
              name="image"
              onChange={handleImageChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              name="power"
              placeholder="Power"
              value={formData.power}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              name="description"
              placeholder="Product Description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 md:col-span-2 resize-none"
            ></textarea>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
              onClick={handleSubmit}
            >
              Add Product
            </button>
            <button
              onClick={() => setIsAddingProduct(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {product.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {product.name}
                </h3>
                <p className="text-gray-500 text-sm">{product.category}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProduct({ ...product })}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(product.id)}
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-700">
                Sale Price:{" "}
                <span className="font-semibold">${product.sale_price}</span>
              </p>
              <p className="text-gray-700">
                Rental Price:{" "}
                <span className="font-semibold">${product.rentel_price}</span>
              </p>
              <p className="text-gray-700">
                Stock: <span className="font-semibold">{product.stock}</span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Edit Product
            </h3>

            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={editingProduct.name}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Sale Price"
                  value={editingProduct.sale_price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      sale_price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Rental Price"
                  value={editingProduct.rentel_price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      rentel_price: parseFloat(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: parseInt(e.target.value),
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Power"
                  value={editingProduct.power || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      power: e.target.value,
                    })
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                  placeholder="Description"
                  value={editingProduct.description || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      description: e.target.value,
                    })
                  }
                  rows="3"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="border border-gray-300 rounded-lg p-2">
                  <p className="text-xs text-gray-500 mb-1">
                    Update Image (Optional)
                  </p>
                  <input
                    type="file"
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        image: e.target.files[0],
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Product;
