import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { useState, useMemo } from "react";
import "swiper/css";

const slides = [
  {
    image: "/assets/images/alum-deodorant/banner-1.jpg",
    link: "/product",
    title: "Stay Fresh, Stay Confident",
    description: "Long-lasting alum protection with zero irritation.", // 47 characters
  },
  {
    image: "/assets/images/alum-deodorant/banner-2.jpg",
    link: "/product",
    title: "Natural Odor Protection",
    description: "Experience all-day freshness with our classic alum formula.", // 59 characters
  },
];

const Hero = () => {
  // State to track if typing has happened
  const [typedOnce, setTypedOnce] = useState(false);

  // Typing configuration
  const typeSpeed = 70; // 70ms per character
  const delaySpeed = 1500; // 1500ms delay before typing starts

  // Calculate total typing duration for each slide
  const slideDelay = useMemo(() => {
    return slides.map((slide) => {
      const descriptionLength = slide.description.length;
      return descriptionLength * typeSpeed + delaySpeed;
    });
  }, []);

  return (
    <section className="relative w-full">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: slideDelay[0], // Use the first slide's delay initially
          disableOnInteraction: false,
        }}
        loop={true}
        speed={1000} // Smooth transition
        onSlideChange={(swiper) => {
          setTypedOnce(false); // Reset typing on slide change
          swiper.params.autoplay.delay = slideDelay[swiper.activeIndex]; // Update delay for the current slide
          swiper.autoplay.start(); // Restart autoplay with the new delay
        }}
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
                    {/* Static Title */}
                    <h1 className="text-2xl md:text-6xl font-extrabold text-gray-900 animate-fade-up">
                      {slide.title}
                    </h1>

                    {/* Description with Typewriter Effect */}
                    <p className="text-lg md:text-xl text-gray-800 mt-4 animate-fade-up animation-delay-200">
                      {!typedOnce && (
                        <Typewriter
                          key={`description-${index}`} // Ensures retyping on slide change
                          words={[slide.description]}
                          loop={false} // Types only once
                          cursor
                          cursorStyle="|"
                          typeSpeed={typeSpeed} // Typing speed
                          deleteSpeed={0} // No backspacing
                          delaySpeed={delaySpeed} // Delay before typing
                          onTypeEnd={() => setTypedOnce(true)} // Mark as typed
                        />
                      )}
                      {typedOnce && slide.description}{" "}
                      {/* Show description after typing */}
                    </p>

                    <button className="mt-6 px-6 py-3 bg-gray-900 text-white font-medium text-lg rounded-md transition-transform transform hover:scale-105 animate-fade-up animation-delay-400">
                      Shop Now
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
