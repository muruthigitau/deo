import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getFromDB } from "@/utils/indexedDB"; // Import IndexedDB utility

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0); // State for cart item count

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const allKeys = await getFromDB("cart");

        let totalItems = 0;
        if (!allKeys?.items) return;
        for (const item of allKeys?.items) {
          if (item) {
            totalItems += item.qty || 1; // Add quantity to total
          }
        }

        setCartItemCount(totalItems); // Update cart item count
      } catch (error) {
        console.error("Failed to fetch cart items:", error);
      }
    };

    // Fetch cart items immediately on mount
    fetchCartItems();

    // Set up an interval to fetch cart items every 2 seconds
    const intervalId = setInterval(fetchCartItems, 5000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      {/* Header */}
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "fixed top-0 left-0 bg-green-100 shadow-md"
            : "relative bg-gradient-to-r from-grey-50 via-orange-50 to-green-50"
        }`}
      >
        {/* Top Bar */}
        <div className="bg-green-600 text-white py-2 px-4 text-sm hidden md:block">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <span>🌿 Welcome to Our Online Store</span>
              <span className="flex items-center">
                <i className="ri-phone-fill mr-1"></i> Call Us: +254 732 333 330
              </span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="py-1 md:py-4 px-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/">
                <Image
                  src="/assets/images/logo.png"
                  alt="Logo"
                  width={100}
                  height={40}
                  className="hover:scale-105 transition-transform"
                />
              </Link>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-6 font-medium text-green-800">
              <Link
                href="/"
                className="!text-blue-900 !hover:text-yellow-600 !text-lg transition"
              >
                Home
              </Link>
              <Link
                href="/product"
                className="!text-blue-900 !hover:text-yellow-600 !text-lg transition"
              >
                Products
              </Link>
              {/* <Link
                href="/product"
                className="!text-blue-900 !hover:text-yellow-600 !text-lg transition"
              >
                New & Media
              </Link> */}
              <Link
                href="/ask-us"
                className="!text-blue-900 !hover:text-yellow-600 !text-lg transition"
              >
                Ask Us
              </Link>
              <Link
                href="/testimonials"
                className="!text-blue-900 !hover:text-yellow-600 !text-lg transition"
              >
                Testimonials
              </Link>
              <Link
                href="/contact"
                className="!text-blue-900 !hover:text-yellow-600 !text-lg transition"
              >
                Get in Touch
              </Link>
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* Cart */}
              <Link
                href="/cart"
                className="text-green-700 hover:text-red-500 transition relative"
              >
                <i className="ri-shopping-cart-line text-2xl"></i>
                {cartItemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-yellow-400 text-xs text-white rounded-full px-1.5 py-0.5 shadow-md">
                    {cartItemCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden text-green-800 hover:text-yellow-500 transition"
                onClick={toggleMobileMenu}
              >
                <i className="ri-menu-line text-2xl"></i>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Overlay Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-green-200">
          <span className="font-semibold text-green-800 text-lg">Menu</span>
          <button
            className="text-green-700 hover:text-red-500 transition"
            onClick={closeMobileMenu}
          >
            <i className="ri-close-line text-2xl"></i>
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 font-medium !text-orange-800">
          <Link href="/" onClick={closeMobileMenu} className="!text-orange-900">
            Home
          </Link>
          <Link
            href="/product"
            onClick={closeMobileMenu}
            className="!text-orange-900"
          >
            Product
          </Link>
          <Link
            href="/cart"
            onClick={closeMobileMenu}
            className="!text-orange-900"
          >
            Cart
          </Link>
          <Link
            href="/contact"
            onClick={closeMobileMenu}
            className="!text-orange-900"
          >
            Contact
          </Link>
        </nav>
        <div className="p-4 text-sm text-green-600 border-t border-green-900">
          🌱 Enjoy Shopping!
        </div>
      </div>
    </>
  );
};

export default Header;
