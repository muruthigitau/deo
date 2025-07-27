import Link from "next/link";
import Header from "../header";
import Footer from "../footer";
import { ToastContainer } from "react-toastify";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <ToastContainer />
      <Footer />
    </>
  );
};
export default Layout;
