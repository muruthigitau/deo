import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import ErrorNotification from "./errornotification";
import BillingInfo from "./BillingInfo";
import ShippingAddress from "./ShippingAddress";
import OrderSummary from "./OrderSummary";
import { getFromDB } from "@/utils/indexedDB";
import { fetchData, postData } from "@/utils/Api";
import Loader from "../Loader";

const Checkout = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Main state management
  const [checkoutState, setCheckoutState] = useState({
    cart: {
      items: [],
      products: {},
      loading: true,
      error: null,
    },
    billing: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      validationErrors: {},
      touchedFields: {},
    },
    shipping: {
      address: {
        pickup_station: null,
        location_name: "",
        location_description: "",
        street_address: "",
        city: "",
        state: "",
        zip_code: "",
        deliveryOption: "pickup", // "pickup" or "custom"
      },
      locations: {
        list: [],
        loading: true,
        error: null,
      },
      cost: 0,
      isCostConfirmed: false,
    },
  });

  // Fetch all initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch cart data
        const [cartData, shippingLocations] = await Promise.all([
          getFromDB("cart"),
          fetchData("shop/public/locations/", {}),
        ]);

        setCheckoutState((prev) => ({
          ...prev,
          cart: {
            ...prev.cart,
            items: cartData?.items || [],
            products: cartData?.products || {},
            loading: false,
          },
          shipping: {
            ...prev.shipping,
            locations: {
              list: shippingLocations?.data?.data || [],
              loading: false,
              error: null,
            },
          },
        }));
      } catch (error) {
        setCheckoutState((prev) => ({
          ...prev,
          cart: {
            ...prev.cart,
            loading: false,
            error: "Failed to load checkout data",
          },
        }));
      }
    };

    fetchInitialData();
  }, []);

  // Handle billing info changes
  const handleBillingChange = (e) => {
    const { name, value } = e.target;

    setCheckoutState((prev) => ({
      ...prev,
      billing: {
        ...prev.billing,
        [name]: value,
      },
    }));

    // Validate if field was touched
    if (checkoutState.billing.touchedFields[name]) {
      const error = validateField(name, value);
      setCheckoutState((prev) => ({
        ...prev,
        billing: {
          ...prev.billing,
          validationErrors: {
            ...prev.billing.validationErrors,
            [name]: error,
          },
        },
      }));
    }
  };

  // Handle shipping address changes
  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setCheckoutState((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        address: {
          ...prev.shipping.address,
          [name]: value,
        },
      },
    }));
  };

  // Handle delivery option change
  const handleDeliveryOptionChange = (option) => {
    const newShippingCost = option === "pickup" ? 0 : 0;

    setCheckoutState((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        address: {
          ...prev.shipping.address,
          deliveryOption: option,
        },
        cost: newShippingCost,
        isCostConfirmed: option === "pickup", // Pickup always has confirmed cost
      },
    }));
  };

  // Handle pickup location selection
  const handlePickupSelection = (location) => {
    const updatedShipping = {
      deliveryOption: "pickup",
      pickup_station: location.id,
      location_name: location.name,
      location_description: location.description,
      street_address: location.street_address,
      city: location.city,
      cost: location.cost,
    };

    setCheckoutState((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        address: updatedShipping,
        cost: parseFloat(location.cost),
        isCostConfirmed: true,
      },
    }));
  };

  // Handle custom address selection
  const handleCustomAddressSelection = () => {
    const updatedShipping = {
      deliveryOption: "custom",
      pickup_station: null,
      cost: "0.00",
    };

    setCheckoutState((prev) => ({
      ...prev,
      shipping: {
        ...prev.shipping,
        address: updatedShipping,
        cost: 0,
        isCostConfirmed: false,
      },
    }));
  };

  // Calculate order totals
  const calculateTotal = () => {
    const subtotal = checkoutState.cart.items.reduce(
      (sum, item) =>
        sum + (parseFloat(item?.product?.price) || 0) * (item.qty || 0),
      0
    );
    return subtotal + checkoutState.shipping.cost;
  };

  // Validation helper
  const validateField = (name, value) => {
    if (!value?.trim()) return "This field is required";
    switch (name) {
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? "Invalid email" : "";
      case "phone":
        return !/^\d{10}$/.test(value) ? "Invalid phone number" : "";
      case "zip":
        return !/^\d{5}$/.test(value) ? "Invalid ZIP code" : "";
      default:
        return "";
    }
  };

  const handleConfirmOrder = async () => {
    setIsSubmitting(true); // Start loading

    try {
      // Format order details to match API expectations
      const orderDetails = {
        total: calculateTotal().toString(),
        shipping: checkoutState.shipping.cost.toString(),
        first_name: checkoutState.billing.firstName,
        last_name: checkoutState.billing.lastName,
        email: checkoutState.billing.email,
        phone_number: checkoutState.billing.phone,
        quantity: checkoutState.cart.items[0].qty,
        product_id: checkoutState.cart.items[0]?.product_id,
        ...(checkoutState.shipping.address.deliveryOption === "pickup"
          ? {
              pickup_station_id: checkoutState.shipping.address.pickup_station,
            }
          : {
              street_address: checkoutState.shipping.address.street_address,
              city: checkoutState.shipping.address.city,
              state: checkoutState.shipping.address.state,
              zip_code: checkoutState.shipping.address.zip_code,
              location_name: checkoutState.shipping.address.location_name,
              location_description:
                checkoutState.shipping.address.location_description,
            }),
        notes: "",
        status: "pending",
      };

      // Simulate API delay for demonstration
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await postData(
        "method/shop/shop/api/order/OrderAPI/",
        orderDetails
      );

      // After successful submission, you might redirect to payment
      router.push(
        `/checkout/${response?.data?.id || response?.data?.data?.id}`
      );
    } catch (error) {
      console.error("Error confirming order:", error);
      setCheckoutState((prev) => ({
        ...prev,
        cart: {
          ...prev.cart,
          error: "Failed to confirm order. Please try again.",
        },
      }));
    } finally {
      setIsSubmitting(false); // Stop loading regardless of success/error
    }
  };
  // Add this helper function to validate shipping address
  const isShippingAddressValid = () => {
    if (checkoutState.shipping.address.deliveryOption === "pickup") {
      return checkoutState.shipping.isCostConfirmed;
    } else {
      // For custom address, check required fields
      const requiredFields = ["location_name", "street_address", "city"];
      return requiredFields.every((field) =>
        checkoutState.shipping.address[field]?.trim()
      );
    }
  };

  // Update the isConfirmDisabled calculation
  const isConfirmDisabled =
    !isShippingAddressValid() ||
    Object.values(checkoutState.billing.validationErrors).some(Boolean) ||
    !checkoutState.billing.firstName ||
    !checkoutState.billing.lastName ||
    !checkoutState.billing.email ||
    !checkoutState.billing.phone;

  if (checkoutState.cart.loading) {
    return <Loader fullScreen message="Loading ..." />;
  }

  return (
    <>
      {checkoutState.cart.error && (
        <ErrorNotification
          message={checkoutState.cart.error}
          onClose={() =>
            setCheckoutState((prev) => ({
              ...prev,
              cart: { ...prev.cart, error: null },
            }))
          }
        />
      )}
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Loader className="h-12 w-12 text-white animate-spin" />
        </div>
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
          {/* Order Summary */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
            <OrderSummary
              cartItems={checkoutState.cart.items}
              products={checkoutState.cart.products}
              shippingInfo={checkoutState.shipping.address}
              shippingCost={checkoutState.shipping.cost}
              subtotal={calculateTotal() - checkoutState.shipping.cost}
              totalAmount={calculateTotal()}
            />
          </div>

          {/* Vertical Border */}
          <div className="hidden lg:block border-r border-gray-200"></div>

          {/* Checkout Steps */}
          <div className="space-y-8">
            {/* Billing Info */}
            <BillingInfo
              billingInfo={{
                firstName: checkoutState.billing.firstName,
                lastName: checkoutState.billing.lastName,
                email: checkoutState.billing.email,
                phone: checkoutState.billing.phone,
              }}
              validationErrors={checkoutState.billing.validationErrors}
              handleBlur={(e) => {
                const { name } = e.target;
                setCheckoutState((prev) => ({
                  ...prev,
                  billing: {
                    ...prev.billing,
                    touchedFields: {
                      ...prev.billing.touchedFields,
                      [name]: true,
                    },
                    validationErrors: {
                      ...prev.billing.validationErrors,
                      [name]: validateField(name, e.target.value),
                    },
                  },
                }));
              }}
              handleInputChange={handleBillingChange}
            />

            {/* Shipping Address */}
            <ShippingAddress
              shippingAddress={checkoutState.shipping.address}
              pickupLocations={checkoutState.shipping.locations.list}
              loading={checkoutState.shipping.locations.loading}
              error={checkoutState.shipping.locations.error}
              validationErrors={{}}
              handleInputChange={handleShippingChange}
              onDeliveryOptionChange={handleDeliveryOptionChange}
              onLocationSelect={handlePickupSelection}
              onCustomAddressSelect={handleCustomAddressSelection}
            />

            {/* Confirm Order Button */}
            <button
              onClick={handleConfirmOrder}
              disabled={isConfirmDisabled || isSubmitting}
              className={`w-full px-4 py-3 rounded-lg text-lg font-medium transition relative ${
                isConfirmDisabled || isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 text-white hover:bg-green-700"
              }`}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  Processing...
                </div>
              ) : (
                "Confirm Order & Proceed to Payment"
              )}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
