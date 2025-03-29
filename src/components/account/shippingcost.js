const fetchShippingCost = async (shippingAddress) => {
  try {
    const response = await fetch("/api/shipping-cost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(shippingAddress),
    });

    if (!response.ok) {
      throw new Error("Failed to fetch shipping cost.");
    }

    const data = await response.json();
    return data.shippingCost;
  } catch (error) {
    console.error("Error fetching shipping cost:", error);
    throw error;
  }
};

export default fetchShippingCost;
