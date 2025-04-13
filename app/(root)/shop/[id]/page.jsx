"use client";

import React, { useEffect, useState } from "react";
import ProductCard from "../../../../components/ProductCard";
import { images } from "../../../../constants/Images";
import { useAuth } from "../../../../context/AuthContext";
import { useParams } from "next/navigation";

function CategoryPage() {
  // getting the id from the url using useParams hook
  // this id is the category name
  const { id } = useParams();
  // getting the products from the context using useAuth hook (well it shouldnt be in
  // the authcontext but in a product context but for now its fine for this project
  // as fakestoreapi is readonly)
  const { products } = useAuth();
  const [catProducts, setCatProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // this isnt the best way to do it but in this project now its fine
  const categoryImages = {
    "women's clothing": images.Womens,
    "men's clothing": images.Mens,
    accessories: images.Accessories,
    jewelery: images.Jewelery,
    electronics: images.Electronics,
  };

  const decodedId = decodeURIComponent(id);
  const img = categoryImages[decodedId];

  useEffect(() => {
    if (!products || products.length === 0) return;
    // here im getting only the products that belong to the category
    // by filtering the products array and checking if the category of the product is
    //  equal to the id from the url
    const filtered = products.filter(
      (product) => product.category === decodedId
    );
    setCatProducts(filtered);
    setLoading(false);
  }, [id, products]);
  // the dependency array is set to [id, products] so that the useEffect will run
  // whenever the id or products change
  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-white">
      {loading ? (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-secondary">
          <h1 className="text-4xl font-semibold text-primary">Loading...</h1>
        </div>
      ) : catProducts.length > 0 ? (
        <div className="w-full">
          <div className="relative w-full h-64 sm:h-80 lg:h-96">
            <img
              src={img}
              alt={`${decodedId} category`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">
                Shop for all items in the category {decodedId}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-6 max-w-7xl mx-auto">
            {catProducts.map((product) => (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                description={product.description}
                image={product.image}
                rating={product.rating}
                id={product.id}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-secondary">
          <h1 className="text-2xl font-semibold text-primary">
            No products found in this category.
          </h1>
        </div>
      )}
    </div>
  );
}

export default CategoryPage;
