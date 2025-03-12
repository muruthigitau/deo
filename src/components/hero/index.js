import Link from "next/link";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    image: "/assets/images/fashion-1/full-banner/1.png",
    link: "/category-page",
  },
  {
    image: "/assets/images/fashion-1/full-banner/2.png",
    link: "/category-page",
  },
];

const Hero = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <section className="relative">
      <Slider {...settings}>
        {slides.map((slide, index) => (
          <div key={index} className="relative">
            <Link href={slide.link} className="block">
              <div className="relative w-full h-[600px]">
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  priority
                />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Hero;
