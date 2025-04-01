"use client";
import React, { useEffect, useState, use } from "react";
import ProductCard from "../../../../components/ProductCard";
import { fetchProductsByCategory } from "../../../../utils/api";
import { images } from "../../../../constants/Images";

function page({ params }) {
  const { id } = use(params);
  // state to handle the loading state
  // this is used to show a loading message while the data is being fetched
  // or to show a loading spinner while the data is being fetched which is a good practice
  // and more visually appealing to the user
  const [loading, setLoading] = useState(true);
  // state to handle the product data
  const [filteredProducts, setFilteredProducts] = useState([]);
  // state to handle the image data
  const categoryImages = {
    // in this case we are using images from the constants folder
    // i also hardcoded the value of the ids because in our case we have only 5 categories
    // and in womem's and men's clothing we have a space in the name so i hardcoded the value to be the same as the id
    // this is not a good practice but in this case it is ok as it is a simple and small project
    // they should be decoded in a better way like i did down below
    "women's%20clothing": images.Womens,
    "men's%20clothing": images.Mens,
    accessories: images.Accessories,
    jewelery: images.Jewelery,
    electronics: images.Electronics,
  };

  // get the image based on the id
  const img = categoryImages[id];
  // Fetch data from the API when the component mounts
  //   adding id to the dependency array to ensure that the data is fetched when the id changes
  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProductsByCategory(id);
        if (!data) {
          throw new Error("Something went wrong while fetching data");
        }

        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getProducts();
  }, [id]);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-secondary">
      {!loading ? (
        filteredProducts.length > 0 ? (
          <div className="w-full">
            {/* Header Section */}
            <div className="relative w-full h-64 sm:h-80 lg:h-96">
              <img
                src={img}
                alt={`${id} category`}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white text-center">
                  Shop for all items in the category {decodeURIComponent(id)}
                </h1>
              </div>
            </div>

            {/* Product Grid Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6 max-w-7xl mx-auto">
              {filteredProducts.map((product) => (
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
          // If there are no products in the category, show a message
          <div className="flex flex-col items-center justify-center w-full h-screen bg-secondary">
            <h1 className="text-2xl font-semibold text-primary">
              No products found in this category.
            </h1>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center w-full h-screen bg-secondary">
          <h1 className="text-4xl font-semibold text-primary">Loading...</h1>
        </div>
      )}
    </div>
  );
}

export default page;
