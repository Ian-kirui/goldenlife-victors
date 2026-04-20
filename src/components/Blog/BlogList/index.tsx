import React from "react";
import BlogCard from "@/components/SharedComponent/Blog/blogCard";
import type { Post, Category, Tag } from "@/types/api.types";

interface BlogListProps {
  posts: Post[];
  categories: Category[];
  tags: Tag[];
}

const BlogList: React.FC<BlogListProps> = ({ posts, categories, tags }) => {
  return (
    <section
      className="flex flex-wrap justify-center lg:py-24 py-16 dark:bg-dark"
      id="blog"
    >
      <div className="container mx-auto lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) px-4">
        {/* ── Optional filter bar — categories & tags are available here ── */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <span
                key={cat.id}
                className="text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full cursor-pointer hover:bg-primary hover:text-white transition"
              >
                {cat.name}
                {cat.postCount > 0 && (
                  <span className="ml-1 opacity-60">({cat.postCount})</span>
                )}
              </span>
            ))}
          </div>
        )}

        {posts.length === 0 ? (
          <p className="text-gray-400 text-center py-20">No posts available.</p>
        ) : (
          <div className="grid md:grid-cols-2 grid-cols-1 gap-7">
            {posts.map((blog) => (
              <div
                key={blog.id}
                className="w-full"
                data-aos="fade-up"
                data-aos-delay="200"
                data-aos-duration="1000"
              >
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;