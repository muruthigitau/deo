import { useState } from "react";
import Link from "next/link";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);
  };

  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>Contact us</h2>
          <nav className="theme-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item active">Contact us</li>
            </ol>
          </nav>
        </div>
      </div>

      <section className="contact-page">
        <div className="container">
          <div className="row g-sm-4 g-3">
            <div className="col-lg-5">
              <div className="contact-title">
                <h2>Get In Touch</h2>
                <p>
                  We're here to help! Reach out to us with any questions,
                  feedback, or inquiries, and we'll get back to you as soon as
                  possible.
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <form className="theme-form contact-form" onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-12">
                    <div className="form-box">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Full Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-box">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-box">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="form-control"
                        placeholder="Enter Your Phone Number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-box">
                      <label htmlFor="subject" className="form-label">
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        className="form-control"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-box">
                      <label htmlFor="message" className="form-label">
                        Write Your Message
                      </label>
                      <textarea
                        id="message"
                        rows="6"
                        className="form-control"
                        placeholder="Write Your Message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-box">
                      <button className="btn btn-solid" type="submit">
                        Send Your Message
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-12">
              <div className="contact-right">
                <ul>
                  <li>
                    <div className="contact-icon">
                      <i className="ri-phone-fill"></i>
                    </div>
                    <div className="media-body">
                      <h6>Contact Us</h6>
                      <p>+254 732 333 330</p>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon">
                      <i className="ri-map-pin-fill"></i>
                    </div>
                    <div className="media-body">
                      <h6>Address</h6>
                      <p>MyTown Karen, Nairobi, Kenya</p>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon">
                      <i className="ri-mail-fill"></i>
                    </div>
                    <div className="media-body">
                      <h6>Email</h6>
                      <p>info@deoafricanmagic.com</p>
                    </div>
                  </li>
                  <li>
                    <div className="contact-icon">
                      <i className="ri-cellphone-fill"></i>
                    </div>
                    <div className="media-body">
                      <h6>Fax</h6>
                      <p>+254 732 333 331</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="map-section">
        <iframe
          title="location-map"
          frameBorder="0"
          className="w-100 h-100"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.05985752431!2d36.700654!3d-1.320556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a6b1f1f1f1f%3A0x1a2b3c4d5e6f7g8h!2sMyTown%20Karen%2C%20Nairobi%2C%20Kenya!5e0!3m2!1sen!2ske!4v1616161616161"
          allowFullScreen
        ></iframe>
      </section>
    </>
  );
};

export default Contact;
