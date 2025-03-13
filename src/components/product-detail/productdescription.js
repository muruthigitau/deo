import Link from "next/link";
import { useState } from "react";

const mockData = {
  description:
    "The Model is wearing a white blouse from our stylist's collection, see the image for a mock-up of what the actual blouse would look like. It has text written on it in a black cursive language which looks great on a white color.",
  fabric:
    "Art silk is manufactured by synthetic fibres like rayon. It's light in weight and is soft on the skin for comfort in summers.",
  sizeFit: "The model (height 5'8\") is wearing a size S",
  materialCare:
    "Top fabric: pure cotton\nBottom fabric: pure cotton\nHand-wash",
  reviews: [
    {
      name: "John Due",
      date: "10 Aug 2024 11:05:AM",
      rating: 3,
      comment:
        "Wow! This fashion product exceeded all my expectations! From the moment I opened the package, I could tell it was something special. The quality of the materials is outstanding.",
    },
    {
      name: "Rhoda Mayer",
      date: "10 Aug 2024 11:05:AM",
      rating: 5,
      comment:
        "Nice the attention to detail in the craftsmanship is truly impressive. Not only does it look fabulous, but it feels incredibly comfortable too. I've received so many compliments whenever I wear it!",
    },
    {
      name: "Jack Deo",
      date: "10 Aug 2024 11:05:AM",
      rating: 4,
      comment:
        "The product boasts impressive craftsmanship, meticulous attention to detail, and a stunning appearance, resulting in a comfortable feel and numerous compliments.",
    },
  ],
  questions: [
    {
      question: "Does the dress offer any UV protection?",
      answer:
        "Yes, the dress offers UV protection. It blocks harmful UV rays, providing an additional layer of sun safety.",
    },
    {
      question:
        "Are there any pockets, and if so, how many and where are they located?",
      answer:
        "Yes, there are pockets. There are two pockets, one on each side of the garment.",
    },
    {
      question: "Is the fabric breathable and quick-drying?",
      answer:
        "Yes, the fabric is breathable, allowing for excellent airflow. Additionally, it is quick-drying, ensuring comfort during and after activities.",
    },
  ],
};

const ProductDescription = () => {
  const [data, setData] = useState(mockData);

  return (
    <section className="tab-product m-0">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-lg-12">
            <ul
              className="nav nav-tabs nav-material"
              id="top-tab"
              role="tablist"
            >
              <li className="nav-item" role="presentation">
                <Link
                  href="#top-home"
                  className="nav-link active"
                  id="top-home-tab"
                  data-bs-toggle="tab"
                  role="tab"
                  aria-selected="true"
                >
                  <i className="icofont icofont-ui-home"></i>Description
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  href="#top-review"
                  className="nav-link"
                  id="review-top-tab"
                  data-bs-toggle="tab"
                  role="tab"
                  aria-selected="false"
                  tabIndex="-1"
                >
                  <i className="icofont icofont-contacts"></i>Review
                </Link>
              </li>
              <li className="nav-item" role="presentation">
                <Link
                  href="#top-contact"
                  className="nav-link"
                  id="contact-top-tab"
                  data-bs-toggle="tab"
                  role="tab"
                  aria-selected="false"
                  tabIndex="-1"
                >
                  <i className="icofont icofont-contacts"></i>Q &amp; A
                </Link>
              </li>
            </ul>
            <div className="tab-content nav-material" id="top-tabContent">
              <div
                className="tab-pane fade active show"
                id="top-home"
                role="tabpanel"
                aria-labelledby="top-home-tab"
              >
                <div className="product-tab-description">
                  <div className="part">
                    <p>{data.description}</p>
                  </div>
                  <div className="part">
                    <h5 className="inner-title">fabric:</h5>
                    <p>{data.fabric}</p>
                  </div>
                  <div className="part">
                    <h5 className="inner-title">size &amp; fit:</h5>
                    <p>{data.sizeFit}</p>
                  </div>
                  <div className="part">
                    <h5 className="inner-title">Material &amp; Care:</h5>
                    <p>{data.materialCare}</p>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="top-review"
                role="tabpanel"
                aria-labelledby="review-top-tab"
              >
                <div className="single-product-tables">
                  <div className="row g-3 w-100">
                    <div className="col-xl-5">
                      <div className="product-rating-box">
                        <h4>Review this product</h4>
                        <ul className="product-rating-list">
                          {data.reviews.map((review, index) => (
                            <li key={index}>
                              <div className="rating-product">
                                <h5>
                                  {review.rating}
                                  <i className="ri-star-fill"></i>
                                </h5>
                                <div
                                  className="progress"
                                  role="progressbar"
                                  aria-valuenow="100"
                                  aria-valuemin="0"
                                  aria-valuemax="100"
                                >
                                  <div
                                    className="progress-bar"
                                    style={{ width: `${review.rating * 20}%` }}
                                  ></div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                        <button
                          className="btn"
                          data-bs-toggle="modal"
                          data-bs-target="#write-review"
                          type="submit"
                        >
                          Write Review
                        </button>
                      </div>
                    </div>
                    <div className="col-xl-7">
                      <div className="review-people">
                        <ul className="review-list">
                          {data.reviews.map((review, index) => (
                            <li key={index}>
                              <div className="people-box">
                                <div className="people-comment">
                                  <div className="people-name">
                                    <Link href="#!" className="name">
                                      {review.name}
                                    </Link>
                                    <h6 className="text-content">
                                      {review.date}
                                    </h6>
                                    <ul className="product-rating">
                                      {[...Array(5)].map((_, i) => (
                                        <li key={i} className="star-rating">
                                          <i
                                            className={
                                              i < review.rating
                                                ? "ri-star-fill"
                                                : "ri-star-line"
                                            }
                                          ></i>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="reply">
                                    <p>{review.comment}</p>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="tab-pane fade"
                id="top-contact"
                role="tabpanel"
                aria-labelledby="contact-top-tab"
              >
                <div className="post-question-box">
                  <h4>
                    Have Doubts Regarding This Product ?{" "}
                    <Link href="#ask-question" data-bs-toggle="modal">
                      Post Your Question
                    </Link>
                  </h4>
                </div>
                <div className="question-answer">
                  <ul>
                    {data.questions.map((qa, index) => (
                      <li key={index}>
                        <div className="question-box">
                          <h6 className="font-weight-bold que">
                            Q{index + 1}: {qa.question}
                          </h6>
                        </div>
                        <div className="answer-box">
                          <p className="ans">
                            A{index + 1}: {qa.answer}
                          </p>
                        </div>
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
  );
};

export default ProductDescription;
