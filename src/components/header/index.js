import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header>
      <div className="top-header">
        <div className="mobile-fix-option"></div>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="header-contact">
                <ul>
                  <li>Welcome to Deo African Magic Limited</li>
                  <li>
                    <i className="ri-phone-fill"></i> Call Us:{" "}
                    <Link href="tel:+254732333330">+254 732 333 330</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 text-end">
              <ul className="header-dropdown">
                <li className="mobile-wishlist">
                  <a href="#!">
                    <i className="ri-heart-fill"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="main-menu">
              <div className="menu-left">
                
                  <Link href="/">
                    <Image
                      src="/assets/images/logo.png"
                      alt="Logo"
                      width={150}
                      height={150}
                      style={{ objectFit: "contain", display: "block" }}
                    />
                  </Link>
                
              </div>
              <div className="menu-right pull-right">
                <div>
                  <nav id="main-nav">
                    <ul className="sm pixelstrap sm-horizontal hover-unset">
                      <li>
                        <Link href="/">Home</Link>
                      </li>
                      <li>
                        <Link href="/product">Product</Link>
                      </li>
                      <li>
                        <Link href="/about">About</Link>
                      </li>
                      <li>
                        <Link href="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link href="/privacy-policy">Privacy Policy</Link>
                      </li>
                      <li>
                        <Link href="/terms-of-service">Terms of Service</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div>
                  <div className="icon-nav">
                    <ul>
                      <li className="onhover-div mobile-cart">
                        <Link href="/product">
                          <i className="ri-shopping-cart-line"></i>
                        </Link>
                        <span className="cart_qty_cls">2</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
