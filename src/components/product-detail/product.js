import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import { mockProductData } from "@/data/mockProduct";
import ErrorNotification from "../account/errornotification";
import { fetchData } from "@/utils/Api";
import { saveToDB, getFromDB, deleteFromDB } from "@/utils/indexedDB"; // Import IndexedDB utilities

// Import Swiper styles and modules
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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetchData(
          "shop/public/product/Alum%20Deodorant/",
          {}
        );
        if (response?.status == 200 && response?.data) {
          setProductData(response?.data);
        }
      } catch (err) {
        let message = "Failed to fetch product data.";
        if (err.response) message = err.response.data.error || message;
        else if (err.request)
          message = "Network error. Please check connection.";
        setError(message);
        // setProductData(mockProductData);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  const handleQuantityChange = (type) => {
    let newQuantity = quantity;

    if (type === "plus") {
      newQuantity = Math.min(quantity + 1, productData?.stock_balance);
    } else if (type === "minus") {
      newQuantity = Math.max(quantity - 1, 1);
    }

    setQuantity(newQuantity);
  };

  const handleQuantityInput = (e) => {
    let value = parseInt(e.target.value);
    if (!isNaN(value)) {
      value = Math.min(Math.max(1, value), productData?.stock_balance);
      setQuantity(value);
    }
  };

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        productId: productData.id,
        quantity,
        note,
        productName: productData.name,
        price: productData.price,
        image: productData.images[0]?.image,
      };

      // Save cart item to IndexedDB
      await saveToDB(`cart_${productData.id}`, cartItem);

      // Optionally, you can also send the cart item to your backend API
      const response = await axios.post("/api/cart", cartItem);
      if (response.status === 200) {
        router.push("/cart");
      }
    } catch (error) {
      let message = "Failed to add to cart.";
      if (error.response) message = error.response.data.error || message;
      else if (error.request)
        message = "Network error. Please check connection.";
      setError(message);
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
    <div className="py-12 ">
      {error && (
        <ErrorNotification message={error} onClose={() => setError(null)} />
      )}

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Product Image Slider */}
        <div className="rounded-xl flex items-center justify-center shadow-md border border-green-100 bg-white p-4 transition-transform duration-300 hover:scale-105">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000 }}
            loop
            className="w-full h-[400px] sm:h-[500px]" // Fixed height for responsiveness
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
            }}
          >
            {productData?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-full">
                  <Image
                    src={image.image}
                    alt={`${productData.name} - Image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg" // Use object-cover for better image scaling
                    priority
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Product Info */}
        <div className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border border-green-100">
          <h1 className="!text-2xl !md:text-4xl font-bold text-green-700">
            {productData?.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center gap-2 text-yellow-500 text-lg">
            {[...Array(5)].map((_, idx) => (
              <i key={idx} className="fa fa-star" />
            ))}
            <span className="text-sm text-slate-500 ml-2">(6 reviews)</span>
          </div>

          {/* Pricing */}
          <div className="flex items-center gap-4 text-2xl font-semibold">
            <span className="text-red-500 line-through">
              Kshs {productData.original_price || 1100}
            </span>
            <span className="text-green-700">
              Kshs {productData.price || 999}
            </span>
          </div>

          {/* Stock Info */}
          <p className="text-sm text-red-600 font-semibold">
            Hurry! Only {productData?.stock_balance} left in stock.
          </p>

          {/* Product Details */}
          <div className="grid grid-cols-2 gap-6 text-sm text-slate-700 pt-2">
            <div>
              <h6 className="font-bold text-green-600 uppercase mb-1">Brand</h6>
              <p>{productData?.brand?.name}</p>
            </div>
            <div>
              <h6 className="font-bold text-green-600 uppercase mb-1">
                Category
              </h6>
              <p>{productData.category?.name}</p>
            </div>
            <div className="col-span-2">
              <h6 className="font-bold text-green-600 uppercase mb-1">Tags</h6>
              <p>{productData?.tags?.join(", ") || "No tags"}</p>
            </div>
          </div>

          {/* Quantity & Cart */}
          <div className="flex flex-col md:flex-row items-center gap-4 pt-4">
            <div className="flex items-center border border-green-300 rounded-lg overflow-hidden shadow-sm">
              <button
                className="px-4 py-2 text-green-700 hover:bg-green-100 transition disabled:opacity-50"
                onClick={() => handleQuantityChange("minus")}
                disabled={quantity <= 1}
              >
                <i className="fa fa-minus" />
              </button>
              <input
                type="number"
                className="w-16 text-center border-x border-green-200 focus:outline-none"
                value={quantity}
                onChange={handleQuantityInput}
                min={1}
                max={productData?.stock_balance}
              />
              <button
                className="px-4 py-2 text-green-700 hover:bg-green-100 transition disabled:opacity-50"
                onClick={() => handleQuantityChange("plus")}
                disabled={quantity >= productData?.stock_balance}
              >
                <i className="fa fa-plus" />
              </button>
            </div>

            <button
              className="flex-1 px-6 py-3 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition disabled:opacity-50"
              onClick={handleAddToCart}
              disabled={productData?.stock_balance === 0}
            >
              {productData?.stock_balance === 0
                ? "Out of Stock"
                : "Add to Cart"}
            </button>
          </div>

          {/* Note */}
          <div className="pt-4">
            <label className="block text-sm font-medium text-green-700 mb-1">
              Note (optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full border border-green-200 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-300 text-sm"
              placeholder="Any special instructions? (e.g., Gift wrap this item)"
            />
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
        </div>
      </div>
    </div>
  );
};

export default Product;
