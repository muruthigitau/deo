import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { API_URL, fetchData } from "@/utils/Api";
import { saveToDB } from "@/utils/indexedDB";
import { getBrowserId } from "@/utils/getBrowserId";
import Loader from "@/components/Loader";
import ErrorNotification from "../account/errornotification";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { constructImagePath } from "@/utils/imagePath";

const Product = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [error, setError] = useState(null);
  const [discountRibbon, setDiscountRibbon] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetchData(
          "shop/public/product/Alum%20Deodorant/",
          {}
        );
        if (response?.status === 200 && response?.data) {
          const product = response.data;

          setProductData(product);
          const { old_price = 1500, price } = product;
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
        note: note,
      };
      const cartPayload = { browser_id: browserId, items: [item] };
      await saveToDB("cart", cartPayload);
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
    <div className="py-4 md:py-8 lg:py-12">
      {cartLoading && <Loader fullScreen message="Adding to cart..." />}
      <div className="container mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8 p-2 md:p-4 lg:p-6">
          {/* Product Images */}
          <div className="rounded-lg md:rounded-xl relative flex items-center justify-center shadow-sm md:shadow-md border border-green-100 bg-white p-2 md:p-4 transition-transform duration-300 hover:scale-[1.01] md:hover:scale-105">
            {discountRibbon && (
              <div className="absolute top-2 md:top-4 left-2 md:left-4 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 md:px-3 md:py-1 rounded shadow-lg z-10">
                {discountRibbon}
              </div>
            )}
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              navigation
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000 }}
              loop
              className="w-full h-[280px] sm:h-[320px] md:h-[350px] lg:h-[400px] rounded-lg overflow-hidden"
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
          <div className="space-y-4 md:space-y-6 bg-white p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl md:rounded-2xl shadow-sm md:shadow-lg border border-green-100">
            <div className="space-y-3 md:space-y-4">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-green-700">
                {productData?.name || "Alum Deodorant"}
              </h1>
              <p className="text-xs sm:text-sm text-gray-600">
                {productData.subtitle}
              </p>
              {/* Price Display */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4 text-base sm:text-xl md:text-2xl font-semibold">
                {productData.old_price > productData.price && (
                  <span className="text-red-500 line-through text-sm sm:text-base md:text-lg lg:text-xl">
                    Kshs {productData.old_price}
                  </span>
                )}
                <span className="text-green-700">
                  Kshs {productData.price || 999}
                </span>
                {discountRibbon && (
                  <span className="text-xs sm:text-sm hidden bg-green-100 text-green-700 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded">
                    {discountRibbon}
                  </span>
                )}
              </div>
              {/* Stock Info */}
              <p className="text-xs sm:text-sm text-red-600 font-semibold">
                Ships Worldwide | Secure Checkout
                <br />
                💥 Limited stock available!
              </p>
              {/* Product Details */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-slate-700 pt-1 md:pt-2">
                <div>
                  <h6 className="font-bold text-green-600 uppercase text-xs sm:text-sm mb-0.5 md:mb-1">
                    Brand
                  </h6>
                  <p>{productData?.brand?.name}</p>
                </div>
                <div>
                  <h6 className="font-bold text-green-600 uppercase text-xs sm:text-sm mb-0.5 md:mb-1">
                    Category
                  </h6>
                  <p>{productData.category?.name}</p>
                </div>
                <div className="col-span-2">
                  <h6 className="font-bold text-green-600 uppercase text-xs sm:text-sm mb-0.5 md:mb-1">
                    Tags
                  </h6>
                  <p>{productData?.tags?.join(", ") || "No tags"}</p>
                </div>
              </div>
              {/* Quantity Selector */}
              <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                <div className="flex items-center border border-green-300 rounded-md md:rounded-lg overflow-hidden shadow-xs md:shadow-sm">
                  <button
                    className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-green-700 hover:bg-green-100 transition disabled:opacity-50"
                    onClick={() => handleQuantityChange("minus")}
                    disabled={quantity <= 1}
                  >
                    <i className="ri-subtract-line text-sm sm:text-base" />
                  </button>
                  <input
                    type="number"
                    className="w-12 sm:w-14 md:w-16 text-center border-x border-green-200 focus:outline-none text-sm sm:text-base"
                    value={quantity}
                    onChange={handleQuantityInput}
                    min={1}
                    max={productData.stock_balance}
                  />
                  <button
                    className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 text-green-700 hover:bg-green-100 transition disabled:opacity-50"
                    onClick={() => handleQuantityChange("plus")}
                    disabled={quantity >= productData.stock_balance}
                  >
                    <i className="ri-add-line text-sm sm:text-base" />
                  </button>
                </div>
              </div>
              {/* Optional Note Input */}
              <textarea
                className="w-full mt-2 sm:mt-3 md:mt-4 border border-gray-300 rounded-md md:rounded-lg p-1.5 sm:p-2 text-xs sm:text-sm focus:outline-none focus:ring-1 sm:focus:ring-2 focus:ring-green-500"
                placeholder="Add a note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows="2"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
              <button
                className="flex-1 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-green-600 text-white font-medium rounded-md md:rounded-lg shadow-sm md:shadow-md hover:bg-green-700 transition disabled:opacity-50 text-sm sm:text-base"
                onClick={handleAddToCart}
                disabled={productData.stock_balance === 0 || cartLoading}
              >
                {productData.stock_balance === 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="flex-1 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 bg-orange-500 text-white font-medium rounded-md md:rounded-lg shadow-sm md:shadow-md hover:bg-orange-600 transition text-sm sm:text-base"
              >
                Go to Cart
              </button>
            </div>

            {/* Wishlist / Share */}
            <div className="flex gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4 md:pt-6 flex-wrap">
              {[
                { icon: "fa-heart", label: "Add to Wishlist" },
                { icon: "fa-share-alt", label: "Share Product" },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-1 sm:gap-2 py-1 sm:py-1.5 md:py-2 px-2 sm:px-3 md:px-4 text-green-700 border border-green-200 rounded-sm md:rounded-md hover:bg-green-50 transition text-xs sm:text-sm"
                >
                  <i className={`fa ${btn.icon} text-xs sm:text-sm`} />
                  <span>{btn.label}</span>
                </button>
              ))}
            </div>
            {error && <ErrorNotification message={error} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
