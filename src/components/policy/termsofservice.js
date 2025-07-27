import Link from "next/link";

const TermsOfService = () => {
  return (
    <div className="container">
      <div className="breadcrumb-section">
        <h2>Terms of Service</h2>
        <nav className="theme-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Terms of Service</li>
          </ol>
        </nav>
      </div>

      <section className="terms-section">
        <div className="content">
          <h3>1. Introduction</h3>
          <p>
            Welcome to <strong>African Magic Deo Limited</strong> ("Company",
            "we", "our", "us")! These Terms of Service ("Terms", "Agreement")
            govern your use of our website and services. By accessing or using
            our platform, you agree to comply with these Terms.
          </p>

          <h3>2. User Responsibilities</h3>
          <p>
            Users must provide accurate information when making inquiries or
            purchases. Any misuse, fraudulent activity, or violation of these
            Terms may result in restricted access to our services.
          </p>

          <h3>3. Orders and Payments</h3>
          <p>
            All transactions processed through our platform are secure. By
            placing an order, you agree to provide accurate billing and shipping
            details. We reserve the right to cancel fraudulent or suspicious
            orders.
          </p>

          <h3>4. Returns and Refunds</h3>
          <p>
            Customers may request returns or refunds in accordance with our
            policies. To initiate a return, contact our support team at
            <a href="mailto:support@africanmagicdeo.com">
              {" "}
              support@africanmagicdeo.com
            </a>
            .
          </p>

          <h3>5. Product Use & Safety</h3>
          <p>
            Our Alum Deodorant Stick is designed for external use only. Users
            should follow the provided instructions and warnings. We are not
            responsible for any misuse of the product.
          </p>

          <h3>6. Limitation of Liability</h3>
          <p>
            African Magic Deo Limited is not liable for any indirect damages
            resulting from the use of our website or products. While we strive
            to provide accurate product details, we do not guarantee error-free
            descriptions or availability.
          </p>

          <h3>7. Contact Information</h3>
          <p>
            If you have any questions regarding these Terms, reach out to us:
          </p>
          <ul>
            <li>
              Email:{" "}
              <a href="mailto:support@africanmagicdeo.com">
                support@africanmagicdeo.com
              </a>
            </li>
            <li>
              Phone: <a href="tel:+254732333330">+254 732 333 330</a>
            </li>
            <li>Address: Karen, Nairobi, Kenya</li>
          </ul>

          <h3>8. Changes to Terms</h3>
          <p>
            We reserve the right to modify these Terms at any time. Continued
            use of our platform constitutes acceptance of the revised Terms.
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsOfService;
