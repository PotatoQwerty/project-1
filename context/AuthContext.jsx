"use client";
import { useRouter } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";
import { fetchProducts, getUserCart } from "../utils/api";

// first createing a context
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState({
    username: null,
    id: null,
    cart: null,
  });
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // this useeffect is used to check if the user is authenticated or not when the component mounts
  // the empty array means that this useEffect will run only once when the component mounts
  const getAllproducts = async () => {
    try {
      const res = await fetchProducts();
      if (!res) {
        console.log("something went wrong");
      }
      setProducts(res);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  const getUserCartItems = async () => {
    try {
      const res = await getUserCart(Math.floor(Math.random() * 10) - 1);
      if (!res) {
        console.log("something went wrong");
      }
      setUser((prevState) => ({ ...prevState, cart: res }));
    } catch (error) {
      console.error("Error fetching user cart:", error);
    }
  };
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include",
        });

        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await res.json();

        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
        setIsAuthenticated(false);
      }
    };
    checkAuthStatus();
    getAllproducts();
    getUserCartItems();
  }, []);

  // this function is used to login the user and set the user state to the username of the user and update related states
  const login = async (username, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    });
    if (res.ok) {
      setIsAuthenticated(true);
      setUser({
        username: username,
        id: res.id,
      });

      router.push("/");
    } else {
      alert("login failed");
    }
  };
  // this function is used to logout the user and set the user state to null and update related states
  const logout = async () => {
    const res = await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setIsAuthenticated(false);
  };
  // this function is used to signup the user and set the user state to the username of the user and update related states
  const signup = async (username, email, password) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      if (res.ok) {
        // setIsAuthenticated(true);
        alert("Signup successful! with username: ", username);
      } else {
        const errorData = await res.json();
        alert(errorData.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error.message);
      alert("An unexpected error occurred. Please try again.");
    }
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        signup,
        products,
        setProducts,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
