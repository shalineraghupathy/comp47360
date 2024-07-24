import axios from "axios";

export const addFavorite = async (parkId: string, token: string) => {
  try {
    const response = await axios.post(
      `http://localhost:8082/parks/addFavourites?parkID=${parkId}`,
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
      `http://localhost:8082/parks/removeFavourites?parkID=${parkId}`,
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
