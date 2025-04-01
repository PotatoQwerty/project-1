import React from "react";
import Image from "next/image";
import Link from "next/link";
import { StarRating } from "./StarRating";

function ProductCard(props) {
  return (
    <div className="bg-secondary w-full sm:w-64 h-auto sm:h-80 rounded-xl shadow-xl flex flex-col items-center p-4">
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

        <button className="bg-accent text-white w-full h-10 rounded-lg shadow-md hover:bg-primary transition duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
