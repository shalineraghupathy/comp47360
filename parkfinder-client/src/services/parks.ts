/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { DATA_URL } from "../constants";

export async function getParks(
  userLat: number,
  userLon: number,
  playTime: number,
  token?: string | null
) {
  const url = token
    ? `${DATA_URL}/parks/findNearby2?userLat=${userLat}&userLon=${userLon}&playTime=${playTime}`
    : `${DATA_URL}/parks/findNearby?userLat=${userLat}&userLon=${userLon}&playTime=${playTime}`;

  const config = token
    ? {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    : {};

  try {
    // console.log(url);
    const response = await axios.get(url, config);
    // console.log("Parks fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching parks:", error);
    throw error;
  }
}

export function convertToTimestamp(date: string, time: string) {
  const timestamp = Math.floor(new Date(`${date}T${time}`).getTime() / 1000);
  return timestamp;
}

export function filterParks(filters: any, parks: any) {
  // console.log(parks);
  const filtered = parks.filter((park: any) => {
    let match = true;

    if (filters.isToilet !== undefined) {
      match = match && park.park.isToilet === (filters.isToilet ? 1 : 0);
    }

    if (filters.isCafe !== undefined) {
      match = match && park.park.isCafe === (filters.isCafe ? 1 : 0);
    }
    if (filters.isToiletHandicapAccess !== undefined) {
      match =
        match &&
        park.park.isToiletHandicapAccess ===
          (filters.isToiletHandicapAccess ? 1 : 0);
    }
    if (filters.isPlayground !== undefined) {
      match =
        match && park.park.isPlayground === (filters.isPlayground ? 1 : 0);
    }
    if (filters.isRestaurant !== undefined) {
      match =
        match && park.park.isRestaurant === (filters.isRestaurant ? 1 : 0);
    }
    if (filters.isShelter !== undefined) {
      match = match && park.park.isShelter === (filters.isShelter ? 1 : 0);
    }
    if (filters.isDrinkingWater !== undefined) {
      match =
        match &&
        park.park.isDrinkingWater === (filters.isDrinkingWater ? 1 : 0);
    }
    if (filters.isBar !== undefined) {
      match = match && park.park.isBar === (filters.isBar ? 1 : 0);
    }
    if (filters.isBench !== undefined) {
      match = match && park.park.isBench === (filters.isBench ? 1 : 0);
    }
    if (filters.isGarden !== undefined) {
      match = match && park.park.isGarden === (filters.isGarden ? 1 : 0);
    }
    if (filters.isFountain !== undefined) {
      match = match && park.park.isFountain === (filters.isFountain ? 1 : 0);
    }
    if (filters.isMonument !== undefined) {
      match = match && park.park.isMonument === (filters.isMonument ? 1 : 0);
    }
    if (filters.busyness) {
      const [min, max] = busynessRange(filters.busyness);
      match = match && park.busyness >= min && park.busyness <= max;
    }
    return match;
  });
  return filtered;
}

function busynessRange(category: string): [number, number] {
  if (category === "high") {
    return [66, 100];
  } else if (category === "medium") {
    return [33, 65];
  } else if (category === "low") {
    return [0, 32];
  } else {
    return [50, 60];
  }
}
