"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { getAdminComments } from "@/utils/blogApi";
import type { Comment } from "@/types/api.types";
import { formatPostDate } from "@/utils/formatDate";
import toast, { Toaster } from "react-hot-toast";

type Filter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export default function AdminCommentsPage() {
  const { data: session, status } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<Filter>("ALL");
  const [search, setSearch]     = useState("");

  const token = (session as any)?.accessToken as string;

  const fetchComments = useCallback(async (activeFilter: Filter) => {
    if (!token) return;
    setLoading(true);
    try {
      const statusParam = activeFilter === "ALL" ? undefined : activeFilter;
      setComments(await getAdminComments(token, statusParam));
    } catch {
      toast.error("Failed to load comments");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetchComments(filter);
  }, [status, filter, fetchComments]);

  const filtered = comments.filter((c) =>
    c.content?.toLowerCase().includes(search.toLowerCase()) ||
    c.post?.title?.toLowerCase().includes(search.toLowerCase())
  );

  const filters: Filter[] = ["ALL", "PENDING", "APPROVED", "REJECTED"];

  const statusColor = (s: string) => {
    if (s === "APPROVED")  return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    if (s === "REJECTED")  return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
    return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Toaster />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {comments.length} {filter === "ALL" ? "total" : filter.toLowerCase()}
          </p>
        </div>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search comments or post titles…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e2436] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
        />
        <div className="flex gap-1 bg-gray-100 dark:bg-[#1e2436] rounded-lg p-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => { setSearch(""); setFilter(f); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                filter === f
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              {f}
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
            {search ? "No comments match your search." : `No ${filter === "ALL" ? "" : filter.toLowerCase() + " "}comments yet.`}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Comment</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden md:table-cell">Author</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Post</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider hidden lg:table-cell">Date</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filtered.map((comment) => (
                  <tr key={comment.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-gray-900 dark:text-white text-sm line-clamp-2 max-w-sm">
                        {comment.content}
                      </p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell text-gray-500 dark:text-gray-400 text-xs">
                      {comment.author?.name ?? "Anonymous"}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-xs">
                      {comment.post ? (
                        <span className="text-primary hover:underline cursor-pointer line-clamp-1 max-w-[160px] block">
                          {comment.post.title}
                        </span>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-gray-400 text-xs">
                      {formatPostDate(comment.dateCreated)}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${statusColor(comment.status)}`}>
                        {comment.status}
                      </span>
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