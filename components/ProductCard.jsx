import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./StarRating";
import { useAuth } from "../context/AuthContext";
import { deleteProduct } from "../utils/api";

function ProductCard(props) {
  // this component is recieving props from the parent component
  // and displaying the product card with image, title, price and rating
  // it also has an edit button that shows only if the user is authenticated
  const { isAuthenticated, setProducts } = useAuth();
  const handleDelete = async () => {
    // this function is used to delete the product from the products array
    // and update the state of the products array in the context
    // it also shows a confirmation dialog before deleting the product
    // deletion is ONLY done using the deleteProduct function from the api.js file
    // and the product is removed from the products array in the context
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    try {
      const res = await deleteProduct(props.id);

      if (res.status === 200) {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== props.id)
        );
        alert("Product deleted successfully " + res.data.title);
      } else {
        console.error("Failed to delete product:", res.status);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="bg-background w-full min-h-fit sm:w-64 h-auto sm:h-80 rounded-xl shadow-xl flex flex-col items-center p-4">
      {isAuthenticated ? (
        <div className=" w-full h-8 flex flex-row justify-cneter items-center gap-2">
          <Link
            className="bg-primary text-white w-1/2 h-full flex items-center justify-center rounded-lg shadow-md hover:bg-accent transition duration-300"
            href={`/products/${props.id}/edit`}
          >
            <h1>Edit</h1>
          </Link>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white w-1/2 h-full rounded-lg shadow-md hover:bg-accent transition duration-300"
          >
            delete
          </button>
        </div>
      ) : null}

      {/* Image section */}
      <div className="w-full h-48 sm:h-1/2 flex items-center justify-center">
        <Link href={`/products/${props.id}`}>
          <Image
            src={props.image}
            alt={props.title}
            width={100}
            height={100}
            className="object-contain mix-blend-multiply"
            loading="lazy"
          />
        </Link>
      </div>

      {/* Text section */}
      <div className="flex flex-col items-center justify-between w-full h-auto sm:h-1/2 mt-4">
        <Link href={`/products/${props.id}`} className="w-full">
          <h1 className="font-bold text-center text-sm text-ellipsis overflow-hidden whitespace-nowrap">
            {props.title}
          </h1>
        </Link>
        <p className="text-lg text-primary font-medium mt-2">{props.price}$</p>
        <StarRating rating={props.rating.rate} className="m-1" />

        <button className="bg-secondary text-white w-full h-10 rounded-lg shadow-md hover:bg-accent transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
