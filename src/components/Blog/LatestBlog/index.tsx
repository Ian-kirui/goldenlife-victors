import React from "react";
import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import { getAllPublicPosts } from "@/utils/blogApi";
import Link from "next/link";
import { Icon } from "@iconify/react/dist/iconify.js";

const LatestBlog: React.FC = async () => {
  const posts = await getAllPublicPosts();
  const latest = posts.slice(0, 2);

  return (
    <section
      className="flex flex-wrap justify-center lg:py-24 py-16 dark:bg-darkmode bg-grey"
      id="blog"
    >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        <div className="flex items-center md:flex-nowrap flex-wrap justify-between mb-11">
          <h4 className="text-[40px] leading-tight font-semibold">
            Latest blog &amp; news
          </h4>
          <Link
            href="/blog"
            className="flex items-center gap-2 hover:text-primary dark:hover:text-primary text-midnight_text dark:text-white"
          >
            <p className="text-lg font-medium">View More</p>
            <Icon icon="line-md:arrow-right" className="text-xl" />
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="text-gray-400 text-center py-12">No posts yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
            {latest.map((post) => (
              <div
                key={post.id}
                className="w-full"
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

export default LatestBlog;