// pages/api/order.js
import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderId, totalAmount, billingInfo, shippingAddress, items } =
      req.body;

    // Validate required fields
    if (!orderId || !totalAmount || !billingInfo || !items) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Prepare the order data to send to Django backend
    const orderData = {
      orderId,
      totalAmount,
      billingInfo,
      shippingAddress,
      items,
    };

    // Send the order data to Django backend for processing
    const djangoResponse = await axios.post(
      "https://your-django-backend.com/order-processing", // Replace with your Django backend URL
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Check if the Django backend successfully processed the order
    if (djangoResponse.data && djangoResponse.data.transactionId) {
      // Return the order confirmation data to the frontend
      return res.status(200).json(djangoResponse.data);
    } else {
      throw new Error("Order processing failed in Django backend.");
    }
  } catch (error) {
    console.error("❌ Error processing order:", error);

    // Handle specific errors from Django backend
    if (error.response && error.response.data) {
      return res.status(error.response.status).json({
        error: error.response.data.error || "Order processing failed.",
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
}
