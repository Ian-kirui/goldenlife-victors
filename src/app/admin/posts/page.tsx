"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  getAdminPosts,
  getPublishedPosts,
  updatePost,
  deletePost,
  type UpdatePostPayload,
} from "@/utils/blogApi";
import type { Post } from "@/types/api.types";
import { formatPostDate } from "@/utils/formatDate";
import toast, { Toaster } from "react-hot-toast";

type Tab = "MY_POSTS" | "PUBLISHED" | "DRAFT";

const PLACEHOLDER = "/images/blog/placeholder.jpg";

const TAB_LABELS: Record<Tab, string> = {
  MY_POSTS: "My Posts",
  PUBLISHED: "Published",
  DRAFT:     "Draft",
};

export default function AdminPostsPage() {
  const { data: session, status } = useSession();
  const [posts, setPosts]       = useState<Post[]>([]);
  const [loading, setLoading]   = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [search, setSearch]     = useState("");
  const [tab, setTab]           = useState<Tab>("MY_POSTS");

  const token = (session as any)?.accessToken as string;

  const fetchPosts = useCallback(
    async (activeTab: Tab) => {
      if (!token) return;
      setLoading(true);
      try {
        let data: Post[] = [];
        if (activeTab === "MY_POSTS") {
          data = await getAdminPosts(token);           // all my posts (admin endpoint)
        } else if (activeTab === "DRAFT") {
          data = await getAdminPosts(token, "DRAFT");  // my drafts via ?status=DRAFT
        } else {
          data = await getPublishedPosts();             // all published (public endpoint)
        }
        setPosts(data);
      } catch {
        toast.error("Failed to load posts");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  useEffect(() => {
    if (status !== "authenticated") return;
    fetchPosts(tab);
  }, [status, tab, fetchPosts]);

  const handleToggleStatus = async (post: Post) => {
    setToggling(post.id);
    const newStatus = post.postStatus === "PUBLISHED" ? "DRAFT" : "PUBLISHED";
    try {
      await updatePost(token, post.id, {
        postStatus: newStatus as UpdatePostPayload["postStatus"],
      });
      toast.success(newStatus === "PUBLISHED" ? "Post published" : "Moved to draft");
      fetchPosts(tab);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update status");
    } finally {
      setToggling(null);
    }
  };

  const handleDelete = async (post: Post) => {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    setDeleting(post.id);
    try {
      await deletePost(token, post.id);
      setPosts((prev) => prev.filter((p) => p.id !== post.id));
      toast.success("Post deleted");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to delete post");
    } finally {
      setDeleting(null);
    }
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  const tabs: Tab[] = ["MY_POSTS", "PUBLISHED", "DRAFT"];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Toaster />

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Posts</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {posts.length} {TAB_LABELS[tab].toLowerCase()}
          </p>
        </div>
        <Link
          href="/admin/posts/new"
          className="flex items-center gap-2 bg-primary hover:bg-darkprimary text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Post
        </Link>
      </div>

      {/* Tabs + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e2436] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
        />
        <div className="flex gap-1 bg-gray-100 dark:bg-[#1e2436] rounded-lg p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => { setSearch(""); setTab(t); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                tab === t
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            {search
              ? "No posts match your search."
              : tab === "DRAFT"     ? "No drafts yet."
              : tab === "PUBLISHED" ? "No published posts yet."
              : "No posts yet. Create your first post!"}
          </div>
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
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">

                    {/* Thumbnail */}
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 relative">
                        {post.imageUrl ? (
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center" title="No cover image">
                            <svg className="w-5 h-5 text-gray-300 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Title + tags */}
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-900 dark:text-white line-clamp-1 max-w-xs">{post.title}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        {!post.imageUrl && (
                          <span className="text-xs text-amber-500 dark:text-amber-400 font-medium">⚠ No image</span>
                        )}
                        {post.tags && post.tags.length > 0 && (
                          <p className="text-xs text-gray-400 truncate max-w-[180px]">
                            {post.tags.map((t) => `#${t.name}`).join(" ")}
                          </p>
                        )}
                      </div>
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

                    {/* Status toggle */}
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleToggleStatus(post)}
                        disabled={toggling === post.id}
                        title="Click to toggle status"
                        className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all whitespace-nowrap ${
                          post.postStatus === "PUBLISHED"
                            ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 hover:bg-green-200"
                            : "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 hover:bg-amber-200"
                        } ${toggling === post.id ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                      >
                        {toggling === post.id ? "…" : post.postStatus}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/blog/${post.id}`} target="_blank"
                          className="text-gray-400 hover:text-primary transition-colors" title="View on site">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </Link>
                        <Link href={`/admin/posts/${post.id}`}
                          className="text-gray-400 hover:text-primary transition-colors" title="Edit post">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </Link>
                        <button onClick={() => handleDelete(post)} disabled={deleting === post.id}
                          title="Delete post"
                          className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-40">
                          {deleting === post.id ? (
                            <span className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin inline-block" />
                          ) : (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}