import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/types/api.types";
import { formatPostDate } from "@/utils/formatDate";

const PLACEHOLDER = "/images/blog/placeholder.jpg";

const BlogCard = ({ blog }: { blog: Post }) => {
  const coverImage = blog.imageUrl ?? PLACEHOLDER;
  const authorName = blog.author?.name ?? "GoldenLife";

  return (
    <Link href={`/blog/${blog.id}`} className="group flex items-center gap-6">
      <div className="overflow-hidden rounded-sm shrink-0">
        <Image
          src={coverImage}
          alt={blog.title}
          width={150}
          height={100}
          className="group-hover:scale-110 duration-300 object-cover h-[100px] w-[150px]"
        />
      </div>
      <div className="min-w-0">
        <h4 className="font-medium text-lg group-hover:text-primary mb-2 line-clamp-2">
          {blog.title}
        </h4>
        <p className="text-muted dark:text-white/60 text-base">
          by {authorName} / {formatPostDate(blog.dateCreated, "dd MMM yyyy")}
        </p>
      </div>
    </Link>
  );
};

export default BlogCard;