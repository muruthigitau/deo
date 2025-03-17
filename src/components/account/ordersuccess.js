import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const OrderSuccess = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Mock order data
  const mockOrder = {
    orderId: "ORD-12345",
    totalAmount: 10000.0, // KSh
    billingInfo: {
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      phone: "0712345678",
    },
    shippingAddress: {
      street: "123 Main St",
      city: "Nairobi",
      state: "Nairobi",
      zip: "00100",
    },
    items: [
      {
        productId: "PROD-001",
        name: "Product 1",
        image: "/placeholder.jpg",
        quantity: 2,
        price: 5000.0, // KSh
      },
    ],
    status: "Confirmed",
    transactionId: "TXN_ORD-12345",
    paymentMethod: "M-Pesa",
  };

  useEffect(() => {
    // Simulate an API failure and use mock data
    setTimeout(() => {
      setOrder(mockOrder);
      setError("Failed to fetch order details. Displaying mock data.");
      setLoading(false);
    }, 1000);
  }, []);

  const handlePrintReceipt = () => {
    const printContent = document.getElementById("print-receipt").innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload(); // Reload to restore original page
  };

  if (loading) return <p>Loading your order...</p>;

  return (
    <>
      {/* Thank You Section */}
      <section className="thank-you-section">
        <div className="container text-center">
          <h2 className="thank-you-title"> Thank You! </h2>
          <p className="thank-you-text">
            Your payment was successfully processed, and your order is on the
            way.
          </p>
          <p className="font-weight-bold transaction-id">
            Transaction ID: {order.transactionId}
          </p>
        </div>
      </section>

      {/* Receipt Preview */}
      <div id="print-receipt" className="receipt-preview">
        <section className="section-b-space">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <h4>Order Summary</h4>
                <ul className="order-detail">
                  <li>
                    <strong>Order ID:</strong> {order.orderId}
                  </li>
                  <li>
                    <strong>Order Total:</strong> KSh{" "}
                    {order.totalAmount.toLocaleString()}
                  </li>
                  <li>
                    <strong>Payment Method:</strong> {order.paymentMethod}
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <h4>Billing Information</h4>
                <p>
                  {order.billingInfo.firstName} {order.billingInfo.lastName}{" "}
                  <br />
                  {order.billingInfo.email} <br />
                  {order.billingInfo.phone}
                </p>
                <h4>Shipping Address</h4>
                <p>
                  {order.shippingAddress.street}, {order.shippingAddress.city},
                  <br />
                  {order.shippingAddress.state}, {order.shippingAddress.zip}
                </p>
              </div>
            </div>

            {/* Order Items Table */}
            <div className="product-order">
              <table className="table product-order-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price (KSh)</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((product, index) => (
                    <tr key={index}>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>KSh {product.price.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="2">
                      <strong>Subtotal</strong>
                    </td>
                    <td>KSh {order.totalAmount.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <strong>Tax (VAT)</strong>
                    </td>
                    <td>KSh 1,500</td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      <strong>Total</strong>
                    </td>
                    <td>KSh {(order.totalAmount + 1500).toLocaleString()}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </section>
      </div>

      {/* Print Button */}
      <div className="print-btn-container text-center">
        <button onClick={handlePrintReceipt} className="btn print-btn">
          🖨️ Print Receipt
        </button>
      </div>

      <style jsx>{`
        .thank-you-section {
          background: #f8f9fa;
          padding: 40px 20px;
          border-radius: 10px;
          box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          margin: 20px auto;
          max-width: 600px;
        }
        .thank-you-title {
          font-size: 32px;
          font-weight: bold;
          color: #28a745;
        }
        .thank-you-text {
          font-size: 18px;
          color: #333;
        }
        .transaction-id {
          font-size: 16px;
          color: #6c757d;
        }
        .print-btn-container {
          margin: 20px auto;
        }
        .print-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 24px;
          font-size: 18px;
          font-weight: bold;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
        }
        .print-btn:hover {
          background: #0056b3;
          transform: scale(1.05);
        }
        .receipt-preview {
          border: 2px solid #ddd;
          padding: 20px;
          margin: 20px auto;
          max-width: 800px;
          background: white;
          border-radius: 10px;
        }
        .product-order-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        .product-order-table th,
        .product-order-table td {
          border: 1px solid #000;
          padding: 8px;
          text-align: left;
        }
        .product-order-table th {
          background-color: #f2f2f2;
        }
        @media print {
          body * {
            display: none;
          }
          #print-receipt,
          #print-receipt * {
            display: block;
          }
          #print-receipt {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white;
            padding: 20px;
          }
        }
      `}</style>
    </>
  );
};

export default OrderSuccess;
