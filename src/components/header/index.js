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
                  <li>Welcome to Our Online store</li>
                  <li>
                    <i className="ri-phone-fill"></i>Call Us: 123 - 456 - 7890
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
                <li className="onhover-dropdown mobile-account">
                  <i className="ri-user-fill"></i>
                  My Account
                  <ul className="onhover-show-div">
                    <li>
                      <a href="login.html">Login</a>
                    </li>
                    <li>
                      <a href="register.html">Register</a>
                    </li>
                  </ul>
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
                <div className="navbar">
                  <a href="#!" onClick={() => openNav()}>
                    <div className="bar-style">
                      <i className="ri-bar-chart-horizontal-line sidebar-bar"></i>
                    </div>
                  </a>
                  <div id="mySidenav" className="sidenav">
                    <a
                      href="#!"
                      className="sidebar-overlay"
                      onClick={() => closeNav()}
                    ></a>
                    <nav>
                      <div onClick={() => closeNav()}>
                        <div className="sidebar-back text-start">
                          <i className="ri-arrow-left-s-line pe-2"></i>
                          Back
                        </div>
                      </div>
                      <ul className="sm pixelstrap sm-vertical hover-unset">
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
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className="brand-logo">
                  <Link href="/">
                    <Image
                      src="/assets/images/logo.png"
                      className="img-fluid blur-up lazyloaded"
                      alt="Logo"
                      width={150}
                      height={50}
                    />
                  </Link>
                </div>
              </div>
              <div className="menu-right pull-right">
                <div>
                  <nav id="main-nav">
                    <div className="toggle-nav">
                      <i className="ri-bar-chart-horizontal-line sidebar-bar"></i>
                    </div>
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
                    </ul>
                  </nav>
                </div>
                <div>
                  <div className="icon-nav">
                    <ul>
                      <li className="onhover-div mobile-search">
                        <div
                          data-bs-toggle="modal"
                          data-bs-target="#searchModal"
                        >
                          <i className="ri-search-line"></i>
                        </div>
                      </li>
                      <li className="onhover-div mobile-cart">
                        <div
                          data-bs-toggle="offcanvas"
                          data-bs-target="#cartOffcanvas"
                        >
                          <i className="ri-shopping-cart-line"></i>
                        </div>
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
