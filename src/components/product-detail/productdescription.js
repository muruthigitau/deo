import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Leaf,
  CheckCircle,
  XCircle,
  Package,
  Sparkle,
  Shirt,
  Heart,
  Hand,
  MapPin,
  Calendar,
  Zap,
} from "lucide-react";

const ProductDescription = () => {
  const description =
    "Alum Deodorant is a 100% natural solution to body odor, made from pure potassium alum. Fragrance-free and gentle, it combats bacteria without clogging pores, offering all-day protection for even the most sensitive skin types.";

  const pains = [
    { text: "Body odor", icon: XCircle },
    { text: "White marks", icon: XCircle },
    { text: "Fragrance clashing with your perfume", icon: XCircle },
    {
      text: "Sticky buildup or stains that never wash off clothes",
      icon: XCircle,
    },
  ];

  const gains = [
    { text: "Odor-free days", icon: CheckCircle },
    { text: "Confidence, even in heat or high activity", icon: CheckCircle },
    { text: "Skin-friendly, wellness-centered hygiene", icon: CheckCircle },
  ];

  const keyBenefits = [
    {
      title: "100% Natural Potassium Alum Stone",
      description:
        "Mined and polished into a crystal, you can use it for 2 years.",
      icon: Leaf,
    },
    {
      title: "Fragrance-Free",
      description:
        "It will never overpower your perfume or mix with sweat to create unwanted scents.",
      icon: Sparkle,
    },
    {
      title: "Eliminates Odor",
      description:
        "Neutralizes bacteria before it causes body odor, it’s not just a cover-up.",
      icon: Zap,
    },
    {
      title: "No Stains or Residue",
      description:
        "No marks on your clothes. No greasy feel. Just clean, invisible freshness.",
      icon: Shirt,
    },
    {
      title: "Multi-Purpose Use",
      description: "Underarms, feet, chest, back or anywhere you sweat.",
      icon: Hand,
    },
    {
      title: "Long-Lasting & Eco-Friendly",
      description:
        "One stone lasts up to 6 months with daily use. Less waste, more value.",
      icon: Package,
    },
    {
      title: "Gentle on Sensitive Skin",
      description:
        "No alcohol, no synthetic chemicals, no parabens, just mineral purity.",
      icon: Heart,
    },
  ];

  const usageSteps = [
    "Wet the top of the stone (or your underarm).",
    "Glide gently over clean skin.",
    "Allow to dry for a few seconds before dressing.",
    "Rinse the stone after use and store it dry.",
  ];

  const reviews = [
    {
      name: "Faith Muso.",
      location: "Kilimani",
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

  return (
    <section className="!py-12 !px-6 !bg-gradient-to-br !from-green-50 !to-lime-50 !font-sans">
      <div className="!max-w-6xl !mx-auto !space-y-16">
        {/* Hero Section */}
        <motion.div
          className="!text-center !bg-white !p-8 !rounded-3xl !shadow-xl !border !border-green-100 !relative !overflow-hidden"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="!absolute !top-0 !left-0 !w-32 !h-32 !bg-green-200 !rounded-full !mix-blend-multiply !filter !blur-xl !opacity-20 !animate-blob"></div>
          <div className="!absolute !bottom-0 !right-0 !w-32 !h-32 !bg-emerald-200 !rounded-full !mix-blend-multiply !filter !blur-xl !opacity-20 !animate-blob !animation-delay-2000"></div>

          <motion.h1
            className="!text-5xl !font-extrabold !text-green-800 !mb-4 !leading-tight !drop-shadow-md !relative !z-10"
            variants={itemVariants}
          >
            Your Body’s Best-Kept Secret. Now in Your Hands.
          </motion.h1>
          <motion.p
            className="!text-xl !text-gray-700 !mb-6 !max-w-4xl !mx-auto !leading-relaxed !relative !z-10"
            variants={itemVariants}
          >
            Looking for a deodorant that does the job without chemicals, scents,
            stains, or skin irritation? Meet{" "}
            <strong className="!text-emerald-700">
              African Magic Deodorant
            </strong>{" "}
            - a 100% natural potassium alum stone that works with your body, not
            against it.
          </motion.p>
          <motion.p
            className="!text-2xl !font-semibold !text-emerald-600 !italic !relative !z-10"
            variants={itemVariants}
          >
            🌿 No Fragrance. No Aluminum. No Worries.
          </motion.p>
        </motion.div>

        {/* Say Goodbye / Say Hello Section */}
        <motion.div
          className="!grid !grid-cols-1 md:!grid-cols-2 !gap-12 !bg-white !p-8 !rounded-3xl !shadow-xl !border !border-green-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <div className="!space-y-6">
            <h2 className="!text-3xl !font-bold !text-green-700 !mb-4 !flex !items-center">
              <XCircle className="!h-8 !w-8 !text-red-500 !mr-3" /> Say goodbye
              to:
            </h2>
            <ul className="!space-y-3">
              {pains.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="!flex !items-center !text-lg !text-gray-700"
                  >
                    <Icon className="!h-6 !w-6 !text-red-400 !mr-3 !flex-shrink-0" />{" "}
                    {item.text}
                  </motion.li>
                );
              })}
            </ul>
          </div>
          <div className="!space-y-6">
            <h2 className="!text-3xl !font-bold !text-green-700 !mb-4 !flex !items-center">
              <CheckCircle className="!h-8 !w-8 !text-green-500 !mr-3" /> And
              say hello to:
            </h2>
            <ul className="!space-y-3">
              {gains.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={index}
                    variants={itemVariants}
                    className="!flex !items-center !text-lg !text-gray-700"
                  >
                    <Icon className="!h-6 !w-6 !text-green-400 !mr-3 !flex-shrink-0" />{" "}
                    {item.text}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </motion.div>

        {/* Key Benefits Section */}
        <motion.div
          className="!bg-white !p-8 !rounded-3xl !shadow-xl !border !border-green-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="!text-4xl !font-extrabold !text-green-800 !text-center !mb-10 !drop-shadow-md">
            ✅ Key Benefits
          </h2>
          <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-8">
            {keyBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{
                    translateY: -8,
                    boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
                  }}
                  className="!bg-green-50 !p-6 !rounded-2xl !shadow-md !border !border-green-200 !text-center !flex !flex-col !items-center !group !transition-all !duration-300"
                >
                  <div className="!p-4 !bg-green-100 !rounded-full !mb-4 !group-hover:!bg-green-600 !transition-colors !duration-300">
                    <Icon className="!h-8 !w-8 !text-green-600 !group-hover:!text-white !transition-colors !duration-300" />
                  </div>
                  <h3 className="!text-xl !font-bold !text-gray-900 !mb-2">
                    {benefit.title}
                  </h3>
                  <p className="!text-base !text-gray-700 !leading-relaxed">
                    {benefit.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* How to Use Section */}
        <motion.div
          className="!bg-emerald-50 !p-8 !rounded-3xl !shadow-xl !border !border-emerald-100 !grid !grid-cols-1 lg:!grid-cols-2 !gap-10 !items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <h2 className="!text-4xl !font-extrabold !text-emerald-800 !mb-6 !drop-shadow-md">
              💧 How to Use
            </h2>
            <ol className="!list-decimal !list-inside !space-y-4 !text-lg !text-gray-700">
              {usageSteps.map((step, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants}
                  className="!flex !items-start"
                >
                  <span className="!font-semibold !text-emerald-600 !mr-2">
                    {index + 1}.
                  </span>
                  {step}
                </motion.li>
              ))}
            </ol>
            <motion.p
              variants={itemVariants}
              className="!mt-8 !text-xl !font-bold !text-emerald-700 !italic"
            >
              That’s it. Simple. Powerful. Natural.
            </motion.p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="!relative !w-full !h-80 !rounded-2xl !overflow-hidden !shadow-lg"
          >
            <Image
              src="/assets/images/deo/IMG-30.jpg" // Using IMG-30.jpg as the primary product image
              alt="How to use natural deodorant"
              layout="fill"
              objectFit="cover" // Cover to fill the space, common for visual demos
              className="!rounded-2xl"
            />
          </motion.div>
        </motion.div>

        {/* Real Reviews Section */}
        <motion.div
          className="!bg-white !p-8 !rounded-3xl !shadow-xl !border !border-green-100"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          <h2 className="!text-4xl !font-extrabold !text-green-800 !text-center !mb-10 !drop-shadow-md">
            ⭐ Real Reviews From Real People
          </h2>
          <div className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-8">
            {reviews.map((review, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  translateY: -8,
                  boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
                }}
                className="!bg-green-50 !p-6 !rounded-2xl !shadow-md !border !border-green-200 !flex !flex-col !transition-all !duration-300"
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
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductDescription;
