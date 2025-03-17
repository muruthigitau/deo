import Layout from "@/components/layout";
import ProductDetail from "@/components/product-detail";
import Link from "next/link";

const ProductPage = () => {
  return (
    <Layout>
      <div className="py-2 md:py-6 px-1 md:px-6 bg-gradient-to-br from-white via-green-50 to-white">
        <ProductDetail />
      </div>
    </Layout>
  );
};
export default ProductPage;
