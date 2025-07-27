import "@/styles/globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import SEO from "@/components/SEO";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEO />

      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
