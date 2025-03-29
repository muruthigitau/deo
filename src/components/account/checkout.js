import { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/router";
import ErrorNotification from "./errornotification";
import BillingInfo from "./BillingInfo";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary";
import MpesaPayment from "./MpesaPayment";
import fetchShippingCost from "./shippingcost";

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
    deliveryOption: "deliver", // "deliver" or "pickup"
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [shippingFee, setShippingFee] = useState(0.0);
  const [isShippingCostFetched, setIsShippingCostFetched] = useState(false);

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

  const handleDeliveryOptionChange = (option) => {
    console.log("Delivery Option Changed:", option);
    setShippingAddress((prev) => ({ ...prev, deliveryOption: option }));

    if (option === "pickup") {
      setShippingFee(0.0);
      setIsShippingCostFetched(true); // Mark shipping cost as confirmed for pickup
      console.log("Shipping Cost Set to 0 for Pickup");
    } else if (option === "deliver") {
      setShippingFee(0.0); // Reset shipping fee for delivery until fetched
      setIsShippingCostFetched(false); // Reset shipping cost confirmation for delivery
      console.log(
        "Delivery Option Set to Deliver. Awaiting Address Confirmation."
      );
    }
  };

  const handleShippingAddressChange = async (e) => {
    const { name, value } = e.target;
    handleInputChange(e, setShippingAddress);

    if (shippingAddress.deliveryOption === "deliver") {
      const updatedAddress = { ...shippingAddress, [name]: value };

      console.log("Delivery Option: Deliver");
      console.log("Updated Address:", updatedAddress);

      if (
        updatedAddress.street &&
        updatedAddress.city &&
        updatedAddress.state &&
        updatedAddress.zip
      ) {
        try {
          const cost = await fetchShippingCost(updatedAddress);
          setShippingFee(cost);
          setIsShippingCostFetched(true);
          console.log("Shipping Cost Fetched:", cost);
        } catch (error) {
          setError("Failed to fetch shipping cost.");
          setIsShippingCostFetched(false);
          console.error("Error fetching shipping cost:", error);
        }
      }
    }
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
  const tax = subTotal * 0.05;
  const totalAmount = subTotal + tax + shippingFee;

  const isPlaceOrderDisabled =
    isPlacingOrder ||
    !isShippingCostFetched || // Ensure shipping cost is confirmed
    Object.values(validationErrors).some(Boolean);

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
              handleInputChange={handleShippingAddressChange}
              onDeliveryOptionChange={handleDeliveryOptionChange} // Pass the handler to ShippingAddress
            />

            {/* Block Payment Section if Shipping Cost is Not Confirmed */}
            {!isShippingCostFetched ? (
              <div className="text-red-500 text-center py-4">
                Please confirm your shipping cost to proceed with payment.
              </div>
            ) : (
              <>
                {/* Payment */}
                <MpesaPayment
                  orderId={`ORD-${Math.floor(Math.random() * 100000)}`}
                  amount={totalAmount}
                />

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  className={`w-full px-4 py-2 rounded transition duration-300 ${
                    isPlaceOrderDisabled
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                  disabled={isPlaceOrderDisabled}
                >
                  {isPlacingOrder
                    ? "Placing Order..."
                    : "Confirm Payment & Place Order"}
                </button>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
