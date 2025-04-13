"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { fetchProductById } from "../../../utils/api";
import Image from "next/image";

function page() {
  const { loading, user } = useAuth();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (!loading && user && user.cart) {
      setCart(user.cart);
    }
  }, [loading, user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!cart || cart.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  const ItemCard = (props) => {
    const [product, setProduct] = useState();

    const getProductById = async (id) => {
      try {
        const res = await fetchProductById(id);
        if (!res) {
          throw new Error("Failed to fetch product data");
        }
        setProduct(res);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    useEffect(() => {
      getProductById(props.productId);
    }, [props.productId]);

    const [quantity, setQuantity] = useState(
      cart.find((item) => item.productId === props.productId)?.quantity || 1
    );

    const handleIncrease = () => {
      setQuantity((prev) => prev + 1);
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.productId === props.productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    };

    const handleDecrease = () => {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
        setCart((prevCart) =>
          prevCart.map((item) =>
            item.productId === props.productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );
      }
    };

    const handleDelete = () => {
      setCart((prevCart) =>
        prevCart.filter((item) => item.productId !== props.productId)
      );
    };

    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        {product ? (
          <div className="w-xl h-40 flex flex-row items-center justify-between border-2 border-gray-300 rounded-lg p-4">
            <p>{product.title}</p>
            <div>
              <Image
                src={product.image}
                alt={product.title}
                width={50}
                height={50}
              />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDecrease}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                onClick={handleIncrease}
                className="px-2 py-1 bg-gray-200 rounded"
              >
                +
              </button>
            </div>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>
        ) : (
          <div>Loading product...</div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full h-full">
      <h1 className="text-xl">Cart</h1>
      <div>
        <p>Your items:</p>
        <div className="w-full h-full flex flex-col items-center justify-center gap-4">
          {cart.map((item) => (
            <ItemCard key={item.productId} productId={item.productId} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default page;
