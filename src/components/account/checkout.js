import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { mockProductData } from "@/data/mockProduct";

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [useMpesa, setUseMpesa] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await axios.get("/api/checkout");
        setCartItems(response.data.items || []);
        setProducts(response.data.products || {});
      } catch (err) {
        console.error("Error fetching checkout data:", err);
        setError("Failed to load checkout details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCheckoutData();
  }, []);

  const handleInputChange = (e, setState) => {
    setState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    try {
      const totalAmount = cartItems.reduce(
        (sum, item) =>
          sum + (products[item.productId]?.price || 0) * item.quantity,
        0
      );

      const orderData = {
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
        totalAmount,
        billingInfo,
        shippingAddress,
        paymentMethod: useMpesa ? "M-Pesa" : "Card",
        items: cartItems,
        status: "Processing",
      };

      await axios.post("/api/order", orderData);
      setOrderSuccess(orderData);
    } catch (err) {
      console.error("Error placing order:", err);
      setError("Failed to place order.");
    }
  };

  if (loading) return <div>Loading checkout...</div>;
  if (error) return <div className="error-message">{error}</div>;

  const subTotal = cartItems.reduce(
    (sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity,
    0
  );
  const shippingFee = 0.0;
  const tax = subTotal * 0.05;
  const totalAmount = subTotal + tax + shippingFee;

  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>Checkout</h2>
          <nav className="theme-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Checkout</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="checkout-section section-b-space">
        <div className="container">
          {orderSuccess ? (
            <div className="order-success-message bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-600">
                🎉 Order Confirmed!
              </h2>
              <p>Order ID: {orderSuccess.orderId}</p>
              <p>Total: ${orderSuccess.totalAmount.toFixed(2)}</p>
              <p>Status: {orderSuccess.status}</p>
              <p>Thank you, {orderSuccess.billingInfo.firstName}!</p>
            </div>
          ) : (
            <>
              {/* Order Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                <div className="table-responsive">
                  <table className="table cart-table">
                    <thead>
                      <tr className="table-head">
                        <th>Image</th>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cartItems.map((item) => {
                        const product =
                          products[item.productId] || mockProductData;
                        return (
                          <tr key={item.productId}>
                            <td>
                              <Image
                                src={product.images?.[0] || "/placeholder.jpg"}
                                className="img-fluid"
                                alt={product.name}
                                width={60}
                                height={60}
                                className="rounded-md shadow-sm"
                              />
                            </td>
                            <td>{product.name}</td>
                            <td>${product.price?.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>
                              ${(product.price * item.quantity).toFixed(2)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Billing & Shipping Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Billing Information */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Billing Information
                  </h2>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md mb-3"
                    name="firstName"
                    value={billingInfo.firstName}
                    onChange={(e) => handleInputChange(e, setBillingInfo)}
                    placeholder="First Name"
                  />
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md mb-3"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={(e) => handleInputChange(e, setBillingInfo)}
                    placeholder="Last Name"
                  />
                  <input
                    type="email"
                    className="w-full p-3 border rounded-md mb-3"
                    name="email"
                    value={billingInfo.email}
                    onChange={(e) => handleInputChange(e, setBillingInfo)}
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    className="w-full p-3 border rounded-md"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={(e) => handleInputChange(e, setBillingInfo)}
                    placeholder="Phone"
                  />
                </div>

                {/* Shipping Address */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold mb-4">
                    Shipping Address
                  </h2>
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md mb-3"
                    name="street"
                    value={shippingAddress.street}
                    onChange={(e) => handleInputChange(e, setShippingAddress)}
                    placeholder="Street Address"
                  />
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md mb-3"
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) => handleInputChange(e, setShippingAddress)}
                    placeholder="City"
                  />
                </div>
              </div>

              {/* Billing Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-8 mb-8">
                <h2 className="text-xl font-semibold mb-4">Billing Summary</h2>
                <p>Subtotal: ${subTotal.toFixed(2)}</p>
                <p>Shipping: ${shippingFee.toFixed(2)}</p>
                <p>Tax: ${tax.toFixed(2)}</p>
                <p className="text-lg font-bold">
                  Total: ${totalAmount.toFixed(2)}
                </p>
              </div>

              <button
                className="mt-10 px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-700 transition-all duration-300"
                onClick={handlePlaceOrder}
              >
                Pay with M-Pesa
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Checkout;
