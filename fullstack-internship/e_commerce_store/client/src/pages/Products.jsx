import { useEffect, useState } from "react";
import api from "../api/api";
import { useCart } from "../context/CartContext";
const BACKEND_URL = process.env.BACKEND_URL;

export default function Products() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState({ name: "", price: "", description: "" });
  const [selectedFile, setSelectedFile] = useState(null);
  const { addToCart } = useCart(); // <-- Cart context here

  // Load products
  const fetchProducts = async () => {
    try {
      const res = await api.get("/product/get");
      setProducts(res.data);
    } catch (err) {
      alert("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && !file.type.startsWith("image/")) {
      alert("Please select a valid image file.");
      return;
    }
    setSelectedFile(file);
  };

  // Create or update product
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("description", form.description);
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      if (editingProduct) {
        await api.put(`/product/update/${editingProduct._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product updated");
      } else {
        await api.post("/product/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Product created");
      }
      setForm({ name: "", price: "", description: "" });
      setSelectedFile(null);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      alert("Failed to save product");
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await api.delete(`/product/delete/${id}`);
      fetchProducts();
    } catch (err) {
      alert("Failed to delete");
    }
  };

  // Edit product
  const editProduct = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
    });
    setSelectedFile(null);
  };

  return (
    <div style={{ maxWidth: 800, margin: "auto", padding: 20 }}>
      <h2>{editingProduct ? "Edit Product" : "Create Product"}</h2>
      <form onSubmit={submitHandler} style={{ marginBottom: 40 }}>
        <input
          required
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="number"
          required
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={3}
          style={{ width: "100%", marginBottom: 10 }}
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{ width: "100%", marginBottom: 10 }}
        />
        {editingProduct && editingProduct.image && (
          <div style={{ marginBottom: 10 }}>
            <p>Current Image:</p>
            <img
              src={`${{BACKEND_URL}}${editingProduct.image}`}
              alt="Current"
              style={{ width: 100, height: 100, objectFit: "cover" }}
            />
          </div>
        )}
        <button type="submit" style={{ marginRight: 10 }}>
          {editingProduct ? "Update" : "Create"}
        </button>
        {editingProduct && (
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setForm({ name: "", price: "", description: "" });
              setSelectedFile(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <h2>Product List</h2>
      {products.length === 0 && <p>No products found</p>}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 20,
        }}
      >
        {products.map((p) => (
          <div
            key={p._id}
            style={{ border: "1px solid #ccc", padding: 10, borderRadius: 6 }}
          >
            {p.image && (
              <img
                src={`http://localhost:5000${p.image}`}
                alt={p.name}
                style={{ width: "100%", height: 150, objectFit: "cover" }}
              />
            )}
            <h4>{p.name}</h4>
            <p>${p.price}</p>
            <p>{p.description}</p>
            <div style={{ marginBottom: 10 }}>
              <button
                onClick={() => editProduct(p)}
                style={{ marginRight: 10 }}
              >
                Edit
              </button>
              <button onClick={() => deleteProduct(p._id)}>Delete</button>
            </div>
            {/* Add to Cart button */}
            <button
              onClick={() => addToCart(p._id)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                borderRadius: 4,
              }}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
