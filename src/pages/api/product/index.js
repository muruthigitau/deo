import axios from "axios";

const DJANGO_API_URL =
  process.env.NEXT_PUBLIC_DJANGO_API_URL || "http://localhost:8000/api";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const response = await axios.get(`${DJANGO_API_URL}/products/`);
        res.status(200).json(response.data);
      } catch (error) {
        res.status(500).json({ error: "Failed to fetch products" });
      }
      break;

    case "POST":
      try {
        const productData = req.body;
        const response = await axios.post(
          `${DJANGO_API_URL}/products/`,
          productData
        );
        res.status(201).json(response.data);
      } catch (error) {
        res.status(500).json({ error: "Failed to create product" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
