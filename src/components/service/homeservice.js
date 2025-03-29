import { ShieldCheck, Clock, Leaf, Shirt } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

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

const HomeService = () => {
  return (
    <section className="w-full bg-white max-w-6xl mx-auto py-16 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
      {/* Features Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={index}
              whileHover={{ translateY: -4 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-emerald-50 rounded-full">
                  <Icon className="h-5 w-5 text-emerald-600" />
                </div>
                <h4 className="ml-3 text-lg font-medium text-gray-800">
                  {feature.title}
                </h4>
              </div>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Full-width Image Section */}
      <div className="w-full relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <Image
            src="/assets/images/deo/product.jpeg"
            alt="Product Display"
            width={1920}
            height={600}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HomeService;
