import type {
  Post,
  Category,
  Tag,
  PostsResponse,
  CategoriesResponse,
  TagsResponse,
} from "@/types/api.types";

const BASE =
  process.env.BLOG_API_BASE_URL ??
  process.env.NEXT_PUBLIC_BLOG_API_BASE_URL ??
  "";

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
  // 204 No Content or empty body — return undefined
  if (res.status === 204) return undefined as T;
  // Some endpoints (e.g. DELETE) return plain text instead of JSON
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined as T;
  return res.json() as Promise<T>;
}

async function freshFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

// ─── Normalise post ───────────────────────────────────────────────────────────
// The API returns `postStatus` and `dateCreated` — normalise so components
// can use consistent field names without knowing the wire format.
function normalise(post: any): Post {
  return {
    ...post,
    // Expose postStatus as-is (type updated to match)
    postStatus: post.postStatus ?? post.status ?? "DRAFT",
    // Normalise date field
    dateCreated: post.dateCreated ?? post.createdAt ?? null,
  };
}

function normaliseAll(posts: any[]): Post[] {
  return Array.isArray(posts) ? posts.map(normalise) : [];
}

// ─── Public: Posts ────────────────────────────────────────────────────────────

export async function getAllPublicPosts(): Promise<Post[]> {
  try {
    const data = await apiFetch<PostsResponse | { content: Post[] }>("/posts/public");
    const raw = Array.isArray(data) ? data : (data as any).content ?? [];
    return normaliseAll(raw);
  } catch {
    return [];
  }
}

/** Single post by id — uses the dedicated public endpoint */
export async function getPublicPostById(id: string): Promise<Post | null> {
  try {
    const raw = await freshFetch<any>(`/posts/public/${id}`);
    return normalise(raw);
  } catch {
    return null;
  }
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

// ─── Admin: Categories & Tags (no-cache) ─────────────────────────────────────

export async function getAdminCategories(): Promise<Category[]> {
  try {
    return await freshFetch<CategoriesResponse>("/categories");
  } catch {
    return [];
  }
}

export async function getAdminTags(): Promise<Tag[]> {
  try {
    return await freshFetch<TagsResponse>("/tags");
  } catch {
    return [];
  }
}

// ─── Admin: Posts ─────────────────────────────────────────────────────────────

export async function getAdminPosts(
  token: string,
  status?: "DRAFT" | "PUBLISHED"
): Promise<Post[]> {
  try {
    // API supports ?status=DRAFT filter
    const query = status ? `?status=${status}` : "";
    const data = await authFetch<PostsResponse | { content: Post[] }>(
      `/posts/admin${query}`,
      token
    );
    const raw = Array.isArray(data) ? data : (data as any).content ?? [];
    return normaliseAll(raw);
  } catch {
    return [];
  }
}

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const data = await freshFetch<PostsResponse | { content: Post[] }>("/posts/public");
    const raw = Array.isArray(data) ? data : (data as any).content ?? [];
    return normaliseAll(raw);
  } catch {
    return [];
  }
}

// ─── Create Post ──────────────────────────────────────────────────────────────
// NOTE: Create endpoint uses "status" (not "postStatus") in the request body.
// Update endpoint uses "postStatus". This is a backend inconsistency.

export interface CreatePostPayload {
  title: string;
  content: string;       // HTML string from rich text editor
  categoryId: string;
  tagIds: string[];
  status: "DRAFT" | "PUBLISHED"; // create uses "status"
}

