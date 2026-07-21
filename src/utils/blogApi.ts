import type {
  Post,
  Category,
  Tag,
  PostsResponse,
  CategoriesResponse,
  TagsResponse,
  Event,
  EventsResponse,
  Comment,
  CommentsResponse,
} from "@/types/api.types";

const BASE =
  process.env.BLOG_API_BASE_URL ??
  process.env.NEXT_PUBLIC_BLOG_API_BASE_URL ??
  "";

const AUTH_BASE =
  process.env.API_BASE_URL ??
  process.env.NEXT_PUBLIC_API_BASE_URL ??
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
  if (res.status === 204) return undefined as T;
  const contentType = res.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return undefined as T;
  return res.json() as Promise<T>;
}

async function freshFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { cache: "no-store" });
  if (!res.ok) throw new Error(`API error ${res.status} for ${path}`);
  return res.json() as Promise<T>;
}

// ─── Normalise helpers ────────────────────────────────────────────────────────

function normalise(post: any): Post {
  return {
    ...post,
    postStatus: post.postStatus ?? post.status ?? "DRAFT",
    dateCreated: post.dateCreated ?? post.createdAt ?? null,
  };
}

function normaliseAll(posts: any[]): Post[] {
  return Array.isArray(posts) ? posts.map(normalise) : [];
}

/** Events are wrapped: { status, message, data: EventResponse | EventResponse[] } */
function unwrapEvent(raw: any): Event | null {
  if (!raw) return null;
  // If it has a `data` property it's a MessageResponse wrapper
  const ev = raw.data ?? raw;
  return ev ?? null;
}

function unwrapEvents(raw: any): Event[] {
  if (!raw) return [];
  const list = raw.data ?? raw;
  return Array.isArray(list) ? list : [];
}

// ─── Auth: Forgot / Reset Password ───────────────────────────────────────────

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

/** Uses the dedicated /posts/public/{id} endpoint — returns comments[] too */
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

export async function getAdminPostById(token: string, id: string): Promise<Post | null> {
  try {
    const raw = await authFetch<any>(`/posts/admin/${id}`, token);
    return normalise(raw);
  } catch {
    return null;
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

export interface CreatePostPayload {
  title: string;
  content: string;
  categoryId: string;
  tagIds: string[];
  status: "DRAFT" | "PUBLISHED";
}

export async function createPost(token: string, payload: CreatePostPayload): Promise<Post> {
  const raw = await authFetch<any>("/posts", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return normalise(raw);
}

export interface UpdatePostPayload {
  title?: string;
  content?: string;
  categoryId?: string;
  tagIds?: string[];
  postStatus?: "DRAFT" | "PUBLISHED";
}

export async function updatePost(token: string, postId: string, payload: UpdatePostPayload): Promise<Post> {
  const raw = await authFetch<any>(`/posts/${postId}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return normalise(raw);
}

export async function deletePost(token: string, postId: string): Promise<void> {
  return authFetch<void>(`/posts/${postId}`, token, { method: "DELETE" });
}

export async function uploadPostImage(token: string, postId: string, imageFile: File): Promise<Post> {
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
  return normalise(await res.json());
}

// ─── Admin: Categories ────────────────────────────────────────────────────────

export async function createCategory(token: string, name: string): Promise<Category> {
  return authFetch<Category>("/categories", token, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export async function deleteCategory(token: string, categoryId: string): Promise<void> {
  return authFetch<void>(`/categories/${categoryId}`, token, { method: "DELETE" });
}

// ─── Admin: Tags ──────────────────────────────────────────────────────────────

export async function createTags(token: string, names: string[]): Promise<Tag[]> {
  return authFetch<Tag[]>("/tags", token, {
    method: "POST",
    body: JSON.stringify({ names }),
  });
}

// ─── Events: Public ───────────────────────────────────────────────────────────
// Response shape: { status, message, data: EventResponse[] }

export async function getPublicEvents(): Promise<Event[]> {
  try {
    const raw = await freshFetch<any>("/events/public");
    return unwrapEvents(raw);
  } catch {
    return [];
  }
}

export async function getPublicEventById(id: string): Promise<Event | null> {
  try {
    const raw = await freshFetch<any>(`/events/public/${id}`);
    return unwrapEvent(raw);
  } catch {
    return null;
  }
}

// ─── Events: Admin ────────────────────────────────────────────────────────────
// Response shape: { status, message, data: EventResponse[] }

export async function getAdminEvents(token: string): Promise<Event[]> {
  try {
    // Use a direct fetch for GET to avoid Content-Type header issues on some servers
    const res = await fetch(`${BASE}/events/admin`, {
      method: "GET",
      cache: "no-store",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      throw new Error(body?.message ?? `API error ${res.status}`);
    }
    const raw = await res.json();
    return unwrapEvents(raw);
  } catch {
    return [];
  }
}

export async function getAdminEventById(token: string, id: string): Promise<Event | null> {
  try {
    const raw = await authFetch<any>(`/events/admin/${id}`, token);
    return unwrapEvent(raw);
  } catch {
    return null;
  }
}

export interface CreateEventPayload {
  title: string;
  content: string;
  status: "DRAFT" | "PUBLISHED";
  meetLink?: string;
  location?: string;
}

export async function createEvent(token: string, payload: CreateEventPayload): Promise<Event> {
  const raw = await authFetch<any>("/events/admin", token, {
    method: "POST",
    body: JSON.stringify(payload),
  });
  return unwrapEvent(raw) as Event;
}

export async function updateEvent(
  token: string,
  id: string,
  payload: Partial<CreateEventPayload>
): Promise<Event> {
  const raw = await authFetch<any>(`/events/admin/${id}`, token, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
  return unwrapEvent(raw) as Event;
}

export async function uploadEventImage(token: string, eventId: string, imageFile: File): Promise<Event> {
  const formData = new FormData();
  formData.append("image", imageFile);
  const res = await fetch(`${BASE}/events/${eventId}/image`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Image upload failed: ${res.status}`);
  }
  const raw = await res.json();
  return unwrapEvent(raw) as Event;
}

// ─── Comments: Public (no auth needed) ───────────────────────────────────────
// POST /comments/public/{postId}
// Body: { content, authorName, authorEmail }

export async function createComment(
  postId: string,
  payload: { content: string; authorName: string; authorEmail: string }
): Promise<Comment> {
  const res = await fetch(`${BASE}/comments/public/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.message ?? `Failed to submit comment (${res.status})`);
  }
  const raw = await res.json();
  // Response: { status, message, data: CommentDto }
  return raw.data ?? raw;
}

// ─── Comments: Admin ─────────────────────────────────────────────────────────

export async function getAdminComments(
  token: string,
  status?: string
): Promise<Comment[]> {
  try {
    const query = status ? `?status=${status}` : "";
    const data = await authFetch<CommentsResponse | Comment[]>(
      `/comments/admin${query}`,
      token
    );
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

/** PUT /comments/{commentId}/approve */
export async function approveComment(token: string, commentId: string): Promise<Comment> {
  return authFetch<Comment>(`/comments/${commentId}/approve`, token, { method: "PUT" });
}

/** PUT /comments/{commentId}/reject */
export async function rejectComment(token: string, commentId: string): Promise<Comment> {
  return authFetch<Comment>(`/comments/${commentId}/reject`, token, { method: "PUT" });
}