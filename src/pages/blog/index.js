import Blog from "@/components/blog";
import Layout from "@/components/layout";

const BlogPage = () => {
  return (
    <Layout>
      <div className="py-2 md:py-6 px-1 md:px-6 bg-gradient-to-br from-white via-green-50 to-white">
        <Blog />
      </div>
    </Layout>
  );
};
export default BlogPage;
