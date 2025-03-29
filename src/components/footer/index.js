import Link from "next/link";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-16 relative overflow-hidden">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Logo and Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link href="/">
              <div className="text-3xl font-extrabold tracking-wide text-white hover:text-green-400 transition duration-300 ease-in-out mb-4 cursor-pointer">
                Deo African Magic
              </div>
            </Link>
            <div className="text-gray-400 mb-6 max-w-md leading-relaxed">
              Committed to natural, skin-friendly deodorants with long-lasting
              protection and no harmful chemicals.
            </div>
            <div className="space-y-2 text-sm text-gray-400">
              <div className="flex items-center hover:text-green-400 transition">
                <i className="ri-map-pin-line text-lg mr-2" />
                <div>MyTown Karen, Nairobi, Kenya</div>
              </div>
              <div className="flex items-center hover:text-green-400 transition">
                <i className="ri-phone-line text-lg mr-2" />
                <div>+254 732 333 330</div>
              </div>
              <div className="flex items-center hover:text-green-400 transition">
                <i className="ri-mail-line text-lg mr-2" />
                <div>info@deoafricanmagic.com</div>
              </div>
            </div>
          </motion.div>

          {/* About Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-lg font-semibold mb-4">About Product</div>
            <div className="space-y-2 text-sm text-gray-400">
              {[
                "24 Hours",
                "No Irritations",
                "Alcohol-Free",
                "No Stains",
                "Natural",
                "Made in Thailand",
              ].map((item, i) => (
                <Link
                  key={i}
                  href="/product"
                  className="!text-gray-200 !hover:text-gray-400 transition block"
                >
                  {item}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Useful Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-lg font-semibold mb-4">Useful Links</div>
            <div className="space-y-2 text-sm text-gray-400">
              {["Home", "Contact", "Product"].map((link, i) => (
                <Link
                  key={i}
                  href={`/${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="!text-gray-200 !hover:text-gray-400 transition block"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Newsletter & Socials */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="text-lg font-semibold mb-4">Follow Us</div>
            <div className="text-gray-400 mb-4 text-sm">
              Subscribe to our newsletter for the latest updates and offers.
            </div>
            <form className="flex flex-col sm:flex-row gap-3 mb-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg focus:ring-2 focus:ring-green-400 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-white font-medium transition"
              >
                Subscribe
              </button>
            </form>
            <div className="flex space-x-4">
              {[
                { icon: "ri-facebook-fill", url: "https://facebook.com" },
                { icon: "ri-twitter-fill", url: "https://twitter.com" },
                { icon: "ri-instagram-fill", url: "https://instagram.com" },
                { icon: "ri-pinterest-fill", url: "https://pinterest.com" },
              ].map((social, i) => (
                <div key={i}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-green-400 transition"
                  >
                    <i className={`${social.icon} text-xl !text-gray-400`} />
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <div>
            &copy; {new Date().getFullYear()} All Rights Reserved. | Designed
            with ❤️ by <Link href="https://softleek.com/"></Link>
            <Link href="https://mslabdesigns.com/"> Mslabdesigns </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
