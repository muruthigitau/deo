import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getFromDB, saveToDB } from "@/utils/indexedDB";

const Cart = () => {
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
    const intervalId = setInterval(fetchCartItems, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const persistCart = async (updatedItems) => {
    try {
      const dbPayload = updatedItems.map((item) => ({
        product_id: item.productId,
        qty: item.quantity,
        product: item.product,
      }));
      await saveToDB("cart", { items: dbPayload });
    } catch (err) {
      console.error("Error saving cart to DB:", err);
    }
  };

  const updateQuantity = async (productId, change) => {
    const updatedItems = cartItems.map((item) =>
      item.productId === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    setCartItems(updatedItems);
    await persistCart(updatedItems);
  };

  const removeItem = async (productId) => {
    const updatedItems = cartItems.filter(
      (item) => item.productId !== productId
    );
    setCartItems(updatedItems);
    await persistCart(updatedItems);
  };

  const handleProceedToCheckout = async () => {
    await saveToDB("checkout", { items: cartItems });
    window.location.href = "/checkout";
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">Loading cart...</div>
    );
  if (error)
    return <div className="text-red-500 text-center py-10">{error}</div>;

  return (
    <div className="bg-gradient-to-b from-white to-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-green-700 mb-6 text-center">
          Your Shopping Cart
        </h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">
            Your cart is empty.
          </p>
        ) : (
          <>
            {/* Mobile Cards */}
            <div className="sm:hidden space-y-4">
              {cartItems.map((item) => {
                const product = item.product;
                return (
                  <div
                    key={item.productId}
                    className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4"
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={product.images?.[0].image || "/placeholder.jpg"}
                        alt={product.name || "Product"}
                        width={80}
                        height={80}
                        className="rounded object-cover w-20 h-20"
                      />
                      <div>
                        <Link
                          href={`/product/${item.productId}`}
                          className="text-gray-800 font-semibold hover:underline"
                        >
                          {product.name || "Product Name"}
                        </Link>
                        <div className="text-orange-600 font-bold mt-1">
                          Kshs {product.price}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="inline-flex items-center border rounded shadow-sm">
                        <button
                          className="px-3 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200"
                          onClick={() =>
                            item.quantity > 1 &&
                            updateQuantity(item.productId, -1)
                          }
                        >
                          −
                        </button>
                        <span className="px-4 font-semibold text-gray-700">
                          {item.quantity}
                        </span>
                        <button
                          className="px-3 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200"
                          onClick={() => updateQuantity(item.productId, 1)}
                        >
                          +
                        </button>
                      </div>
                      <div className="text-green-700 font-bold">
                        Kshs {(product.price * item.quantity).toFixed(2)}
                      </div>
                    </div>

                    <button
                      onClick={() => removeItem(item.productId)}
                      className="text-red-500 hover:text-red-700 font-semibold text-sm mt-2 self-end"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Desktop Table */}
            <div className="hidden sm:block overflow-x-auto rounded-lg shadow-md mt-6">
              <table className="min-w-full divide-y divide-gray-200 bg-white">
                <thead className="bg-green-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-bold text-green-800 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-bold text-green-800 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-green-800 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-bold text-green-800 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-sm font-bold text-green-800 uppercase tracking-wider">
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cartItems.map((item) => {
                    const product = item.product;
                    return (
                      <tr key={item.productId} className="hover:bg-green-50">
                        <td className="px-6 py-4 flex items-center gap-4">
                          <Image
                            src={
                              product.images?.[0].image || "/placeholder.jpg"
                            }
                            alt={product.name || "Product"}
                            width={60}
                            height={60}
                            className="rounded object-cover w-16 h-16"
                          />
                          <Link
                            href={`/product/${item.productId}`}
                            className="text-gray-800 font-medium hover:underline"
                          >
                            {product.name || "Product Name"}
                          </Link>
                        </td>
                        <td className="px-6 py-4 text-orange-600 font-semibold">
                          Kshs {product.price}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center border rounded shadow-sm">
                            <button
                              className="px-3 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200"
                              onClick={() =>
                                item.quantity > 1 &&
                                updateQuantity(item.productId, -1)
                              }
                            >
                              −
                            </button>
                            <span className="px-4 font-semibold text-gray-700">
                              {item.quantity}
                            </span>
                            <button
                              className="px-3 py-1 bg-orange-100 text-orange-700 hover:bg-orange-200"
                              onClick={() => updateQuantity(item.productId, 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right text-green-700 font-bold">
                          Kshs {(product.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="text-red-500 hover:text-red-700 font-bold text-lg"
                          >
                            ×
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="bg-green-100">
                    <td
                      colSpan={3}
                      className="px-6 py-4 text-right font-bold text-green-800"
                    >
                      Total:
                    </td>
                    <td className="px-6 py-4 text-right text-green-700 font-extrabold">
                      Kshs {totalPrice.toFixed(2)}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="mt-6 flex justify-center sm:justify-end">
              <button
                onClick={handleProceedToCheckout}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-200"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
