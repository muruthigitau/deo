import { useEffect, useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Testimonial Data
const testimonials = [
  {
    id: 1,
    image: "/assets/images/avtar.jpg",
    name: "Mark Junco",
    role: "Designer",
    text: "You how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  {
    id: 2,
    image: "/assets/images/2.jpg",
    name: "Mark Junco",
    role: "Designer",
    text: "You how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings.",
  },
  // Add more testimonials as needed
];

// Team Data
const teamMembers = [
  {
    id: 1,
    image: "/assets/images/team/1.jpg",
    name: "Hileri Keol",
    role: "CEO & Founder At Company",
  },
  {
    id: 2,
    image: "/assets/images/team/2.jpg",
    name: "Hileri Keol",
    role: "CEO & Founder At Company",
  },
  {
    id: 3,
    image: "/assets/images/team/3.jpg",
    name: "Hileri Keol",
    role: "CEO & Founder At Company",
  },
  {
    id: 4,
    image: "/assets/images/team/4.jpg",
    name: "Hileri Keol",
    role: "CEO & Founder At Company",
  },
];

// About Content Data
const aboutContent = {
  banner: {
    image: "/assets/images/about/about-us.jpg",
    alt: "About Us Banner",
    width: 1200,
    height: 600,
  },
  content: {
    title:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
    shortDescription:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,",
    longDescription: `On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.`,
  },
  testimonialSection: {
    subtitle: "Latest Testimonials",
    title: "What People Say",
  },
  teamSection: {
    title: "Multikart Team Member",
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
      // Initialize sliders here if needed
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
