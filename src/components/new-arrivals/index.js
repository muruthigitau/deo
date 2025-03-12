import Link from "next/link";
import Image from "next/image";

const mockData = {
  imageUrl: "../assets/images/fashion-1/full-banner/3.png",
  link: "category-page.html",
  altText: "New Arrivals Banner",
};

const NewArrivals = () => {
  return (
    <section className="pt-0">
      <Link href={mockData.link}>
        <img
          src={mockData.imageUrl}
          alt={mockData.altText}
          className="img-fluid blur-up lazyloaded"
        />
      </Link>
    </section>
  );
};

export default NewArrivals;
