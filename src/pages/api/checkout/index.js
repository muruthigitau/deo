import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { cartId, billingInfo } = req.body;

    try {
      // Fetch cart details
      const cartResponse = await axios.get(`http://localhost:3000/api/cart`);
      const cartData = cartResponse.data;

      // Here you would typically save the order to your database
      // For this example, we'll just return the cart data and billing info

      const orderId = Math.floor(Math.random() * 1000000); // Mock order ID

      res.status(200).json({ orderId, cartData, billingInfo });
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart details" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
