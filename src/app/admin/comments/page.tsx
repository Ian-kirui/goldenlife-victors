"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState, useCallback } from "react";
import { getAdminComments, moderateComment } from "@/utils/blogApi";
import type { Comment } from "@/types/api.types";
import { formatPostDate } from "@/utils/formatDate";
import toast, { Toaster } from "react-hot-toast";

type Filter = "ALL" | "PENDING" | "APPROVED" | "REJECTED";

export default function AdminCommentsPage() {
  const { data: session, status } = useSession();
  const [comments, setComments]   = useState<Comment[]>([]);
  const [loading, setLoading]     = useState(true);
  const [filter, setFilter]       = useState<Filter>("PENDING"); // default to pending
  const [search, setSearch]       = useState("");
  const [moderating, setModerating] = useState<string | null>(null);

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

  const handleModerate = async (comment: Comment, action: "APPROVED" | "REJECTED") => {
    setModerating(comment.id);
    try {
      await moderateComment(token, comment.id, action);
      toast.success(action === "APPROVED" ? "Comment approved" : "Comment rejected");
      fetchComments(filter);
    } catch (e: any) {
      // Endpoint may not be finalised yet — show a helpful message
      toast.error(e.message?.includes("404") ? "Moderation endpoint not yet available" : (e.message ?? "Failed to moderate"));
    } finally {
      setModerating(null);
    }
  };

  const filtered = comments.filter((c) =>
    c.content?.toLowerCase().includes(search.toLowerCase()) ||
    c.post?.title?.toLowerCase().includes(search.toLowerCase()) ||
    c.author?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const filters: Filter[] = ["ALL", "PENDING", "APPROVED", "REJECTED"];

  const statusColor = (s: string) => {
    if (s === "APPROVED") return "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400";
    if (s === "REJECTED") return "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400";
    return "bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400";
  };

  const pendingCount = comments.filter((c) => c.status === "PENDING").length;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Toaster />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Comments</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {comments.length} {filter === "ALL" ? "total" : filter.toLowerCase()}
            {filter !== "PENDING" && pendingCount > 0 && (
              <button onClick={() => setFilter("PENDING")}
                className="ml-3 text-amber-500 font-medium hover:underline">
                {pendingCount} pending review
              </button>
            )}
          </p>
        </div>
      </div>

      {/* Filters + search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          placeholder="Search by comment, post, or author…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 px-4 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1e2436] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
        />
        <div className="flex gap-1 bg-gray-100 dark:bg-[#1e2436] rounded-lg p-1">
          {filters.map((f) => (
            <button key={f} onClick={() => { setSearch(""); setFilter(f); }}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all whitespace-nowrap ${
                filter === f
                  ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              }`}>
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
            {search ? "No comments match your search."
              : filter === "PENDING" ? "No comments pending review."
              : `No ${filter === "ALL" ? "" : filter.toLowerCase() + " "}comments.`}
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
                  <th className="px-4 py-3 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Actions</th>
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
                    <td className="px-4 py-4 hidden md:table-cell">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                          {(comment.author?.name ?? "?").charAt(0).toUpperCase()}
                        </div>
                        <span className="text-gray-500 dark:text-gray-400 text-xs">
                          {comment.author?.name ?? "Anonymous"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell text-xs max-w-[160px]">
                      {comment.post ? (
                        <span className="text-primary line-clamp-1">{comment.post.title}</span>
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
                    <td className="px-4 py-4">
                      {comment.status === "PENDING" ? (
                        <div className="flex items-center gap-2 justify-end">
                          <button
                            onClick={() => handleModerate(comment, "APPROVED")}
                            disabled={moderating === comment.id}
                            title="Approve"
                            className="flex items-center gap-1 text-xs font-medium text-green-600 dark:text-green-400 hover:text-green-700 disabled:opacity-50 transition-colors"
                          >
                            {moderating === comment.id ? (
                              <span className="w-3.5 h-3.5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                            Approve
                          </button>
                          <button
                            onClick={() => handleModerate(comment, "REJECTED")}
                            disabled={moderating === comment.id}
                            title="Reject"
                            className="flex items-center gap-1 text-xs font-medium text-red-500 dark:text-red-400 hover:text-red-600 disabled:opacity-50 transition-colors"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                            Reject
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400 text-right block">—</span>
                      )}
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