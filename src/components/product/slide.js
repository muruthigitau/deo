import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { fetchData } from "@/utils/Api";
import { saveToDB } from "@/utils/indexedDB";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { getBrowserId } from "@/utils/getBrowserId";
import Loader from "@/components/Loader";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { constructImagePath } from "@/utils/imagePath";

const Slide = () => {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [discountRibbon, setDiscountRibbon] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchData(
          "shop/public/product/Alum%20Deodorant/",
          {}
        );
        if (response?.status === 200 && response?.data) {
          setProductData(response.data);
          const { old_price = 1500, price } = response.data;
          if (old_price > price) {
            const discount = Math.round(
              ((old_price - price) / old_price) * 100
            );
            setDiscountRibbon(`${discount}% OFF`);
          }
        }
      } catch (err) {
        const message =
          err.response?.data?.error || "Failed to fetch product data.";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const handleQuantityChange = (type) => {
    setQuantity((prev) =>
      type === "plus"
        ? Math.min(prev + 1, productData?.stock_balance)
        : Math.max(prev - 1, 1)
    );
  };

  const handleQuantityInput = (e) => {
    const value = Math.max(
      1,
      Math.min(parseInt(e.target.value), productData?.stock_balance)
    );
    if (!isNaN(value)) setQuantity(value);
  };

  const handleAddToCart = async () => {
    setCartLoading(true);
    try {
      const browserId = await getBrowserId();
      const item = {
        product_id: productData.id,
        product: productData,
        qty: quantity,
      };
      const cartPayload = { browser_id: browserId, items: [item] };
      await saveToDB("cart", cartPayload);
      // await postData("method/shop.shop.doctype.cart.cart.CartViewSet/", cartPayload);
    } catch (err) {
      console.error("Add to cart error:", err);
    } finally {
      setCartLoading(false);
    }
  };

  if (loading) return <Loader fullScreen message="Loading product..." />;

  if (error || !productData)
    return (
      <div className="text-center py-20 text-red-600 font-medium">
        {error || "No product found"}
      </div>
    );

  return (
    <section className="py-16">
      <AnimatePresence>
        {cartLoading && <Loader fullScreen message="Adding to cart..." />}
      </AnimatePresence>
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4 }}
          className="bg-white border border-gray-100 rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 p-2 md:p-6">
            {/* Product Image Slider */}
            <div className="relative">
              {discountRibbon && (
                <div className="absolute top-4 left-4 bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded shadow-lg z-10">
                  {discountRibbon}
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
                {productData.images?.map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="relative w-full h-full">
                      <Image
                        src={constructImagePath(img?.image)}
                        alt={`${productData.name} - Image ${i + 1}`}
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
                    {productData.name || "Alum Deodorant"}
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
                  <Link
                    href="/testimonials"
                    className="text-sm text-gray-500 ml-2"
                  >
                    (653 reviews)
                  </Link>
                </div>

                {/* Price & Discount */}
                <div className="flex items-center gap-4 text-2xl font-semibold">
                  {productData.old_price > productData.price && (
                    <span className="text-red-500 line-through">
                      Kshs {productData.old_price || 1500}
                    </span>
                  )}
                  <span className="text-green-700">
                    Kshs {productData.price || 1500}
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
                  disabled={productData.stock_balance === 0 || cartLoading}
                >
                  {productData.stock_balance === 0
                    ? "Out of Stock"
                    : "Add to Cart"}
                </button>
                <Link
                  href="/cart"
                  className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition text-center"
                >
                  Buy Now
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
