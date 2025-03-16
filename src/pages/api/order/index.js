export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const {
      orderId,
      totalAmount,
      billingInfo,
      shippingAddress,
      paymentMethod,
      items,
    } = req.body;

    if (!orderId || !totalAmount || !billingInfo || !items || !paymentMethod) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Simulating a payment gateway response (Replace this with actual payment processing API)
    const paymentResponse = await processPayment(totalAmount, paymentMethod);

    if (!paymentResponse.success) {
      return res.status(400).json({ error: "Payment failed" });
    }

    // Simulated order storage (replace with DB storage)
    const orderData = {
      orderId,
      totalAmount,
      billingInfo,
      shippingAddress,
      paymentMethod,
      items,
      status: "Confirmed",
      transactionId: paymentResponse.transactionId, // Received from payment gateway
    };

    console.log("✅ Order stored:", orderData);

    return res.status(200).json({
      message: "Order placed successfully",
      transactionId: paymentResponse.transactionId,
    });
  } catch (error) {
    console.error("❌ Error processing order:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Simulated payment processing function (Replace this with real API call)
async function processPayment(amount, method) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, transactionId: `TXN_${Date.now()}` });
    }, 1500);
  });
}
