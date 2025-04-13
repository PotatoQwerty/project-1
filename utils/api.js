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
    console.log("tnakt");
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

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error("Failed to add product:", error);
  }
};

export const updateProduct = async (id, product) => {
  try {
    const response = await axios.put(`${API_URL}/products/${id}`, product);

    if (response.status === 200) {
      console.log("Product updated successfully:", response.data);

      return response.status;
    }
  } catch (error) {
    console.error("Failed to update product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/products/${id}`);
    if (response.status === 200) {
      return { data: response.data, status: response.status };
    }
  } catch (error) {
    console.error("Failed to delete product:", error);
  }
};
export const getUserCart = async (userId) => {
  const response = await axios.get(`https://fakestoreapi.com/carts/${userId}`);
  if (response.status === 200) {
    return response.data.products;
  } else {
    throw new Error("Failed to fetch user cart");
  }
};

export const updateUserCart = async (userId, cart) => {
  const response = await axios.put(
    `https://fakestoreapi.com/carts/${userId}`,
    cart
  );
  if (response.status === 200) {
    return response.data, response.status;
  } else {
    throw new Error("Failed to update user cart");
  }
};
