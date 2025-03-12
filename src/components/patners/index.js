import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const partners = [
  "/assets/images/logos/1.png",
  "/assets/images/logos/2.png",
  "/assets/images/logos/3.png",
  "/assets/images/logos/4.png",
  "/assets/images/logos/5.png",
  "/assets/images/logos/6.png",
  "/assets/images/logos/7.png",
  "/assets/images/logos/8.png",
];

const Partners = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  return (
    <section className="py-10 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-center text-2xl font-bold mb-6">Our Partners</h2>
        <Slider {...settings}>
          {partners.map((logo, index) => (
            <div key={index} className="px-4">
              <div className="flex justify-center">
                <Image
                  src={logo}
                  alt={`Partner ${index + 1}`}
                  width={150}
                  height={80}
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Partners;
