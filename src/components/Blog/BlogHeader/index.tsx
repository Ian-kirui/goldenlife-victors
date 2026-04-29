import { getAllPublicPosts, getPublicPostById } from "@/utils/blogApi";
import { formatPostDate } from "@/utils/formatDate";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getPublicPostById(params.slug);
  const siteName = process.env.SITE_NAME || "GoldenLife Victors";
  const authorName = process.env.AUTHOR_NAME || "GoldenLife";

  if (post) {
    return {
      title: `${post.title || "Single Post Page"} | ${siteName}`,
      author: authorName,
      robots: {
        index: true, follow: true, nocache: true,
        googleBot: { index: true, follow: false, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
      },
    };
  }
  return {
    title: "Not Found",
    description: "No blog article has been found",
    author: authorName,
    robots: {
      index: false, follow: false, nocache: false,
      googleBot: { index: false, follow: false, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPublicPosts();
  return posts.map((post) => ({ slug: post.id }));
}

export default async function BlogHead({ params }: { params: { slug: string } }) {
  const post = await getPublicPostById(params.slug);
  if (!post) notFound();

  // API returns author.name (not author.username)
  const authorName = post.author?.name ?? "GoldenLife";
  const initial = authorName.charAt(0).toUpperCase();

  return (
    <section className="pt-44 dark:bg-dark px-4">
      <div className="container mx-auto max-w-[1200px]">
        <div className="grid md:grid-cols-12 grid-cols-1 items-center">
          <div className="col-span-8">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
              <span className="text-base text-midnight_text dark:text-white font-medium pr-7 border-r border-solid border-grey dark:border-white w-fit">
                {/* API returns dateCreated (not createdAt) */}
                {formatPostDate(post.dateCreated)}
              </span>
              {post.category && (
                <span className="text-base text-midnight_text dark:text-white font-medium sm:pl-7 pl-0 w-fit">
                  {post.category.name}
                </span>
              )}
            </div>
            <h2 className="text-midnight_text dark:text-white text-[40px] leading-tight font-bold pt-7">
              {post.title}
            </h2>
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {post.tags.map((tag) => (
                  <span key={tag.id} className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                    #{tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6 col-span-4 pt-4 md:pt-0">
            <div className="flex items-center justify-center w-[84px] h-[84px] rounded-full bg-primary text-white text-3xl font-bold shrink-0">
              {initial}
            </div>
            <div>
              <span className="text-[22px] leading-tight font-bold text-midnight_text dark:text-white">
                {authorName}
              </span>
              <p className="text-xl text-gray-500 dark:text-white">Author</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}