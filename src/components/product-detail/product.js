import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { fetchData } from "@/utils/Api";
import { saveToDB } from "@/utils/indexedDB";
import { getBrowserId } from "@/utils/getBrowserId";
import Loader from "@/components/Loader";
import ErrorNotification from "../account/errornotification";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
          console.log(product);

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
    <div className="py-12 ">
      {cartLoading && <Loader fullScreen message="Adding to cart..." />}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="rounded-xl relative flex items-center justify-center shadow-md border border-green-100 bg-white p-4 transition-transform duration-300 hover:scale-105">
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
                      src={img.image}
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
          <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-green-100">
            <div className="space-y-4">
              <h1 className="!text-2xl !md:text-4xl font-bold text-green-700">
                {productData?.name || "Alum Deodorant"}
              </h1>
              <p className="text-sm text-gray-600">{productData.subtitle}</p>

              {/* Price Display */}
              <div className="flex items-center gap-4 text-2xl font-semibold">
                <span className="text-red-500 line-through">
                  Kshs {productData.old_price || 1500}
                </span>
                <span className="text-green-700">
                  Kshs {productData.price || 999}
                </span>
                {discountRibbon && (
                  <span className="text-sm bg-green-100 text-green-700 px-2 py-1 rounded">
                    {discountRibbon}
                  </span>
                )}
              </div>

              {/* Stock Info */}
              <p className="text-sm text-red-600 font-semibold">
                Hurry! Only {productData?.stock_balance} left in stock.
              </p>

              {/* Product Details */}
              <div className="grid grid-cols-2 gap-6 text-sm text-slate-700 pt-2">
                <div>
                  <h6 className="font-bold text-green-600 uppercase mb-1">
                    Brand
                  </h6>
                  <p>{productData?.brand?.name}</p>
                </div>
                <div>
                  <h6 className="font-bold text-green-600 uppercase mb-1">
                    Category
                  </h6>
                  <p>{productData.category?.name}</p>
                </div>
                <div className="col-span-2">
                  <h6 className="font-bold text-green-600 uppercase mb-1">
                    Tags
                  </h6>
                  <p>{productData?.tags?.join(", ") || "No tags"}</p>
                </div>
              </div>

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

              {/* Optional Note Input */}
              <textarea
                className="w-full mt-4 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Add a note (optional)"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
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
              <button
                onClick={() => router.push("/cart")}
                className="flex-1 px-6 py-3 bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition"
              >
                Go to Cart
              </button>
            </div>

            {/* Wishlist / Share */}
            <div className="flex gap-4 pt-6 flex-wrap">
              {[
                { icon: "fa-heart", label: "Add to Wishlist" },
                { icon: "fa-share-alt", label: "Share Product" },
              ].map((btn, idx) => (
                <button
                  key={idx}
                  className="flex items-center gap-2 py-2 px-4 text-green-700 border border-green-200 rounded-md hover:bg-green-50 transition"
                >
                  <i className={`fa ${btn.icon}`} />
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
