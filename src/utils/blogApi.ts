import type {
  Post,
  Category,
  Tag,
  PostsResponse,
  CategoriesResponse,
  TagsResponse,
} from "@/types/api.types";

const BASE = "https://golden-life-blog-9351.onrender.com/api/v1";

// Shared fetch helper — throws on non-OK so callers can handle gracefully
async function apiFetch<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 }, // ISR: re-fetch at most every 60 s
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status} for ${path}`);
  }

  return res.json() as Promise<T>;
}

// ─── Posts ───────────────────────────────────────────────────────────────────

/** All PUBLISHED posts — no auth required */
export async function getAllPublicPosts(): Promise<Post[]> {
  try {
    const data = await apiFetch<PostsResponse | { content: Post[] }>("/posts/public");
    // Handle both a plain array and a paginated { content: [] } response shape
    return Array.isArray(data) ? data : (data as any).content ?? [];
  } catch {
    return [];
  }
}

/**
 * No dedicated public single-post endpoint exists in the API, so we fetch the
 * full public list and find the matching post by id.
 * Next.js deduplicates the underlying fetch automatically within the same render.
 */
export async function getPublicPostById(id: string): Promise<Post | null> {
  const posts = await getAllPublicPosts();
  return posts.find((p) => p.id === id) ?? null;
}

// ─── Categories ──────────────────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  try {
    return await apiFetch<CategoriesResponse>("/categories");
  } catch {
    return [];
  }
}

// ─── Tags ────────────────────────────────────────────────────────────────────

export async function getAllTags(): Promise<Tag[]> {
  try {
    return await apiFetch<TagsResponse>("/tags");
  } catch {
    return [];
  }
}