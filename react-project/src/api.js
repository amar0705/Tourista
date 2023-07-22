import axios from "axios";

const BASE_URL = "http://localhost:8000";

const apiWithAuth = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `${localStorage.getItem("token")}`,
  },
});

const api = axios.create({
  baseURL: BASE_URL,
});

export const callApi = async (endpoint, method = "GET", data = null, headers = false) => {
  try {
    let response;
    if (headers) {
      response = await apiWithAuth({
        url: endpoint,
        method,
        data,
      });
    } else {
      response = await api({
        url: endpoint,
        method,
        data,
      });
    }

    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// {
//   "property":"abc",
//   "host":1,
//   "location":1,
//   "property_type":1,
//   "total_bedrooms":5,
//   "price":1000
// }
