import axios from "axios";

const API_URL = "https://fakestoreapi.com";

export const fetchProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error("failed to fetch products:", error);
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch product by ID:", error);
  }
};
export const fetchProductsByCategory = async (category) => {
  try {
    const response = await axios.get(
      `${API_URL}/products/category/${category}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
  }
};
