import { useState } from "react";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  // Replace 'your_form_id' with your actual Formspree form ID
  const [state, handleSubmit] = useForm("xqalyopr");

  // If the form has been submitted successfully, display a thank you message
  if (state.succeeded) {
    return (
      <div className="contact-page">
        <div className="container">
          <div className="text-center py-5">
            <h2 className="thank-you-title">Thank you!</h2>
            <p className="thank-you-message">
              Your message has been sent successfully. We will get back to you
              shortly.
            </p>
            <div className="d-flex justify-content-center mt-4">
              <Link href="/" className="btn btn-solid">
                Go to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

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
              {/* The onSubmit handler is now Formspree's handleSubmit */}
              <form className="theme-form contact-form" onSubmit={handleSubmit}>
                <div className="row g-4">
                  <div className="col-12">
                    <div className="form-box">
                      <label htmlFor="name" className="form-label">
                        Full Name
                      </label>
                      {/* Formspree maps data using the 'name' attribute */}
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-control"
                        placeholder="Full Name"
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
                        name="email"
                        className="form-control"
                        placeholder="Email"
                        required
                      />
                      {/* Formspree validation for the email field */}
                      <ValidationError
                        prefix="Email"
                        field="email"
                        errors={state.errors}
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
                        name="phone"
                        className="form-control"
                        placeholder="Enter Your Phone Number"
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
                        name="subject"
                        className="form-control"
                        placeholder="Subject"
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
                        name="message"
                        rows="6"
                        className="form-control"
                        placeholder="Write Your Message"
                        required
                      ></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-box">
                      <button
                        className="btn btn-solid"
                        type="submit"
                        disabled={state.submitting}
                      >
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
                      <p>info@africanmagicdeo.com</p>
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
