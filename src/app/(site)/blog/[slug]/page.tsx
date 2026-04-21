import LatestBlog from "@/components/Blog/LatestBlog";
import Volunteer from "@/components/SharedComponent/Volunteer";
import ShareButtons from "@/components/Blog/ShareButtons";
import { getPublicPostById } from "@/utils/blogApi";
import { formatPostDate } from "@/utils/formatDate";
import Image from "next/image";
import { notFound } from "next/navigation";

// Render on demand — avoids build-time fetch timeouts against Render free tier
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: any) {
  const { slug } = await params;
  const post = await getPublicPostById(slug);

  const siteName = process.env.SITE_NAME || "GoldenLife Victors";
  const authorName = process.env.AUTHOR_NAME || "GoldenLife";

  if (post) {
    return {
      title: `${post.title} | ${siteName}`,
      author: authorName,
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: { index: true, follow: false, "max-image-preview": "large", "max-snippet": -1 },
      },
    };
  }

  return {
    title: "Not Found",
    description: "No blog article has been found",
    robots: { index: false, follow: false },
  };
}

// generateStaticParams removed — was causing build timeouts on Vercel
// because Render's free tier spins down and takes 30-50s to wake up

export default async function Post({ params }: any) {
  const { slug } = await params;
  const post = await getPublicPostById(slug);

  if (!post) notFound();

  const coverImage = post.coverImage ?? post.imageUrl ?? null;
  const authorName = post.author?.username ?? "GoldenLife";

  return (
    <>
      <section className="relative pt-44 dark:bg-dark px-4">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto">
          <div className="grid md:grid-cols-12 grid-cols-1 items-center">
            <div className="col-span-8">
              <div className="flex flex-col sm:flex-row">
                <span className="text-base text-midnight_text font-medium dark:text-white pr-7 border-r border-solid border-grey dark:border-white w-fit">
                  {formatPostDate(post.createdAt)}
                </span>
                {post.tags && post.tags.length > 0 && (
                  <span className="text-base text-midnight_text font-medium dark:text-white sm:pl-7 pl-0 w-fit">
                    {post.tags.map((t) => t.name).join(", ")}
                  </span>
                )}
              </div>
              <h2 className="text-midnight_text dark:text-white text-[40px] leading-tight font-bold pt-7">
                {post.title}
              </h2>
            </div>

            <div className="flex items-center md:justify-center justify-start gap-6 col-span-4 pt-4 md:pt-0">
              <div className="flex items-center justify-center w-20 h-20 rounded-full bg-primary text-white text-2xl font-bold shrink-0">
                {authorName.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="text-[22px] leading-tight font-bold text-midnight_text dark:text-white">
                  {authorName}
                </span>
                <p className="text-xl text-gray dark:text-white">Author</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-10 pt-20 dark:bg-dark lg:pb-20 lg:pt-32 px-4">
        <div className="container lg:max-w-(--breakpoint-xl) md:max-w-(--breakpoint-md) mx-auto">
          <div className="-mx-4 flex flex-wrap justify-center">
            <div className="w-full px-4">
              {coverImage && (
                <div className="z-20 mb-16 h-80 overflow-hidden rounded-sm md:h-45">
                  <Image
                    src={coverImage}
                    alt={post.title}
                    width={1170}
                    height={766}
                    quality={100}
                    className="h-full w-full object-cover object-center rounded-3xl"
                  />
                </div>
              )}

              <div className="-mx-4 flex flex-wrap">
                <div className="w-full px-4 lg:w-8/12">
                  {post.category && (
                    <span className="inline-block mb-4 text-sm font-medium bg-primary/10 text-primary px-3 py-1 rounded-full">
                      {post.category.name}
                    </span>
                  )}
                  <div className="blog-details markdown xl:pr-10">
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                  </div>
                  {post.tags && post.tags.length > 0 && (
                    <div className="mt-8 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag.id}
                          className="text-sm bg-gray-100 dark:bg-dark_border text-gray-600 dark:text-gray-300 px-3 py-1 rounded-full"
                        >
                          #{tag.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="w-full px-4 lg:w-4/12">
                  <div className="-mx-4 mb-8 flex flex-col">
                    <div className="w-full py-12 px-11 bg-white dark:bg-dark shadow-lg border-b-2 border-lightborder dark:border-dark_border rounded-t-lg">
                      <h2 className="relative mb-5 text-2xl dark:text-white text-black sm:text-3xl">
                        Share
                      </h2>
                      <ShareButtons title={post.title} />
                    </div>
                    <div className="w-full py-12 px-11 bg-white dark:bg-dark shadow-lg rounded-b-lg">
                      <p className="text-24 mb-4">Join our Newsletter</p>
                      <input
                        placeholder="Email address"
                        className="p-3 dark:bg-dark border border-border dark:border-dark_border rounded-lg mb-2 w-full focus:outline-0 focus:border-primary dark:focus:border-primary"
                      />
                      <button className="bg-linear-to-r w-full from-primary to-secondary px-7 border text-base text-white border-transparent py-4 rounded-sm hover:from-transparent hover:to-transparent hover:border-primary hover:text-primary">
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-SnowySky dark:bg-darklight">
        <LatestBlog />
        <Volunteer />
      </div>
    </>
  );
}