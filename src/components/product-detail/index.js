import Link from "next/link";
import Product from "./product";
import ProductDescription from "./productdescription";

const ProductDetail = ({ product }) => {
  return (
    <>
      {/* Breadcrumb Section */}
      <div className="bg-transparent pb-4 pt-12">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-extrabold text-green-700 mb-3 tracking-wide drop-shadow">
            Our Product
          </h2>
          <nav className="text-sm text-green-600 font-medium">
            <ol className="inline-flex items-center space-x-2">
              <li>
                <Link
                  href="/"
                  className="hover:underline hover:text-green-800 transition"
                >
                  Home
                </Link>
              </li>
              <span className="text-green-400">/</span>
              <li>Product</li>
              <span className="text-green-400">/</span>
              <li className="text-gray-800 font-semibold">Alum Deodorant</li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Section */}
      <Product />

      {/* Product Description Section */}
      <ProductDescription />
    </>
  );
};

export default ProductDetail;
