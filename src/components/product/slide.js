import Link from "next/link";
import Image from "next/image";

const mockData = [
  {
    id: 1,
    title: "Glamour Gaze",
    subtitle: "Boyfriend Shirts",
    price: "$2.79",
    oldPrice: "$3.00",
    discount: "7% Off",
    image: "../assets/images/fashion-1/product/1.jpg",
    rating: "4.5",
    ribbon: "Exclusive",
    colors: ["papayawhip", "burlywood", "gainsboro"],
  },
  {
    id: 2,
    title: "VogueVista",
    subtitle: "Classic Jacket",
    price: "$3.45",
    oldPrice: null,
    discount: null,
    image: "../assets/images/fashion-1/product/2.jpg",
    rating: "4.5",
  },
  {
    id: 3,
    title: "VogueVista",
    subtitle: "Versatile Shacket",
    price: "$3.12",
    oldPrice: null,
    discount: null,
    image: "../assets/images/fashion-1/product/3.jpg",
    rating: "4.5",
    colors: ["papayawhip", "burlywood", "gainsboro"],
  },
  {
    id: 4,
    title: "Glamour Gaze",
    subtitle: "Chic Denim",
    price: "$5.19",
    oldPrice: "$6.00",
    discount: "8% Off",
    image: "../assets/images/fashion-1/product/4.jpg",
    rating: "4.5",
    ribbon: "Exclusive",
  },
];

const Slide = () => {
  return (
    <section className="section-b-space pt-0 ratio_asos">
      <div className="container">
        <div className="g-3 g-md-4 row row-cols-2 row-cols-md-3 row-cols-xl-4">
          {mockData.map((product) => (
            <div key={product.id}>
              <div className="basic-product theme-product-1">
                <div className="overflow-hidden">
                  <div className="img-wrapper">
                    {product.ribbon && (
                      <div className="ribbon">
                        <span>{product.ribbon}</span>
                      </div>
                    )}
                    <Link href="product-page(accordian).html">
                      <img
                        src={product.image}
                        className="img-fluid blur-up lazyloaded"
                        alt={product.subtitle}
                      />
                    </Link>
                    <div className="rating-label">
                      <i className="ri-star-fill"></i>
                      <span>{product.rating}</span>
                    </div>
                    <div className="cart-info">
                      <Link
                        href="#!"
                        title="Add to Wishlist"
                        className="wishlist-icon"
                      >
                        <i className="ri-heart-line"></i>
                      </Link>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#addtocart"
                        title="Add to cart"
                      >
                        <i className="ri-shopping-cart-line"></i>
                      </button>
                      <Link
                        href="#!"
                        data-bs-toggle="modal"
                        data-bs-target="#quickView"
                        title="Quick View"
                      >
                        <i className="ri-eye-line"></i>
                      </Link>
                      <Link href="compare.html" title="Compare">
                        <i className="ri-loop-left-line"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="product-detail">
                    <div>
                      <div className="brand-w-color">
                        <Link
                          href="product-page(accordian).html"
                          className="product-title"
                        >
                          {product.title}
                        </Link>
                        {product.colors && (
                          <div className="color-panel">
                            <ul>
                              {product.colors.map((color, index) => (
                                <li
                                  key={index}
                                  style={{ backgroundColor: color }}
                                ></li>
                              ))}
                            </ul>
                            <span>+{product.colors.length - 3}</span>
                          </div>
                        )}
                      </div>
                      <h6>{product.subtitle}</h6>
                      <h4 className="price">
                        {product.price}
                        {product.oldPrice && <del> {product.oldPrice} </del>}
                        {product.discount && (
                          <span className="discounted-price">
                            {" "}
                            {product.discount}{" "}
                          </span>
                        )}
                      </h4>
                    </div>
                    <ul className="offer-panel">
                      <li>
                        <span className="offer-icon">
                          <i className="ri-discount-percent-fill"></i>
                        </span>{" "}
                        Limited Time Offer: 5% off
                      </li>
                      <li>
                        <span className="offer-icon">
                          <i className="ri-discount-percent-fill"></i>
                        </span>{" "}
                        Limited Time Offer: 5% off
                      </li>
                      <li>
                        <span className="offer-icon">
                          <i className="ri-discount-percent-fill"></i>
                        </span>{" "}
                        Limited Time Offer: 5% off
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Slide;
