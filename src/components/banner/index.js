import Link from "next/link";
import Image from "next/image";

const Banner = () => {
  return (
    <section className="pb-0 banner-section">
      <div className="container">
        <div className="row partition2">
          <div className="col-md-6">
            <Link href="/category-page">
              <Image
                src="/assets/images/alum-deodorant/banner-3.jpg"
                className="collection-banner img-fluid blur-up lazyloaded"
                alt="Banner 1"
                width={600}
                height={400}
              />
            </Link>
          </div>
          <div className="col-md-6">
            <Link href="/category-page">
              <Image
                src="/assets/images/alum-deodorant/banner-4.jpg"
                className="collection-banner img-fluid blur-up lazyloaded"
                alt="Banner 2"
                width={600}
                height={400}
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
