import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import BlogCard from "./blogCard";
import { getAllPublicPosts } from "@/utils/blogApi";

const Blog: React.FC = async () => {
  const posts = await getAllPublicPosts();
  const featured = posts.slice(0, 3);

  return (
    <section
      className="flex flex-wrap justify-center py-24 dark:bg-darkmode"
      id="blog"
    >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md)">
        <div className="flex items-baseline justify-between flex-wrap">
          <h2
            className="sm:mb-11 mb-3 text-4xl font-bold text-midnight_text dark:text-white"
            data-aos="fade-right"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            Latest blog &amp; news
          </h2>
          <Link
            href="/blog"
            className="flex items-center gap-3 text-base text-midnight_text dark:text-white dark:hover:text-primary font-medium hover:text-primary sm:pb-0 pb-3"
            data-aos="fade-left"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            View More
            <span>
              <Icon icon="solar:arrow-right-outline" width="30" height="30" />
            </span>
          </Link>
        </div>

        {featured.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No posts yet.</p>
        ) : (
          <div className="grid grid-cols-12 gap-7">
            {featured.map((post) => (
              <div
                key={post.id}
                className="w-full md:col-span-4 col-span-6"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <BlogCard blog={post} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Blog;