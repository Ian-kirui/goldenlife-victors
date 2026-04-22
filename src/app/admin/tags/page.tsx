"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getAllTags, createTags } from "@/utils/blogApi";
import type { Tag } from "@/types/api.types";
import toast, { Toaster } from "react-hot-toast";

export default function TagsPage() {
  const { data: session, status } = useSession();
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [creating, setCreating] = useState(false);

  const token = (session as any)?.accessToken as string;

  useEffect(() => {
    if (status !== "authenticated") return;
    getAllTags()
      .then(setTags)
      .finally(() => setLoading(false));
  }, [status]);

  // Parse comma-separated tag names
  const parseNames = (raw: string) =>
    raw
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const names = parseNames(input);
    if (!names.length) return;
    setCreating(true);
    try {
      const created = await createTags(token, names);
      setTags((prev) => [...prev, ...created]);
      setInput("");
      toast.success(`${created.length} tag${created.length > 1 ? "s" : ""} created`);
    } catch (e: any) {
      toast.error(e.message ?? "Failed to create tags");
    } finally {
      setCreating(false);
    }
  };

  const preview = parseNames(input);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Toaster />

      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Tags</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Manage blog post tags
        </p>
      </div>

      {/* Create form */}
      <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-6 space-y-4">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Add Tags
        </h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. mental-health, wellness, community"
            className="w-full px-4 py-2.5 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
          />
          <p className="text-xs text-gray-400">Separate multiple tags with commas.</p>

          {/* Preview */}
          {preview.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {preview.map((name) => (
                <span
                  key={name}
                  className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full"
                >
                  #{name}
                </span>
              ))}
            </div>
          )}

          <button
            type="submit"
            disabled={creating || preview.length === 0}
            className="px-5 py-2.5 bg-primary hover:bg-darkprimary disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
          >
            {creating ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
            Create {preview.length > 1 ? `${preview.length} Tags` : "Tag"}
          </button>
        </form>
      </div>

      {/* Tag cloud */}
      <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
          All Tags ({tags.length})
        </h2>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : tags.length === 0 ? (
          <p className="text-center text-gray-400 text-sm py-4">
            No tags yet. Create your first one above.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag.id}
                className="text-sm bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-3 py-1.5 rounded-full"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}