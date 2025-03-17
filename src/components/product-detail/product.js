import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Image from "next/image";
import Slider from "react-slick";
import { mockProductData } from "@/data/mockProduct";
import ErrorNotification from "../account/errornotification";

const Product = () => {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1 = useRef(null);
  const slider2 = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const settingsNav = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    infinite: true,
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/product");
        setProductData(response.data);
      } catch (err) {
        console.error("Failed to fetch product data:", err);

        // Extract the error message from the AxiosError
        let errorMessage = "Failed to fetch product data. Please try again.";
        if (err.response) {
          // Use the error message from the backend if available
          errorMessage = err.response.data.error || errorMessage;
        } else if (err.request) {
          // Handle network errors
          errorMessage = "Network error. Please check your connection.";
        }

        setError(errorMessage);
        setProductData(mockProductData); // Fallback to mock data
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  useEffect(() => {
    if (slider1.current && slider2.current) {
      setNav1(slider1.current);
      setNav2(slider2.current);
    }
  }, []);

  const handleQuantityChange = (type) => {
    if (type === "plus" && quantity < productData.stock) {
      setQuantity((prev) => Math.min(prev + 1, productData.stock));
    } else if (type === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      const cartItem = {
        productId: productData.id,
        quantity: quantity,
      };

      const response = await axios.post("/api/cart", cartItem);

      if (response.status === 200) {
        router.push("/cart");
      }
    } catch (error) {
      console.error("Failed to add to cart:", error);

      // Extract the error message from the AxiosError
      let errorMessage = "Failed to add to cart. Please try again.";
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!productData) return <div>No product found</div>;

  return (
    <section>
      {/* Display error notification if there's an error */}
      {error && (
        <ErrorNotification
          message={error}
          onClose={() => setError(null)} // Clear the error when the user clicks the close button
        />
      )}

      <div className="collection-wrapper">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <Slider
                asNavFor={nav2}
                ref={slider1}
                {...settings}
                className="mb-4"
              >
                {productData.images.map((image, index) => (
                  <div key={index} className="px-1">
                    <Image
                      src={image}
                      alt={`${productData.name} view ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg"
                      width={600}
                      height={600}
                      priority={index === 0}
                    />
                  </div>
                ))}
              </Slider>
              <Slider
                asNavFor={nav1}
                ref={slider2}
                {...settingsNav}
                className="px-2"
              >
                {productData.images.map((image, index) => (
                  <div key={index} className="px-1">
                    <Image
                      src={image}
                      alt={`${productData.name} thumbnail ${index + 1}`}
                      className="w-full h-auto object-cover rounded cursor-pointer"
                      width={150}
                      height={150}
                    />
                  </div>
                ))}
              </Slider>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl font-bold">{productData.name}</h2>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <i
                      key={index}
                      className={`fa fa-star ${
                        index < productData.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">
                  ({productData.reviews.length} customer reviews)
                </p>
              </div>

              <div className="text-2xl font-semibold text-primary">
                Kshs {productData.price.toFixed(2)}
              </div>

              <div className="border-t border-b py-4 space-y-4">
                <div>
                  <h6 className="text-sm font-semibold uppercase">Brand</h6>
                  <p className="mt-1">{productData.brand}</p>
                </div>
                <div>
                  <h6 className="text-sm font-semibold uppercase">Category</h6>
                  <p className="mt-1">{productData.category}</p>
                </div>
                <div>
                  <h6 className="text-sm font-semibold uppercase">
                    Stock Status
                  </h6>
                  <p className="mt-1 text-orange-600">
                    Please Hurry! Only {productData.stock} Left in Stock
                  </p>
                </div>
                <div>
                  <h6 className="text-sm font-semibold uppercase">Tags</h6>
                  <p className="mt-1">{productData.tags.join(", ")}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border rounded-md">
                    <button
                      className="px-3 py-2 text-gray-600 hover:text-primary disabled:opacity-50"
                      onClick={() => handleQuantityChange("minus")}
                      disabled={quantity <= 1}
                    >
                      <i className="fa fa-minus" />
                    </button>
                    <input
                      type="text"
                      className="w-16 text-center border-x"
                      value={quantity}
                      readOnly
                    />
                    <button
                      className="px-3 py-2 text-gray-600 hover:text-primary disabled:opacity-50"
                      onClick={() => handleQuantityChange("plus")}
                      disabled={quantity >= productData.stock}
                    >
                      <i className="fa fa-plus" />
                    </button>
                  </div>
                  <button
                    className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark disabled:opacity-50"
                    onClick={handleAddToCart}
                    disabled={productData.stock === 0}
                  >
                    {productData.stock === 0 ? "Out of Stock" : "Add to Cart"}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <button className="flex items-center gap-2 w-full py-2 px-4 hover:bg-gray-50 rounded-md transition-colors">
                  <i className="fa fa-heart text-gray-500" />
                  <span>Add to Wishlist</span>
                </button>
                <button className="flex items-center gap-2 w-full py-2 px-4 hover:bg-gray-50 rounded-md transition-colors">
                  <i className="fa fa-random text-gray-500" />
                  <span>Add to Compare</span>
                </button>
                <button className="flex items-center gap-2 w-full py-2 px-4 hover:bg-gray-50 rounded-md transition-colors">
                  <i className="fa fa-share-alt text-gray-500" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
