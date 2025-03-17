import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="footer-style-1">
      <section className="section-b-space darken-layout">
        <div className="container">
          <div className="row footer-theme g-md-5 g-2">
            {/* Logo & Contact Info */}
            <div className="col-xl-3 col-lg-5 col-md-6 sub-title">
              <div>
                {/* Placeholder for text-based logo */}
                <div className="footer-logo">
                  <Link href="/">
                    <h2 className="text-white font-bold text-xl">
                      Deo African Magic Limited
                    </h2>
                  </Link>
                </div>

                {/* Commented out the previous logo for later update */}
                {/* 
    <div className="footer-logo">
      <Link href="/">
        <Image
          alt="logo"
          className="img-fluid"
          src="/assets/images/logo-white.png"
          width={150}
          height={50}
        />
      </Link>
    </div> 
    */}

                <p>
                  Deo African Magic Limited is committed to providing natural
                  and skin-friendly deodorants with long-lasting protection,
                  free from harmful chemicals.
                </p>

                <ul className="contact-list">
                  <li>
                    <i className="ri-map-pin-line"></i> MyTown Karen, Nairobi,
                    Kenya
                  </li>
                  <li>
                    <i className="ri-phone-line"></i> Call Us: +254 732 333 330
                  </li>
                  <li>
                    <i className="ri-mail-line"></i> Email Us:
                    info@deoafricanmagic.com
                  </li>
                </ul>
              </div>
            </div>

            {/* Categories */}
            <div className="col-xl-2 col-lg-3 col-md-4 col-md-6">
              <div className="sub-title">
                <div className="footer-title">
                  <h4>About Product</h4>
                </div>
                <div className="footer-content">
                  <ul>
                    {[
                      "24 Hours",
                      "No irtitations",
                      "Alcohol-Free",
                      "No Stains",
                      "Natural",
                      "Made in Thailand",
                    ].map((category, index) => (
                      <li key={index}>
                        <Link href="/product" className="text-content">
                          {category}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Useful Links */}
            <div className="col-xl col-lg-3 col-md-3">
              <div className="sub-title">
                <div className="footer-title">
                  <h4>Useful Links</h4>
                </div>
                <div className="footer-content">
                  <ul>
                    {["Home", "About Us", "Product"].map((link, index) => (
                      <li key={index}>
                        <Link
                          href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                          className="text-content"
                        >
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Help Center */}
            <div className="col-xl-2 col-md-3">
              <div className="sub-title">
                <div className="footer-title">
                  <h4>Help Center</h4>
                </div>
                <div className="footer-content">
                  <ul>
                    {["Contact Us"].map((link, index) => (
                      <li key={index}>
                        <Link href="/contact" className="text-content">
                          {link}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Newsletter & Social Links */}
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="sub-title">
                <div className="footer-title">
                  <h4>Follow Us</h4>
                </div>
                <div className="footer-content">
                  <p className="mb-cls-content">
                    Never Miss Anything From Store By Signing Up To Our
                    Newsletter.
                  </p>
                  <form className="form-inline">
                    <div className="form-group me-sm-3 mb-2">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email Address"
                      />
                    </div>
                    <button className="btn btn-solid mb-2">Subscribe</button>
                  </form>
                  <div className="footer-social">
                    <ul className="flex space-x-3">
                      {[
                        {
                          name: "Facebook",
                          icon: "ri-facebook-fill",
                          url: "https://facebook.com/",
                        },
                        {
                          name: "Twitter",
                          icon: "ri-twitter-fill",
                          url: "https://twitter.com/",
                        },
                        {
                          name: "Instagram",
                          icon: "ri-instagram-fill",
                          url: "https://instagram.com/",
                        },
                        {
                          name: "Pinterest",
                          icon: "ri-pinterest-fill",
                          url: "https://pinterest.com/",
                        },
                      ].map((social, index) => (
                        <li key={index}>
                          <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href={social.url}
                          >
                            <i className={social.icon}></i>
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom */}
      <div className="sub-footer dark-subfooter">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="footer-end">
                <p>
                  <i className="ri-copyright-line"></i>{" "}
                  {new Date().getFullYear()} MSLABDESIGNS
                </p>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-sm-12">
              <div className="payment-card-bottom">
                <Image
                  alt="payment options"
                  src="/assets/images/payment.png"
                  className="img-fluid"
                  width={300}
                  height={50}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
