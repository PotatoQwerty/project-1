"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import Image from "next/image";
import Cart from "../public/icons/cart.svg";
import Logout from "../public/icons/logout.svg";

function Header() {
  const { isAuthenticated, logout, user } = useAuth();
  return (
    <div className="flex items-center justify-between w-full h-16 bg-white shadow-xl px-6">
      <Link className="text-3xl font-bold text-primary" href="/">
        <Image src={"/logo.png"} alt="Logo" width={100} height={50} />
      </Link>

      <nav className="hidden space-x-6 text-primary sm:flex sm:items-center sm:justify-center">
        <Link
          href="/shop/men's clothing"
          className="hover:text-accent transition"
        >
          Men Clothing
        </Link>
        <Link
          href="/shop/women's clothing"
          className="hover:text-accent transition"
        >
          Women Clothing
        </Link>
        <Link href="/shop/accessories" className="hover:text-accent transition">
          Accessories
        </Link>
        <Link href="/shop/jewelery" className="hover:text-accent transition">
          Jewelery
        </Link>

        <Link href="/shop/electronics" className="hover:text-accent transition">
          Electronics
        </Link>
      </nav>

      {isAuthenticated ? (
        <div className="flex flex-row items-center justify-center gap-4 ml-4">
          <p>Welcome, {user.username}</p>
          <Link
            href={"/cart"}
            className="cursor-pointer flex items-center justify-center"
            aria-label="Logout"
          >
            <Image
              src={Cart}
              width={20}
              height={20}
              alt="cart icon"
              className="hover:brightness-75 hover:invert transition duration-300"
            />
          </Link>
          <button
            onClick={logout}
            className="cursor-pointer flex items-center justify-center"
            aria-label="Logout"
          >
            <Image
              src={Logout}
              width={20}
              height={20}
              alt="Logout icon"
              className="hover:brightness-75 hover:invert transition duration-300"
            />
          </button>
        </div>
      ) : (
        <Link
          href={"/login"}
          className="shadow-lg p-2.5 rounded-xl font-bold hover:bg-accent text-primary hover:text-white transition-all duration-300 ease-in-out"
        >
          Create Account or Sign In
        </Link>
      )}
    </div>
  );
}

export default Header;
