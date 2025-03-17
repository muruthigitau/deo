import Link from "next/link";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Typewriter } from "react-simple-typewriter";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import "swiper/css";

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
  const typeSpeed = 70;
  const delaySpeed = 1500;

  const slideDelay = useMemo(() => {
    return slides.map(
      (slide) => slide.description.length * typeSpeed + delaySpeed
    );
  }, []);

  return (
    <div className="relative w-full overflow-hidden !bg-neutral-900 !mb-8">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          delay: slideDelay[0],
          disableOnInteraction: false,
        }}
        loop
        speed={1000}
        onSlideChange={(swiper) => {
          setTypedOnce(false);
          swiper.params.autoplay.delay = slideDelay[swiper.activeIndex];
          swiper.autoplay.start();
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link href={slide.link} className="block relative group">
              <div className="relative w-full h-[500px] sm:h-[600px] md:h-[750px] lg:h-[900px] xl:h-[1000px]">
                {/* Background Image */}
                <Image
                  src={slide.image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover object-center !transition-transform !duration-[1400ms] ease-in-out group-hover:!scale-105"
                  priority
                />

                {/* Deep Gradient Overlay */}
                <div className="absolute inset-0 !bg-gradient-to-br from-black/80 via-black/50 to-black/20 dark:to-black/70 z-10" />

                {/* Centered Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 sm:px-8 z-20">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="max-w-4xl text-white !drop-shadow-[0_12px_30px_rgba(0,0,0,0.6)]"
                  >
                    {/* Slide Title */}
                    <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl !font-black !tracking-tight !text-white dark:!text-white leading-tight">
                      {slide.title}
                    </h1>

                    {/* Description with Typewriter */}
                    <p className="mt-6 !text-base sm:!text-lg md:!text-xl lg:!text-2xl !text-gray-100">
                      {!typedOnce ? (
                        <Typewriter
                          key={`description-${index}`}
                          words={[slide.description]}
                          loop={false}
                          cursor
                          cursorStyle="|"
                          typeSpeed={typeSpeed}
                          deleteSpeed={0}
                          delaySpeed={delaySpeed}
                          onTypeEnd={() => setTypedOnce(true)}
                        />
                      ) : (
                        slide.description
                      )}
                    </p>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.12 }}
                      whileTap={{ scale: 0.95 }}
                      className="mt-10 px-8 py-4 
                        !bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 
                        dark:from-green-300 dark:via-emerald-400 dark:to-teal-500 
                        !text-white !font-extrabold text-lg rounded-full shadow-lg 
                        hover:shadow-2xl transition-all duration-300 transform hover:scale-105 
                        focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 
                        !backdrop-blur-md"
                    >
                      Shop Now
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Hero;
