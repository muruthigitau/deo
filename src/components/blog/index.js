import Link from "next/link";
import Image from "next/image";
import blogPosts from "@/data/blog";

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

      <section className="blog pt-0 ">
        <div className="container">
          <div className="row">
            {blogPosts?.map((post) => (
              <div key={post.id} className="col-md-4">
                <Link href={`/blog/${post.slug}`} className="blog-box">
                  <div className="classic-effect">
                    <div className="bg-size blur-up lazyloaded">
                      <Image
                        src={post?.imageSrc}
                        width={480}
                        height={620}
                        className="img-fluid blur-up lazyload"
                        alt={post?.title}
                      />
                    </div>
                    <span></span>
                  </div>
                </Link>
                <div className="blog-details">
                  <h4>{post?.date}</h4>
                  <Link href={`/blog/${post.slug}`}>
                    <p>{post?.title}</p>
                  </Link>
                  <hr className="style1" />
                  <h6>{post?.description}</h6>
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
