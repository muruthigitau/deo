import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className="container">
      <div className="breadcrumb-section">
        <h2>Privacy Policy</h2>
        <nav className="theme-breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link href="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">Privacy Policy</li>
          </ol>
        </nav>
      </div>

      <section className="privacy-section">
        <div className="content">
          <h3>1. Introduction</h3>
          <p>
            At <strong>African Magic Deo Limited</strong> ("Company", "we",
            "our", "us"), we are committed to protecting your privacy. This
            Privacy Policy outlines how we collect, use, and safeguard your
            personal information when you visit our website or use our services.
          </p>

          <h3>2. Information We Collect</h3>
          <p>We may collect the following types of information:</p>
          <ul>
            <li>
              Personal details (name, email, phone number) when you contact us
            </li>
            <li>Order and payment details for purchases</li>
            <li>Usage data (e.g., pages visited, time spent on our site)</li>
          </ul>

          <h3>3. How We Use Your Information</h3>
          <p>We use your information to:</p>
          <ul>
            <li>Process orders and provide customer support</li>
            <li>Improve our products and services</li>
            <li>
              Send updates about promotions, new products, or changes to our
              policies
            </li>
            <li>Comply with legal obligations</li>
          </ul>

          <h3>4. Data Protection & Security</h3>
          <p>
            We implement security measures to protect your personal data from
            unauthorized access, loss, or misuse. However, no method of
            transmission over the internet is 100% secure, and we cannot
            guarantee absolute security.
          </p>

          <h3>5. Sharing Your Information</h3>
          <p>
            We do not sell or rent your personal data. However, we may share it
            with:
          </p>
          <ul>
            <li>Payment processors for secure transactions</li>
            <li>Shipping partners to fulfill orders</li>
            <li>Legal authorities if required by law</li>
          </ul>

          <h3>6. Your Rights</h3>
          <p>You have the right to:</p>
          <ul>
            <li>Request access to the personal data we hold about you</li>
            <li>Request corrections to inaccurate or incomplete information</li>
            <li>Opt out of marketing communications at any time</li>
          </ul>

          <h3>7. Cookies & Tracking</h3>
          <p>
            Our website may use cookies to enhance your experience. You can
            adjust your browser settings to refuse cookies, but this may affect
            functionality.
          </p>

          <h3>8. Contact Information</h3>
          <p>
            If you have any questions about this Privacy Policy, contact us at:
          </p>
          <ul>
            <li>
              Email:{" "}
              <Link href="mailto:support@africanmagicdeo.com">
                support@africanmagicdeo.com
              </Link>
            </li>
            <li>
              Phone: <Link href="tel:+254732333330">+254 732 333 330</Link>
            </li>
            <li>Address: Karen, Nairobi, Kenya</li>
          </ul>

          <h3>9. Changes to this Policy</h3>
          <p>
            We may update this Privacy Policy from time to time. Any changes
            will be posted on this page. Continued use of our services means you
            accept the updated policy.
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
