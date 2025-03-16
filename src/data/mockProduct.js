export const mockProductData = {
  id: 1,
  name: "Alum Deodorant",
  price: 999, // Kshs 999
  oldPrice: 1110, // Kshs 1,110 (original price before discount)
  stock: 25, // Adjusted stock number
  description:
    "Experience long-lasting freshness with our natural Alum Deodorant. Gentle on skin, yet powerful against odor, it provides all-day protection with zero irritation.",
  category: "Personal Care",
  images: [
    "/assets/images/alum-deodorant/product-1.png",
    "/assets/images/alum-deodorant/product-1.png",
    "/assets/images/alum-deodorant/product-1.png",
  ],
  smallImages: [
    "/assets/images/alum-deodorant/product-1.png",
    "/assets/images/alum-deodorant/product-1.png",
    "/assets/images/alum-deodorant/product-1.png",
  ],
  discount: "10% Off",
  ribbon: "Best Seller",
  rating: 4.8,
  brand: "AlumFresh",
  tags: ["deodorant", "natural", "best-seller"],
  createdAt: "2024-03-14",
  reviews: [
    {
      id: 1,
      rating: 5,
      comment:
        "Absolutely love this deodorant! No irritation and lasts all day.",
      user: "Jane Doe",
      date: "2024-03-10",
    },
    {
      id: 2,
      rating: 4.5,
      comment: "Works great and smells fresh! Would buy again.",
      user: "Michael K.",
      date: "2024-03-12",
    },
  ],
  colors: ["gainsboro", "lightgray", "whitesmoke"],
  variants: [
    {
      size: "50g",
      price: 999,
    },
    {
      size: "100g",
      price: 1599,
    },
  ],
};
