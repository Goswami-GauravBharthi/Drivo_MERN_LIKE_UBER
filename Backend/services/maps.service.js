import axios from "axios";
import Captain from "../models/captain.model.js";

export const getAddressCoordinate = async (address) => {
  const LOCATIONIQ_URL = "https://us1.locationiq.com/v1/search.php";
  const API_KEY = process.env.LOCATIONQ_API_KEY; // get free key from locationiq.com

  try {
    const response = await axios.get(LOCATIONIQ_URL, {
      params: {
        key: API_KEY,
        q: address,
        format: "json",
        limit: 1,
      },
    });

    if (response.data.length > 0) {
      const { lat, lon } = response.data[0];
      return { ltd: parseFloat(lat), lng: parseFloat(lon) };
    } else {
      throw new Error("Unable to get coordinates");
    }
  } catch (error) {
    console.error("Geocoding error:", error.message);
    throw error;
  }
};

export const getDistanceAndTime = async (originText, destinationText) => {
  if (!originText || !destinationText) {
    throw new Error("Origin and destination are required");
  }

  const API_KEY = process.env.LOCATIONQ_API_KEY;

  // Step 1: Geocode helper
  const geocodeAddress = async (address) => {
    const response = await axios.get(
      "https://us1.locationiq.com/v1/search.php",
      {
        params: {
          key: API_KEY,
          q: address,
          format: "json",
        },
      }
    );

    if (response.data && response.data.length > 0) {
      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon,
      };
    } else {
      throw new Error(`Unable to geocode address: ${address}`);
    }
  };

  try {
    // Step 2: Convert origin and destination into coordinates
    const origin = await geocodeAddress(originText);
    const destination = await geocodeAddress(destinationText);

    // Step 3: Call Directions API
    const response = await axios.get(
      `https://us1.locationiq.com/v1/directions/driving/${origin.lon},${origin.lat};${destination.lon},${destination.lat}`,
      { params: { key: API_KEY } }
    );

    if (
      response.data &&
      response.data.routes &&
      response.data.routes.length > 0
    ) {
      const route = response.data.routes[0];
      return {
        distance: route.distance, // meters
        time: route.duration, // seconds
      };
    } else {
      throw new Error("Unable to get distance and time");
    }
  } catch (error) {
    console.error("Distance and time error:", error.message);
    throw error;
  }
};

export const getAutoSuggestion = async (input) => {
  if (!input) {
    throw new Error("Input is required");
  }

  const API_KEY = process.env.LOCATIONQ_API_KEY;

  try {
    const response = await axios.get(
      "https://us1.locationiq.com/v1/autocomplete.php",
      {
        params: {
          key: API_KEY,
          q: input,
          format: "json",
          countrycodes: "IN",
          limit: 5, // optional: top 5 suggestions only
        },
      }
    );

    if (response.data && response.data.length > 0) {
      return response.data.map((item) => ({
        label: item.display_name, // full place name
        value: item.place_id, // unique place ID
        lat: item.lat, // latitude
        lon: item.lon, // longitude
        type: item.type, // city, road, house, etc.
      }));
    } else {
      throw new Error("No suggestions found");
    }
  } catch (error) {
    console.error("Autocomplete error:", error.message);
    throw error;
  }
};

export const getCaptainInTheRadius = async (ltd, lng, radius) => {
  // radius in meter
  const captains = await Captain.find({
    location: {
      $geoWithin: {
        $centerSphere: [[lng, ltd], radius / 6378137],
      },
    },
  });
  //    console.log("Query result:", captains);
  return captains;
};
