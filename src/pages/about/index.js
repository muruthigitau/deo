import About from "@/components/about";
import Layout from "@/components/layout";
import Partners from "@/components/patners";
import Link from "next/link";

const AboutPage = () => {
  return (
    <Layout>
      <About />
      <Partners />
    </Layout>
  );
};
export default AboutPage;
