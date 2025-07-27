import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ErrorNotification from "./errornotification";
import { fetchData } from "@/utils/Api";
import Loader from "../Loader";
import MpesaPayment from "./MpesaPayment";
import { motion } from "framer-motion";

const OrderSummary = ({ order }) => {
  return (
    <motion.div
      className="space-y-6 p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <h3 className="text-2xl font-semibold text-gray-900 border-b pb-4">
        Order Details
      </h3>
      <div className="mt-4 space-y-3">
        {[
          ["Order ID:", order.id],
          ["Date:", new Date(order.created).toLocaleDateString()],
          ["Order Status:", order.status],
          [
            "Payment Status:",
            order.paid ? (
              <span className="text-green-600 font-semibold">Paid</span>
            ) : (
              <span className="text-yellow-600 font-semibold">Pending</span>
            ),
          ],
        ].map(([label, value], index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-600">{label}</span>
            <span className="font-medium">{value}</span>
          </div>
        ))}
      </div>
      <h3 className="text-2xl font-semibold text-gray-900 border-b pb-4">
        Items
      </h3>
      <div className="flex justify-between mt-4">
        <div>
          <span className="text-gray-600">{order?.item?.id}</span>
          <span className="ml-2 text-sm text-gray-500">
            (Qty: {order.quantity})
          </span>
        </div>
        <span className="font-semibold text-lg">KES {order.total}</span>
      </div>
      <div className="pt-4 space-y-3 border-t">
        {[
          ["Subtotal:", order.total - order.shipping],
          ["Shipping:", order.shipping],
          ["Total:", order.total],
        ].map(([label, value], index) => (
          <div
            key={index}
            className="flex justify-between text-lg font-semibold"
          >
            <span>{label}</span>
            <span>KES {value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const OrderPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    const fetchOrderData = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const response = await fetchData(`shop/public/order/${id}`, {});
        response?.data
          ? setOrderData(response.data)
          : setError("Order not found");
      } catch (err) {
        setError("Failed to load order data");
      } finally {
        setLoading(false);
      }
    };
    fetchOrderData();
  }, [id]);

  if (loading) return <Loader fullScreen message="Loading order..." />;
  if (error)
    return (
      <ErrorNotification message={error} onClose={() => router.push("/")} />
    );
  if (!orderData) return null;

  return (
    <div className="container mx-auto px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="text-center text-3xl font-bold text-gray-800 mb-8">
          {orderData.id}
        </div>
        <div
          className={`grid gap-8 ${
            orderData.paid ? "grid-cols-1" : "grid-cols-1 md:grid-cols-3"
          }`}
        >
          <div className="md:col-span-2">
            <OrderSummary order={orderData} />
          </div>
          {!orderData.paid && (
            <motion.div
              className="p-6 bg-white shadow-lg rounded-2xl border border-gray-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Payment</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="font-medium">Status:</span>
                  <span
                    className={`font-semibold ${
                      orderData.paid ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {orderData.paid ? "Paid" : "Pending"}
                  </span>
                </div>
                <MpesaPayment
                  orderNumber={orderData.id}
                  amount={orderData.balance}
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
