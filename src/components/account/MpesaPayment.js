import { useState, useEffect } from "react";
import { Loader2, CheckCircle, AlertCircle, Send } from "lucide-react";
import { toast } from "react-toastify";
import { postData, fetchData } from "@/utils/Api";

const MpesaPayment = ({ orderNumber, amount }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [stkPushSent, setStkPushSent] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [mpesaRequestId, setMpesaRequestId] = useState(null);
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Handle sending STK push
  const handleStkPush = async () => {
    if (!phoneNumber) {
      toast.error("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    const orderDetails = {
      order_id: orderNumber,
      phone: phoneNumber,
      amount: amount, // Replace with dynamic value as needed
    };

    try {
      const response = await postData(
        "method/shop/shop/api/order/MpesaPaymentAPI/",
        orderDetails
      );

      console.log("STK Push response:", response);

      if (response?.status === 201) {
        setMpesaRequestId(response?.data?.mpesa_request_id);
        setStkPushSent(true);
        toast.success("STK Push sent! Check your phone.");
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error initiating STK Push:", error);
      toast.error("Error initiating payment.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch payment status
  useEffect(() => {
    if (stkPushSent && mpesaRequestId) {
      setCheckingStatus(true);
      const interval = setInterval(async () => {
        try {
          const paymentStatusResponse = await fetchData(
            `method/shop/shop/api/order/MpesaPaymentAPI/`,
            { mpesa_request_id: mpesaRequestId }
          );

          if (paymentStatusResponse?.data?.status === "Completed") {
            setPaymentConfirmed(true);
            toast.success("Payment successful!");
            clearInterval(interval);
            setCheckingStatus(false);
          } else if (paymentStatusResponse?.data?.status === "Failed") {
            toast.error("Payment failed. Please try again.");
            clearInterval(interval);
            setCheckingStatus(false);
          }
        } catch (error) {
          console.error("Error checking payment status:", error);
          toast.error("Error checking payment status.");
          clearInterval(interval);
          setCheckingStatus(false);
        }
      }, 5000); // Check every 5 seconds

      return () => clearInterval(interval);
    }
  }, [stkPushSent, mpesaRequestId]);

  return (
    <div className="bg-white p-3 rounded-xl shadow-md border border-gray-200 mt-8 w-full max-w-sm mx-auto">
      <h2 className="text-lg font-semibold text-lime-700 mb-4">
        M-Pesa Payment
      </h2>

      <div className="mb-4">
        <p className="text-sm text-gray-700 mb-2">
          Enter your phone number to receive an M-Pesa STK Push request.
        </p>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-lime-600"
          placeholder="07XXXXXXXX"
        />
      </div>

      {/* Payment Status */}
      {paymentConfirmed ? (
        <div className="flex items-center justify-center gap-2 text-lime-700 text-sm bg-lime-100 p-3 rounded-md border border-lime-300">
          <CheckCircle className="w-5 h-5" />
          <span>Payment Confirmed! Thank you.</span>
        </div>
      ) : stkPushSent ? (
        <div className="flex items-center justify-center gap-2 text-yellow-700 text-sm bg-yellow-100 p-3 rounded-md border border-yellow-300">
          {checkingStatus ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Send className="w-5 h-5" />
          )}
          <span>
            STK Push Sent!{" "}
            {checkingStatus
              ? "Checking payment status..."
              : "Awaiting confirmation..."}
          </span>
        </div>
      ) : null}

      {/* Payment Button */}
      {!paymentConfirmed && !stkPushSent && (
        <button
          onClick={handleStkPush}
          disabled={loading || !phoneNumber}
          className={`w-full px-4 py-2 mt-4 rounded-md text-sm font-medium flex items-center justify-center gap-2 transition-all duration-300 ${
            loading
              ? "bg-lime-300 text-lime-800 cursor-not-allowed"
              : "bg-lime-600 text-white hover:bg-lime-700"
          }`}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending STK Push...
            </>
          ) : (
            "Pay with M-Pesa"
          )}
        </button>
      )}

      {/* Payment Failed Message & Retry Button */}
      {stkPushSent && !paymentConfirmed && !checkingStatus && (
        <div className="flex flex-col items-center justify-center gap-2 text-red-700 text-sm bg-red-100 p-3 rounded-md border border-red-300 mt-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>Payment failed. Please try again.</span>
          </div>
          <button
            onClick={handleStkPush}
            className="flex items-center gap-2 mt-2 px-4 py-2 rounded-md bg-lime-600 text-white text-sm font-medium hover:bg-lime-700 transition-all duration-300"
          >
            <Send className="w-4 h-4" />
            Resend STK Push
          </button>
        </div>
      )}
    </div>
  );
};

export default MpesaPayment;
