import axios from "axios";

// Preset API URL
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/apis/";

// Utility function to fetch data with retry logic
const fetchWithRetry = async (url, params, headers, retries = 3) => {
  try {
    const response = await axios.get(url, { params, headers });
    return response.data;
  } catch (error) {
    if (retries > 0) {
      console.warn(`Retrying... ${retries} attempts left`);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second before retrying
      return fetchWithRetry(url, params, headers, retries - 1);
    } else {
      return error; // Throw the error if retries are exhausted
    }
  }
};

// Main fetchData function
export const fetchData = async (
  endpoint,
  params = {},
  tenant = "test",
  options = {}
) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const headers = {
      "Content-Type": "application/json",
      "X-Tenant": tenant,
    };

    // Fetch data with retry logic
    const data = await fetchWithRetry(url, params, headers);

    return { data, status: 200 };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error, status: 500 };
  }
};

// Function to handle form data (multipart/form-data)
export const postFormData = async (
  endpoint,
  formData,
  headers = {},
  tenant = "test"
) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "X-Tenant": tenant,
        ...headers,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error posting form data:", error);
    return { error, status: 500 };
  }
};

// Function to handle JSON data (application/json)
export const postData = async (
  endpoint,
  body,
  headers = {},
  tenant = "test"
) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        "X-Tenant": tenant,
        ...headers,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error posting data:", error);
    return { error, status: 500 };
  }
};

// Function to update data (PATCH request)
export const updateData = async (
  endpoint,
  body,
  headers = {},
  tenant = "test"
) => {
  try {
    const url = `${API_URL}${endpoint}`;
    const response = await axios.patch(url, body, {
      headers: {
        "Content-Type": "application/json",
        "X-Tenant": tenant,
        ...headers,
      },
    });

    return { data: response.data, status: response.status };
  } catch (error) {
    console.error("Error updating data:", error);
    return { error, status: 500 };
  }
};
