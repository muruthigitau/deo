import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import "swiper/css";

// Sample slides
const slides = [
  {
    image: "/assets/images/alum-deodorant/banner-1.jpg",
    link: "/product",
    title: "Stay Fresh, Stay Confident",
    description: "Long-lasting alum protection with zero irritation.",
  },
  {
    image: "/assets/images/alum-deodorant/banner-2.jpg",
    link: "/product",
    title: "Natural Odor Protection",
    description: "Experience all-day freshness with our classic alum formula.",
  },
];

const Hero = () => {
  const [typedOnce, setTypedOnce] = useState(false);
  const slideDelay = 5000; // 5 seconds

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: slideDelay,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000}
        onSlideChange={() => setTypedOnce(false)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.link} className="block relative">
              <div className="relative w-full h-[600px] md:h-[800px]">
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Text Content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
                  <div className="max-w-3xl">
                    {/* Title with Typewriter Effect */}
                    <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 animate-fade-up">
                      {!typedOnce && (
                        <Typewriter
                          key={`title-${index}`}
                          words={[slide.title]}
                          loop={false}
                          cursor
                          cursorStyle="|"
                          typeSpeed={70}
                          deleteSpeed={0}
                          delaySpeed={1500}
                          onTypeEnd={() => setTypedOnce(true)}
                        />
                      )}
                      {typedOnce && slide.title}
                    </h1>

                    {/* Static Description */}
                    <p className="text-lg md:text-xl text-gray-800 mt-4 animate-fade-up animation-delay-200">
                      {slide.description}
                    </p>

                    {/* Fancy Button */}
                    <button className="mt-6 px-8 py-3 text-lg font-semibold text-white bg-gradient-to-r from-gray-900 to-gray-700 rounded-lg shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:rotate-1 hover:shadow-xl relative overflow-hidden group">
                      <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                      <span className="relative z-10">Shop Now</span>
                      <span className="absolute top-0 left-0 w-full h-full rounded-lg border border-gray-500 opacity-20"></span>
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
