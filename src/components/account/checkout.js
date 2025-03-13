import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const initialOrderData = {
  items: [
    {
      id: 1,
      name: "Gym Coords Set (Brown)",
      price: 15.0,
      quantity: 1,
      image: "/assets/images/product-details/product/17.jpg",
    },
    {
      id: 2,
      name: "Tan Cargo Shorts",
      price: 12.0,
      quantity: 1,
      image: "/assets/images/fashion-1/product/17.jpg",
    },
  ],
  summary: {
    subTotal: 29.25,
    tax: 1.46,
    points: 65.66,
    walletBalance: 8.47,
    total: 30.71,
  },
};

const Checkout = () => {
  // State management
  const [orderData, setOrderData] = useState(initialOrderData);
  const [usePoints, setUsePoints] = useState(false);
  const [useWallet, setUseWallet] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  // Add state for modal
  const [showModal, setShowModal] = useState(false);

  // Handlers
  const handleQuantityChange = (itemId, newQuantity) => {
    setOrderData((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ),
    }));
    updateTotals();
  };

  const handleInputChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUsePoints = (e) => {
    setUsePoints(e.target.checked);
    updateTotals();
  };

  const handleUseWallet = (e) => {
    setUseWallet(e.target.checked);
    updateTotals();
  };

  const handleCouponInput = (e) => {
    setCouponCode(e.target.value);
  };

  const applyCoupon = () => {
    // Add coupon logic here
    console.log("Applying coupon:", couponCode);
  };

  const updateTotals = () => {
    const subTotal = orderData.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    let total = subTotal;
    const tax = total * 0.05; // 5% tax

    if (usePoints) {
      total -= orderData.summary.points;
    }

    if (useWallet) {
      total -= orderData.summary.walletBalance;
    }

    setOrderData((prev) => ({
      ...prev,
      summary: {
        ...prev.summary,
        subTotal,
        tax,
        total: Math.max(0, total + tax),
      },
    }));
  };

  const handlePlaceOrder = () => {
    // Add order placement logic here
    console.log("Order placed:", {
      orderData,
      billingInfo,
      usePoints,
      useWallet,
    });
  };

  // Handle modal toggle
  const handleModalToggle = (e) => {
    if (e) {
      e.preventDefault();
    }
    setShowModal(!showModal);
  };

  // Create a separate handler for applying coupons
  const handleApplyCoupon = (code) => {
    setCouponCode(code);
    handleModalToggle(); // No event passed here
  };

  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>checkout</h2>
          <nav className="theme-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">checkout</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="section-b-space checkout-section-2">
        <div className="container">
          <div className="checkout-page">
            <div className="checkout-form">
              <div className="row g-sm-4 g-3">
                <div className="col-lg-7">
                  <div className="left-sidebar-checkout">
                    <div className="checkout-detail-box">
                      <ul>
                        {/* Billing Information */}
                        <li>
                          <div className="checkout-box">
                            <div className="checkout-title">
                              <h4>Billing Information</h4>
                            </div>
                            <div className="checkout-detail">
                              <div className="row g-3">
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="firstName"
                                      className="form-label"
                                    >
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="firstName"
                                      name="firstName"
                                      value={billingInfo.firstName}
                                      onChange={handleInputChange}
                                      placeholder="Enter your first name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="lastName"
                                      className="form-label"
                                    >
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="lastName"
                                      name="lastName"
                                      value={billingInfo.lastName}
                                      onChange={handleInputChange}
                                      placeholder="Enter your last name"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="email"
                                      className="form-label"
                                    >
                                      Email
                                    </label>
                                    <input
                                      type="email"
                                      className="form-control"
                                      id="email"
                                      name="email"
                                      value={billingInfo.email}
                                      onChange={handleInputChange}
                                      placeholder="Enter your email"
                                    />
                                  </div>
                                </div>
                                <div className="col-md-6">
                                  <div className="form-group">
                                    <label
                                      htmlFor="phone"
                                      className="form-label"
                                    >
                                      Phone Number
                                    </label>
                                    <input
                                      type="tel"
                                      className="form-control"
                                      id="phone"
                                      name="phone"
                                      value={billingInfo.phone}
                                      onChange={handleInputChange}
                                      placeholder="Enter your phone number"
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>

                        {/* Payment Options */}
                        <li>
                          <div className="checkout-box">
                            <div className="checkout-title">
                              <h4>Payment Options</h4>
                            </div>
                            <div className="checkout-detail">
                              <div className="row g-3">
                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="paymentMethod"
                                      id="check9"
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="check9"
                                    >
                                      CASH ON DELIVERY
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check10"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check10"
                                    >
                                      PAYPAL
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check11"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check11"
                                    >
                                      STRIPE
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check12"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check12"
                                    >
                                      SSLCOMMERZ
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check13"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check13"
                                    >
                                      FLUTTERWAVE
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check14"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check14"
                                    >
                                      PAYSTACK
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check15"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check15"
                                    >
                                      MOLLIE
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check16"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check16"
                                    >
                                      BANK TRANSFER
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check17"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check17"
                                    >
                                      BKASH
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check18"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check18"
                                    >
                                      CCAVENUE
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="check19"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="check19"
                                    >
                                      PHONEPE
                                    </label>
                                  </div>
                                </div>

                                <div className="col-sm-6">
                                  <div className="delivery-address-box">
                                    <input
                                      className="form-check-input"
                                      type="radio"
                                      name="checkbox3"
                                      id="20"
                                      checked=""
                                    />
                                    <label
                                      className="form-check-label"
                                      for="20"
                                    >
                                      INSTAMOJO
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Order Summary Column */}
                <div className="col-lg-5">
                  <div className="checkout-right-box">
                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <h4>Summary Order</h4>
                          <p>
                            For a better experience, verify your goods before
                            proceeding.
                          </p>
                        </div>

                        <ul className="qty">
                          {orderData.items.map((item) => (
                            <li key={item.id}>
                              <div className="cart-image">
                                <img
                                  src={item.image}
                                  className="img-fluid"
                                  alt={item.name}
                                />
                              </div>
                              <div className="cart-content">
                                <div>
                                  <h4>{item.name}</h4>
                                  <h5>
                                    ${item.price.toFixed(2)} X {item.quantity}
                                  </h5>
                                </div>
                                <span className="text-theme">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    <div className="checkout-details">
                      <div className="order-box">
                        <div className="title-box">
                          <h4>Billing Summary</h4>
                          <div className="promo-code-box">
                            <div className="promo-title">
                              <h5>Promo code</h5>
                              <button
                                className="btn"
                                onClick={handleModalToggle}
                              >
                                <i className="ri-coupon-line" /> View All
                              </button>
                            </div>
                            <div className="row g-sm-3 g-2 mb-3">
                              <div className="col-md-6">
                                <div className="coupon-box">
                                  <div className="card-name">
                                    <h6>Holiday Savings</h6>
                                  </div>
                                  <div className="coupon-content">
                                    <div className="coupon-apply">
                                      <h6 className="coupon-code success-color">
                                        #HOLIDAY40
                                      </h6>
                                      <a
                                        className="btn theme-btn border-btn copy-btn mt-0"
                                        href="#!"
                                      >
                                        Copy Code
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <div className="col-md-6">
                                <div className="coupon-box">
                                  <div className="card-name">
                                    <h6>Holiday Savings</h6>
                                  </div>
                                  <div className="coupon-content">
                                    <div className="coupon-apply">
                                      <h6 className="coupon-code success-color">
                                        #HOLIDAY40
                                      </h6>
                                      <a
                                        className="btn theme-btn border-btn copy-btn mt-0"
                                        href="#!"
                                      >
                                        Copy Code
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="coupon-input-box">
                              <input
                                type="text"
                                id="coupon"
                                className="form-control"
                                value={couponCode}
                                onChange={handleCouponInput}
                                placeholder="Enter Coupon Code Here..."
                              />
                              <button
                                className="apply-button btn"
                                onClick={applyCoupon}
                              >
                                Apply now
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="custom-box-loader">
                          <ul className="sub-total">
                            <li>
                              Sub Total{" "}
                              <span className="count">
                                ${orderData.summary.subTotal}
                              </span>
                            </li>
                            <li>
                              Tax{" "}
                              <span className="count">
                                ${orderData.summary.tax}
                              </span>
                            </li>
                            <li>
                              <h4 className="txt-muted">Points</h4>
                              <h4 className="price txt-muted">
                                ${orderData.summary.points}
                              </h4>
                            </li>
                            <li className="border-cls">
                              <label
                                htmlFor="points"
                                className="form-check-label m-0"
                              >
                                Would you prefer to pay using points?
                              </label>
                              <input
                                type="checkbox"
                                id="points"
                                className="checkbox_animated check-it"
                                checked={usePoints}
                                onChange={handleUsePoints}
                              />
                            </li>
                            <li>
                              <h4>Wallet Balance</h4>
                              <h4 className="price">
                                ${orderData.summary.walletBalance}
                              </h4>
                            </li>
                            <li className="border-cls">
                              <label
                                htmlFor="wallet"
                                className="form-check-label m-0"
                              >
                                Would you prefer to pay using wallet?
                              </label>
                              <input
                                type="checkbox"
                                id="wallet"
                                className="checkbox_animated check-it"
                                checked={useWallet}
                                onChange={handleUseWallet}
                              />
                            </li>
                          </ul>
                        </div>
                        <ul className="total">
                          <li>
                            Total{" "}
                            <span className="count">
                              ${orderData.summary.total}
                            </span>
                          </li>
                        </ul>
                        <div className="text-end">
                          <button
                            className="btn order-btn"
                            onClick={handlePlaceOrder}
                          >
                            Place Order
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add Modal Component */}
      <div
        className={`modal fade ${showModal ? "show" : ""}`}
        id="couponModal"
        tabIndex="-1"
        role="dialog"
        style={{ display: showModal ? "block" : "none" }}
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Available Coupons</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleModalToggle}
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              {/* Coupon List */}
              <div className="row g-3">
                <div className="col-12">
                  <div className="coupon-box">
                    <div className="card-name">
                      <h6>Holiday Savings</h6>
                    </div>
                    <div className="coupon-content">
                      <div className="coupon-apply">
                        <h6 className="coupon-code success-color">
                          #HOLIDAY40
                        </h6>
                        <button
                          className="btn theme-btn border-btn copy-btn mt-0"
                          onClick={() => handleApplyCoupon("HOLIDAY40")}
                        >
                          Apply Code
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more coupons here */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add backdrop when modal is open */}
      {showModal && (
        <div className="modal-backdrop fade show" onClick={handleModalToggle} />
      )}
    </>
  );
};

export default Checkout;
