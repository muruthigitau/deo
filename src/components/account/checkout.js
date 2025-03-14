import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { mockProductData } from "@/data/mockProduct";

const Checkout = () => {
  // State management
  const [orderData, setOrderData] = useState(null);
  const [promoCode, setPromoCode] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/cart");
        const cartData = response.data;

        // Fetch product details
        const productRequests = cartData.items.map((item) =>
          axios
            .get(`/api/product/${item.productId}`)
            .then((res) => res.data)
            .catch(() => {
              console.error(
                `Failed to fetch product ${item.productId}, using mock data.`
              );
              return { ...mockProductData, id: item.productId };
            })
        );

        const productsData = await Promise.all(productRequests);
        const productMap = productsData.reduce((acc, product) => {
          acc[product.id] = product;
          return acc;
        }, {});

        setOrderData({ cartData, products: productMap });
      } catch (err) {
        console.error("Error fetching order data:", err);
        setError("Failed to load order data");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderData();
  }, []);

  const handleBillingInfoChange = (e) => {
    const { name, value } = e.target;
    setBillingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("/api/checkout", {
        cartId: orderData.cartData.cartId,
        billingInfo,
      });
      console.log("Order placed:", response.data);
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      {orderData && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
          <ul className="mb-4">
            {orderData.cartData.items.map((item) => (
              <li key={item.productId} className="flex items-center mb-2">
                <Image
                  src={orderData.products[item.productId].image}
                  alt={orderData.products[item.productId].name}
                  width={50}
                  height={50}
                />
                <div className="ml-4">
                  <p className="font-medium">
                    {orderData.products[item.productId].name}
                  </p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${orderData.products[item.productId].price}</p>
                </div>
              </li>
            ))}
          </ul>
          <h3 className="text-lg font-semibold">
            Total: ${orderData.cartData.total}
          </h3>
        </div>
      )}
      <section className="section-b-space checkout-section-2">
        <div className="container">
          <div className="checkout-page">
            <div className="checkout-form">
              <div className="row g-sm-4 g-3">
                <div className="col-lg-7">
                  <div className="left-sidebar-checkout">
                    <div className="checkout-detail-box">
                      <ul>
                        {/* Billing Information */}
                        <li>
                          <div className="checkout-box">
                            <div className="checkout-title">
                              <h4 className="text-lg font-semibold mb-2">
                                Billing Information
                              </h4>
                            </div>
                            <div className="checkout-detail">
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="firstName"
                                      className="form-label"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control border p-2 rounded w-full"
                                      id="firstName"
                                      name="firstName"
                                      value={billingInfo.firstName}
                                      onChange={handleBillingInfoChange}
                                      placeholder="Enter your first name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control border p-2 rounded w-full"
                                      id="lastName"
                                      name="lastName"
                                      value={billingInfo.lastName}
                                      onChange={handleBillingInfoChange}
                                      placeholder="Enter your last name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control border p-2 rounded w-full"
                                      id="email"
                                      name="email"
                                      value={billingInfo.email}
                                      onChange={handleBillingInfoChange}
                                      placeholder="Enter your email"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="phone"
                                      className="form-label"
                                    >
                                      Phone
                                    </label>
                                    <input
                                      type="tel"
                                      className="form-control border p-2 rounded w-full"
                                      id="phone"
                                      name="phone"
                                      value={billingInfo.phone}
                                      onChange={handleBillingInfoChange}
                                      placeholder="Enter your phone number"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                        {/* Payment Options */}
                        <li>
                          <div className="checkout-box">
                            <div className="checkout-title">
                              <h4 className="text-lg font-semibold mb-2">
                                Payment Options
                              </h4>
                            </div>
                            <div className="checkout-detail">
                              <p>Mpesa</p>
                            </div>
                          </div>
                        </li>
                        {/* Promo Code */}
                        <li>
                          <div className="checkout-box">
                            <div className="checkout-title">
                              <h4 className="text-lg font-semibold mb-2">
                                Promo Code
                              </h4>
                            </div>
                            <div className="checkout-detail">
                              <input
                                type="text"
                                className="form-control border p-2 rounded w-full"
                                value={promoCode}
                                onChange={(e) => setPromoCode(e.target.value)}
                                placeholder="Enter Promo Code"
                              />
                            </div>
                          </div>
                        </li>
                      </ul>
                      <button
                        onClick={handlePlaceOrder}
                        className="btn btn-primary mt-4 bg-blue-500 text-white p-2 rounded"
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-lg-5">
                  {/* Order Summary */}
                  <div className="order-summary bg-gray-100 p-4 rounded shadow">
                    <h4 className="text-lg font-semibold mb-2">
                      Order Summary
                    </h4>
                    <ul>
                      {orderData.cartData.items.map((item) => (
                        <li
                          key={item.productId}
                          className="flex items-center mb-2"
                        >
                          <Image
                            src={orderData.products[item.productId].image}
                            alt={orderData.products[item.productId].name}
                            width={50}
                            height={50}
                          />
                          <div className="ml-4">
                            <p className="font-medium">
                              {orderData.products[item.productId].name}
                            </p>
                            <p>Quantity: {item.quantity}</p>
                            <p>
                              Price: ${orderData.products[item.productId].price}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <h3 className="text-lg font-semibold mt-4">
                      Total: ${orderData.cartData.total}
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Checkout;
