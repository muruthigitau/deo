import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react"; // Using Quote icon for testimonials
import Link from "next/link";

const Testimonials = () => {
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
    <section className="!py-16 !px-6 !bg-gradient-to-br !from-green-50 !to-lime-50 !font-sans !relative !overflow-hidden">
      {/* Breadcrumb Section */}
      <div className="!bg-transparent !pb-4 !pt-12">
        <div className="!max-w-4xl !mx-auto !text-center !px-4">
          <h2 className="!text-4xl !font-extrabold !text-green-700 !mb-3 !tracking-wide !drop-shadow">
            Testimonials
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
              <li>Testimonials</li>
            </ol>
          </nav>
        </div>
      </div>
      {/* Background blobs for dynamic feel */}
      <div className="!absolute !top-1/4 !left-0 !w-64 !h-64 !bg-emerald-200 !rounded-full !mix-blend-multiply !filter !blur-3xl !opacity-20 !animate-blob-slow"></div>
      <div className="!absolute !bottom-1/4 !right-0 !w-64 !h-64 !bg-lime-200 !rounded-full !mix-blend-multiply !filter !blur-3xl !opacity-20 !animate-blob !animation-delay-2000"></div>

      <div className="!max-w-6xl !mx-auto !relative !z-10">
        <motion.h2
          className="!text-5xl !font-extrabold !text-green-800 !text-center !mb-16 !leading-tight !drop-shadow-lg"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Real Stories, Real Results.
        </motion.h2>

        <motion.div
          className="!grid !grid-cols-1 md:!grid-cols-2 lg:!grid-cols-3 !gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {reviews.map((review, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="!bg-white/90 !backdrop-blur-md !p-8 !rounded-3xl !shadow-xl !border !border-white/70 !relative !overflow-hidden !flex !flex-col !h-full"
            >
              {/* Quote icon as background element */}
              <Quote className="!absolute !-top-4 !-left-4 !h-24 !w-24 !text-green-200/50 !opacity-70 !z-0 !transform !rotate-12" />

              <p className="!relative !z-10 !italic !text-gray-700 !text-lg !leading-relaxed !mb-6 !flex-grow">
                "{review.text}"
              </p>
              <div className="!relative !z-10 !pt-4 !border-t !border-green-100">
                <p className="!font-bold !text-gray-900 !text-xl !mb-1">
                  — {review.name}
                </p>
                <p className="!text-sm !text-gray-600">{review.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
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
      `}</style>
    </section>
  );
};

export default Testimonials;
