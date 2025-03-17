import { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Updated Testimonials
const testimonials = [
  {
    id: 1,
    image: "/assets/images/avtar.jpg",
    name: "Mark Junco",
    role: "Lead Designer",
    text: "The experience with Deo African Magic Limited has been nothing short of exceptional. Their attention to detail and quality is truly impressive.",
  },
  {
    id: 2,
    image: "/assets/images/2.jpg",
    name: "Emily Carter",
    role: "Creative Director",
    text: "I have worked with many teams, but none compare to the professionalism and dedication of Deo African Magic Limited. Highly recommended!",
  },
];

// Updated Team Members
const teamMembers = [
  {
    id: 1,
    image: "/assets/images/team/1.jpg",
    name: "James Akinyi",
    role: "CEO & Founder",
  },
  {
    id: 2,
    image: "/assets/images/team/2.jpg",
    name: "Sarah Njeri",
    role: "Head of Operations",
  },
  {
    id: 3,
    image: "/assets/images/team/3.jpg",
    name: "David Mwangi",
    role: "Creative Lead",
  },
  {
    id: 4,
    image: "/assets/images/team/4.jpg",
    name: "Linda Ochieng",
    role: "Marketing Strategist",
  },
];

// Updated About Content
const aboutContent = {
  banner: {
    image: "/assets/images/about/about-us.jpg",
    alt: "About Deo African Magic Limited",
    width: 1200,
    height: 600,
  },
  content: {
    title: "Experience the Magic of African Craftsmanship",
    shortDescription:
      "At Deo African Magic Limited, we blend innovation and tradition to create outstanding products that reflect Africa’s rich heritage.",
    longDescription: `With years of expertise, we are committed to delivering excellence in every aspect of our work. Our passion lies in preserving culture while embracing modern creativity. We prioritize customer satisfaction, ensuring that our products and services exceed expectations. From concept to execution, our team works diligently to bring visions to life. Join us on this incredible journey of art, culture, and innovation.`,
  },
  testimonialSection: {
    subtitle: "Our Clients Speak",
    title: "What Our Customers Say",
  },
  teamSection: {
    title: "Meet the Deo African Magic Team",
  },
};

const About = () => {
  const testimonialSliderRef = useRef(null);
  const teamSliderRef = useRef(null);

  // Slick settings for testimonials
  const testimonialSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Slick settings for team
  const teamSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 586,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Initialize sliders
  useEffect(() => {
    if (testimonialSliderRef.current && teamSliderRef.current) {
      // Initialize sliders if needed
    }
  }, []);

  return (
    <>
      <section className="about-page section-b-space">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-section">
                <Image
                  src={aboutContent.banner.image}
                  className="img-fluid blur-up lazyloaded"
                  alt={aboutContent.banner.alt}
                  width={aboutContent.banner.width}
                  height={aboutContent.banner.height}
                  priority
                />
              </div>
            </div>
            <div className="col-sm-12">
              <h4>{aboutContent.content.title}</h4>
              <p>{aboutContent.content.shortDescription}</p>
              <p>{aboutContent.content.longDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="testimonial small-section">
        <div className="container">
          <div className="title1">
            <h4>{aboutContent.testimonialSection.subtitle}</h4>
            <h2 className="title-inner1">
              {aboutContent.testimonialSection.title}
            </h2>
          </div>
          <Slider
            ref={testimonialSliderRef}
            {...testimonialSettings}
            className="slide-2 testimonial-slider"
          >
            {testimonials.map((testimonial) => (
              <div key={testimonial.id}>
                <div className="media">
                  <div className="text-center">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      width={100}
                      height={100}
                    />
                    <h5>{testimonial.name}</h5>
                    <h6>{testimonial.role}</h6>
                  </div>
                  <div className="media-body">
                    <p>{testimonial.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      <section id="team" className="team section-b-space slick-default-margin">
        <div className="container">
          <div className="title1">
            <h2 className="title-inner1 border-0">
              {aboutContent.teamSection.title}
            </h2>
          </div>
          <Slider ref={teamSliderRef} {...teamSettings} className="team-4">
            {teamMembers.map((member) => (
              <div key={member.id}>
                <div className="team-box">
                  <div>
                    <Image
                      src={member.image}
                      className="img-fluid blur-up lazyloaded"
                      alt={member.name}
                      width={320}
                      height={400}
                    />
                  </div>
                  <h4>{member.name}</h4>
                  <h6>{member.role}</h6>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </>
  );
};

export default About;
