"use client";
import React, { useState } from "react";
import ProductCard from "../../../components/ProductCard";
import { useDebounce } from "use-debounce";
import { useAuth } from "../../../context/AuthContext";

function Page() {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");
  const { products } = useAuth();

  // Debounce the search input for 500ms as it saves ressources in some cases but this
  // time we're just
  const [debouncedSearch] = useDebounce(search, 500);

  // filter products based on category and search input
  const filteredProducts = products
    .filter((product) => !filter || product.category === filter)
    .filter((product) =>
      !debouncedSearch
        ? true
        : product.title.toLowerCase().includes(debouncedSearch.toLowerCase())
    );

  return (
    <div className="w-full h-full p-6 flex gap-6">
      <div className="w-1/4 p-4 bg-white shadow-lg rounded-xl hidden md:block">
        <h2 className="text-xl font-bold mb-4 text-gray-700">Filters</h2>

        <input
          type="text"
          placeholder="Search items..."
          className="w-full h-12 px-4 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

      <div className="w-3/4">
        {products.length === 0 ? (
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
