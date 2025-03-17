import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/router";
import { mockProductData } from "@/data/mockProduct";
import ErrorNotification from "./errornotification"; // Import the ErrorNotification component

const Checkout = () => {
  const router = useRouter();
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Track validation errors
  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  // Track whether fields have been touched
  const [touchedFields, setTouchedFields] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    street: false,
    city: false,
    state: false,
    zip: false,
  });

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

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "firstName":
      case "lastName":
      case "street":
      case "city":
      case "state":
        if (!value.trim()) error = "This field is required.";
        break;
      case "email":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Invalid email address.";
        }
        break;
      case "phone":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (!/^\d{10}$/.test(value)) {
          error = "Invalid phone number.";
        }
        break;
      case "zip":
        if (!value.trim()) {
          error = "This field is required.";
        } else if (!/^\d{5}$/.test(value)) {
          error = "Invalid ZIP code.";
        }
        break;
      default:
        break;
    }
    return error;
  };

  // Handle input change and validate
  const handleInputChange = (e, setState, stateName) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));

    // Validate the field if it has been touched
    if (touchedFields[name]) {
      const error = validateField(name, value);
      setValidationErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  // Handle blur event (when a field loses focus)
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Check if all fields are valid
  const isFormValid = () => {
    return Object.values(validationErrors).every((error) => !error);
  };

  const handlePlaceOrder = async () => {
    try {
      setError(null); // Clear previous errors
      setIsPlacingOrder(true); // Show loading state

      // Validate all fields before submitting
      const newValidationErrors = {};
      Object.keys(billingInfo).forEach((key) => {
        newValidationErrors[key] = validateField(key, billingInfo[key]);
      });
      Object.keys(shippingAddress).forEach((key) => {
        newValidationErrors[key] = validateField(key, shippingAddress[key]);
      });
      setValidationErrors(newValidationErrors);

      // Check if any field is invalid
      if (!isFormValid()) {
        setError("Please fix the errors before placing the order.");
        setIsPlacingOrder(false);
        return;
      }

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
        items: cartItems,
      };

      // Send order request to API
      const response = await axios.post("/api/order", orderData);

      // Debugging: Log the response
      console.log("API Response:", response);

      if (response.data && response.data.transactionId) {
        // Order placed successfully, redirect to order success page
        setOrderPlaced(true);
        router.push({
          pathname: "/order-success",
          query: { orderDetails: JSON.stringify(response.data) },
        });
      } else {
        throw new Error("Order processing failed. No transaction ID received.");
      }
    } catch (err) {
      console.error("Error placing order:", err);

      // Extract the error message from the AxiosError
      let errorMessage = "Failed to place order. Please try again.";
      if (err.response) {
        // Use the error message from the backend if available
        errorMessage = err.response.data.error || errorMessage;
      } else if (err.request) {
        // Handle network errors
        errorMessage = "Network error. Please check your connection.";
      }

      setError(errorMessage);
      setIsPlacingOrder(false);
    }
  };

  if (loading) return <div>Loading checkout...</div>;

  const subTotal = cartItems.reduce(
    (sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity,
    0
  );
  const shippingFee = 0.0;
  const tax = subTotal * 0.05;
  const totalAmount = subTotal + tax + shippingFee;

  return (
    <>
      {/* Display error notification if there's an error */}
      {error && (
        <ErrorNotification
          message={error}
          onClose={() => setError(null)} // Clear the error when the user clicks the close button
        />
      )}

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
          {orderPlaced ? (
            <div className="order-placed-message bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-green-600">
                🎉 Order Placed!
              </h2>
              <p>Your order has been successfully placed.</p>
              <p>Please wait while we process your payment...</p>
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
                            <td>Kshs {product.price?.toFixed(2)}</td>
                            <td>{item.quantity}</td>
                            <td>
                              Kshs {(product.price * item.quantity).toFixed(2)}
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
                    onChange={(e) =>
                      handleInputChange(e, setBillingInfo, "billingInfo")
                    }
                    onBlur={handleBlur}
                    placeholder="First Name"
                  />
                  {validationErrors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.firstName}
                    </p>
                  )}
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md mb-3"
                    name="lastName"
                    value={billingInfo.lastName}
                    onChange={(e) =>
                      handleInputChange(e, setBillingInfo, "billingInfo")
                    }
                    onBlur={handleBlur}
                    placeholder="Last Name"
                  />
                  {validationErrors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.lastName}
                    </p>
                  )}
                  <input
                    type="email"
                    className="w-full p-3 border rounded-md mb-3"
                    name="email"
                    value={billingInfo.email}
                    onChange={(e) =>
                      handleInputChange(e, setBillingInfo, "billingInfo")
                    }
                    onBlur={handleBlur}
                    placeholder="Email"
                  />
                  {validationErrors.email && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.email}
                    </p>
                  )}
                  <input
                    type="tel"
                    className="w-full p-3 border rounded-md"
                    name="phone"
                    value={billingInfo.phone}
                    onChange={(e) =>
                      handleInputChange(e, setBillingInfo, "billingInfo")
                    }
                    onBlur={handleBlur}
                    placeholder="Phone"
                  />
                  {validationErrors.phone && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.phone}
                    </p>
                  )}
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
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        setShippingAddress,
                        "shippingAddress"
                      )
                    }
                    onBlur={handleBlur}
                    placeholder="Street Address"
                  />
                  {validationErrors.street && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.street}
                    </p>
                  )}
                  <input
                    type="text"
                    className="w-full p-3 border rounded-md mb-3"
                    name="city"
                    value={shippingAddress.city}
                    onChange={(e) =>
                      handleInputChange(
                        e,
                        setShippingAddress,
                        "shippingAddress"
                      )
                    }
                    onBlur={handleBlur}
                    placeholder="City"
                  />
                  {validationErrors.city && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Billing Summary */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-8 mb-8">
                <h2 className="text-xl font-semibold mb-4">Billing Summary</h2>
                <p>Subtotal: Kshs {subTotal.toFixed(2)}</p>
                <p>Shipping: Kshs {shippingFee.toFixed(2)}</p>
                <p>Tax: Kshs {tax.toFixed(2)}</p>
                <p className="text-lg font-bold">
                  Total: Kshs {totalAmount.toFixed(2)}
                </p>
              </div>

              <button
                className="mt-10 px-6 py-3 bg-green-600 text-white text-sm font-medium rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 disabled:bg-gray-400"
                onClick={handlePlaceOrder}
                disabled={!isFormValid() || isPlacingOrder}
              >
                {isPlacingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Checkout;
