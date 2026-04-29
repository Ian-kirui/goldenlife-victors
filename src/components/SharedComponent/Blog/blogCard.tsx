import React from "react";
import Image from "next/image";
import { formatPostDate } from "@/utils/formatDate";
import Link from "next/link";
import type { Post } from "@/types/api.types";

const FALLBACK_IMAGE = "/images/blog/placeholder.jpg"; // add a placeholder to /public

const BlogCard = ({ blog }: { blog: Post }) => {
 const coverImage = blog.imageUrl ?? FALLBACK_IMAGE;
const date = blog.dateCreated ?? blog.createdAt;
const excerpt = blog.content ? blog.content.slice(0, 120) + "…" : null;

  return (
    <Link
      href={`/blog/${blog.id}`}
      className="group mb-0 grid grid-cols-12 lg:gap-9 gap-6"
    >
      <div className="overflow-hidden rounded-lg lg:col-span-5 col-span-12">
        <Image
          src={coverImage}
          alt={blog.title}
          width={300}
          height={250}
          style={{ height: "auto", width: "100%" }}
          className="group-hover:scale-110 duration-300"
        />
      </div>
      <div className="lg:col-span-7 col-span-12">
        <span className="text-base text-gray-400 mb-1">
          {formatPostDate(date, "MMM dd yyyy")}
        </span>
        {blog.category && (
          <span className="ml-3 text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            {blog.category.name}
          </span>
        )}
        <h5 className="text-[22px] leading-tight font-medium mb-4 mt-1 group-hover:text-primary">
          {blog.title}
        </h5>
        {excerpt && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 line-clamp-2">
            {excerpt}
          </p>
        )}
        <p className="text-primary text-base font-medium">Read More</p>
      </div>
    </Link>
  );
};

export default BlogCard;