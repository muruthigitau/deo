import Banner from "@/components/banner";
import Blog from "@/components/blog";
import Hero from "@/components/hero";
import Layout from "@/components/layout";
import NewArrivals from "@/components/new-arrivals";
import Offer from "@/components/offer";
import Partners from "@/components/patners";
import Portfolio from "@/components/portfolio";
import Exclusive from "@/components/product/exclusive";
import Slide from "@/components/product/slide";
import HomeService from "@/components/service/homeservice";
import Link from "next/link";

const Home = () => {
  return (
    <Layout>
      <Hero />
      {/* <Banner /> */}
      <Offer />
      <Slide />
      {/* <NewArrivals /> */}
      {/* <Exclusive /> */}
      <HomeService />
      {/* <Blog /> */}
      {/* <Portfolio /> */}
      {/* <Partners /> */}
    </Layout>
  );
};
export default Home;
