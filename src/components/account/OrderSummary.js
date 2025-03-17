import { useState, useEffect } from "react";
import Image from "next/image";
import { getFromDB } from "@/utils/indexedDB";

const OrderSummary = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCartItems = async () => {
    try {
      const dbData = await getFromDB("cart");
      const items = dbData?.items || [];

      const mappedItems = items.map((item) => ({
        productId: item.product_id,
        quantity: item.qty,
        product: item.product || {
          id: item.product_id,
          name: "Unknown Product",
          price: 0,
          images: ["/placeholder.jpg"],
        },
      }));

      setCartItems(mappedItems);
      setLoading(false);
    } catch (err) {
      console.error("Error loading cart:", err);
      setError("Failed to load cart items.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  // Default shipping cost
  const shippingCost = 0;

  // Calculate subtotal, shipping, and total
  const subtotal = totalPrice;
  const total = subtotal + shippingCost;

  if (loading)
    return (
      <div className="text-center py-6 text-gray-600 text-sm">
        Loading summary...
      </div>
    );
  if (error)
    return <div className="text-red-500 text-center py-6 text-sm">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 max-w-3xl mx-auto">
      <div className="text-center mb-4">
        <p className="text-2xl font-semibold text-lime-700">Order Summary</p>
      </div>

      {/* Mobile Cards */}
      <div className="sm:hidden space-y-4">
        {cartItems.map((item) => {
          const product = item.product;
          return (
            <div
              key={item.productId}
              className="flex items-center gap-3 bg-orange-50 p-4 rounded-lg shadow-sm"
            >
              <Image
                src={product.images?.[0].image || "/placeholder.jpg"}
                alt={product.name || "Product"}
                width={60}
                height={60}
                className="rounded-lg object-cover w-14 h-14"
              />
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm truncate">
                  {product.name || "Product Name"}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Qty: {item.quantity} × Kshs {product.price}
                </p>
                <p className="text-lime-700 font-semibold text-sm mt-1">
                  Kshs {(product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Desktop Cards */}
      <div className="hidden sm:block space-y-4">
        {cartItems.map((item) => {
          const product = item.product;
          return (
            <div
              key={item.productId}
              className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg shadow-sm"
            >
              <Image
                src={product.images?.[0].image || "/placeholder.jpg"}
                alt={product.name || "Product"}
                width={80}
                height={80}
                className="rounded-lg object-cover w-16 h-16"
              />
              <div className="flex-1">
                <p className="text-gray-800 font-medium text-sm truncate">
                  {product.name || "Product Name"}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Qty: {item.quantity} × Kshs {product.price}
                </p>
                <p className="text-lime-700 font-semibold text-sm mt-1">
                  Kshs {(product.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pricing Breakdown */}
      <div className="mt-6 space-y-4">
        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium text-gray-800">Subtotal:</p>
          <p className="text-lg font-semibold text-lime-700">
            Kshs {subtotal.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-center bg-orange-100 p-4 rounded-lg shadow-sm">
          <p className="text-lg font-medium text-gray-800">Shipping:</p>
          <p className="text-lg font-semibold text-lime-700">
            Kshs {shippingCost.toFixed(2)}
          </p>
        </div>

        <div className="flex justify-between items-center bg-lime-100 p-4 rounded-lg shadow-sm">
          <p className="text-xl font-bold text-gray-800">Total:</p>
          <p className="text-xl font-bold text-lime-700">
            Kshs {total.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
