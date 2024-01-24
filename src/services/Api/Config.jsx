import axios from "axios";

const getToken = () => localStorage.getItem("adminToken");

const getHeaders = () => ({
  "x-access-token": getToken(),
  "Content-Type": "multipart/form-data",
});

const requestWithToken = async (url, method, data = null) => {
  const headers = getHeaders();

  try {
    if (method === "GET") {
      const res = await axios.get(url, { headers });
      return res;
    } else if (method === "POST") {
      const res = await axios.post(url, data, { headers });
      return res;
    } else if (method === "PUT") {
      const res = await axios.put(url, data, { headers });
      return res;
    } else if (method === "DELETE") {
      const res = await axios.delete(url, { data, headers });
      return res;
    }
    return null
  } catch (error) {
    // Handle errors here
    console.error("API request error:", error);
    throw error;
  }
};

export default requestWithToken;
