import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TestimonialSlider from "./TestimonialSlider"; // Import the new slider component

const Testimonials = () => {
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

        {/* Call the new TestimonialSlider component here */}
        <TestimonialSlider />
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
