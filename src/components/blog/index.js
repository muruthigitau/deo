import Link from "next/link";
import Image from "next/image";

const blogPosts = [
  {
    id: 1,
    date: "25 January 2021",
    title: "Top 10 January Best-Sellers Products – All Under $50!",
    author: "John Dio",
    comments: 2,
    image: "/assets/images/fashion-1/blog/1.png",
  },
  {
    id: 2,
    date: "25 January 2018",
    title: "Quarantine Birthday Celebration | In The Times of COVID-19",
    author: "John Dio",
    comments: 2,
    image: "/assets/images/fashion-1/blog/2.png",
  },
  {
    id: 3,
    date: "25 January 2018",
    title: "London fashion & Hair Trends From Fashion Week",
    author: "John Dio",
    comments: 2,
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
            <h2 className="title-inner1">Fashion for You</h2>
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
