import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getAdminPosts, getPublishedPosts, getAdminCategories, getAdminTags } from "@/utils/blogApi";
import Link from "next/link";
import Image from "next/image";
import { formatPostDate } from "@/utils/formatDate";

export const dynamic = "force-dynamic";

const PLACEHOLDER = "/images/blog/placeholder.jpg";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  const token = (session as any).accessToken as string;

  const [myPosts, publishedPosts, categories, tags] = await Promise.allSettled([
    getAdminPosts(token),
    getPublishedPosts(),       // all published posts from all authors
    getAdminCategories(),
    getAdminTags(),
  ]);

  const allMyPosts      = myPosts.status      === "fulfilled" ? myPosts.value      : [];
  const allPublished    = publishedPosts.status === "fulfilled" ? publishedPosts.value : [];
  const allCats         = categories.status   === "fulfilled" ? categories.value   : [];
  const allTags         = tags.status         === "fulfilled" ? tags.value         : [];

  const published = allMyPosts.filter((p) => p.postStatus === "PUBLISHED").length;
  const drafts    = allMyPosts.filter((p) => p.postStatus === "DRAFT").length;

  // Dashboard shows recent PUBLISHED posts from all authors
  const recentPublished = allPublished.slice(0, 5);

  const stats = [
    {
      label: "My Posts", value: allMyPosts.length, href: "/admin/posts",
      color: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400",
      iconBg: "bg-blue-100 dark:bg-blue-900/40",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    },
    {
      label: "Published", value: published, href: "/admin/posts",
      color: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      iconBg: "bg-green-100 dark:bg-green-900/40",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    },
    {
      label: "Drafts", value: drafts, href: "/admin/posts",
      color: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400",
      iconBg: "bg-amber-100 dark:bg-amber-900/40",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
    },
    {
      label: "Categories", value: allCats.length, href: "/admin/categories",
      color: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      iconBg: "bg-purple-100 dark:bg-purple-900/40",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg>,
    },
    {
      label: "Tags", value: allTags.length, href: "/admin/tags",
      color: "bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400",
      iconBg: "bg-pink-100 dark:bg-pink-900/40",
      icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>,
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back — here's what's happening on GoldenLife.
          </p>
        </div>
        <Link href="/admin/posts/new"
          className="flex items-center gap-2 bg-primary hover:bg-darkprimary text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}
            className="bg-white dark:bg-[#1e2436] rounded-xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 rounded-lg ${stat.iconBg} flex items-center justify-center mb-3 ${stat.color}`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
          </Link>
        ))}
      </div>

      {/* Recent published posts — all authors */}
      <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">Recent Published Posts</h2>
            <p className="text-xs text-gray-400 mt-0.5">All authors · {allPublished.length} total</p>
          </div>
          <Link href="/admin/posts" className="text-sm text-primary hover:underline">View all</Link>
        </div>

        {recentPublished.length === 0 ? (
          <p className="px-6 py-8 text-center text-gray-400 text-sm">No published posts yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider w-12">Image</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Title</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Author</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Category</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {recentPublished.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 relative">
                        {post.imageUrl ? (
                          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" sizes="48px" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    {/* Title */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">{post.title}</p>
                      {!post.imageUrl && (
                        <span className="text-xs text-amber-500 dark:text-amber-400 font-medium">⚠ No image</span>
                      )}
                    </td>
                    {/* Author */}
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400 text-xs">
                      {post.author?.name ?? "—"}
                    </td>
                    {/* Category */}
                    <td className="px-4 py-3 hidden md:table-cell text-gray-500 dark:text-gray-400 text-xs">
                      {post.category?.name ?? "—"}
                    </td>
                    {/* Date */}
                    <td className="px-4 py-3 hidden lg:table-cell text-gray-400 text-xs">
                      {formatPostDate(post.dateCreated)}
                    </td>
                    {/* Status */}
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                        {post.postStatus}
                      </span>
                    </td>
                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 justify-end">
                        <Link href={`/blog/${post.id}`} target="_blank"
                          className="text-gray-400 hover:text-primary transition-colors" title="View on site">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                        <Link href={`/admin/posts/${post.id}`}
                          className="text-gray-400 hover:text-primary transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Coming soon */}
      <div className="grid md:grid-cols-3 gap-4">
        {["Events", "Programmes", "User Management"].map((section) => (
          <div key={section}
            className="bg-white dark:bg-[#1e2436] rounded-xl border border-dashed border-gray-200 dark:border-gray-700 p-6 flex flex-col items-center justify-center text-center gap-2 min-h-[140px]"
          >
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-300 dark:text-gray-600">Coming Soon</span>
            <p className="text-base font-medium text-gray-400 dark:text-gray-500">{section}</p>
          </div>
        ))}
      </div>
    </div>
  );
}