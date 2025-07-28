import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Minus, Lightbulb } from "lucide-react";
import { useState } from "react";

const FAQ = () => {
  const faqsData = [
    {
      question: "Is this an antiperspirant?",
      answer:
        "No, and that’s a good thing. Sweat is natural and healthy. African Magic Deodorant doesn’t block sweat; it neutralizes the odor-causing bacteria.",
    },
    {
      question: "Will it leave a white residue or yellow stains?",
      answer:
        "Not at all. It goes on clear and leaves no marks on skin or clothing, even dark colors.",
    },
    {
      question: "Is it safe for sensitive skin?",
      answer:
        "Yes. It contains only one ingredient: pure potassium alum, a mineral salt. No alcohol, no fragrance, no artificial additives.",
    },
    {
      question: "How long does one stone last?",
      answer:
        "On average, 2 years with daily use. Just rinse and dry after each use.",
    },
    {
      question: "Can I use it on my feet or other parts of my body?",
      answer:
        "Absolutely. It's perfect for underarms, feet, chest, back, and any area you want to stay odor-free.",
    },
    {
      question: "Can I still wear perfume with it?",
      answer:
        "100%. Since it’s fragrance-free, it won’t clash or mix with your signature scent.",
    },
    {
      question: "What if I try it and it doesn’t work for me?",
      answer:
        "We’re confident you’ll love it. However, if you’re not “wow’ed,” just call us. We’ll make it right.",
    },
    {
      question: "Is this suitable for teenagers?",
      answer:
        "Yes, absolutely. African Magic Deodorant is made from pure potassium alum, a naturally occurring mineral salt with no alcohol, no fragrance, and no synthetic chemicals, making it gentle enough for teens, even those with sensitive skin. It’s a great way to support your teenager’s hygiene without introducing harsh antiperspirants or heavily perfumed products that may irritate developing skin.",
    },
    {
      question: "Can I use it during pregnancy?",
      answer:
        "Yes, it is considered safe to use during pregnancy. Unlike traditional deodorants that often contain aluminum compounds, parabens, or artificial fragrance blends, our formula is 100% natural and works by neutralizing odor-causing bacteria, not blocking sweat glands. Because it contains no hormone-disrupting ingredients, no additives, and no essential oils, it’s a thoughtful choice for expecting mothers who want to reduce chemical exposure without sacrificing freshness. Of course, if you have specific health concerns or allergies, always consult your healthcare provider.",
    },
    {
      question: "Does it wash out in the laundry?",
      answer:
        "Yes, and this is one of the biggest benefits. African Magic Deodorant does not stain fabrics or leave behind chemical residues that cling to your clothes like many antiperspirants do. It’s free from waxes, oils, and synthetic scents that are often the culprits behind stubborn odors or discoloration on clothing. Even on dark fabrics or delicate materials, the deodorant rinses out easily during regular washing. No build-up, no residue, no lingering “deo smell” in your wardrobe.",
    },
    {
      question: "Is it reef-safe?",
      answer:
        "Yes. Since it contains only one ingredient, pure potassium alum mineral salt and no chemicals, oils, preservatives, or nano-particles, it is fully reef-safe and eco-friendly. It does not wash off into the environment with harmful surfactants or synthetic compounds, making it a responsible choice for nature-conscious consumers especially those who swim, travel, or live near coastal ecosystems.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
    <>
      {/* Breadcrumb Section */}
      <div className="!bg-transparent !pb-4 !pt-12">
        <div className="!max-w-4xl !mx-auto !text-center !px-4">
          <h2 className="!text-4xl !font-extrabold !text-green-700 !mb-3 !tracking-wide !drop-shadow">
            💬 Ask Us (FAQs)
          </h2>
          <nav className="!text-sm !text-green-600 !font-medium">
            <ol className="!inline-flex !items-center !space-x-2">
              <li>
                <Link
                  href="/"
                  className="!hover:underline !hover:text-green-800 !transition"
                >
                  Home
                </Link>
              </li>
              <span className="!text-green-400">/</span>
              <li>FAQ</li>
            </ol>
          </nav>
        </div>
      </div>

      <motion.section
        className="!py-16 !px-6 !bg-gradient-to-br !from-green-50 !to-lime-50 !font-sans !relative !overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        {/* Background blobs for dynamic feel */}
        <div className="!absolute !top-1/4 !left-0 !w-64 !h-64 !bg-emerald-200 !rounded-full !mix-blend-multiply !filter !blur-3xl !opacity-20 !animate-blob-slow"></div>
        <div className="!absolute !bottom-1/4 !right-0 !w-64 !h-64 !bg-lime-200 !rounded-full !mix-blend-multiply !filter !blur-3xl !opacity-20 !animate-blob !animation-delay-2000"></div>

        <div className="!max-w-4xl !mx-auto !backdrop-blur-xl !bg-white/80 !p-8 !rounded-3xl !shadow-3xl !border !border-white/50 !relative !z-10">
          {faqsData.map((faq, index) => (
            <motion.div
              key={index}
              className="!border-b !border-green-200/50 !last:border-b-0 !py-5 !group !relative"
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(240, 253, 244, 0.7)",
              }} // Subtle hover background
              transition={{ duration: 0.2 }}
            >
              {/* Optional: Gradient border on hover */}
              <div className="!absolute !inset-0 !rounded-xl !border-2 !border-transparent !group-hover:!border-green-400 !transition-all !duration-300"></div>

              <button
                className="!relative !z-10 !flex !justify-between !items-center !w-full !text-left !font-semibold !text-xl !text-gray-800 hover:!text-green-700 focus:!outline-none"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                {activeIndex === index ? (
                  <Minus className="!h-6 !w-6 !text-green-600 !transition-transform !duration-200" />
                ) : (
                  <Plus className="!h-6 !w-6 !text-green-600 !transition-transform !duration-200" />
                )}
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  activeIndex === index
                    ? { height: "auto", opacity: 1, marginTop: "1rem" }
                    : { height: 0, opacity: 0, marginTop: "0rem" }
                }
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="!overflow-hidden !text-gray-700 !text-lg !leading-relaxed !pl-8 !pr-4" // Added padding for better alignment
              >
                {faq.answer}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Final Thought */}
        <motion.div
          className="!max-w-3xl !mx-auto !mt-16 !bg-gradient-to-r !from-green-600 !to-emerald-700 !text-white !p-8 !rounded-3xl !shadow-2xl !text-center !relative !overflow-hidden !border !border-green-500"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: faqsData.length * 0.1 }}
        >
          {/* Subtle pattern overlay */}
          <div className="!absolute !inset-0 !bg-dots-pattern !opacity-10 !pointer-events-none !z-0"></div>
          <div className="!relative !z-10">
            <Lightbulb className="!h-16 !w-16 !text-emerald-300 !mx-auto !mb-6 !animate-pulse-light" />
            <h3 className="!text-3xl !font-extrabold !mb-4 !drop-shadow !text-emerald-100">
              💡 Wellness is Simple. Start With Your Skin.
            </h3>
            <p className="!text-xl !leading-relaxed !mb-6 !text-emerald-200 !drop-shadow">
              African Magic Deodorant is more than odor control; it’s part of a
              mindful, minimalist, clean-living journey.
            </p>
            <p className="!text-2xl !font-bold !text-emerald-200 !drop-shadow">
              Try it today, and experience the confidence of nothing but nature.
            </p>
          </div>
        </motion.div>
      </motion.section>
      {/* You'll need to define these animations in your global CSS or in a <style jsx global> block */}
      <style jsx global>{`
        @keyframes animate-blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: animate-blob 7s infinite
            cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animate-blob-slow {
          animation: animate-blob 10s infinite
            cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }

        @keyframes pulse-light {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }
        .animate-pulse-light {
          animation: pulse-light 2s infinite ease-in-out;
        }

        .bg-dots-pattern {
          background-image: radial-gradient(
            circle,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 1px
          );
          background-size: 15px 15px;
        }
        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }
      `}</style>
    </>
  );
};

export default FAQ;
