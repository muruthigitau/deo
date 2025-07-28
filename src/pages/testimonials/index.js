import Testimonials from "@/components/faq/Testimonials";
import Layout from "@/components/layout";

const TestimonialPage = () => {
  return (
    <Layout>
      <div className="py-2 md:py-6 px-1 md:px-6 bg-gradient-to-br from-white via-green-50 to-white">
        <Testimonials />
      </div>
    </Layout>
  );
};
export default TestimonialPage;
