import Link from "next/link";
import Image from "next/image";

const product = {
  id: 1,
  title: "Alum Deodorant",
  subtitle: "Natural Odor Protection",
  price: "Kshs 999", // Updated discounted price
  oldPrice: "Kshs 1,110", // Original price before 10% discount
  discount: "10% Off",
  image: "/assets/images/alum-deodorant/product-1.png",
  rating: "4.8",
  ribbon: "Best Seller",
  colors: ["gainsboro", "lightgray", "whitesmoke"],
};

const Slide = () => {
  return (
    <section className="section-b-space pt-0 ratio_asos">
      <div className="container">
        <div className="row justify-center">
          <div className="col-md-6 col-lg-4">
            <div className="basic-product theme-product-1">
              <div className="overflow-hidden">
                <div className="img-wrapper flex justify-center items-center">
                  {product.ribbon && (
                    <div className="ribbon">
                      <span>{product.ribbon}</span>
                    </div>
                  )}
                  <Link href="/product">
                    <Image
                      src={product.image}
                      width={300}
                      height={300}
                      alt={product.subtitle}
                      className="img-fluid mx-auto"
                    />
                  </Link>
                  <div className="rating-label">
                    <i className="ri-star-fill"></i>
                    <span>{product.rating}</span>
                  </div>
                  <div className="cart-info">
                    <Link href="#" title="Add to Wishlist">
                      <i className="ri-heart-line"></i>
                    </Link>
                    <button title="Add to Cart">
                      <i className="ri-shopping-cart-line"></i>
                    </button>
                    <Link href="#" title="Quick View">
                      <i className="ri-eye-line"></i>
                    </Link>
                  </div>
                </div>

                <div className="product-detail text-center">
                  <Link href="/product" className="product-title">
                    {product.title}
                  </Link>
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
                  <ul className="offer-panel">
                    <li>
                      <span className="offer-icon">
                        <i className="ri-discount-percent-fill"></i>
                      </span>{" "}
                      Limited Time Offer: 10% Off
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Slide;
