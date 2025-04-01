"use client";
import React, { useEffect, useState, use } from "react";
import ProductDetails from "../../../../components/ProductDetails";
import { fetchProductById } from "../../../../utils/api";
function page({ params }) {
  const { id } = use(params);
  // a state to handle the loading state to ensure that data is fetched before rendering components
  const [loading, setLoading] = useState(true);
  // a state to handle the product data
  const [product, setProduct] = useState({});
  // this useEffect is to fetch data from the API and save it in a state when the component mounts

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProductById(id);
        if (!data) {
          throw new Error("something went wrong while fetching data");
        }
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
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
