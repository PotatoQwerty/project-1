"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { fetchProducts } from "../../../utils/api";
import { useDebounce } from "use-debounce";
function Page() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  // here i'm using the useDebounce hook to debounce the search input for 500ms
  // this is to prevent the search input from being triggered too many times while typing because in normal
  // cases the user will type fast and this will cause the search input to be triggered too many times which can use
  // a lot of resources and cause performance issues
  const [debouncedSearch] = useDebounce(search, 500);
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        if (!data) {
          throw new Error("Something went wrong while fetching data");
        }
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);
  // here i'm filtering the products based on the category and the search input
  const filteredProducts = products
    .filter((product) => !filter || product.category === filter)
    .filter((product) =>
      !debouncedSearch
        ? true
        : product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  return (
    <div className="w-full h-full p-6 flex gap-6">
      {/* Sidebar Filters */}
      <div className="w-1/4 p-4 bg-white shadow-lg rounded-xl">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Filters</h2>

        {/* Search Input */}
        <input
          type="text"
          placeholder="Search items..."
          className="w-full h-12 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Category Filter */}
        <select
          name="filter"
          id="filter"
          className="w-full mt-4 h-12 px-4 border rounded-lg shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="" hidden>
            Filter by category...
          </option>
          <option value="">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="jewelery">Jewelery</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
        </select>
      </div>

      {/* Product List */}
      <div className="w-3/4">
        {loading ? (
          <div className="flex justify-center items-center h-full">
            <h1 className="text-5xl text-gray-700">Loading...</h1>
          </div>
        ) : (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                id={product.id}
                key={product.id}
                title={product.title}
                image={product.image}
                price={product.price}
                rating={product.rating}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
