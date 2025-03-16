import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const OrderSuccess = ({ orderDetails }) => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch("/api/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderDetails),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Order Unsuccessful");
        }

        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderDetails]);

  if (loading) return <p>Loading your order...</p>;

  if (error) {
    return (
      <section className="section-b-space light-layout">
        <div className="container text-center">
          <h2 className="text-danger">Order Unsuccessful</h2>
          <p>{error}</p>
          <Link href="/" className="btn btn-primary">
            Return to Shop
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="section-b-space light-layout">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="success-text">
                <h2>Thank You</h2>
                <p>
                  Your payment was successfully processed, and your order is on
                  the way.
                </p>
                <p className="font-weight-bold">
                  Transaction ID: {order.transactionId}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="product-order">
                <table className="table product-order-table">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Product Name</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <Image
                            src={product.image}
                            alt={product.name}
                            className="img-fluid blur-up lazyloaded"
                            width={100}
                            height={100}
                          />
                        </td>
                        <td>{product.name}</td>
                        <td>{product.quantity}</td>
                        <td>${product.price.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="2">Subtotal</td>
                      <td colSpan="2">${order.totalAmount.toFixed(2)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Tax (GST)</td>
                      <td colSpan="2">$10.00</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Total</td>
                      <td colSpan="2">${order.totalAmount.toFixed(2)}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="col-lg-6">
              <div className="order-success-sec">
                <div className="row">
                  <div className="col-sm-12">
                    <h4>Order Summary</h4>
                    <ul className="order-detail">
                      <li>Order ID: {order.orderId}</li>
                      <li>Order Total: ${order.totalAmount.toFixed(2)}</li>
                      <li>Payment Method: {order.paymentMethod}</li>
                    </ul>
                  </div>
                  <div className="col-sm-12 payment-mode">
                    <h4>Payment Method</h4>
                    <p>
                      {order.paymentMethod} - Payment processed successfully.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default OrderSuccess;
