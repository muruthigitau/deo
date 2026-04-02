import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import blogPosts from "@/data/blog";

const Detail = () => {
  const router = useRouter();
  const { slug } = router.query;

  const currentPost = blogPosts.find((post) => post.slug === slug);
  const otherPosts = blogPosts.filter((post) => post.slug !== slug);

  if (!currentPost) {
    return (
      <div className="flex !justify-center !items-center !h-screen !bg-gray-50">
        <h1 className="!text-3xl !font-semibold !text-gray-800">
          Blog post not found.
        </h1>
      </div>
    );
  }

  return (
    <div className="!bg-gray-50 !min-h-screen !font-sans">
      <div className="!container !mx-auto !px-4 !py-12 md:!py-16">
        {/* Main Title Section */}
        <div className="!text-center !mb-10">
          <h4 className="!text-sm !font-medium !tracking-wider !text-green-700 !uppercase">
            From the Blog
          </h4>
          <h2 className="!text-3xl md:!text-4xl !font-extrabold !text-gray-900 !mt-2 !leading-tight">
            All About Alum Deodorant
          </h2>
        </div>

        <section className="!flex !flex-col lg:!flex-row !gap-10">
          {/* Main Blog Content - 3/4 width on large screens */}
          <div className="lg:!w-3/4">
            <div className="!single-blog">
              <div className="!relative !w-full !h-80 md:!h-[480px] !rounded-2xl !overflow-hidden !mb-6">
                <Image
                  src={currentPost.imageSrc}
                  alt={currentPost.title}
                  layout="fill"
                  objectFit="cover"
                  quality={80}
                  className="!w-full !h-full"
                />
              </div>
              <div className="!blog-detail-content !px-4 sm:!px-0">
                <h1 className="!text-2xl md:!text-3xl !font-bold !text-gray-900 !leading-tight">
                  {currentPost.title}
                </h1>
                <p className="!text-sm !text-yellow-500 !font-semibold !mt-2">
                  {currentPost.date}
                </p>
                <p className="!mt-4 !text-gray-700 !text-lg !leading-relaxed">
                  {currentPost.description}
                </p>

                <div className="prose prose-green !max-w-none !mt-8 !text-gray-700">
                  {currentPost.content.map((block, index) => {
                    if (block.type === "paragraph") {
                      return (
                        <p key={index} className="!mb-4">
                          {block.text}
                        </p>
                      );
                    }
                    if (block.type === "heading") {
                      const HeadingTag = `h${block.level}`;
                      const size =
                        block.level === 3
                          ? "!text-xl !font-bold"
                          : "!text-lg !font-semibold";
                      return (
                        <HeadingTag
                          key={index}
                          className={`!font-bold !text-green-800 !mt-6 !mb-3 ${size}`}
                        >
                          {block.text}
                        </HeadingTag>
                      );
                    }
                    if (block.type === "list") {
                      const ListTag = block.style === "ordered" ? "ol" : "ul";
                      const listStyle =
                        block.style === "ordered"
                          ? "!list-decimal"
                          : "!list-disc";
                      return (
                        <ListTag
                          key={index}
                          className={`!pl-5 !space-y-2 !mt-4 !text-gray-700 ${listStyle}`}
                        >
                          {block.items.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ListTag>
                      );
                    }
                    if (block.type === "link") {
                      return (
                        <div key={index} className="!mt-4">
                          <Link
                            href="/product"
                            className="w-full px-4 py-3 rounded-lg text-lg font-medium transition relative hover:bg-green-600 hover:text-white bg-green-100 text-green-800"
                          >
                            {block.text}
                          </Link>
                        </div>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Other Blogs Section - 1/4 width on large screens */}
          <div className="lg:!w-1/4 !mt-8 lg:!mt-0">
            <div className="!other-blogs !sticky !top-8">
              <h4 className="!text-xl !font-bold !text-gray-800 !mb-6 !border-b-2 !border-yellow-400 !pb-2">
                Other Blogs
              </h4>
              <ul className="!space-y-6">
                {otherPosts.map((post) => (
                  <li key={post.slug} className="!group">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="!flex !items-start !gap-4 !p-2 !-m-2 !rounded-lg hover:!bg-gray-100 !transition-colors !duration-200"
                    >
                      <div className="!flex-shrink-0 !w-24 !h-16 !rounded-md !overflow-hidden">
                        <Image
                          src={post.imageSrc}
                          width={96}
                          height={64}
                          className="!w-full !h-full !object-cover !transition-transform !duration-300 group-hover:!scale-105"
                          alt={post.title}
                        />
                      </div>
                      <div>
                        <p className="!text-xs !text-green-500 !font-medium !mb-1">
                          {post.date}
                        </p>
                        <h6 className="!text-sm !font-semibold !text-gray-800 group-hover:!text-green-700 !transition-colors !duration-200 !line-clamp-3">
                          {post.title}
                        </h6>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Detail;
