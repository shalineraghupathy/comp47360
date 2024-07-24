import axios from "axios";
import { DATA_URL } from "../constants";

export const addFavorite = async (parkId: string, token: string) => {
  try {
    const response = await axios.post(
      `${DATA_URL}/parks/addFavourites?parkID=${parkId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding favorite:", error);
    throw error;
  }
};

export const removeFavorite = async (parkId: string, token: string) => {
  try {
    const response = await axios.delete(
      `${DATA_URL}parks/removeFavourites?parkID=${parkId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error removing favorite:", error);
    throw error;
  }
};
