import { useState, useEffect } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [products, setProducts] = useState([]);

  
  const [newProductForm, setNewProductForm] = useState({
    id: "",
    name: "",
    desc: "",
    price: "",
    imageURL: "",
  });

  const handleNewProductFormChange = (e) => {
    setNewProductForm({
      ...newProductForm,
      [e.target.name]: e.target.value,
    });
  };

  const fetchProducts = async () => {
    try {
      const apiRes = await axios.get("http://localhost:8000/products");
      setProducts(apiRes.data);
    } catch (err) {
      alert("Something went wrong");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  async function saveProduct(e) {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8000/products", newProductForm);

      alert("Product Saved Successfully ✅");

    
      setNewProductForm({
        id: "",
        name: "",
        desc: "",
        price: "",
        imageURL: "",
      });

      
      fetchProducts();

    } catch (err) {
      alert("Something went wrong");
    }
  }

 return (
  <div className="min-h-screen bg-slate-100 py-10 px-4">

    
    <h1 className="text-3xl font-bold text-center text-slate-800 mb-10">
      Product Management
    </h1>

    
    <div className="max-w-lg mx-auto bg-white rounded-xl shadow-md p-8 mb-12">
      <h2 className="text-xl font-semibold text-slate-700 mb-6 text-center">
        Add New Product
      </h2>

      <form onSubmit={saveProduct} className="space-y-5">

        <input
          type="text"
          name="id"
          placeholder="Product ID"
          value={newProductForm.id}
          onChange={handleNewProductFormChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={newProductForm.name}
          onChange={handleNewProductFormChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Product Price"
          value={newProductForm.price}
          onChange={handleNewProductFormChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <input
          type="text"
          name="imageURL"
          placeholder="Image URL"
          value={newProductForm.imageURL}
          onChange={handleNewProductFormChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <textarea
          name="desc"
          rows={4}
          placeholder="Product Description"
          value={newProductForm.desc}
          onChange={handleNewProductFormChange}
          className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2.5 rounded-lg font-medium transition duration-200"
        >
          Save Product
        </button>

      </form>
    </div>

    
    <div className="max-w-6xl mx-auto grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

      {products.map((pr) => (
        <div
          key={pr.id}
          className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 overflow-hidden"
        >
          <img
            src={pr.imageURL}
            alt={pr.name}
            className="w-full h-48 object-cover"
          />

          <div className="p-4">
            <h3 className="text-lg font-semibold text-slate-800">
              {pr.name}
            </h3>

            <p className="text-indigo-600 font-semibold mt-1">
              Rs {pr.price}
            </p>

            <p className="text-slate-600 text-sm mt-2">
              {pr.desc}
            </p>
          </div>
        </div>
      ))}

    </div>

  </div>
);
}

export default App;