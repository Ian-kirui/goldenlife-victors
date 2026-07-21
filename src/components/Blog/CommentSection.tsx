"use client";

import { useState } from "react";
import { createComment } from "@/utils/blogApi";
import type { Comment } from "@/types/api.types";
import { formatPostDate } from "@/utils/formatDate";
import toast, { Toaster } from "react-hot-toast";

interface CommentSectionProps {
  postId: string;
  initialComments?: Comment[];
}

export default function CommentSection({ postId, initialComments = [] }: CommentSectionProps) {
  const [authorName, setAuthorName]   = useState("");
  const [authorEmail, setAuthorEmail] = useState("");
  const [content, setContent]         = useState("");
  const [submitting, setSubmitting]   = useState(false);
  const [submitted, setSubmitted]     = useState(false);

  // Only show APPROVED comments publicly
  const approvedComments = initialComments.filter((c) => c.status === "APPROVED");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !authorName.trim() || !authorEmail.trim()) return;
    setSubmitting(true);
    try {
      await createComment(postId, {
        content: content.trim(),
        authorName: authorName.trim(),
        authorEmail: authorEmail.trim(),
      });
      setContent("");
      setAuthorName("");
      setAuthorEmail("");
      setSubmitted(true);
      toast.success("Comment submitted — it will appear after review.");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to submit comment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-12 pt-10 border-t border-border dark:border-dark_border">
      <Toaster />

      {/* Approved comments list */}
      {approvedComments.length > 0 && (
        <div className="mb-10">
          <h3 className="text-xl font-bold text-midnight_text dark:text-white mb-6">
            {approvedComments.length} Comment{approvedComments.length !== 1 ? "s" : ""}
          </h3>
          <div className="space-y-6">
            {approvedComments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-bold shrink-0">
                  {comment.authorName.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1.5">
                    <span className="font-semibold text-midnight_text dark:text-white text-sm">
                      {comment.authorName}
                    </span>
                    {comment.dateCreated && (
                      <span className="text-xs text-gray-400">
                        {formatPostDate(comment.dateCreated)}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Leave a comment heading */}
      <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-6">
        Leave a Comment
      </h3>

      {submitted ? (
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800 p-6 text-center space-y-2">
          <svg className="w-10 h-10 text-green-500 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-medium text-green-700 dark:text-green-400">Comment submitted!</p>
          <p className="text-sm text-green-600 dark:text-green-500">
            Your comment is pending review and will appear once approved.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="text-xs text-green-600 dark:text-green-400 hover:underline mt-1"
          >
            Write another comment
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name + Email row */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-dark_border bg-white dark:bg-dark text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary text-sm transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
                Email <span className="text-red-500">*</span>
                <span className="ml-1 font-normal text-gray-400">(not published)</span>
              </label>
              <input
                type="email"
                required
                value={authorEmail}
                onChange={(e) => setAuthorEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border dark:border-dark_border bg-white dark:bg-dark text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary text-sm transition-colors"
              />
            </div>
          </div>

          {/* Comment textarea */}
          <div>
            <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1.5">
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              placeholder="Share your thoughts on this post…"
              className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border bg-white dark:bg-dark text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary text-sm resize-none transition-colors"
            />
          </div>

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Comments are reviewed before appearing publicly.
            </p>
            <button
              type="submit"
              disabled={submitting || !content.trim() || !authorName.trim() || !authorEmail.trim()}
              className="flex items-center gap-2 bg-primary hover:bg-darkprimary disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? (
                <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting…</>
              ) : "Post Comment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}