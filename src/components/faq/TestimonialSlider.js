// components/TestimonialSlider.jsx
import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Quote, MapPin, Calendar } from "lucide-react";

const TestimonialSlider = () => {
  const reviews = [
    // Original Reviews
    {
      name: "Faith Muso.",
      location: "Kilimani, Nairobi", // Added Nairobi for clarity
      text: "I sweat a lot, like a lot, and I was honestly skeptical. But wow. I’ve gone a full day in Nairobi heat, walked, worked, even hit the gym, and didn’t smell a thing. Plus, no marks on my black top. I’m sold.",
    },
    {
      name: "Ben .",
      location: "Mombasa",
      text: "I’ve used natural deodorants before, but this is on a whole new level. It doesn’t smell at all, which I LOVE because it doesn’t interfere with my perfume. And I’ve been using the same stone for 8 months.",
    },
    {
      name: "Angela Achieng",
      location: "Kisumu",
      text: "It bought two deos, because it works on my feet too, not just my underarms! I use it after my morning shower and I stay fresh all day. No irritation, no itchiness like I used to get with regular deo sprays.",
    },
    // New Reviews with Kenyan Locations added
    {
      name: "Nancy W.",
      location: "Eldoret, Uasin Gishu County",
      text: "I’ve struggled with skin irritation from regular deodorants, but this one is a game changer. No rashes, no smell, just clean freshness all day.",
    },
    {
      name: "Alex M.",
      location: "Nakuru County",
      text: "I was skeptical at first, but it truly lasts all day. Even after workouts, I stay dry and odor-free.",
    },
    {
      name: "Sophie K.",
      location: "Thika, Kiambu County",
      text: "I love that it has no fragrance. It doesn’t clash with my perfume and feels so natural on the skin.",
    },
    {
      name: "Kevin O.",
      location: "Nyeri County",
      text: "I’ve been using mine for over 6 months and it’s still going strong. Amazing value for money!",
    },
    {
      name: "Linda N.",
      location: "Machakos County",
      text: "My underarms used to get so irritated, but African Magic Deo is so gentle and still works better than anything I’ve tried.",
    },
    {
      name: "Brian T.",
      location: "Kisii County",
      text: "This product really surprised me. It’s simple, natural, and does exactly what it promises.",
    },
    {
      name: "Grace A.",
      location: "Meru County",
      text: "As someone who sweats a lot, I’ve finally found a deodorant that keeps me fresh all day. No stains, no residue.",
    },
    {
      name: "Tony K.",
      location: "Kakamega County",
      text: "I’ve completely ditched my spray deodorants. One swipe of this and I’m good for the whole day.",
    },
    {
      name: "Cynthia L.",
      location: "Kericho County",
      text: "It feels like I’m not wearing anything, but I stay fresh for hours. Love the minimalism!",
    },
    {
      name: "Daniel M.",
      location: "Vihiga County",
      text: "This is honestly the best deodorant I’ve used. And the fact that it’s natural? A big win.",
    },
    {
      name: "Mercy J.",
      location: "Bungoma County",
      text: "My favorite thing is that it doesn’t leave white marks on clothes. So clean and easy to use.",
    },
    {
      name: "James N.",
      location: "Malindi, Kilifi County",
      text: "I carry it when I travel. No spills, no stress. And it works better than anything I’ve bought abroad!",
    },
    {
      name: "Caroline W.",
      location: "Narok County",
      text: "It took me a while to switch from sprays, but now I can’t imagine using anything else.",
    },
    {
      name: "Esther G.",
      location: "Laikipia County",
      text: "My teenage son uses it too. No harsh smells, just natural and effective for both of us.",
    },
    {
      name: "Martin S.",
      location: "Embu County",
      text: "Finally, a product that does what it says. Long-lasting freshness with no chemicals.",
    },
    {
      name: "Diana P.",
      location: "Kajiado County",
      text: "I like that it’s unscented. Just pure protection with no artificial smells.",
    },
    {
      name: "George M.",
      location: "Busia County",
      text: "I’ve recommended it to my whole family. It works for everyone, even sensitive skin.",
    },
    {
      name: "Joyce L.",
      location: "Migori County",
      text: "Affordable, eco-friendly, and lasts for months. This is a smart buy.",
    },
    {
      name: "Annette K.",
      location: "Isiolo County",
      text: "I started using it during pregnancy because it’s natural, and I’ve never gone back.",
    },
    {
      name: "Samuel R.",
      location: "Taita-Taveta County",
      text: "I’m outdoors a lot and always on the move. This keeps me fresh without fail.",
    },
  ];
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  // Settings for react-slick slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Slider {...sliderSettings}>
        {reviews.map((review, index) => (
          <div key={index} className="!px-3">
            <motion.div
              key={index}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{
                translateY: -8,
                boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="!bg-green-50 !p-6 !mb-6 !rounded-2xl !shadow-md !border !border-green-200 !flex !flex-col !transition-all !duration-300"
            >
              <div className="!flex !items-center !mb-4">
                {/* Removed image from reviews as requested */}
                <div>
                  <p className="!font-bold !text-gray-900 !text-lg">
                    {review.name}
                  </p>
                  <p className="!text-sm !text-gray-600 !flex !items-center">
                    <MapPin className="!h-4 !w-4 !mr-1" /> {review.location}
                  </p>
                </div>
              </div>
              <p className="!italic !text-gray-700 !mb-4 !flex-grow">
                "{review.text}"
              </p>
              <div className="!flex !justify-end !text-sm !text-gray-500">
                <Calendar className="!h-4 !w-4 !mr-1" />
                Verified Purchase
              </div>
            </motion.div>
          </div>
        ))}
      </Slider>
      {/* Global styling for react-slick dots */}
      <style jsx global>{`
        /* Custom styling for react-slick dots */
        .slick-dots {
          !bottom: -50px; /* Adjust vertical position of dots */
        }
        .slick-dots li !button:before {
          !font-size: 10px;
          !color: #86efac; /* Green-300 for inactive dots */
          !opacity: 0.75;
          !transition: all 0.3s ease;
        }
        .slick-dots li.slick-active !button:before {
          !color: #16a34a; /* Green-600 for active dot */
          !opacity: 1;
        }
        .slick-dots li {
          !margin: 0 5px; /* Spacing between dots */
        }
      `}</style>
    </>
  );
};

export default TestimonialSlider;
