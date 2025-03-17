import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import ErrorNotification from "./errornotification";
import BillingInfo from "./BillingInfo";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary";
import MpesaPayment from "./MpesaPayment";

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
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});

  useEffect(() => {
    const fetchCheckoutData = async () => {
      try {
        const response = await axios.get("/api/checkout");
        setCartItems(response.data.items || []);
        setProducts(response.data.products || {});
      } catch (err) {
        setError("Failed to load checkout details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCheckoutData();
  }, []);

  const validateField = (name, value) => {
    let error = "";
    if (!value.trim()) {
      error = "This field is required.";
    } else {
      if (name === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        error = "Invalid email.";
      if (name === "phone" && !/^\d{10}$/.test(value)) error = "Invalid phone.";
      if (name === "zip" && !/^\d{5}$/.test(value)) error = "Invalid ZIP.";
    }
    return error;
  };

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));

    if (touchedFields[name]) {
      const error = validateField(name, value);
      setValidationErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouchedFields((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setValidationErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handlePlaceOrder = async () => {
    try {
      setIsPlacingOrder(true);
      setError(null);
      const orderData = {
        orderId: `ORD-${Math.floor(Math.random() * 100000)}`,
        billingInfo,
        shippingAddress,
        items: cartItems,
      };
      const response = await axios.post("/api/order", orderData);
      if (response.data?.transactionId) {
        setOrderPlaced(true);
        router.push({
          pathname: "/order-success",
          query: { orderDetails: JSON.stringify(response.data) },
        });
      } else {
        throw new Error("Order failed.");
      }
    } catch (err) {
      setError("Failed to place order. Try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-orange-500">
        Loading checkout...
      </div>
    );
  }

  const subTotal = cartItems.reduce(
    (sum, item) => sum + (products[item.productId]?.price || 0) * item.quantity,
    0
  );
  const shippingFee = 0.0;
  const tax = subTotal * 0.05;
  const totalAmount = subTotal + tax + shippingFee;

  return (
    <>
      {error && (
        <ErrorNotification message={error} onClose={() => setError(null)} />
      )}
      <div className="breadcrumb-section bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-semibold text-gray-700">Checkout</h2>
          <nav className="text-sm text-gray-500 mt-2">
            <ol className="flex space-x-2">
              <li>
                <Link href="/" className="hover:underline text-blue-600">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-600 font-medium">Checkout</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="checkout-section section-b-space py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-[1fr_1px_2fr] gap-8">
          {/* Left - Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
            <OrderSummary
              cartItems={cartItems}
              products={products}
              subTotal={subTotal}
              shippingFee={shippingFee}
              tax={tax}
              totalAmount={totalAmount}
            />
          </div>

          {/* Vertical Border */}
          <div className="hidden lg:block border-r border-gray-200"></div>

          {/* Right - All Steps */}
          <div className="space-y-8">
            {/* Billing Info */}
            <BillingInfo
              billingInfo={billingInfo}
              setBillingInfo={setBillingInfo}
              validationErrors={validationErrors}
              handleBlur={handleBlur}
              handleInputChange={(e) => handleInputChange(e, setBillingInfo)}
            />

            {/* Shipping Address */}
            <ShippingAddress
              shippingAddress={shippingAddress}
              setShippingAddress={setShippingAddress}
              validationErrors={validationErrors}
              handleBlur={handleBlur}
              handleInputChange={(e) =>
                handleInputChange(e, setShippingAddress)
              }
            />

            {/* Payment */}
            <MpesaPayment
              orderId={`ORD-${Math.floor(Math.random() * 100000)}`}
              amount={totalAmount}
            />

            {/* Place Order Button */}
            <button
              onClick={handlePlaceOrder}
              className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition duration-300"
              disabled={isPlacingOrder}
            >
              {isPlacingOrder
                ? "Placing Order..."
                : "Confirm Payment & Place Order"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
