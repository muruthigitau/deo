let cart = {
  cartId: Date.now(),
  items: [],
  total: 0,
};

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch cart" });
      }
      break;

    case "POST":
      try {
        const { productId, quantity } = req.body;

        // Check if item exists in cart
        const existingItemIndex = cart.items.findIndex(
          (item) => item.productId === productId
        );

        if (existingItemIndex > -1) {
          // Update quantity if item exists
          cart.items[existingItemIndex].quantity += quantity;
        } else {
          // Add new item
          cart.items.push({
            productId,
            quantity,
          });
        }

        res.status(200).json(cart);
      } catch (error) {
        res.status(500).json({ error: "Failed to update cart" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
