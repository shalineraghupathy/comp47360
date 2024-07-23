import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/auth";

export const addFavorite = async (parkId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/add`,
      { parkId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to add favorite");
  }
};

export const removeFavorite = async (parkId: string) => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      `${API_URL}/remove`,
      { parkId },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to remove favorite");
  }
};
