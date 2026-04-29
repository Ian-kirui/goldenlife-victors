import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getAdminPosts, getAdminCategories, getAdminTags } from "@/utils/blogApi";
import Link from "next/link";
import { formatPostDate } from "@/utils/formatDate";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  const token = (session as any).accessToken as string;

  const [posts, categories, tags] = await Promise.allSettled([
    getAdminPosts(token),
    getAdminCategories(),
    getAdminTags(),
  ]);

  const allPosts = posts.status      === "fulfilled" ? posts.value      : [];
  const allCats  = categories.status === "fulfilled" ? categories.value : [];
  const allTags  = tags.status       === "fulfilled" ? tags.value       : [];

  // API returns postStatus (not status)
  const published = allPosts.filter((p) => p.postStatus === "PUBLISHED").length;
  const drafts    = allPosts.filter((p) => p.postStatus === "DRAFT").length;

  const stats = [
    {
      label: "Total Posts", value: allPosts.length, href: "/admin/posts",
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

  const recentPosts = allPosts.slice(0, 5);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
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

      {/* Recent posts */}
      <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">Recent Posts</h2>
          <Link href="/admin/posts" className="text-sm text-primary hover:underline">View all</Link>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {recentPosts.length === 0 ? (
            <p className="px-6 py-8 text-center text-gray-400 text-sm">No posts yet.</p>
          ) : recentPosts.map((post) => (
            <div key={post.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{post.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {post.category?.name ?? "Uncategorised"} · {formatPostDate(post.dateCreated)}
                </p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full shrink-0 ${
                post.postStatus === "PUBLISHED"
                  ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                  : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400"
              }`}>
                {post.postStatus}
              </span>
              <Link href={`/admin/posts/${post.id}`} className="text-xs text-primary hover:underline shrink-0">Edit</Link>
            </div>
          ))}
        </div>
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