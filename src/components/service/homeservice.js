import Link from "next/link";

const HomeService = () => {
  return (
    <div className="container">
      <section className="service border-section small-section">
        <div className="row">
          {/* Free Shipping */}
          <div className="col-md-4 service-block">
            <div className="media">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 680 680"
                width="50"
                height="50"
              >
                <path
                  d="M12.348 378.383h37.391c4.371 37.715 36.317 66.164 74.277 66.164 37.969 0 69.906-28.449 74.281-66.164h241.79c4.383 37.715 36.316 66.164 74.277 66.164 37.969 0 69.902-28.449 74.285-66.164h78.89c6.883 0 12.461-5.578 12.461-12.461v-352.957c0-6.883-5.578-12.465-12.461-12.465H217.136c-6.875 0-12.457 5.582-12.457 12.465v69.914H99.109c-4.074.011-7.891 2.008-10.219 5.363l-68.172 97.582-26.668 37.391-9.723 13.836a12.46 12.46 0 00-2.25 7.102v121.398c-.098 3.344 1.156 6.59 3.477 9.004a12.46 12.46 0 008.867 3.828zm111.418 37.387c-27.528 0-49.852-22.32-49.852-49.848 0-27.535 22.324-49.855 49.852-49.855 27.535 0 49.855 22.32 49.855 49.855 0 27.633-22.219 50.133-49.855 50.473zm390.348 0c-27.531 0-49.855-22.32-49.855-49.848 0-27.535 22.324-49.855 49.855-49.855 27.539 0 49.855 22.32 49.855 49.855.004 27.633-22.218 50.133-49.855 50.473z"
                  fill="#ec8951"
                ></path>
              </svg>
              <div className="media-body">
                <h4>Free Shipping</h4>
                <p>Free shipping worldwide</p>
              </div>
            </div>
          </div>

          {/* 24x7 Service */}
          <div className="col-md-4 service-block">
            <div className="media">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 480 480"
                width="50"
                height="50"
              >
                <path
                  d="M472 432h-24V280a8 8 0 00-14.552-4.584L320 432h104v24a8 8 0 0016 0v-24h24a8 8 0 000-16zM328 464h-94.712l88.056-103.688c16.566-24.518 11.048-57.713-12.56-75.552-28.705-20.625-68.695-14.074-89.319 14.631C212.204 309.532 207.998 322.597 208 336a8 8 0 0016 0c-.003-26.51 21.486-48.002 47.995-48.005 10.048-.001 19.843 3.151 28.005 9.013 16.537 12.671 20.388 36.007 8.8 53.32l-98.896 116.496a8 8 0 005.172 11.276h112a8 8 0 000-16z"
                  fill="#ec8951"
                ></path>
              </svg>
              <div className="media-body">
                <h4>24x7 Service</h4>
                <p>Online service for new customers</p>
              </div>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="col-md-4 service-block">
            <div className="media">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                width="50"
                height="50"
              >
                <path
                  d="M136.964 308.234c4.781-2.758 6.418-8.879 3.66-13.66-2.762-4.778-8.879-6.418-13.66-3.66-4.781 2.762-6.422 8.883-3.66 13.66 2.758 4.781 8.879 6.422 13.66 3.66zm0 0"
                  fill="#ec8951"
                ></path>
              </svg>
              <div className="media-body">
                <h4>Money Back Guarantee</h4>
                <p>100% money back guarantee</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeService;
