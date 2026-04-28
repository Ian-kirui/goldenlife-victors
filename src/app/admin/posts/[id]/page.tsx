"use client";

import { useSession } from "next-auth/react";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  getAdminPosts,
  updatePost,
  uploadPostImage,
  getAdminCategories,
  getAdminTags,
  createTags,
} from "@/utils/blogApi";
import type { Post, Category, Tag } from "@/types/api.types";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

export default function EditPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [post, setPost]                 = useState<Post | null>(null);
  const [title, setTitle]               = useState("");
  const [content, setContent]           = useState("");
  const [categoryId, setCategoryId]     = useState("");
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([]);
  const [postStatus, setPostStatus]     = useState<"DRAFT" | "PUBLISHED">("DRAFT");
  const [imageFile, setImageFile]       = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [newTagInput, setNewTagInput]   = useState("");
  const [categories, setCategories]     = useState<Category[]>([]);
  const [tags, setTags]                 = useState<Tag[]>([]);
  const [loading, setLoading]           = useState(true);
  const [submitting, setSubmitting]     = useState(false);

  const token = (session as any)?.accessToken as string;

  useEffect(() => {
    if (status !== "authenticated") return;
    // Use no-cache admin fetchers so we see latest categories/tags
    Promise.all([
      getAdminPosts(token),
      getAdminCategories(),
      getAdminTags(),
    ]).then(([posts, cats, tgs]) => {
      const found = posts.find((p) => p.id === id);
      if (found) {
        setPost(found);
        setTitle(found.title);
        setContent(found.content);
        setCategoryId(found.category?.id ?? "");
        setSelectedTagIds(found.tags?.map((t) => t.id) ?? []);
        setPostStatus(found.status as "DRAFT" | "PUBLISHED");
        setImagePreview(found.coverImage ?? found.imageUrl ?? null);
      }
      setCategories(cats);
      setTags(tgs);
      setLoading(false);
    }).catch(() => {
      toast.error("Failed to load post data");
      setLoading(false);
    });
  }, [status, id, token]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleAddTag = async () => {
    const name = newTagInput.trim();
    if (!name) return;
    try {
      const created = await createTags(token, [name]);
      setTags((prev) => [...prev, ...created]);
      setSelectedTagIds((prev) => [...prev, ...created.map((t) => t.id)]);
      setNewTagInput("");
    } catch {
      toast.error("Failed to create tag");
    }
  };

  const toggleTag = (tagId: string) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryId) { toast.error("Please select a category"); return; }
    setSubmitting(true);
    try {
      await updatePost(token, id, {
        title,
        content,
        categoryId,
        tagIds: selectedTagIds,
        postStatus,
      });
      if (imageFile) {
        await uploadPostImage(token, id, imageFile).catch(() =>
          toast.error("Post updated but image upload failed")
        );
      }
      toast.success("Post updated!");
      router.push("/admin/posts");
    } catch (e: any) {
      toast.error(e.message ?? "Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-32 text-gray-400">
        Post not found.{" "}
        <Link href="/admin/posts" className="text-primary hover:underline">Go back</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Toaster />

      <div className="flex items-center gap-4">
        <Link href="/admin/posts" className="text-gray-400 hover:text-primary transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit Post</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5 truncate max-w-md">{post.title}</p>
        </div>
        <Link
          href={`/blog/${post.id}`}
          target="_blank"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-primary transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          View
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-5">
          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-6 space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text" required value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-primary text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                required value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={16}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white focus:outline-none focus:border-primary text-sm resize-y font-mono"
              />
            </div>
          </div>

          {/* Cover image */}
          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Cover Image</label>
            {imagePreview ? (
              <div className="relative">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => { setImageFile(null); setImagePreview(null); }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-red-600"
                >×</button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-36 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg cursor-pointer hover:border-primary transition-colors">
                <svg className="w-8 h-8 text-gray-300 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-gray-400">Click to upload image</span>
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              </label>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-5">
          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-5 space-y-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Publish</h3>
            <div>
              <label className="block text-xs text-gray-500 dark:text-gray-400 mb-1">Status</label>
              <select
                value={postStatus}
                onChange={(e) => setPostStatus(e.target.value as "DRAFT" | "PUBLISHED")}
                className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#161b27] text-gray-900 dark:text-white focus:outline-none focus:border-primary"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
              </select>
            </div>
            <button
              type="submit" disabled={submitting}
              className="w-full bg-primary hover:bg-darkprimary disabled:opacity-60 text-white text-sm font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {submitting ? (
                <><span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />Saving…</>
              ) : "Update Post"}
            </button>
          </div>

          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat.id} className="flex items-center gap-2 cursor-pointer group">
                  <input type="radio" name="category" value={cat.id}
                    checked={categoryId === cat.id} onChange={() => setCategoryId(cat.id)}
                    className="accent-primary" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">
                    {cat.name}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-[#1e2436] rounded-xl border border-gray-100 dark:border-gray-800 p-5">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map((tag) => (
                <button key={tag.id} type="button" onClick={() => toggleTag(tag.id)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                    selectedTagIds.includes(tag.id)
                      ? "bg-primary border-primary text-white"
                      : "border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-primary"
                  }`}
                >
                  #{tag.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={newTagInput}
                onChange={(e) => setNewTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); } }}
                placeholder="New tag…"
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:border-primary"
              />
              <button type="button" onClick={handleAddTag}
                className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-lg hover:bg-primary hover:text-white transition-all"
              >Add</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}