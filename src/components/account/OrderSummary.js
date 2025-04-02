import Image from "next/image";

const OrderSummary = ({
  cartItems = [],
  shippingInfo = null,
  subtotal = 0,
  shippingCost = 0,
  totalAmount = 0,
}) => {
  // Calculate item count for display
  const itemCount = cartItems.reduce((sum, item) => sum + (item.qty || 0), 0);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-semibold text-lime-700">Order Summary</h2>
        <p className="text-sm text-gray-500 mt-1">
          {itemCount} {itemCount === 1 ? "item" : "items"} in cart
        </p>
      </div>

      {/* Shipping Method Display */}
      {shippingInfo && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-800 mb-2">Shipping Method:</h3>
          {shippingInfo.deliveryOption === "pickup" ? (
            <div>
              <p className="text-sm font-medium">
                Pickup: {shippingInfo.location_name}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {shippingInfo.street_address}, {shippingInfo.city}
              </p>
            </div>
          ) : (
            <div>
              <p className="text-sm font-medium">
                Delivery to: {shippingInfo.location_name || "Custom Address"}
              </p>
              <p className="text-xs text-gray-600 mt-1">
                {shippingInfo.street_address}, {shippingInfo.city}
              </p>
            </div>
          )}
          <p className="text-sm font-medium mt-2">
            Shipping Cost: Kshs {shippingCost.toFixed(2)}
          </p>
        </div>
      )}

      {/* Items List */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {cartItems?.map((item) => {
          const product = item.product || {};
          return (
            <div
              key={item.productId}
              className="flex items-center gap-4 bg-orange-50 p-4 rounded-lg shadow-sm"
            >
              <div className="relative w-16 h-16 flex-shrink-0">
                <Image
                  src={product.images?.[0]?.image || "/placeholder.jpg"}
                  alt={product.name || "Product"}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-800 font-medium text-sm truncate">
                  {product.name || "Product Name"}
                </p>
                <p className="text-gray-600 text-xs mt-1">
                  Qty: {item.qty} × Kshs {parseFloat(product?.price) || "0.00"}
                </p>
              </div>
              <div className="text-lime-700 font-semibold text-sm">
                Kshs {(parseFloat(product?.price) || 0) * item.qty}
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Totals */}
      <div className="mt-6 space-y-3 border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Subtotal:</span>
          <span className="font-medium">Kshs {subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-700">Shipping:</span>
          <span className="font-medium">Kshs {shippingCost.toFixed(2)}</span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200 mt-2">
          <span className="text-lg font-bold text-gray-800">Total:</span>
          <span className="text-lg font-bold text-lime-700">
            Kshs {totalAmount.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
