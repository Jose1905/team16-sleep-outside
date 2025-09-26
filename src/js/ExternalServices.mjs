const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  let jsonResponse;

  try {
    // Try to parse the response body
    jsonResponse = await res.json();
  } catch (err) {
    // Fallback if response body is empty or not valid JSON
    jsonResponse = {};
  }

  if (res.ok) {
    return jsonResponse;
  } else {
    // Throw detailed error info for catch blocks to handle
    throw { 
      name: "servicesError", 
      message: jsonResponse.message || "Unknown error occurred", 
      status: res.status 
    };
  }
}

export default class ExternalServices {
  async fetchData(endpoint, options = {}) {
    const response = await fetch(`${baseURL}${endpoint}`, options);
    return await convertToJson(response);
  }

  async getData(category) {
    const data = await this.fetchData(`products/search/${category}`);
    return data?.Result || [];
  }

  async findProductById(id) {
    const data = await this.fetchData(`product/${id}`);
    return data?.Result || null;
  }

  async checkout(payload) {
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    return await this.fetchData("checkout/", options);
  }
}
