import {
  ShieldCheck,
  Clock,
  Leaf,
  Shirt,
  Sparkle,
  Droplet,
  Ruler,
  Heart,
  Package,
  Zap,
  Award,
  Gem,
  Lightbulb,
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

// Re-using the original features array as it's well-structured
const features = [
  {
    title: "Skin-Friendly Formula",
    description: "No irritation, gentle on skin.",
    icon: ShieldCheck,
  },
  {
    title: "Long-Lasting Protection",
    description: "All-day freshness.",
    icon: Clock,
  },
  {
    title: "Natural Ingredients",
    description: "No artificial chemicals.",
    icon: Leaf,
  },
  {
    title: "No Stains or Residue",
    description: "Won’t mark clothing.",
    icon: Shirt,
  },
];

const WhatIsSection = () => (
  <section className="w-full bg-gradient-to-br from-emerald-50 to-teal-50 max-w-7xl mx-auto py-20 px-8 rounded-3xl shadow-3xl my-16 relative overflow-hidden">
    {/* Decorative blobs for background animation */}
    <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
    <div className="absolute bottom-0 left-0 w-48 h-48 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-gray-800"
      >
        {/* Title now explicitly full width within its container */}
        <h2 className="text-5xl font-extrabold mb-8 text-emerald-900 leading-tight tracking-tight w-full">
          What Is{" "}
          <span className="text-emerald-600 drop-shadow-md">
            African Magic Deodorant
          </span>
          ?
        </h2>
        <p className="text-xl mb-8 leading-relaxed text-gray-700">
          It’s not a spray. It’s not a cream. It’s a pure{" "}
          <strong className="font-extrabold text-emerald-800">
            potassium alum crystal stone
          </strong>
          , a natural mineral that’s been trusted for generations to eliminate
          odor.
        </p>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg font-medium">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{
                  translateY: -8,
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                }}
                className="bg-white border border-emerald-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl -z-10 transform scale-105"></div>
                <div className="flex items-center mb-5">
                  <div className="p-3 bg-emerald-100 rounded-full group-hover:bg-emerald-600 transition-colors duration-300 transform group-hover:scale-110">
                    <Icon className="h-6 w-6 text-emerald-600 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h4 className="ml-4 text-xl font-semibold text-gray-900 group-hover:text-emerald-800 transition-colors duration-300">
                    {feature.title}
                  </h4>
                </div>
                <p className="text-base text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                  {feature.description}
                </p>
              </motion.li>
            );
          })}
        </ul>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="text-lg !mt-[20px] italic text-gray-700 bg-emerald-50/50 p-6 rounded-xl border border-emerald-200 shadow-inner"
        >
          This is real health and wellness for your underarms, feet, chest, back
          – wherever you sweat.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.0, ease: "easeOut" }}
        className="relative min-h-[450px] w-full flex items-center justify-center transform perspective-1000 rotateY-10 hover:rotateY-0 transition-all duration-700 ease-in-out"
      >
        {/* Image scaled to fit, retaining aspect ratio without overflow */}
        <Image
          src="/assets/images/deo/why.png" // Using why.png
          alt="African Magic Deodorant Stone"
          layout="fill"
          objectFit="contain" // Ensures full image is visible, no distortion, no crop
          className="rounded-3xl shadow-3xl border-8 border-emerald-400/50 animate-float"
        />
      </motion.div>
    </div>
  </section>
);

