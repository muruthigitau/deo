let checkoutData = { items: [], products: {} };

export default async function handler(req, res) {
  if (req.method === "POST") {
    checkoutData = req.body; // Store cart data
    return res.status(200).json({ message: "Checkout data saved." });
  }

  if (req.method === "GET") {
    return res.status(200).json(checkoutData); // Retrieve checkout data
  }

  res.setHeader("Allow", ["POST", "GET"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
