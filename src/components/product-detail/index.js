import Link from "next/link";
import Product from "./product";
import ProductDescription from "./productdescription";

const ProductDetail = ({ product }) => {
  return (
    <>
      <div className="breadcrumb-section">
        <div className="container">
          <h2>Gym Coords Set</h2>
          <nav className="theme-breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link href="/">Home</Link>
              </li>
              <li className="breadcrumb-item">Product</li>
              <li className="breadcrumb-item active">Gym Coords Set</li>
            </ol>
          </nav>
        </div>
      </div>

      <Product />
      <ProductDescription />
    </>
  );
};

export default ProductDetail;
