import Link from "next/link";
import { useState } from "react";

const mockData = {
  description:
    "The Alum Deodorant is an all-natural, fragrance-free deodorant crafted from 100% potassium alum. It provides long-lasting odor protection without harmful chemicals, making it perfect for sensitive skin.",
  ingredients: [
    "100% Natural Potassium Alum",
    "No Alcohol, No Parabens, No Fragrances",
  ],
  benefits: [
    "Neutralizes odor-causing bacteria without clogging pores",
    "Gentle on sensitive skin with no artificial fragrances or irritants",
    "Leaves no stains or residue on clothing",
    "Long-lasting protection with a single application",
  ],
  usage:
    "Simply wet the Alum Deodorant stone and apply it to clean skin. Works best when used on damp skin after showering.",
  sustainability:
    "Eco-friendly and long-lasting – one deodorant stone can last up to a year, reducing waste from disposable deodorants.",
  reviews: [
    {
      name: "Emma Lewis",
      date: "15 Mar 2025 08:30 AM",
      rating: 5,
      comment:
        "Love this deodorant! It keeps me fresh all day, and I love that it's completely natural.",
    },
    {
      name: "Ryan Carter",
      date: "12 Mar 2025 01:20 PM",
      rating: 4,
      comment:
        "Took a few days to get used to, but now I swear by it. No irritation, no scent, just pure protection!",
    },
    {
      name: "Sophia Nguyen",
      date: "10 Mar 2025 10:45 AM",
      rating: 5,
      comment:
        "A game-changer for my sensitive skin! No more irritation from chemical deodorants.",
    },
  ],
  questions: [
    {
      question: "How does alum deodorant work?",
      answer:
        "Alum deodorant forms a protective layer on your skin that prevents odor-causing bacteria from growing, keeping you fresh all day.",
    },
    {
      question: "Is it safe for sensitive skin?",
      answer:
        "Absolutely! The Alum Deodorant is free from harsh chemicals, making it ideal for sensitive skin.",
    },
    {
      question: "How long does one deodorant stone last?",
      answer:
        "With proper care, a single stone can last up to a year, making it an eco-friendly choice.",
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
                  <i className="icofont icofont-ui-home"></i> Description
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
                  <i className="icofont icofont-contacts"></i> Review
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
                  <i className="icofont icofont-contacts"></i> Q &amp; A
                </Link>
              </li>
            </ul>

            <div className="tab-content nav-material" id="top-tabContent">
              {/* Description Tab */}
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
                    <h5 className="inner-title">Ingredients:</h5>
                    <ul>
                      {data.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="part">
                    <h5 className="inner-title">Benefits:</h5>
                    <ul>
                      {data.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="part">
                    <h5 className="inner-title">Usage:</h5>
                    <p>{data.usage}</p>
                  </div>
                  <div className="part">
                    <h5 className="inner-title">Sustainability:</h5>
                    <p>{data.sustainability}</p>
                  </div>
                </div>
              </div>

              {/* Review Tab */}
              <div
                className="tab-pane fade"
                id="top-review"
                role="tabpanel"
                aria-labelledby="review-top-tab"
              >
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
                              <h6 className="text-content">{review.date}</h6>
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

              {/* Q&A Tab */}
              <div
                className="tab-pane fade"
                id="top-contact"
                role="tabpanel"
                aria-labelledby="contact-top-tab"
              >
                <div className="post-question-box">
                  <h4>
                    Have Doubts Regarding This Product?{" "}
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
