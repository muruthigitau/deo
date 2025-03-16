import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    date: "12 March 2024",
    title: "5 Reasons Why Alum Deodorant is Better for Your Skin",
    author: "Sarah K.",
    comments: 5,
    image: "/assets/images/fashion-1/blog/1.png", // Keeping your original images
  },
  {
    id: 2,
    date: "5 March 2024",
    title: "The Secret Behind Long-Lasting Freshness with Alum",
    author: "Dr. Mark Lee",
    comments: 3,
    image: "/assets/images/fashion-1/blog/2.png",
  },
  {
    id: 3,
    date: "20 February 2024",
    title: "How to Switch to Natural Deodorants Without Skin Irritation",
    author: "Emma R.",
    comments: 7,
    image: "/assets/images/fashion-1/blog/3.png",
  },
];

const Blog = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="title1 section-t-space">
            <h4>From the Blog</h4>
            <h2 className="title-inner1">All About Alum Deodorant</h2>
          </div>
        </div>
      </div>

      <section className="blog pt-0 ratio2_3">
        <div className="container">
          <div className="row">
            {blogPosts.map((post) => (
              <div key={post.id} className="col-md-4">
                <Link href="#!">
                  <div className="classic-effect">
                    <div
                      className="bg-size blur-up lazyloaded"
                      style={{
                        backgroundImage: `url(${post.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    >
                      <Image
                        src={post.image}
                        width={480}
                        height={320}
                        className="img-fluid blur-up lazyload bg-img"
                        alt={post.title}
                      />
                    </div>
                    <span></span>
                  </div>
                </Link>
                <div className="blog-details">
                  <h4>{post.date}</h4>
                  <Link href="#!">
                    <p>{post.title}</p>
                  </Link>
                  <hr className="style1" />
                  <h6>
                    by: {post.author}, {post.comments} Comments
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
