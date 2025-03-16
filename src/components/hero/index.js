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
  // State to track if typing has happened
  const [typedOnce, setTypedOnce] = useState(false);

  // Auto delay for slides
  const slideDelay = 5000; // 5 seconds (longer slide time)

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
        speed={1000} // Smooth transition
        onSlideChange={() => setTypedOnce(false)} // Reset typing on slide change
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
                          key={`title-${index}`} // Ensures retyping on slide change
                          words={[slide.title]}
                          loop={false} // Types only once
                          cursor
                          cursorStyle="|"
                          typeSpeed={70} // Slower typing for emphasis
                          deleteSpeed={0} // No backspacing
                          delaySpeed={1500} // Delay before typing
                          onTypeEnd={() => setTypedOnce(true)} // Mark as typed
                        />
                      )}
                      {typedOnce && slide.title} {/* Show title after typing */}
                    </h1>

                    {/* Static Description */}
                    <p className="text-lg md:text-xl text-gray-800 mt-4 animate-fade-up animation-delay-200">
                      {slide.description}
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