export async function createPost(
  token: string,
  payload: CreatePostPayload
): Promise<Post> {
  const raw = await authFetch<any>("/posts", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalise(raw);
}

// ─── Update Post ──────────────────────────────────────────────────────────────
// NOTE: Update endpoint uses "postStatus" (not "status").

export interface UpdatePostPayload {
  title?: string;
  content?: string;
  categoryId?: string;
  tagIds?: string[];
  postStatus?: "DRAFT" | "PUBLISHED"; // update uses "postStatus"
}

export async function updatePost(
  token: string,
  postId: string,
  payload: UpdatePostPayload
): Promise<Post> {
  const raw = await authFetch<any>(`/posts/${postId}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return normalise(raw);
}

/** Delete a post by id — requires admin token.
 *  The API returns plain text ("Post deleted"), not JSON, so we bypass authFetch.
 */
export async function deletePost(
  token: string,
  postId: string
): Promise<void> {
  const res = await fetch(`${BASE}/posts/${postId}`, {
    method: "DELETE",
    cache: "no-store",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    // Try to get an error message — may be text or JSON
    const body = await res.text().catch(() => "");
    throw new Error(body || `Delete failed: ${res.status}`);
  }
  // Intentionally ignore the response body — it's plain text, not JSON
}

// ─── Upload Image ─────────────────────────────────────────────────────────────
// Must be called AFTER createPost — requires the post id.
// Do NOT set Content-Type; browser sets multipart boundary automatically.

export async function uploadPostImage(
  token: string,
  postId: string,
  imageFile: File
): Promise<Post> {
  const formData = new FormData();
  formData.append("image", imageFile);

  const res = await fetch(`${BASE}/api/v1/posts/${postId}/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Image upload failed: ${res.status}`);
  }
  return normalise(await res.json());
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

// ─── Auth: Forgot / Reset Password ───────────────────────────────────────────

const AUTH_BASE =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
  "";

export async function forgotPassword(email: string): Promise<void> {
  const res = await fetch(
    `${AUTH_BASE}/api/auth/public/forgot-password?email=${encodeURIComponent(email)}`,
    { method: "POST", cache: "no-store" }
  );
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Failed to send reset email (${res.status})`);
  }
}

export async function resetPassword(token: string, newPassword: string): Promise<void> {
  const res = await fetch(
    `${AUTH_BASE}/api/auth/public/reset-password?token=${encodeURIComponent(token)}&newPassword=${encodeURIComponent(newPassword)}`,
    { method: "POST", cache: "no-store" }
  );
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Password reset failed (${res.status})`);
  }
}

// ─── Events: Public ───────────────────────────────────────────────────────────

import type { Event, EventsResponse, Comment, CommentsResponse } from "@/types/api.types";

export async function getPublicEvents(): Promise<Event[]> {
  try {
    const data = await apiFetch<EventsResponse | { content: Event[] }>("/events/public");
    return Array.isArray(data) ? data : (data as any).content ?? [];
  } catch {
    return [];
  }
}

export async function getPublicEventById(id: string): Promise<Event | null> {
  try {
    return await freshFetch<Event>(`/events/public/${id}`);
  } catch {
    return null;
  }
}

// ─── Events: Admin ────────────────────────────────────────────────────────────

export interface CreateEventPayload {
  title: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  meetLink?: string;
  location?: string;
}

export async function createEvent(
  token: string,
  payload: CreateEventPayload
): Promise<Event> {
  return authFetch<Event>("/events/admin", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getAdminEvents(token: string): Promise<Event[]> {
  try {
    const data = await authFetch<EventsResponse | { content: Event[] }>(
      "/events/admin",
      token,
      { method: "GET" }
    );
    return Array.isArray(data) ? data : (data as any).content ?? [];
  } catch {
    return [];
  }
}

export async function getAdminEventById(token: string, id: string): Promise<Event | null> {
  try {
    return await authFetch<Event>(`/events/admin/${id}`, token);
  } catch {
    return null;
  }
}

export async function updateEvent(
  token: string,
  id: string,
  payload: Partial<CreateEventPayload>
): Promise<Event> {
  return authFetch<Event>(`/events/admin/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export async function uploadEventImage(
  token: string,
  eventId: string,
  imageFile: File
): Promise<Event> {
  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await fetch(`${BASE}/api/v1/events/${eventId}/image`, {
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

// ─── Posts: Get single post by id (admin) ────────────────────────────────────

export async function getAdminPostById(token: string, id: string): Promise<Post | null> {
  try {
    const raw = await authFetch<any>(`/posts/admin/${id}`, token);
    return normalise(raw);
  } catch {
    return null;
  }
}

// ─── Comments: Admin ─────────────────────────────────────────────────────────

export async function getAdminComments(
  token: string,
  status?: string
): Promise<Comment[]> {
  try {
    const query = status ? `?status=${status}` : "";
    const data = await authFetch<CommentsResponse | { content: Comment[] }>(
      `/comments/admin${query}`,
      token
    );
    return Array.isArray(data) ? data : (data as any).content ?? [];
  } catch {
    return [];
  }
}