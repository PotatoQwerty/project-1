"use client";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "../../../../../context/AuthContext";
import { updateProduct } from "../../../../../utils/api";

export default function ProductEditor() {
  const { id } = useParams();
  const { products, setProducts } = useAuth();
  const [idProduct, setIdProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    price: 0,
    description: "",
  });

  useEffect(() => {
    if (products && id) {
      const found = products.find(
        (product) => product.id === Number(id) //  making  sure to compare same types
        // since useparams returns a strign
      );
      if (found) {
        setIdProduct(found);
        setFormData({
          title: found.title,
          price: found.price,
          description: found.description,
        });
        setLoading(false);
      }
    }
  }, [products, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate product update
    try {
      const res = await updateProduct(id, formData);
      if (res !== 200) {
        throw new Error("Failed to update product");
      }

      setProducts((prev) =>
        prev.map((product) =>
          product.id === Number(id) ? { ...product, ...formData } : product
        )
      );

      alert("Product updated successfully! (Changes are local only)");
    } catch (e) {
      alert("Failed to update product");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-3xl mx-auto space-y-4">
      <div>
        <label className="block mb-1 font-semibold">Title:</label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <div>
        <label className="block mb-1 font-semibold">Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Update Product
      </button>
    </form>
  );
}
