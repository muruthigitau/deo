import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const Product = () => {
  const [quantity, setQuantity] = useState(1);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(true);
  const [isInformationOpen, setIsInformationOpen] = useState(false);

  const handleAccordionClick = (tabName) => {
    if (tabName === "description") {
      setIsDescriptionOpen((prev) => !prev);
      setIsInformationOpen(false);
    } else if (tabName === "information") {
      setIsInformationOpen((prev) => !prev);
      setIsDescriptionOpen(false);
    }
    setActiveTab(tabName);
  };

  const productData = {
    id: 1,
    name: "Gym Coords Set (Brown)",
    price: 15.0,
    rating: 4,
    reviews: 20,
    description: `Gym Coords Set offers a complete workout ensemble for the modern fitness enthusiast. This coordinated set includes everything needed for a stylish and functional gym session, from moisture-wicking tops to supportive leggings, ensuring both comfort and performance during workouts.

  Features:
  - Moisture-wicking fabric
  - 4-way stretch material
  - Flatlock seams to prevent chafing
  - High-waisted design for maximum coverage
  - Available in multiple sizes`,
    images: [
      "/assets/images/product-details/product/17.jpg",
      "/assets/images/product-details/product/18.jpg",
      "/assets/images/product-details/product/19.jpg",
      "/assets/images/product-details/product/18.jpg",
    ],
    colors: [
      "/assets/images/product-details/product/17.jpg",
      "/assets/images/product-details/product/20.jpg",
      "/assets/images/product-details/product/21.jpg",
    ],
    productInfo: {
      sku: "SP18",
      unit: "1 Item",
      weight: "150 Gms",
      stockStatus: "In stock",
      quantity: 40,
    },
    deliveryInfo: {
      estimatedTime: "7 days",
      returnPeriod: "7 Days",
      shippingCost: "Free Shipping",
      returnPolicy: "Hassle free returns",
    },
    safeCheckout: {
      paymentMethods: "/assets/images/product-details/payments.png",
      securePayments: "/assets/images/product-details/secure_payments.png",
    },
  };

  const handleQuantityChange = (type) => {
    if (type === "plus") {
      setQuantity((prev) => prev + 1);
    } else if (type === "minus" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  return (
    <section>
      <div className="collection-wrapper">
        <div className="container">
          <div className="collection-wrapper">
            <div className="row g-4">
              <div className="col-lg-4">
                <div className="product-slick slick-initialized slick-slider">
                  <button
                    className="slick-prev slick-arrow"
                    aria-label="Previous"
                    type="button"
                  >
                    Previous
                  </button>
                  <div className="slick-list draggable">
                    <div
                      className="slick-track"
                      style={{
                        opacity: 1,
                        width: "1184px",
                        transform: "translate3d(0px, 0px, 0px)",
                      }}
                    >
                      {productData.images.map((image, index) => (
                        <div
                          className={`slick-slide ${
                            index === 0 ? "slick-current slick-active" : ""
                          }`}
                          data-slick-index={index}
                          aria-hidden={index !== 0}
                          style={{
                            width: "296px",
                            position: "relative",
                            left: `${-index * 296}px`,
                            top: "0px",
                            zIndex: index === 0 ? 999 : 998,
                            opacity: index === 0 ? 1 : 0,
                          }}
                        >
                          <div>
                            <div
                              style={{ width: "100%", display: "inline-block" }}
                            >
                              <Image
                                src={image}
                                alt={`Product image ${index + 1}`}
                                className="w-100 img-fluid blur-up lazyloaded"
                                width={296}
                                height={296}
                                priority={index === 0}
                                onLoad={() => setImagesLoaded(true)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <button
                    className="slick-next slick-arrow"
                    aria-label="Next"
                    type="button"
                  >
                    Next
                  </button>
                </div>
                <div className="row">
                  <div className="col-12">
                    <div className="slider-nav slick-initialized slick-slider">
                      <div className="slick-list draggable">
                        <div
                          className="slick-track"
                          style={{
                            opacity: 1,
                            width: "1089px",
                            transform: "translate3d(-297px, 0px, 0px)",
                          }}
                        >
                          {productData.images.map((image, index) => (
                            <div
                              className={`slick-slide ${
                                index === 0 ? "slick-current slick-active" : ""
                              }`}
                              data-slick-index={index}
                              aria-hidden={index !== 0}
                              style={{ width: "99px" }}
                            >
                              <div>
                                <div
                                  style={{
                                    width: "100%",
                                    display: "inline-block",
                                  }}
                                >
                                  <Image
                                    src={image}
                                    alt={`Product thumbnail ${index + 1}`}
                                    className="img-fluid blur-up lazyloaded"
                                    width={99}
                                    height={99}
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="product-page-details product-description-box sticky-details mt-0">
                  <div className="trending-text">
                    <Image
                      src="/assets/images/product-details/trending.gif"
                      className="img-fluid"
                      width={100}
                      height={100}
                      alt="Trending indicator"
                    />
                    <h5>Selling fast! 4 people have this in their carts.</h5>
                  </div>
                  <h2 className="main-title">{productData.name}</h2>
                  <div className="product-rating">
                    <div className="rating-list">
                      {[...Array(productData.rating)].map((_, index) => (
                        <i
                          className="ri-star-fill"
                          key={`filled-star-${index}`}
                        ></i>
                      ))}
                      {[...Array(5 - productData.rating)].map((_, index) => (
                        <i
                          className="ri-star-line"
                          key={`empty-star-${index}`}
                        ></i>
                      ))}
                    </div>
                    <span className="divider">|</span>
                    <a href="#!">{productData.reviews} Reviews</a>
                  </div>
                  <div className="price-text">
                    <h3>
                      <span className="fw-normal">MRP:</span>$
                      {productData.price.toFixed(2)}
                    </h3>
                    <span>Inclusive all the text </span>
                  </div>
                  <div className="size-delivery-info flex-wrap">
                    <a href="#return" data-bs-toggle="modal" className="">
                      <i className="ri-truck-line"></i>
                      Delivery &amp; Return{" "}
                    </a>
                    <a href="#ask-question" className="" data-bs-toggle="modal">
                      <i className="ri-questionnaire-line"></i>
                      Ask a Question{" "}
                    </a>
                  </div>
                  <div
                    className="accordion accordion-flush product-accordion"
                    id="accordionFlushExample"
                  >
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="description-header">
                        <button
                          type="button"
                          className={`accordion-button ${
                            !isDescriptionOpen ? "collapsed" : ""
                          }`}
                          onClick={() => handleAccordionClick("description")}
                          aria-expanded={isDescriptionOpen}
                          aria-controls="description-content"
                        >
                          Product Description
                        </button>
                      </h2>
                      <div
                        id="description-content"
                        className={`accordion-collapse collapse ${
                          isDescriptionOpen ? "show" : ""
                        }`}
                        aria-labelledby="description-header"
                      >
                        <div className="accordion-body">
                          <p className="mb-0">{productData.description}</p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion-item">
                      <h2 className="accordion-header" id="information-header">
                        <button
                          type="button"
                          className={`accordion-button ${
                            !isInformationOpen ? "collapsed" : ""
                          }`}
                          onClick={() => handleAccordionClick("information")}
                          aria-expanded={isInformationOpen}
                          aria-controls="information-content"
                        >
                          Information
                        </button>
                      </h2>
                      <div
                        id="information-content"
                        className={`accordion-collapse collapse ${
                          isInformationOpen ? "show" : ""
                        }`}
                        aria-labelledby="information-header"
                      >
                        <div className="accordion-body">
                          <div className="bordered-box border-0 mt-0 pt-0">
                            <h4 className="sub-title">Product Info</h4>
                            <ul className="shipping-info">
                              <li>
                                <span>SKU: </span>
                                {productData.productInfo.sku}
                              </li>
                              <li>
                                <span>Unit: </span>
                                {productData.productInfo.unit}
                              </li>
                              <li>
                                <span>Weight: </span>
                                {productData.productInfo.weight}
                              </li>
                              <li>
                                <span>Stock Status: </span>
                                {productData.productInfo.stockStatus}
                              </li>
                              <li>
                                <span>Quantity: </span>
                                {productData.productInfo.quantity} Items Left
                              </li>
                            </ul>
                          </div>

                          <div className="bordered-box">
                            <h4 className="sub-title">Delivery Details</h4>
                            <ul className="delivery-details">
                              <li>
                                <i className="ri-truck-line"></i> Your order is
                                likely to reach you within{" "}
                                {productData.deliveryInfo.estimatedTime}.
                              </li>
                              <li>
                                <i className="ri-arrow-left-right-line"></i>{" "}
                                {productData.deliveryInfo.returnPolicy} within{" "}
                                {productData.deliveryInfo.returnPeriod}.
                              </li>
                            </ul>
                          </div>
                          <div className="dashed-border-box mb-0">
                            <h4 className="sub-title">
                              Guaranteed Safe Checkout
                            </h4>
                            <Image
                              src={productData.safeCheckout.paymentMethods}
                              alt="Payment Methods"
                              className="img-fluid payment-img"
                              width={200}
                              height={50}
                            />
                          </div>
                          <div className="dashed-border-box mb-0">
                            <h4 className="sub-title">Secure Checkout</h4>
                            <Image
                              src={productData.safeCheckout.securePayments}
                              alt="Secure Payment Options"
                              className="img-fluid payment-img"
                              width={200}
                              height={50}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="product-page-details product-form-box product-right-box d-flex align-items-center flex-column my-0">
                  <h4 className="sub-title">Colour:</h4>
                  <div className="variation-box size-box">
                    <ul className="image-box image">
                      {productData.colors.map((color, index) => (
                        <li className={index === 0 ? "active" : ""} key={index}>
                          <Link href="#">
                            <Image
                              src={color}
                              alt="Product Color"
                              width={50}
                              height={50}
                            />
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="product-buttons">
                    <div className="qty-section">
                      <div className="qty-box">
                        <div className="input-group">
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-left-minus"
                              data-type="minus"
                              data-field=""
                              onClick={() => handleQuantityChange("minus")}
                            >
                              <i className="ri-arrow-left-s-line"></i>
                            </button>
                          </span>
                          <input
                            type="text"
                            name="quantity"
                            className="form-control input-number"
                            value={quantity}
                            readOnly
                          />
                          <span className="input-group-prepend">
                            <button
                              type="button"
                              className="btn quantity-right-plus"
                              data-type="plus"
                              data-field=""
                              onClick={() => handleQuantityChange("plus")}
                            >
                              <i className="ri-arrow-right-s-line"></i>
                            </button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-buttons">
                    <div className="d-flex align-items-center gap-3">
                      <button
                        className="btn btn-animation btn-solid hover-solid scroll-button disabled"
                        type="button"
                      >
                        {" "}
                        Out Of Stock
                      </button>
                      <a
                        href="#!"
                        className="btn btn-solid buy-button disabled"
                      >
                        Buy Now
                      </a>
                    </div>
                  </div>
                  <div className="left-progressbar w-100">
                    <h6>Please Hurry Only 10 Left In Stock</h6>
                    <div role="progressbar" className="progress">
                      <div
                        className="progress-bar"
                        style={{
                          width: `${
                            (productData.productInfo.quantity / 40) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>
                  <div className="buy-box justify-content-center gap-3">
                    <Link href="#">
                      <i className="ri-heart-line"></i>
                      <span>Add To Wishlist</span>
                    </Link>
                    <Link href="#" className="add-compare">
                      <i className="ri-refresh-line"></i>
                      <span>Add To Compare</span>
                    </Link>
                    <Link href="#share" data-bs-toggle="modal">
                      <i className="ri-share-line"></i>
                      <span>Share</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Product;
