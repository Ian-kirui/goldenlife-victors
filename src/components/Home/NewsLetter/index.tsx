import Link from "next/link";
import { getAllPublicPosts } from "@/utils/blogApi";
import BlogCard from "./blogCard";

const Newsletter = async () => {
  const posts = await getAllPublicPosts();
  const latest = posts.slice(0, 3);

  return (
    <section className="lg:py-28 py-16 dark:bg-dark">
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) px-4">
        <div className="grid lg:grid-cols-2 grid-cols-1 lg:gap-44">
          {/* Subscribe form */}
          <div data-aos="fade-left">
            <div className="mb-8">
              <p className="text-base text-primary mb-3">Newsletter</p>
              <h2 className="text-3xl font-medium mb-6">
                Stay informed about new and upcoming causes
              </h2>
              <p className="text-base text-muted dark:text-white/60">
                Subscribe to our updates and stay connected with the latest causes and
                initiatives. Be among the first to learn how you can make a difference
                in urgent and upcoming projects!
              </p>
            </div>
            <form>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden"
                />
              </div>
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full p-4 border border-border dark:border-dark_border focus:border-primary dark:focus:border-primary dark:bg-dark rounded-sm focus-visible:outline-hidden"
                />
              </div>
              <div className="flex justify-center mb-6">
                <button
                  type="submit"
                  className="text-white bg-linear-to-r from-error to-warning px-7 py-4 dark:hover:from-dark hover:from-white hover:to-white dark:hover:to-dark border border-transparent hover:border-error hover:text-error rounded-sm w-full"
                >
                  Subscribe
                </button>
              </div>
              <div className="flex items-center gap-2 mb-6">
                <input type="checkbox" name="condition" id="condition" />
                <label htmlFor="condition" className="text-base text-muted dark:text-white/60">
                  I am agree with the terms and conditions
                </label>
              </div>
            </form>
          </div>

          {/* Latest posts */}
          <div className="lg:mt-0 mt-8">
            <div className="flex justify-between items-center border-b border-border dark:border-dark_border pb-6 mb-8">
              <h4 className="text-base mb-0">Latest news at GoldenLife Victors</h4>
              <Link href="/blog" className="text-error hover:text-warning text-base">
                View all
              </Link>
            </div>

            {latest.length === 0 ? (
              <p className="text-gray-400 text-sm">No posts yet.</p>
            ) : (
              latest.map((blog) => (
                <div
                  key={blog.id}
                  className="lg:mb-10 mb-6"
                  data-aos="fade-up"
                  data-aos-delay="200"
                  data-aos-duration="1000"
                >
                  <BlogCard blog={blog} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;