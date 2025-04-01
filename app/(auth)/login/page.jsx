"use client";
import React, { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
function page() {
  const router = useRouter();
  const { setUser, setLoggedIn, login } = useAuth();
  // first a state to handle the inputs
  const [logs, setLogs] = useState({
    username: "",
    password: "",
  });
  const handleInputs = (e) => {
    setLogs((prevState) => {
      return {
        ...prevState,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // here we're checking if the inputs are empty or not and validating the email adress well this is one way to do it
    // or just add a required attribute to the inputs and use the built in validation of the browser
    if (!logs.username && !logs.password) {
      alert("Please fill in the form");
      return;
    }
    await login(logs.username, logs.password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-secondary">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center text-primary mb-6">
          Sign In
        </h1>
        <input
          autoComplete="username"
          name="username"
          type="text"
          value={logs.username}
          placeholder="Enter your username"
          onChange={handleInputs}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          autoComplete="current-password"
          name="password"
          type="password"
          value={logs.password}
          placeholder="Enter your password"
          onChange={handleInputs}
          className="w-full p-3 border border-gray-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="w-full bg-accent text-white py-3 rounded-lg font-semibold hover:bg-primary transition duration-300"
        >
          Sign in
        </button>
        <p className="text-center text-gray-600 mt-4">
          <a href="#" className="text-accent hover:underline">
            Forgot password?
          </a>
        </p>
        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-accent hover:underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default page;
