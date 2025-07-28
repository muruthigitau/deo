import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";
import "swiper/css";

const slides = [
  {
    image: "/assets/images/bg-4.png",
    link: "/product",
    title: "Stay Fresh. Naturally. All Day. Everywhere.",
    description:
      "The ancient wellness secret your body has been waiting for, no fragrance, no stains, no chemicals just 1 ingredient.",
  },
  {
    image: "/assets/images/bg-3.png",
    link: "/product",
    title: "Natural Odor Protection",
    description:
      "Experience all-day freshness with our classic alum formula. 100% natural potassium alum eliminates odor-causing bacteria without blocking pores.",
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative w-full bg-gradient-to-br from-green-50 via-white to-green-100 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={1}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop
        speed={2400}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full flex items-center justify-center px-8 pt-12">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[80vw] h-[80vh] rounded-full bg-green-300 opacity-20 blur-[120px]"></div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-7xl items-center gap-12 z-10">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="text-left space-y-6"
                >
                  <div className="text-2xl md:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 bg-clip-text text-transparent">
                    {slide.title}
                  </div>
                  <p className="text-lg text-gray-700 max-w-xl min-h-[120px]">
                    <Typewriter
                      key={activeIndex} // Forces re-render when the slide changes
                      words={[slide.description]}
                      loop={1}
                      cursor
                      cursorStyle="|"
                      typeSpeed={30}
                      deleteSpeed={10}
                    />
                  </p>

                  <Link href={slide.link}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-green-500 via-emerald-600 to-teal-700 rounded-lg shadow-lg hover:shadow-2xl transition-transform"
                    >
                      Shop Now
                    </motion.button>
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="relative flex justify-end h-full w-auto"
                >
                  <div className="relative h-full w-auto overflow-hidden">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      width={700}
                      height={500}
                      className="object-contain hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
