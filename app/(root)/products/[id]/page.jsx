"use client";
import React, { useEffect, useState, use } from "react";
import ProductDetails from "../../../../components/ProductDetails";
import { fetchProductById } from "../../../../utils/api";
import { useAuth } from "../../../../context/AuthContext";
function page({ params }) {
  const { id } = use(params);
  const { products } = useAuth();
  // a state to handle the loading state to ensure that data is fetched before rendering components
  const [loading, setLoading] = useState(true);
  // a state to handle the product data
  const [product, setProduct] = useState({});

  useEffect(() => {
    const product = products.find((product) => product.id === Number(id));
    if (product) {
      setProduct(product);
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {!loading ? (
        <ProductDetails
          name={product.title}
          price={product.price}
          description={product.description}
          image={product.image}
          rating={product.rating}
        />
      ) : (
        <h1 className="text-3xl font-bold">Loading...</h1>
      )}
    </div>
  );
}

export default page;
