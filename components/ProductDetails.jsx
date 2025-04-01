import React, { useState } from "react";
import Image from "next/image";
import { StarRating } from "./StarRating";
import reviews from "../constants/Reviews";
import Account from "../public/icons/account-dummy.svg";

function ProductDetails(props) {
  console.log(props.rating.rate);
  // a state to handle the number of reviews to show at a time a simple way to implement pagination
  const [visibleReviews, setVisibleReviews] = useState(5);

  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 5);
  };

  return (
    <div className="flex flex-col lg:flex-row items-start w-full h-full p-6 gap-10">
      {/* Product Image & Details */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full lg:w-1/2 flex flex-col items-center">
        <div className="w-full flex justify-center mb-6">
          <Image
            src={props.image}
            alt={props.name}
            width={300}
            height={300}
            className="mix-blend-multiply object-contain rounded-lg"
          />
        </div>

        <div className="text-center w-full">
          <h1 className="font-bold text-4xl text-primary mb-3">{props.name}</h1>
          <p className="text-2xl font-semibold text-red-500">{props.price} $</p>
          <p className="text-gray-600 leading-relaxed mt-3">
            {props.description}
          </p>

          <div className="mt-4">
            <StarRating rating={props.rating.rate} />
            <p className="text-sm text-gray-500 text-center mt-2">
              {props.rating.rate} ({props.rating.count} reviews)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full">
            <button className="bg-accent text-white px-6 py-3 rounded-lg shadow-md hover:bg-white hover:text-primary border border-accent transition duration-300 w-full sm:w-auto">
              Buy Now
            </button>
            <button className="text-primary border border-primary px-6 py-3 rounded-lg hover:bg-primary hover:text-white transition duration-300 w-full sm:w-auto">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="bg-white rounded-xl shadow-lg p-8 w-full lg:w-1/2">
        <h2 className="text-2xl font-bold text-primary mb-5">
          Customer Reviews
        </h2>
        {reviews.length > 0 ? (
          <ul className="space-y-5">
            {reviews.slice(0, visibleReviews).map((review, index) => (
              <li key={index} className="border-b pb-4 flex items-start gap-4">
                <Image
                  src={Account}
                  width={50}
                  height={50}
                  alt="user Icon"
                  className="rounded-full"
                />
                <div>
                  <p className="text-primary font-semibold">
                    {review.username}
                  </p>
                  <p className="text-gray-600">{review.comment}</p>
                  <StarRating rating={review.rating} />
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">
            No reviews yet. Be the first to review!
          </p>
        )}
        {reviews.length > visibleReviews && (
          <button
            onClick={handleLoadMore}
            className="mt-4 bg-accent text-white px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition duration-300 w-full"
          >
            Load More Reviews
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductDetails;