const WhyGoNaturalSection = () => (
  <section className="w-full bg-white max-w-7xl mx-auto py-20 px-8 my-16 rounded-3xl shadow-3xl relative overflow-hidden">
    <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none"></div>
    <div className="text-center mb-16 relative z-10">
      {/* Title now explicitly full width within its container */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg w-full"
      >
        <span className="text-green-700">Why Go Natural?</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
      >
        Let’s be honest. Most deodorants and antiperspirants are full of
        ingredients we can’t pronounce, synthetic scents that clash with our
        perfumes, and chemicals that block sweat (a healthy and natural body
        process).
      </motion.p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        whileHover={{
          translateY: -10,
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
        className="bg-gradient-to-br from-green-50 to-lime-50 p-10 rounded-3xl shadow-xl border border-green-200 text-center transform hover:scale-102 transition-all duration-300 group"
      >
        <Leaf className="h-16 w-16 text-green-700 mx-auto mb-6 transform group-hover:rotate-12 transition-transform duration-300" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Breathable Skin
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          African Magic Deodorant lets your body breathe naturally, supporting
          healthy bodily functions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        whileHover={{
          translateY: -10,
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
        className="bg-gradient-to-br from-lime-50 to-emerald-50 p-10 rounded-3xl shadow-xl border border-emerald-200 text-center transform hover:scale-102 transition-all duration-300 group"
      >
        <Sparkle className="h-16 w-16 text-emerald-700 mx-auto mb-6 transform group-hover:scale-125 transition-transform duration-300" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          No Overpowering Fragrance
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Enjoy true freshness without synthetic scents clashing with your
          favorite perfumes.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        whileHover={{
          translateY: -10,
          boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
        }}
        className="bg-gradient-to-br from-emerald-50 to-green-50 p-10 rounded-3xl shadow-xl border border-green-200 text-center transform hover:scale-102 transition-all duration-300 group"
      >
        <ShieldCheck className="h-16 w-16 text-green-700 mx-auto mb-6 transform group-hover:rotate-[-12deg] transition-transform duration-300" />
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Toxin-Free Confidence
        </h3>
        <p className="text-lg text-gray-700 leading-relaxed">
          Embrace clean confidence knowing you're using a product free from
          harmful chemicals.
        </p>
      </motion.div>
    </div>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="text-2xl font-bold text-center text-emerald-800 mt-16 drop-shadow-sm"
    >
      Just clean confidence.
    </motion.p>
  </section>
);

const WhatMakesItDifferentSection = () => (
  <section className="w-full bg-gradient-to-b from-green-50 to-emerald-50 max-w-7xl mx-auto py-20 px-8 my-16 rounded-3xl shadow-3xl relative overflow-hidden">
    {/* Decorative blobs for background animation */}
    <div className="absolute top-1/4 left-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-slow"></div>
    <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-slow animation-delay-3000"></div>

    <div className="text-center mb-16 relative z-10">
      {/* Title now explicitly full width within its container */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg w-full"
      >
        <span className="text-green-700">What Makes It Different?</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
      >
        Discover the unique benefits that set African Magic Deodorant apart from
        the rest.
      </motion.p>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative z-10">
      <div className="space-y-10">
        {[
          {
            title: "No Odor, Not Just a Cover-Up",
            description:
              "It doesn’t just mask sweat — it neutralizes the bacteria that cause odor, naturally. Experience true freshness.",
            icon: Zap,
          },
          {
            title: "No Fragrance, by Design",
            description:
              "You won’t smell like eucalyptus, lavender, or someone else’s idea of “fresh.” That’s intentional. This stone lets your perfume shine, not clash.",
            icon: Gem,
          },
          {
            title: "No Stains. No Build-Up. No Lingering Smell on Clothes.",
            description:
              "Ever worn a top that still “remembers” your old deodorant? Not with this one. No white marks, no yellowing, no scent trapped in your fabrics.",
            icon: Shirt,
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="flex items-start bg-white p-8 rounded-2xl shadow-xl border border-green-100 transform hover:scale-105 transition-transform duration-300 group"
            >
              <div className="p-4 bg-green-100 rounded-full flex-shrink-0 group-hover:bg-green-600 transition-colors duration-300">
                <Icon className="h-7 w-7 text-green-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="space-y-10">
        {[
          {
            title: "Tried, Tested, Trusted",
            description:
              "Potassium alum has been used for centuries in many cultures for hygiene. It’s a stone, not a formula. What worked back then still works today — only now, we’ve brought it to your doorstep.",
            icon: Award,
          },
          {
            title: "Healthier, Holistic Hygiene",
            description:
              "More than odor control — this is wellness support for your skin, your body, and your lifestyle. Because wellness starts with what we put on our skin.",
            icon: Leaf,
          },
        ].map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 0.8,
                delay: (index + 3) * 0.15,
                ease: "easeOut",
              }}
              className="flex items-start bg-white p-8 rounded-2xl shadow-xl border border-emerald-100 transform hover:scale-105 transition-transform duration-300 group"
            >
              <div className="p-4 bg-emerald-100 rounded-full flex-shrink-0 group-hover:bg-emerald-600 transition-colors duration-300">
                <Icon className="h-7 w-7 text-emerald-600 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="ml-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.0, delay: 0.8, ease: "easeOut" }}
          className="relative min-h-[350px] w-full rounded-3xl shadow-2xl flex items-center justify-center p-8 overflow-hidden"
        >
          {/* Image scaled to fit, retaining aspect ratio without overflow */}
          <Image
            src="/assets/images/deo/IMG-2.jpg" // Using IMG-2.jpg
            alt="Natural Texture"
            layout="fill"
            objectFit="contain" // Changed to contain for full visibility of texture
            className="rounded-3xl opacity-70 transform rotate-[-5deg] scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-green-700/60 to-transparent rounded-3xl"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-4xl font-extrabold text-white text-center drop-shadow-xl leading-snug">
              Pure. Simple. <br /> Effective.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const WhosItForSection = () => (
  <section className="w-full bg-gradient-to-tr from-lime-50 to-emerald-50 max-w-7xl mx-auto py-20 px-8 my-16 rounded-3xl shadow-3xl relative overflow-hidden">
    {/* Decorative blobs for background animation */}
    <div className="absolute top-0 left-0 w-64 h-64 bg-lime-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-reverse"></div>
    <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-200 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob-reverse animation-delay-2000"></div>

    <div className="text-center mb-16 relative z-10">
      {/* Title now explicitly full width within its container */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg w-full"
      >
        <span className="text-emerald-700">Who&apos;s It For?</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
      >
        African Magic Deodorant is for everyone seeking a healthier, more
        mindful approach to hygiene.
      </motion.p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
      {[
        "People who care about what goes on (and into) their bodies",
        "Sensitive skin warriors",
        "Minimalists and clean-beauty lovers",
        "Moms, athletes, professionals, teens",
        "Anyone looking to swap chemicals for clarity",
      ].map((audience, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          whileHover={{
            translateY: -10,
            boxShadow: "0 20px 30px rgba(0,0,0,0.1)",
            backgroundColor: "#f0fdf4",
          }}
          className="bg-white p-8 rounded-2xl shadow-lg border border-emerald-100 flex flex-col items-center text-center space-y-4 transform transition-all duration-300"
        >
          <div className="p-4 bg-emerald-100 rounded-full group-hover:bg-emerald-600 transition-colors duration-300">
            <Heart className="h-8 w-8 text-emerald-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <p className="text-xl font-semibold text-gray-900 leading-snug">
            {audience}
          </p>
        </motion.div>
      ))}
    </div>

    <motion.p
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="text-2xl font-bold text-center text-emerald-800 !mt-16 italic drop-shadow-sm"
    >
      If you’ve been looking for something clean, simple and real, you’ve found
      it.
    </motion.p>
  </section>
);

const HowToUseItSection = () => (
  <section className="w-full bg-white max-w-7xl mx-auto py-20 px-8 my-16 rounded-3xl shadow-3xl relative overflow-hidden">
    <div className="absolute inset-0 bg-diagonal-lines opacity-5 pointer-events-none"></div>
    {/* Title now explicitly full width within its container */}
    <h2 className="text-5xl font-extrabold !px-4 !mb-8 text-green-900 leading-tight tracking-tight w-full">
      <span className="text-green-600 drop-shadow-md">How to Use It</span> (and
      Why It Works)
    </h2>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -70 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="text-gray-800"
      >
        <ol className="space-y-8 text-xl list-none">
          {" "}
          {/* Removed default list styling */}
          <motion.li
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-start bg-green-50 p-6 rounded-xl shadow-md border border-green-200"
          >
            <span className="text-green-600 font-extrabold text-3xl mr-5 flex-shrink-0">
              1.
            </span>
            <div>
              <strong className="font-bold text-gray-900">
                Wet the stone lightly:
              </strong>{" "}
              A quick rinse under the tap is all it takes to activate its
              natural properties.
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-start bg-green-50 p-6 rounded-xl shadow-md border border-green-200"
          >
            <span className="text-green-600 font-extrabold text-3xl mr-5 flex-shrink-0">
              2.
            </span>
            <div>
              <strong className="font-bold text-gray-900">
                Glide it onto clean skin:
              </strong>{" "}
              Apply generously to underarms, feet, or any area you desire
              long-lasting odor protection.
            </div>
          </motion.li>
          <motion.li
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-start bg-green-50 p-6 rounded-xl shadow-md border border-green-200"
          >
            <span className="text-green-600 font-extrabold text-3xl mr-5 flex-shrink-0">
              3.
            </span>
            <div>
              <strong className="font-bold text-gray-900">
                Let it dry (a few seconds):
              </strong>{" "}
              A thin, invisible layer forms, and you're ready to go with no
              sticky residue.
            </div>
          </motion.li>
        </ol>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="text-lg !mt-10 italic text-gray-700 bg-green-100/70 p-8 rounded-xl border border-green-300 shadow-inner leading-relaxed"
        >
          The stone leaves behind a thin layer of natural mineral salts. These
          form an invisible barrier that stops odour before it starts, without
          clogging pores or interfering with your body's natural sweat process.
        </motion.p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
        className="relative min-h-[450px] w-full flex items-center justify-center transform perspective-1000 rotateX-10 hover:rotateX-0 transition-all duration-700 ease-in-out"
      >
        {/* Image scaled to fit, retaining aspect ratio without overflow */}
        <Image
          src="/assets/images/deo/IMG-3.jpg" // Using IMG-3.jpg
          alt="How to use African Magic Deodorant"
          layout="fill"
          objectFit="contain" // Changed to contain for full visibility
          className="rounded-3xl shadow-3xl border-8 border-green-400/50 animate-pulse-subtle"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-green-700/30 to-transparent rounded-3xl"></div>
      </motion.div>
    </div>
  </section>
);

const WhatDoesNaturalMeanSection = () => (
  <section className="w-full bg-gradient-to-tl from-teal-50 to-cyan-50 max-w-7xl mx-auto py-20 px-8 my-16 rounded-3xl shadow-3xl relative overflow-hidden">
    {/* Decorative blob for background animation */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-spin-slow"></div>

    <div className="text-center mb-16 relative z-10">
      {/* Title now explicitly full width within its container */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg w-full"
      >
        <span className="text-teal-700">
          What Does “100% Natural” Mean Here?
        </span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
      >
        Transparency is key. Here's what you won't find in African Magic
        Deodorant:
      </motion.p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12 relative z-10">
      {[
        "No aluminium chlorohydrate.",
        "No parabens.",
        "No alcohol.",
        "No perfume.",
        "No hidden “fragrance” loopholes.",
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
          whileHover={{
            translateY: -8,
            boxShadow: "0 15px 25px rgba(0,0,0,0.1)",
          }}
          className="bg-white p-6 rounded-2xl shadow-lg border border-teal-100 flex items-center space-x-4 transform transition-all duration-300 group"
        >
          <div className="p-3 bg-teal-100 rounded-full group-hover:bg-teal-600 transition-colors duration-300">
            <Lightbulb className="h-7 w-7 text-teal-600 group-hover:text-white transition-colors duration-300" />
          </div>
          <p className="text-lg font-semibold text-gray-900">{item}</p>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
      className="bg-teal-50/70 p-10 rounded-3xl text-center shadow-2xl border border-teal-300 relative z-10"
    >
      <p className="text-2xl font-bold text-teal-800 leading-relaxed">
        Just pure{" "}
        <strong className="font-extrabold text-teal-900">potassium alum</strong>
        , a naturally occurring mineral salt. Mined, carved, polished, and
        delivered to you in its purest form.
      </p>
    </motion.div>
  </section>
);

const OurPromiseSection = () => (
  <section className="w-full bg-gradient-to-br from-lime-50 to-green-50 max-w-7xl mx-auto py-20 px-8 my-16 rounded-3xl shadow-3xl relative overflow-hidden">
    {/* Background pattern from image */}
    <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
      <Image
        src="/assets/images/deo/IMG-6.jpg" // Using IMG-6.jpg for subtle texture
        alt="Subtle background texture"
        layout="fill"
        objectFit="cover" // This is for texture, so cover is appropriate
        className="rounded-3xl"
      />
    </div>
    {/* Decorative blob for background animation */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob-pulse"></div>

    <div className="text-center mb-16 relative z-10">
      {/* Title now explicitly full width within its container */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold text-gray-900 mb-6 drop-shadow-lg w-full"
      >
        <span className="text-green-700">Our Promise</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
      >
        We are confident you'll love African Magic Deodorant.
      </motion.p>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 1.0, delay: 0.4, ease: "easeOut" }}
      className="bg-white p-12 rounded-3xl shadow-3xl border-8 border-green-300/60 max-w-3xl mx-auto text-center relative z-10 transform rotate-[-2deg] hover:rotate-0 transition-transform duration-500 ease-in-out"
    >
      <div className="flex justify-center mb-8">
        <Heart className="h-24 w-24 text-green-500 animate-bounce-slow" />
      </div>
      <p className="text-3xl font-bold text-gray-900 mb-5 leading-snug">
        Try it. Use it.
      </p>
      <p className="text-xl text-gray-700 mb-8 leading-relaxed">
        If it doesn’t give you that “wow” moment in your daily routine, call us.
      </p>
      <p className="text-2xl font-extrabold text-green-800 drop-shadow-sm">
        No stress, no pressure - just wellness that works.
      </p>
    </motion.div>
  </section>
);

const CallToActionSection = () => (
  <section className="w-full bg-gradient-to-r from-emerald-600 to-green-700 text-white max-w-7xl mx-auto py-24 px-8 my-16 rounded-3xl shadow-3xl relative overflow-hidden">
    {/* Removed background image as requested */}
    {/* The gradient background now takes full visual prominence */}

    <div className="relative z-10 text-center">
      {/* Title now explicitly full width within its container */}
      <motion.h2
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-5xl font-extrabold mb-8 leading-tight drop-shadow-lg w-full"
      >
        <span className="text-emerald-200">Ready to Feel the Difference?</span>
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-xl max-w-4xl mx-auto mb-12 !text-emerald-100 leading-relaxed"
      >
        Order yours today and experience a deodorant that respects your body,
        your clothes, your scent, and your lifestyle.
      </motion.p>

      <motion.button
        whileHover={{
          scale: 1.07,
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          backgroundColor: "#f0fdf4",
          color: "#065f46",
        }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="flex-1 px-6 py-3 !bg-orange-500 text-white font-medium rounded-lg shadow-md hover:bg-orange-600 transition text-center"
      >
        Shop Now
      </motion.button>

      <div className="mt-16 flex flex-wrap justify-center gap-8 text-emerald-200 text-lg font-semibold">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center"
        >
          <Package className="h-6 w-6 mr-3 text-emerald-300" /> Fast delivery
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.0, duration: 0.6 }}
          className="flex items-center"
        >
          <Leaf className="h-6 w-6 mr-3 text-emerald-300" /> Eco-conscious
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex items-center"
        >
          <ShieldCheck className="h-6 w-6 mr-3 text-emerald-300" />{" "}
          Wellness-centered
        </motion.span>
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex items-center"
        >
          <Heart className="h-6 w-6 mr-3 text-emerald-300" /> Loved by thousands
        </motion.span>
      </div>
    </div>
  </section>
);

const FullPageDeodorantExperience = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-16 font-sans antialiased">
      {/* Custom Tailwind CSS classes for animations and patterns */}
      <style jsx global>{`
        @keyframes float {
          0% {
            transform: translateY(0px) rotateY(10deg);
          }
          50% {
            transform: translateY(-15px) rotateY(10deg);
          }
          100% {
            transform: translateY(0px) rotateY(10deg);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes blob {
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
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animate-blob-slow {
          animation: blob 10s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55);
        }
        .animate-blob-reverse {
          animation: blob 7s infinite cubic-bezier(0.68, -0.55, 0.27, 1.55)
            reverse;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }

        @keyframes blob-pulse {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.1);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
        }
        .animate-blob-pulse {
          animation: blob-pulse 5s infinite ease-in-out;
        }

        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite ease-in-out;
        }

        @keyframes pulse-subtle {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.01);
          }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite ease-in-out;
        }

        .bg-grid-pattern {
          background-image: linear-gradient(
              to right,
              rgba(0, 0, 0, 0.05) 1px,
              transparent 1px
            ),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }

        .bg-dots-pattern {
          background-image: radial-gradient(#d1d5db 1px, transparent 1px);
          background-size: 15px 15px;
        }

        .bg-diagonal-lines {
          background-image: linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.05) 25%,
              transparent 25%,
              transparent 75%,
              rgba(0, 0, 0, 0.05) 75%,
              rgba(0, 0, 0, 0.05)
            ),
            linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.05) 25%,
              transparent 25%,
              transparent 75%,
              rgba(0, 0, 0, 0.05) 75%,
              rgba(0, 0, 0, 0.05)
            );
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        .shadow-3xl {
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25),
            0 0 0 1px rgba(0, 0, 0, 0.05);
        }

        .perspective-1000 {
          perspective: 1000px;
        }
        .rotateY-10 {
          transform: rotateY(10deg);
        }
        .rotateX-10 {
          transform: rotateX(10deg);
        }
      `}</style>

      <WhatIsSection />
      <WhyGoNaturalSection />
      <WhatMakesItDifferentSection />
      <WhosItForSection />
      <HowToUseItSection />
      <WhatDoesNaturalMeanSection />
      <OurPromiseSection />
      <CallToActionSection />
    </div>
  );
};

export default FullPageDeodorantExperience;
