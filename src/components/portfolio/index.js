import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const images = [
  "/assets/images/fashion-1/instagram/1.png",
  "/assets/images/fashion-1/instagram/2.png",
  "/assets/images/fashion-1/instagram/3.png",
  "/assets/images/fashion-1/instagram/4.png",
  "/assets/images/fashion-1/instagram/5.png",
  "/assets/images/fashion-1/instagram/6.png",
  "/assets/images/fashion-1/instagram/7.png",
];

const Portfolio = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
  };

  return (
    <section className="instagram ratio_square">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 p-0">
            <h2 className="title-borderless">#whowearwhat</h2>
            <Slider {...settings} className="slick-instagram">
              {images.map((src, index) => (
                <div key={index} className="instagram-box">
                  <Link href="#!">
                    <div
                      className="bg-size"
                      style={{
                        backgroundImage: `url(${src})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Image
                        src={src}
                        alt={`Instagram image ${index + 1}`}
                        layout="fill"
                        className="bg-img"
                      />
                      <div className="overlay">
                        <i className="ri-instagram-fill"></i>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
