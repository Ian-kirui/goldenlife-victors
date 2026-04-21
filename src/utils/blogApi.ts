import type {
  Post,
  Category,
  Tag,
  PostsResponse,
  CategoriesResponse,
  TagsResponse,
} from "@/types/api.types";


const BASE = process.env.NEXT_PUBLIC_BLOG_API_BASE_URL;
// ─── Helpers ──────────────────────────────────────────────────────────────────

async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    next: { revalidate: 60 },
    ...options,
  });
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

async function authFetch<T>(
  path: string,
  token: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    cache: "no-store",
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options?.headers ?? {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `API error ${res.status} for ${path}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json() as Promise<T>;
}

// ─── Public: Posts ────────────────────────────────────────────────────────────

export async function getAllPublicPosts(): Promise<Post[]> {
  try {
    const data = await apiFetch<PostsResponse | { content: Post[] }>("/posts/public");
    return Array.isArray(data) ? data : (data as any).content ?? [];
  } catch {
    return [];
  }
}

export async function getPublicPostById(id: string): Promise<Post | null> {
  const posts = await getAllPublicPosts();
  return posts.find((p) => p.id === id) ?? null;
}

// ─── Public: Categories & Tags ────────────────────────────────────────────────

export async function getAllCategories(): Promise<Category[]> {
  try {
    return await apiFetch<CategoriesResponse>("/categories");
  } catch {
    return [];
  }
}

export async function getAllTags(): Promise<Tag[]> {
  try {
    return await apiFetch<TagsResponse>("/tags");
  } catch {
    return [];
  }
}

// ─── Admin: Posts ─────────────────────────────────────────────────────────────

export async function getAdminPosts(
  token: string,
  userId?: string
): Promise<Post[]> {
  const query = userId ? `?userId=${userId}` : "";
  const data = await authFetch<PostsResponse | { content: Post[] }>(
    `/posts/admin${query}`,
    token
  );
  return Array.isArray(data) ? data : (data as any).content ?? [];
}

export interface CreatePostPayload {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  status: "DRAFT" | "PUBLISHED";
}

export async function createPost(
  token: string,
  payload: CreatePostPayload
): Promise<Post> {
  return authFetch<Post>("/posts", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export interface UpdatePostPayload {
  title?: string;
  content?: string;
  categoryId?: string;
  tagIds?: string[];
  postStatus?: "DRAFT" | "PUBLISHED";
}

export async function updatePost(
  token: string,
  postId: string,
  payload: UpdatePostPayload
): Promise<Post> {
  return authFetch<Post>(`/posts/${postId}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function uploadPostImage(
  token: string,
  postId: string,
  imageFile: File
): Promise<Post> {
  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await fetch(`${BASE}/posts/${postId}/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Image upload failed: ${res.status}`);
  }
  return res.json();
}

// ─── Admin: Categories ────────────────────────────────────────────────────────

export async function createCategory(
  token: string,
  name: string
): Promise<Category> {
  return authFetch<Category>("/categories", token, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategory(
  token: string,
  categoryId: string
): Promise<void> {
  return authFetch<void>(`/categories/${categoryId}`, token, {
    method: "DELETE",
  });
}

// ─── Admin: Tags ──────────────────────────────────────────────────────────────

export async function createTags(
  token: string,
  names: string[]
): Promise<Tag[]> {
  return authFetch<Tag[]>("/tags", token, {
    method: "POST",
    body: JSON.stringify({ names }),
  });
}