import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link
          rel="icon"
          href="/assets/images/favicon.png"
          type="image/x-icon"
        />
        <link
          rel="shortcut icon"
          href="/assets/images/favicon.png"
          type="image/x-icon"
        />

        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
        />

        {/* Icons */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/vendors/font-awesome.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/vendors/remixicon.css"
        />

        {/* Slick Slider */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/vendors/slick.css"
        />

        {/* Animate CSS */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/vendors/animate.css"
        />

        {/* Themify Icons */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/vendors/themify-icons.css"
        />

        {/* Bootstrap CSS */}
        <link
          rel="stylesheet"
          type="text/css"
          href="/assets/css/vendors/bootstrap.css"
        />

        {/* Theme CSS */}
        <link rel="stylesheet" type="text/css" href="/assets/css/style.css" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />

        {/* External Scripts */}
        <Script
          src="/assets/js/jquery-3.3.1.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/assets/js/jquery-ui.min.js"
          strategy="beforeInteractive"
        />
        <Script src="/assets/js/jquery.exitintent.js" strategy="lazyOnload" />
        <Script src="/assets/js/exit.js" strategy="lazyOnload" />
        <Script src="/assets/js/slick.js" strategy="lazyOnload" />
        <Script src="/assets/js/menu.js" strategy="lazyOnload" />
        <Script src="/assets/js/lazysizes.min.js" strategy="lazyOnload" />
        <Script
          src="/assets/js/bootstrap.bundle.min.js"
          strategy="lazyOnload"
        />
        <Script
          src="/assets/js/bootstrap-notify.min.js"
          strategy="lazyOnload"
        />
        <Script src="/assets/js/fly-cart.js" strategy="lazyOnload" />
        <Script src="/assets/js/theme-setting.js" strategy="lazyOnload" />
        <Script src="/assets/js/script.js" strategy="lazyOnload" />

        {/* Inline Modal Script */}
        <Script id="modal-script" strategy="lazyOnload">
          {`
            document.addEventListener("DOMContentLoaded", function () {
              setTimeout(function () {
                const modal = document.getElementById("exampleModal");
                if (modal) {
                  $(modal).modal("show");
                }
              }, 2500);
            });
          `}
        </Script>
      </body>
    </Html>
  );
}
