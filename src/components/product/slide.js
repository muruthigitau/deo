import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { fetchData, postData } from "@/utils/Api";
import { saveToDB } from "@/utils/indexedDB"; // Import IndexedDB utility
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { getBrowserId } from "@/utils/getBrowserId";

const Slide = () => {
  const router = useRouter();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Quantity state
  const [note, setNote] = useState(""); // Note state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchData(
          "shop/public/product/Alum%20Deodorant/",
          {}
        );
        if (response?.status === 200 && response?.data) {
          setProductData(response.data);
        }
      } catch (err) {
        let message = "Failed to fetch product data.";
        if (err.response) message = err.response.data.error || message;
        else if (err.request)
          message = "Network error. Please check connection.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  // Handle quantity change
  const handleQuantityChange = (type) => {
    let newQuantity = quantity;

    if (type === "plus") {
      newQuantity = Math.min(quantity + 1, productData?.stock_balance);
    } else if (type === "minus") {
      newQuantity = Math.max(quantity - 1, 1);
    }

    setQuantity(newQuantity);
  };

  // Handle quantity input
  const handleQuantityInput = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) {
      value = Math.min(Math.max(1, value), productData?.stock_balance);
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    try {
      const browserId = await getBrowserId(); // Generate/retrieve unique browser ID

      const item = {
        product_id: productData.id, // Backend expects `product_id` not `productId`
        product: productData, // Backend expects `product_id` not `productId`
        qty: quantity, // Match your model field `qty`
      };

      const cartPayload = {
        browser_id: browserId,
        items: [item], // List of one or more items
      };

      // Save to IndexedDB if needed (optional step)
      await saveToDB("cart", cartPayload);

      console.log("browserId", cartPayload);
      // // Send to backend
      // const response = await postData(
      //   "method/shop.shop.doctype.cart.cart.CartViewSet/",
      //   cartPayload
      // );

      // if (response.status === 201 || response.status === 200) {
      //   console.log("Cart updated on backend.");
      //   // Optionally notify or redirect
      // }
    } catch (error) {
      console.error("Add to cart error:", error);
      // Show error to user
    }
  };

  if (loading)
    return (
      <div className="text-center py-20 text-green-600 font-semibold text-lg">
        Loading product...
      </div>
    );
  if (!productData)
    return (
      <div className="text-center py-20 text-red-600 font-medium">
        No product found
      </div>
    );

  return (
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
            {/* Product Image Slider */}
            <div className="relative">
              {productData.ribbon && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-lg z-10">
                  {productData.ribbon}
                </div>
              )}
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop
                className="w-full h-[400px] rounded-lg overflow-hidden"
              >
                {productData.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative w-full h-full">
                      <Image
                        src={image.image}
                        alt={`${productData.name} - Image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center space-y-6">
              <div className="space-y-4">
                <Link href="/product">
                  <h1 className="text-3xl font-bold text-gray-800">
                    {productData.name}
                  </h1>
                </Link>
                <p className="text-sm text-gray-600">
                  {productData.subtitle || "Natural Odor Protection"}
                </p>

                {/* Rating */}
                <div className="flex items-center gap-2 text-yellow-500 text-lg">
                  {[...Array(5)].map((_, idx) => (
                    <i key={idx} className="ri-star-fill" />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">
                    (6 reviews)
                  </span>
                </div>

                {/* Price & Discount */}
                <div className="flex items-center gap-4 text-2xl font-semibold">
                  <span className="text-red-500 line-through">
                    Kshs {productData.original_price || 1100}
                  </span>
                  <span className="text-green-700">
                    Kshs {productData.price || 999}
                  </span>
                  {productData.discount && (
                    <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                      {productData.discount}
                    </span>
                  )}
                </div>

                {/* Stock Info */}
                <p className="text-sm text-red-600 font-semibold">
                  Hurry! Only {productData.stock_balance} left in stock.
                </p>

                {/* Quantity Selector */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-green-300 rounded-lg overflow-hidden shadow-sm">
                    <button
                      className="px-4 py-2 text-green-700 hover:bg-green-100 transition disabled:opacity-50"
                      onClick={() => handleQuantityChange("minus")}
                      disabled={quantity <= 1}
                    >
                      <i className="ri-subtract-line" />
                    </button>
                    <input
                      type="number"
                      className="w-16 text-center border-x border-green-200 focus:outline-none"
                      value={quantity}
                      onChange={handleQuantityInput}
                      min={1}
                      max={productData.stock_balance}
                    />
                    <button
                      className="px-4 py-2 text-green-700 hover:bg-green-100 transition disabled:opacity-50"
                      onClick={() => handleQuantityChange("plus")}
                      disabled={quantity >= productData.stock_balance}
                    >
                      <i className="ri-add-line" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-50"
                  onClick={handleAddToCart}
                  disabled={productData.stock_balance === 0}
                >
                  {productData.stock_balance === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
                <Link
                  href="/cart"
                  className="flex-1 px-6 py-3 bg-orange-500 text-center text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition"
                >
                  Buy Now
                </Link>
              </div>

              {/* Additional Actions */}
              <div className="flex items-center gap-4">
                <Link
                  href="#"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                >
                  <i className="ri-heart-line text-lg" />
                  <span>Add to Wishlist</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition"
                >
                  <i className="ri-share-line text-lg" />
                  <span>Share</span>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Slide;
