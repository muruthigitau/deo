import { useState } from "react";
import { Loader2, CheckCircle } from "lucide-react";

const MpesaPayment = ({ orderNumber = "ORD123456", paybill = "123456" }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [stkPushSent, setStkPushSent] = useState(false);

  const handleConfirmPayment = () => {
    setLoading(true);
    // Simulate confirmation delay
    setTimeout(() => {
      setLoading(false);
      setPaymentConfirmed(true);
    }, 3000);
  };

  const handleStkPush = () => {
    if (!phoneNumber) return;
    setLoading(true);
    // Simulate STK Push delay
    setTimeout(() => {
      setLoading(false);
      setStkPushSent(true);
    }, 4000);
  };

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mt-8">
      <div className="text-sm font-semibold text-lime-700 mb-2">
        M-Pesa Payment
      </div>

      {/* Paybill Details */}
      <div className="mb-5">
        <div className="text-xs text-gray-700 mb-2">
          Pay via M-Pesa using the details below:
        </div>
        <div className="bg-gray-50 border border-gray-200 rounded p-2 text-xs mb-3">
          <div>
            <span className="font-semibold text-gray-800">Paybill Number:</span>{" "}
            <span className="text-lime-700">{paybill}</span>
          </div>
          <div>
            <span className="font-semibold text-gray-800">Account Number:</span>{" "}
            <span className="text-lime-700">{orderNumber}</span>
          </div>
        </div>

        {paymentConfirmed ? (
          <div className="flex items-center gap-2 text-lime-700 text-xs">
            <CheckCircle className="w-4 h-4" />
            Payment Confirmed! Thank you.
          </div>
        ) : (
          <button
            onClick={handleConfirmPayment}
            disabled={loading}
            className={`w-full px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 mb-3 ${
              loading
                ? "bg-lime-200 text-lime-800 cursor-not-allowed"
                : "bg-lime-600 text-white hover:bg-lime-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                Confirming...
              </span>
            ) : (
              "Confirm Payment"
            )}
          </button>
        )}
      </div>

      <div className="border-t border-gray-200 mb-3" />

      {/* STK Push */}
      <div>
        <div className="text-xs text-gray-700 mb-2">
          Or initiate M-Pesa STK Push:
        </div>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-3 text-xs"
          placeholder="Enter M-Pesa Phone Number e.g., 07XXXXXXXX"
        />

        {stkPushSent ? (
          <div className="flex items-center gap-2 text-lime-700 text-xs">
            <CheckCircle className="w-4 h-4" />
            STK Push Sent! Await confirmation.
          </div>
        ) : (
          <button
            onClick={handleStkPush}
            disabled={loading || !phoneNumber}
            className={`w-full px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
              loading
                ? "bg-lime-200 text-lime-800 cursor-not-allowed"
                : "bg-lime-600 text-white hover:bg-lime-700"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-3 h-3 animate-spin" />
                Sending STK Push...
              </span>
            ) : (
              "Pay with M-Pesa"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default MpesaPayment;
