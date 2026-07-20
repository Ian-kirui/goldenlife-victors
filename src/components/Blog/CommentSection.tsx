"use client";

import { useSession } from "next-auth/react";
import { useState } from "react";
import { createComment } from "@/utils/blogApi";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { data: session, status } = useSession();
  const [content, setContent]     = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const token = (session as any)?.accessToken as string;
  const isLoggedIn = status === "authenticated";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setSubmitting(true);
    try {
      await createComment(token, postId, content.trim());
      setContent("");
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
      <h3 className="text-2xl font-bold text-midnight_text dark:text-white mb-6">
        Leave a Comment
      </h3>

      {!isLoggedIn ? (
        /* Not signed in */
        <div className="bg-gray-50 dark:bg-[#1e2436] rounded-xl border border-border dark:border-dark_border p-6 text-center space-y-3">
          <svg className="w-10 h-10 text-gray-300 dark:text-gray-600 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            You need to be signed in to leave a comment.
          </p>
          <Link
            href="/signin"
            className="inline-block bg-primary hover:bg-darkprimary text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
          >
            Sign In to Comment
          </Link>
        </div>
      ) : submitted ? (
        /* Submitted success state */
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
        /* Comment form */
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
              {(session?.user?.name ?? "U").charAt(0).toUpperCase()}
            </div>
            <p className="text-sm font-medium text-midnight_text dark:text-white">
              {session?.user?.name ?? "You"}
            </p>
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            placeholder="Share your thoughts on this post…"
            className="w-full px-4 py-3 rounded-lg border border-border dark:border-dark_border bg-white dark:bg-[#1e2436] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary text-sm resize-none transition-colors"
          />

          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Comments are reviewed before appearing publicly.
            </p>
            <button
              type="submit"
              disabled={submitting || !content.trim()}
              className="flex items-center gap-2 bg-primary hover:bg-darkprimary disabled:opacity-50 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors"
            >
              {submitting ? (
                <><span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />Submitting…</>
              ) : "Submit Comment"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}