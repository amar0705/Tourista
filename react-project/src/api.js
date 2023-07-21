import axios from "axios";

const BASE_URL = "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

export const callApi = async (endpoint, method = "GET", data = null) => {
  try {
    const response = await api({
      url: endpoint,
      method,
      data,
    });

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
